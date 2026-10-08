// Section dividers. Each sits on the top edge of the section below and reaches up into the one above.
// Every break on the page uses a different kind, so no divider repeats back to back.
// Edges are drawn on a 4800-wide canvas with "xMidYMax slice": shapes keep their proportions at any
// width, and the top is never cropped on screens narrower than about 4000px.

import { C, Bunting, MarigoldUse, scallopEdgePath } from "./motifs";

type Props = { fill: string };

const W = 4800;
const wrap = "pointer-events-none absolute inset-x-0 top-0 z-[3] -translate-y-[calc(100%-2px)]";
// overflow visible: trims and scallop tops may rise above the box into the section above, never cut flat.
const svg = { preserveAspectRatio: "xMidYMax slice", overflow: "visible", "aria-hidden": true, focusable: false } as const;

/** Scalloped arch edge with a marigold trim. */
export function ScallopDivider({ fill }: Props) {
  return (
    <div aria-hidden="true" className={wrap}>
      <svg {...svg} viewBox={`0 0 ${W} 70`} className="block h-[34px] w-full md:h-[56px]">
        <path d={scallopEdgePath(W, 70, 66, 34)} fill={C.marigold} transform="translate(0 -10)" />
        <path d={scallopEdgePath(W, 70, 66, 34)} fill={fill} />
      </svg>
    </div>
  );
}

/** Bunting strung over soft scallops of the next section's colour. */
export function BuntingDivider({ fill }: Props) {
  const swags = 6;
  const sw = W / swags;
  return (
    <div aria-hidden="true" className={wrap}>
      <svg {...svg} viewBox={`0 0 ${W} 120`} className="block h-[80px] w-full md:h-[120px]">
        <path d={scallopEdgePath(W, 120, 24, 66)} fill={fill} />
        {Array.from({ length: swags }, (_, i) => (
          <Bunting key={i} from={[i * sw - 20, 24]} to={[(i + 1) * sw + 20, 24]} sag={50} count={12} size={36} colors={i % 2 ? [C.marigold, C.teal, C.rose] : [C.rose, C.teal, C.marigold]} />
        ))}
      </svg>
    </div>
  );
}

/** Teal jaali strip with a scalloped top. */
export function JaaliDivider({ fill }: Props) {
  return (
    <div aria-hidden="true" className={wrap}>
      <svg {...svg} viewBox={`0 0 ${W} 64`} className="block h-[44px] w-full md:h-[64px]">
        <rect y={14} width={W} height={50} fill="url(#kkk-jaali-teal)" />
        <path d={scallopEdgePath(W, 22, 120, 10)} fill={C.teal} transform="translate(0 -6)" />
        <rect y={52} width={W} height={12} fill={fill} />
      </svg>
    </div>
  );
}

/** Torn paper edge, two layers. */
export function TornDivider({ fill }: Props) {
  const tear = (seed: number, base: number, amp: number) =>
    Array.from({ length: W / 25 + 1 }, (_, i) => `${i * 25},${Math.round(base + (((i * seed) % 13) / 13) * amp + (i % 2) * 6)}`).join(" ");
  return (
    <div aria-hidden="true" className={wrap}>
      <svg {...svg} viewBox={`0 0 ${W} 60`} className="block h-[36px] w-full md:h-[52px]">
        <polygon points={`0,60 ${tear(104729, 8, 22)} ${W},60`} fill={C.cream} />
        <polygon points={`0,60 ${tear(7919, 18, 22)} ${W},60`} fill={fill} />
      </svg>
    </div>
  );
}

/** Marigold garland (toran). The fill rises through the flower centres, so the garland is the seam. */
export function ToranDivider({ fill }: Props) {
  const swags = 24;
  const w = W / swags;
  const flowers: [number, number][] = [];
  for (let s = 0; s < swags; s++) {
    for (let k = 0; k < 8; k++) {
      const t = k / 8;
      flowers.push([Math.round(s * w + t * w), Math.round(22 + 4 * 34 * t * (1 - t))]);
    }
  }
  const edge = Array.from({ length: swags }, (_, s) => `Q${s * w + w / 2} 90 ${(s + 1) * w} 22`).join(" ");
  return (
    <div aria-hidden="true" className={wrap}>
      <svg {...svg} viewBox={`0 0 ${W} 110`} className="block h-[72px] w-full md:h-[110px]">
        <path d={`M0 22 ${edge} L${W} 110 L0 110 Z`} fill={fill} />
        {flowers.map(([x, y], i) => (
          <MarigoldUse key={i} x={x} y={y} r={11} variant={i % 8 === 0 ? "sun" : i % 3 === 0 ? "rose" : "orange"} />
        ))}
      </svg>
    </div>
  );
}

/** Layered paper waves. */
export function WavesDivider({ fill }: Props) {
  const wave = (amp: number, phase: number, base: number) => {
    let d = `M0 ${base}`;
    for (let x = 0; x < W; x += 100) d += ` Q${x + 50} ${base + ((x / 100 + phase) % 2 ? amp : -amp)} ${x + 100} ${base}`;
    return d + ` L${W} 120 L0 120 Z`;
  };
  return (
    <div aria-hidden="true" className={wrap}>
      <svg {...svg} viewBox={`0 0 ${W} 120`} className="block h-[64px] w-full md:h-[96px]">
        <path d={wave(14, 0, 34)} fill={C.rose} />
        <path d={wave(12, 1, 58)} fill={C.teal} />
        <path d={wave(10, 0, 82)} fill={C.cream} />
        <path d={wave(10, 1, 102)} fill={fill} />
      </svg>
    </div>
  );
}
