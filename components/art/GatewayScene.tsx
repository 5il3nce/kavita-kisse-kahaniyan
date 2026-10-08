// Hero scene: a symmetrical Lucknow gateway inspired by Rumi Darwaza, split into layers
// so the hero timeline can move each one on its own. All layers share one viewBox.

import {
  C,
  Bird,
  Bunting,
  Chhatri,
  Cloud,
  Diya,
  JaaliPanel,
  MarigoldUse,
  OnionDome,
  Petal,
  Star,
  Star5,
  SunRays,
  Turret,
  TwinFish,
  pointedArchPath,
  scallopArchPath,
} from "./motifs";

export const VB = "0 0 1600 1000";
export const SCENE = { w: 1600, h: 1000, cx: 800, doorCy: 640 };

const svgProps = {
  viewBox: VB,
  preserveAspectRatio: "xMidYMax slice",
  className: "absolute inset-0 h-full w-full",
  "aria-hidden": true,
  focusable: false,
} as const;

// Deterministic pseudo-random so server and client render the same art.
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------------- Sky ---------------- */

export function SkyLayer() {
  return (
    <div className="absolute inset-0 bg-sun [container-type:size]">
      {/* Rays sit in their own div so the slow spin runs on the compositor, with no SVG repaint.
          --u is one viewBox unit under xMidYMax slice; the sun centre is (800, 430). */}
      <div
        className="kkk-spin-slow absolute [--u:max(calc(100cqw/1600),calc(100cqh/1000))]"
        style={{ width: "calc(2000 * var(--u))", height: "calc(2000 * var(--u))", left: "calc(50% - 1000 * var(--u))", top: "calc(100cqh - 1570 * var(--u))" }}
      >
        <svg viewBox="-1000 -1000 2000 2000" className="h-full w-full" aria-hidden="true" focusable="false">
          <SunRays cx={0} cy={0} r1={380} r2={1000} n={28} color={C.sunLight} spread={0.42} />
        </svg>
      </div>
      <svg {...svgProps}>
        {[410, 450, 490, 530, 570].map((r, i) => (
          <circle key={r} cx={800} cy={430} r={r} fill="none" stroke={C.cream} strokeOpacity={0.5 - i * 0.08} strokeWidth={2} />
        ))}
        <circle cx={800} cy={430} r={370} fill={C.cream} />
      </svg>
    </div>
  );
}

/* ---------------- Clouds ---------------- */

export function CloudsLayer() {
  return (
    <svg {...svgProps}>
      <g className="kkk-cloud-l2">
        <Cloud x={250} y={300} s={0.75} />
      </g>
      <g className="kkk-cloud-r2">
        <Cloud x={1360} y={270} s={0.65} />
      </g>
      <g className="kkk-cloud-l1">
        <Cloud x={120} y={600} s={1.7} back={C.rose} />
        <Cloud x={380} y={575} s={1.05} />
      </g>
      <g className="kkk-cloud-r1">
        <Cloud x={1480} y={600} s={1.7} back={C.rose} />
        <Cloud x={1220} y={575} s={1.05} />
      </g>
    </svg>
  );
}

/* ---------------- Birds ---------------- */

export function BirdsLayer() {
  return (
    <svg {...svgProps}>
      <g className="kkk-birds-l">
        <Bird x={400} y={420} s={1.1} />
        <Bird x={455} y={392} s={0.85} />
        <Bird x={360} y={470} s={0.7} />
      </g>
      <g className="kkk-birds-r">
        <Bird x={1190} y={360} s={1} />
        <Bird x={1250} y={398} s={0.8} />
        <Bird x={1215} y={445} s={0.65} />
      </g>
    </svg>
  );
}

/* ---------------- Gate ---------------- */

const DOOR = { w: 250, h: 330 };
const doorPath = pointedArchPath(800, 800, DOOR.w, DOOR.h);

function doorHalf(side: "l" | "r") {
  const w = DOOR.w;
  const R = w * 0.8;
  const rise = Math.sqrt(w * R - (w * w) / 4);
  const springY = 800 - (DOOR.h - rise);
  const apexY = springY - rise;
  return side === "l"
    ? `M${800 - w / 2} 800 L${800 - w / 2} ${springY} A${R} ${R} 0 0 1 800 ${apexY} L800 800 Z`
    : `M800 800 L800 ${apexY} A${R} ${R} 0 0 1 ${800 + w / 2} ${springY} L${800 + w / 2} 800 Z`;
}

function Door({ side }: { side: "l" | "r" }) {
  const x0 = side === "l" ? 675 : 800;
  const planks = Array.from({ length: 7 }, (_, i) => x0 + 18 + i * 17);
  return (
    <g className={side === "l" ? "kkk-door-l" : "kkk-door-r"}>
      <clipPath id={`kkk-door-${side}`}>
        <path d={doorHalf(side)} />
      </clipPath>
      <path d={doorHalf(side)} fill={C.rose} />
      <g clipPath={`url(#kkk-door-${side})`}>
        {planks.map((x) => (
          <line key={x} x1={x} x2={x} y1={460} y2={650} stroke={C.roseDeep} strokeWidth={3} />
        ))}
        <rect x={x0} y={648} width={125} height={6} fill={C.roseDeep} />
        {[664, 712, 760].map((y) => (
          <g key={y}>
            <rect x={x0 + 14} y={y} width={97} height={38} rx={3} fill="none" stroke={C.roseDeep} strokeWidth={3} />
            <MarigoldUse x={x0 + 40} y={y + 19} r={8} variant="sun" />
            <MarigoldUse x={x0 + 85} y={y + 19} r={8} variant="sun" />
          </g>
        ))}
      </g>
      <path d={doorHalf(side)} fill="none" stroke={C.ink} strokeWidth={4} />
    </g>
  );
}

function Interior() {
  return (
    <g>
      <clipPath id="kkk-door-clip">
        <path d={doorPath} />
      </clipPath>
      <g clipPath="url(#kkk-door-clip)">
        <rect x={660} y={440} width={280} height={380} fill={C.cream} />
        <g className="kkk-inner-rays" style={{ transformOrigin: "800px 700px", transformBox: "view-box" }}>
          <SunRays cx={800} cy={700} r1={20} r2={420} n={18} color={C.sunLight} spread={0.6} />
        </g>
        <g className="kkk-imambara">
          <rect x={712} y={598} width={14} height={140} fill={C.teal} />
          <rect x={874} y={598} width={14} height={140} fill={C.teal} />
          <OnionDome cx={719} baseY={600} w={22} color={C.teal} finial={C.teal} />
          <OnionDome cx={881} baseY={600} w={22} color={C.teal} finial={C.teal} />
          <OnionDome cx={800} baseY={668} w={104} color={C.teal} finial={C.teal} />
          <OnionDome cx={752} baseY={690} w={34} color={C.teal} finial={C.teal} />
          <OnionDome cx={848} baseY={690} w={34} color={C.teal} finial={C.teal} />
          <rect x={734} y={668} width={132} height={70} fill={C.teal} />
          <rect x={690} y={690} width={220} height={50} fill={C.teal} />
          <rect x={660} y={736} width={280} height={70} fill="url(#kkk-floor-fade)" />
        </g>
      </g>
      <linearGradient id="kkk-floor-fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={C.cream} stopOpacity={0} />
        <stop offset="0.6" stopColor={C.cream} stopOpacity={1} />
      </linearGradient>
    </g>
  );
}

function Wing({ mirror }: { mirror?: boolean }) {
  // Drawn for the left side, mirrored for the right.
  return (
    <g transform={mirror ? "translate(1600 0) scale(-1 1)" : undefined}>
      {/* main wing body */}
      <rect x={190} y={575} width={360} height={225} fill={C.cream} />
      <rect x={182} y={560} width={376} height={18} fill={C.sand} />
      {[230, 300, 370, 440, 510].map((x) => (
        <OnionDome key={x} cx={x} baseY={560} w={44} />
      ))}
      {[220, 288, 356, 424, 492].map((x) => (
        <JaaliPanel key={x} x={x} y={592} w={50} h={46} />
      ))}
      <rect x={190} y={652} width={360} height={10} fill={C.sand} />
      {[290, 446].map((x) => (
        <g key={x}>
          <rect x={x - 68} y={672} width={136} height={128} fill="none" stroke={C.sand} strokeWidth={4} />
          <path d={scallopArchPath(x, 800, 96, 116, 3)} fill={C.ink} />
        </g>
      ))}
      {/* end tower */}
      <rect x={70} y={530} width={130} height={270} fill={C.cream} />
      <rect x={62} y={520} width={146} height={16} fill={C.sand} />
      <rect x={62} y={650} width={146} height={12} fill={C.sand} />
      {[98, 135, 172].map((x) => (
        <path key={x} d={pointedArchPath(x, 632, 22, 64)} fill={C.ink} />
      ))}
      {[105, 165].map((x) => (
        <path key={x} d={pointedArchPath(x, 760, 26, 78)} fill={C.ink} />
      ))}
      <path d={scallopArchPath(135, 800, 40, 52, 2)} fill={C.ink} />
      <rect x={52} y={790} width={166} height={12} fill={C.sand} />
      <Chhatri cx={135} baseY={520} w={92} />
      {/* minaret beside the central block */}
      <rect x={532} y={330} width={30} height={470} fill={C.cream} stroke={C.sand} strokeWidth={3} />
      <rect x={526} y={420} width={42} height={10} fill={C.sand} />
      <rect x={526} y={560} width={42} height={10} fill={C.sand} />
      <OnionDome cx={547} baseY={330} w={38} />
    </g>
  );
}

function crestY(x: number) {
  // Outline of the central pishtaq crest (pointed arch, w 520, h 640, base 800).
  const w = 520;
  const R = w * 0.8;
  const rise = Math.sqrt(w * R - (w * w) / 4);
  const springY = 800 - (640 - rise);
  const lc = 800 - w / 2 + R;
  const dx = Math.min(x, 1600 - x) - lc;
  return springY - Math.sqrt(R * R - dx * dx);
}

function CentralBlock() {
  const turrets = [618, 690, 910, 982];
  return (
    <g>
      {/* crest turrets sit on the pointed outline */}
      {turrets.map((x) => (
        <Turret key={x} cx={x} baseY={crestY(x) + 10} w={48} />
      ))}
      <Chhatri cx={800} baseY={176} w={86} />
      <path d={pointedArchPath(800, 800, 520, 640)} fill={C.cream} stroke={C.sandDeep} strokeWidth={4} />
      <path d={pointedArchPath(800, 800, 470, 590)} fill={C.sand} />
      <path d={pointedArchPath(800, 800, 440, 565)} fill={C.cream} />
      {/* ink band and scalloped field */}
      <path d={pointedArchPath(800, 800, 400, 530)} fill={C.ink} />
      <path d={pointedArchPath(800, 800, 372, 505)} fill={C.cream} />
      <path d={scallopArchPath(800, 800, 332, 470, 4)} fill={C.ink} />
      {/* Emblem sits wholly inside the black field: fish span y 345 to 425, frame starts at 456. */}
      <TwinFish x={800} y={382} s={0.85} />
      {/* door frame */}
      <rect x={650} y={456} width={300} height={344} fill={C.cream} />
      <rect x={650} y={456} width={300} height={344} fill="none" stroke={C.sandDeep} strokeWidth={3} />
      {/* piers with jaali */}
      {[548, 1008].map((x) => (
        <g key={x}>
          <JaaliPanel x={x + 6} y={560} w={34} h={34} />
          <JaaliPanel x={x + 6} y={612} w={34} h={84} arch />
          <JaaliPanel x={x + 6} y={712} w={34} h={78} arch />
        </g>
      ))}
    </g>
  );
}

/** Burst of flat light rays behind the facade, fanning out above the roofline as the doors open. */
function Burst() {
  return (
    <g className="kkk-burst" style={{ transformOrigin: "800px 650px", transformBox: "view-box" }}>
      <SunRays cx={800} cy={650} r1={90} r2={1300} n={22} color={C.cream} spread={0.55} />
    </g>
  );
}

function Particles() {
  const rand = rng(2018);
  const palette = [C.marigold, C.rose, C.teal, C.sun, C.cream, C.marigold];
  const items = Array.from({ length: 34 }, (_, i) => {
    const a = -Math.PI / 2 + (rand() - 0.5) * Math.PI * 1.7;
    const dist = 220 + rand() * 520;
    const tx = Math.round(Math.cos(a) * dist * 1.3);
    const ty = Math.round(Math.sin(a) * dist * 0.75 + 60);
    const rot = Math.round((rand() - 0.5) * 540);
    const kind = i % 4;
    const color = palette[i % palette.length];
    const shape =
      kind === 0 ? <Petal x={0} y={0} s={1.1} color={color === C.cream ? C.marigold : color} /> :
      kind === 1 ? <Star x={0} y={0} r={11} color={C.cream} /> :
      kind === 2 ? <rect x={-6} y={-3} width={12} height={6} fill={color} /> :
      <Star5 x={0} y={0} r={8} color={color === C.sun ? C.rose : color} />;
    return (
      <g key={i} className="kkk-particle" data-tx={tx} data-ty={ty} data-rot={rot} transform="translate(800 690)">
        {shape}
      </g>
    );
  });
  return <g>{items}</g>;
}

export function GateLayer() {
  return (
    <svg {...svgProps}>
      <Burst />
      {/* Flat offset silhouette instead of a filter: same paper-cut depth, far cheaper to paint. */}
      <g transform="translate(0 7)" opacity={0.16}>
        <rect x={52} y={520} width={1496} height={290} fill="#8A5300" />
      </g>
      <Wing />
      <Wing mirror />
      <CentralBlock />
      <Interior />
      <Door side="l" />
      <Door side="r" />
      <Particles />
    </svg>
  );
}

/* ---------------- Foreground ---------------- */

export function ForegroundLayer() {
  const vp = { x: 800, y: 600 };
  const rows = [810, 826, 848, 878, 918, 968];
  const cols = Array.from({ length: 21 }, (_, i) => (i - 10) * 150);
  const flowers: [number, number, number][] = [
    [560, 846, 11], [1040, 846, 11], [700, 822, 9], [900, 822, 9], [330, 900, 13], [1270, 900, 13],
    [470, 960, 15], [1130, 960, 15], [180, 840, 10], [1420, 840, 10], [760, 930, 12], [840, 976, 13],
  ];
  return (
    <svg {...svgProps}>
      <clipPath id="kkk-floor">
        <rect x={0} y={800} width={1600} height={200} />
      </clipPath>
      <rect x={0} y={800} width={1600} height={200} fill={C.cream} />
      <g clipPath="url(#kkk-floor)">
        <path d={`M0 ${rows[2]} H1600 V${rows[3]} H0 Z`} fill={C.teal} opacity={0.18} />
        <path d={`M0 ${rows[4]} H1600 V${rows[4] + 10} H0 Z`} fill={C.teal} />
        {rows.map((y) => (
          <line key={y} x1={0} x2={1600} y1={y} y2={y} stroke={C.teal} strokeWidth={2.5} />
        ))}
        {cols.map((dx) => (
          <line key={dx} x1={vp.x} y1={vp.y} x2={vp.x + dx * 3.2} y2={1000 + 400} stroke={C.teal} strokeWidth={dx === 0 ? 0 : 2.5} />
        ))}
      </g>
      {flowers.map(([x, y, r]) => (
        <MarigoldUse key={`${x}-${y}`} x={x} y={y} r={r} />
      ))}
      <Diya x={620} y={900} s={0.8} />
      <Diya x={980} y={900} s={0.8} />
      <Diya x={250} y={950} s={0.95} />
      <Diya x={1350} y={950} s={0.95} />
    </svg>
  );
}

/* ---------------- Bunting ---------------- */

export function BuntingLayer() {
  return (
    <svg {...svgProps}>
      <Bunting from={[600, -10]} to={[-20, 220]} sag={70} count={11} />
      <Bunting from={[360, -10]} to={[-20, 110]} sag={40} count={7} colors={[C.marigold, C.rose, C.teal]} />
      <Bunting from={[1000, -10]} to={[1620, 220]} sag={70} count={11} colors={[C.teal, C.rose, C.marigold]} />
      <Bunting from={[1240, -10]} to={[1620, 110]} sag={40} count={7} colors={[C.rose, C.teal, C.marigold]} />
    </svg>
  );
}
