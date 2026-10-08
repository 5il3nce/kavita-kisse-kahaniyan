// Spill The Word Fest illustration: park amphitheatre at golden hour with a scalloped arch
// backdrop, a sweeping spotlight, swaying lanterns, bunting, trees, river and a faceless audience.

import { C, Bunting, Lantern, Star, Tree, scallopArchPath } from "./motifs";

const AUD = [C.teal, C.rose, C.marigold, C.sun, C.ink, C.tealDeep, C.roseDeep];
const SKIN = ["#C68642", "#8D5524", "#E0AC69", "#A0663A"];

/** One tier of seated audience heads along a line. */
function AudienceRow({ x1, y1, x2, y2, n, r, seed }: { x1: number; y1: number; x2: number; y2: number; n: number; r: number; seed: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;
        const k = (i * 7 + seed * 3) % AUD.length;
        const backOfHead = (i + seed) % 3 !== 0;
        return (
          <g key={i}>
            <path d={`M${x - r * 1.25} ${y + r * 2.6} C${x - r * 1.25} ${y + r * 0.9} ${x + r * 1.25} ${y + r * 0.9} ${x + r * 1.25} ${y + r * 2.6} Z`} fill={AUD[k]} />
            <circle cx={x} cy={y} r={r} fill={backOfHead ? C.ink : SKIN[(i + seed) % SKIN.length]} />
          </g>
        );
      })}
    </g>
  );
}

// Animated parts (spotlight, audience) live in their own HTML layers so their loops run on the
// compositor instead of repainting the whole scene. All layers share the same viewBox.
const layer = { viewBox: "0 0 1600 900", className: "absolute inset-0 h-full w-full", "aria-hidden": true, focusable: false } as const;

export function AmphitheatreScene() {
  return (
    <div className="relative h-full w-full">
      <svg {...layer}>
        <linearGradient id="kkk-dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.sun} />
          <stop offset="0.75" stopColor="#FFB01F" />
          <stop offset="1" stopColor={C.marigold} />
        </linearGradient>
        <rect width="1600" height="900" fill="url(#kkk-dusk)" />

        {/* sun, hills, river */}
        <circle cx={1060} cy={500} r={110} fill={C.cream} />
        <path d="M0 560 C220 500 420 520 620 556 C820 500 1060 520 1300 548 C1420 530 1520 530 1600 548 L1600 620 L0 620 Z" fill="#FFA21A" />
        <path d="M0 590 C300 570 520 610 800 596 C1080 582 1300 612 1600 590 L1600 650 L0 650 Z" fill={C.teal} />
        <path d="M120 612 C300 604 420 620 560 614" stroke={C.cream} strokeOpacity={0.6} strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M1050 618 C1200 610 1330 624 1480 616" stroke={C.cream} strokeOpacity={0.6} strokeWidth={4} fill="none" strokeLinecap="round" />

        {/* park trees */}
        <Tree x={90} y={560} s={1.7} canopy={C.teal} />
        <Tree x={260} y={600} s={1.3} canopy={C.marigold} dots />
        <Tree x={420} y={620} s={0.95} canopy={C.rose} dots />
        <Tree x={1510} y={560} s={1.7} canopy={C.teal} />
        <Tree x={1340} y={600} s={1.3} canopy="#FF7A2F" dots />
        <Tree x={1180} y={620} s={0.95} canopy={C.rose} dots />

        {/* bunting and lanterns */}
        <Bunting from={[-20, 40]} to={[620, 270]} sag={80} count={13} size={30} colors={[C.rose, C.teal, C.marigold, C.cream]} />
        <Bunting from={[1620, 40]} to={[980, 270]} sag={80} count={13} size={30} colors={[C.teal, C.rose, C.cream, C.marigold]} />
        {[[140, 80, C.marigold], [260, 128, C.rose], [380, 172, C.teal], [500, 212, C.rose]].map(([x, y, c], i) => (
          <Lantern key={`l${i}`} x={x as number} y={(y as number) + 10} string={30 + i * 6} color={c as string} w={36} delay={-i * 0.7} />
        ))}
        {[[1460, 80, C.teal], [1340, 128, C.marigold], [1220, 172, C.rose], [1100, 212, C.marigold]].map(([x, y, c], i) => (
          <Lantern key={`r${i}`} x={x as number} y={(y as number) + 10} string={30 + i * 6} color={c as string} w={36} delay={-i * 0.9 - 0.4} />
        ))}
        <Star x={700} y={200} r={10} color={C.cream} />
        <Star x={900} y={150} r={8} color={C.rose} />
        <Star x={620} y={330} r={7} color={C.teal} />

        {/* scalloped arch backdrop, three paper layers */}
        <g filter="url(#kkk-paper-lg)">
          <path d={scallopArchPath(800, 690, 520, 330, 5)} fill={C.rose} />
          <path d={scallopArchPath(800, 690, 450, 290, 5)} fill="#FF7A2F" />
          <path d={scallopArchPath(800, 690, 380, 250, 5)} fill={C.marigold} />
          <path d={scallopArchPath(800, 690, 310, 210, 5)} fill={C.roseDeep} />
        </g>
      </svg>

      {/* sweeping spotlight, pivoting at (800, 440) */}
      <div className="kkk-sweep absolute inset-0" style={{ transformOrigin: "50% 48.9%" }}>
        <svg {...layer}>
          <path d="M800 440 L700 720 L900 720 Z" fill={C.sunLight} opacity={0.85} />
        </svg>
      </div>

      <svg {...layer}>
        {/* stage */}
        <ellipse cx={800} cy={720} rx={280} ry={46} fill="#E9A23B" />
        <ellipse cx={800} cy={700} rx={280} ry={46} fill={C.cream} />
        <ellipse cx={800} cy={704} rx={70} ry={14} fill={C.sun} opacity={0.9} />
        <line x1={800} y1={704} x2={800} y2={640} stroke={C.ink} strokeWidth={4} />
        <rect x={794} y={624} width={12} height={22} rx={6} fill={C.ink} />

        {/* amphitheatre tiers */}
        <path d="M0 640 L520 760 L520 900 L0 900 Z" fill={C.cream} />
        <path d="M1600 640 L1080 760 L1080 900 L1600 900 Z" fill={C.cream} />
        <path d="M520 760 C640 800 960 800 1080 760 L1080 900 L520 900 Z" fill="#F6C66B" />
        {[0, 1, 2, 3].map((k) => (
          <path key={k} d={`M560 ${790 + k * 28} C680 ${826 + k * 28} 920 ${826 + k * 28} 1040 ${790 + k * 28}`} stroke={C.cream} strokeWidth={5} fill="none" />
        ))}
      </svg>

      {/* audience, bobbing in three groups */}
      <div className="kkk-bob absolute inset-0">
        <svg {...layer}>
          {[0, 1, 2, 3].map((k) => (
            <AudienceRow key={k} x1={20 + k * 10} y1={672 + k * 58} x2={470 - k * 20} y2={772 + k * 50} n={9 + k} r={13 + k * 2.4} seed={k} />
          ))}
        </svg>
      </div>
      <div className="kkk-bob absolute inset-0" style={{ animationDelay: "-1.2s", animationDuration: "3.6s" }}>
        <svg {...layer}>
          {[0, 1, 2, 3].map((k) => (
            <AudienceRow key={k} x1={1130 + k * 20} y1={772 + k * 50} x2={1580 - k * 10} y2={672 + k * 58} n={9 + k} r={13 + k * 2.4} seed={k + 4} />
          ))}
        </svg>
      </div>
      <div className="kkk-bob absolute inset-0" style={{ animationDelay: "-2s", animationDuration: "3.9s" }}>
        <svg {...layer}>
          <AudienceRow x1={600} y1={846} x2={1000} y2={846} n={9} r={17} seed={2} />
        </svg>
      </div>
    </div>
  );
}
