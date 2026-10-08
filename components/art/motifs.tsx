// Reusable hand-built SVG motifs. Each returns SVG elements to place inside an <svg>.
// Art direction comes from Assets/main-design; every shape here is drawn from scratch.

import type { ReactNode } from "react";

export const C = {
  sun: "#FFC918",
  sunDeep: "#F5B400",
  sunLight: "#FFDB5C",
  cream: "#FFF6DC",
  sand: "#EFD9A7",
  sandDeep: "#E2C384",
  ink: "#111111",
  marigold: "#FF8A00",
  rose: "#FF5D8F",
  roseDeep: "#E8457A",
  roseLight: "#FFB3C9",
  teal: "#1FA6A0",
  tealDeep: "#14807B",
};

const r1 = (n: number) => Math.round(n * 10) / 10;

/* ---------- Geometry helpers ---------- */

/** Points along a pointed (two-centred) arch, left springing to apex to right springing. */
function pointedArchPoints(cx: number, springY: number, w: number, steps: number) {
  const R = w * 0.8;
  const lc = cx - w / 2 + R; // centre of the left arc
  const thetaApex = Math.acos((cx - lc) / R);
  const left: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = Math.PI - (Math.PI - thetaApex) * (i / steps);
    left.push([lc + R * Math.cos(t), springY - R * Math.sin(t)]);
  }
  const right = left
    .slice(0, -1)
    .reverse()
    .map(([x, y]) => [2 * cx - x, y] as [number, number]);
  return { pts: [...left, ...right], rise: Math.sqrt(w * R - (w * w) / 4), R };
}

/** Plain pointed arch opening. baseY is the floor, h the full height. */
export function pointedArchPath(cx: number, baseY: number, w: number, h: number) {
  const R = w * 0.8;
  const rise = Math.sqrt(w * R - (w * w) / 4);
  const springY = baseY - (h - rise);
  return `M${r1(cx - w / 2)} ${r1(baseY)} L${r1(cx - w / 2)} ${r1(springY)} A${r1(R)} ${r1(R)} 0 0 1 ${r1(cx)} ${r1(springY - rise)} A${r1(R)} ${r1(R)} 0 0 1 ${r1(cx + w / 2)} ${r1(springY)} L${r1(cx + w / 2)} ${r1(baseY)} Z`;
}

/** Scalloped (cusped) Awadhi arch opening. Lobes bulge outward, cusps point inward. */
export function scallopArchPath(cx: number, baseY: number, w: number, h: number, lobesPerSide = 4) {
  const { pts, rise } = pointedArchPoints(cx, 0, w, lobesPerSide);
  const springY = baseY - (h - rise);
  const p = pts.map(([x, y]) => [x, y + springY] as [number, number]);
  let d = `M${r1(cx - w / 2)} ${r1(baseY)} L${r1(p[0][0])} ${r1(p[0][1])}`;
  for (let i = 1; i < p.length; i++) {
    const [ax, ay] = p[i - 1];
    const [bx, by] = p[i];
    const rr = Math.hypot(bx - ax, by - ay) * 0.56;
    d += ` A${r1(rr)} ${r1(rr)} 0 0 1 ${r1(bx)} ${r1(by)}`;
  }
  d += ` L${r1(cx + w / 2)} ${r1(baseY)} Z`;
  return d;
}

/** Row of scallops along a horizontal edge, used by dividers. */
export function scallopEdgePath(width: number, height: number, count: number, depth: number) {
  const step = width / count;
  let d = `M0 ${height} L0 ${depth}`;
  for (let i = 0; i < count; i++) {
    d += ` A${r1(step / 2)} ${r1(depth)} 0 0 1 ${r1((i + 1) * step)} ${depth}`;
  }
  return d + ` L${width} ${height} Z`;
}

/** Point on a quadratic curve. */
function quad(t: number, a: [number, number], c: [number, number], b: [number, number]): [number, number] {
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
}

/* ---------- Motifs ---------- */

type XY = { x: number; y: number };

export function OnionDome({ cx, baseY, w, color = C.teal, finial = C.marigold }: { cx: number; baseY: number; w: number; color?: string; finial?: string }) {
  const h = w * 0.95;
  const d = `M${cx - w / 2} ${baseY} C${cx - w / 2} ${baseY - h * 0.62} ${cx - w * 0.1} ${baseY - h * 0.7} ${cx} ${baseY - h} C${cx + w * 0.1} ${baseY - h * 0.7} ${cx + w / 2} ${baseY - h * 0.62} ${cx + w / 2} ${baseY} Z`;
  return (
    <g>
      <path d={d} fill={color} />
      <path d={`M${cx - w * 0.28} ${baseY - h * 0.18} C${cx - w * 0.26} ${baseY - h * 0.5} ${cx - w * 0.1} ${baseY - h * 0.62} ${cx - w * 0.04} ${baseY - h * 0.78}`} stroke={C.cream} strokeOpacity={0.35} strokeWidth={w * 0.06} fill="none" strokeLinecap="round" />
      <rect x={cx - w * 0.58} y={baseY - 1} width={w * 1.16} height={w * 0.1} rx={w * 0.03} fill={finial} />
      <line x1={cx} y1={baseY - h} x2={cx} y2={baseY - h - w * 0.32} stroke={finial} strokeWidth={Math.max(2, w * 0.06)} strokeLinecap="round" />
      <circle cx={cx} cy={baseY - h - w * 0.12} r={w * 0.07} fill={finial} />
    </g>
  );
}

/** Chhatri: domed pavilion with pillars and arched openings. */
export function Chhatri({ cx, baseY, w, dome = C.teal }: { cx: number; baseY: number; w: number; dome?: string }) {
  const bodyH = w * 0.85;
  const topY = baseY - bodyH;
  return (
    <g>
      <rect x={cx - w / 2} y={topY} width={w} height={bodyH} fill={C.cream} />
      <rect x={cx - w / 2 - w * 0.08} y={topY - w * 0.1} width={w * 1.16} height={w * 0.12} fill={C.sand} />
      <rect x={cx - w / 2 - w * 0.06} y={baseY - w * 0.08} width={w * 1.12} height={w * 0.1} fill={C.sand} />
      <path d={pointedArchPath(cx - w * 0.22, baseY - w * 0.1, w * 0.26, bodyH * 0.62)} fill={C.ink} />
      <path d={pointedArchPath(cx + w * 0.22, baseY - w * 0.1, w * 0.26, bodyH * 0.62)} fill={C.ink} />
      <OnionDome cx={cx} baseY={topY - w * 0.1} w={w * 0.9} color={dome} />
    </g>
  );
}

/** Small turret with a dome, used along parapets. */
export function Turret({ cx, baseY, w }: { cx: number; baseY: number; w: number }) {
  return (
    <g>
      <rect x={cx - w * 0.36} y={baseY - w * 0.5} width={w * 0.72} height={w * 0.5} fill={C.cream} />
      <path d={pointedArchPath(cx, baseY, w * 0.3, w * 0.38)} fill={C.ink} />
      <OnionDome cx={cx} baseY={baseY - w * 0.5} w={w * 0.8} />
    </g>
  );
}

export function JaaliPanel({ x, y, w, h, arch = false, fill = "url(#kkk-jaali)" }: { x: number; y: number; w: number; h: number; arch?: boolean; fill?: string }) {
  const d = arch ? pointedArchPath(x + w / 2, y + h, w, h) : `M${x} ${y} h${w} v${h} h${-w} Z`;
  return (
    <g>
      <path d={d} fill={fill} stroke={C.marigold} strokeWidth={3} />
    </g>
  );
}

/** Twin-fish emblem of Awadh: two fish facing each other, heads up. */
export function TwinFish({ x, y, s = 1, fill = C.sun }: XY & { s?: number; fill?: string }) {
  const fish = (
    <g>
      <path d="M0 -44 C22 -38 26 -6 12 18 C7 27 3 31 -1 35 C-12 16 -15 -22 0 -44 Z" fill={fill} stroke={C.ink} strokeWidth={2.5} />
      <path d="M-1 35 L12 50 L-15 47 Z" fill={fill} stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M3 -18 C9 -12 10 -4 7 4" stroke={C.ink} strokeWidth={2} fill="none" strokeLinecap="round" />
      <circle cx={5} cy={-32} r={3.2} fill={C.ink} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform="translate(-16 0) rotate(-14)">{fish}</g>
      <g transform="translate(16 0) scale(-1 1) rotate(-14)">{fish}</g>
    </g>
  );
}

export function Marigold({ x, y, r = 12, outer = C.marigold, inner = C.sun }: XY & { r?: number; outer?: string; inner?: string }) {
  const petals = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return <circle key={i} cx={r1(x + Math.cos(a) * r * 0.62)} cy={r1(y + Math.sin(a) * r * 0.62)} r={r * 0.42} fill={outer} />;
  });
  return (
    <g>
      {petals}
      <circle cx={x} cy={y} r={r * 0.55} fill={inner} />
      <circle cx={x} cy={y} r={r * 0.22} fill={C.marigold} />
    </g>
  );
}

/** Marigold drawn from a shared <symbol> (see SvgDefs). Use for repeated flowers to keep the DOM small. */
export function MarigoldUse({ x, y, r = 12, variant = "orange" }: XY & { r?: number; variant?: "orange" | "rose" | "sun" }) {
  const id = variant === "rose" ? "kkk-mg-rose" : variant === "sun" ? "kkk-mg-sun" : "kkk-mg";
  return <use href={`#${id}`} x={x - r} y={y - r} width={r * 2} height={r * 2} />;
}

export function Diya({ x, y, s = 1 }: XY & { s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -40 C10 -26 11 -16 0 -8 C-11 -16 -10 -26 0 -40 Z" fill={C.marigold} />
      <path d="M0 -30 C5 -22 5 -16 0 -11 C-5 -16 -5 -22 0 -30 Z" fill={C.sun} />
      <path d="M-30 -8 Q0 -2 30 -8 Q26 14 0 16 Q-26 14 -30 -8 Z" fill="#C8741E" />
      <path d="M-30 -8 Q0 -2 30 -8" stroke="#8E4E12" strokeWidth={2.5} fill="none" />
    </g>
  );
}

/** Bunting string with triangular flags along a quadratic sag. Static: sway the wrapping HTML layer instead. */
export function Bunting({ from, to, sag = 60, count = 10, size = 34, colors = [C.rose, C.teal, C.marigold] }: { from: [number, number]; to: [number, number]; sag?: number; count?: number; size?: number; colors?: string[] }) {
  const ctrl: [number, number] = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2 + sag];
  const flags = Array.from({ length: count }, (_, i) => {
    const t = (i + 0.5) / count;
    const [px, py] = quad(t, from, ctrl, to);
    const half = size * 0.48;
    return (
      <path key={i} d={`M${r1(px - half)} ${r1(py)} L${r1(px + half)} ${r1(py)} L${r1(px)} ${r1(py + size)} Z`} fill={colors[i % colors.length]} />
    );
  });
  return (
    <g>
      <path d={`M${from[0]} ${from[1]} Q${ctrl[0]} ${ctrl[1]} ${to[0]} ${to[1]}`} stroke={C.ink} strokeWidth={2.5} fill="none" />
      {flags}
    </g>
  );
}

export function Lantern({ x, y, string = 40, color = C.rose, w = 42, delay = 0 }: XY & { string?: number; color?: string; w?: number; delay?: number }) {
  const h = w * 1.15;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="kkk-sway" style={{ animationDelay: `${delay}s` }}>
        <line x1={0} y1={0} x2={0} y2={string} stroke={C.ink} strokeWidth={2} />
        <rect x={-w * 0.3} y={string} width={w * 0.6} height={w * 0.14} rx={2} fill={C.ink} />
        <rect x={-w / 2} y={string + w * 0.12} width={w} height={h} rx={w * 0.42} fill={color} />
        {[0.3, 0.5, 0.7].map((f) => (
          <line key={f} x1={-w / 2 + 3} x2={w / 2 - 3} y1={string + w * 0.12 + h * f} y2={string + w * 0.12 + h * f} stroke={C.ink} strokeOpacity={0.35} strokeWidth={2} />
        ))}
        <rect x={-w * 0.3} y={string + w * 0.1 + h} width={w * 0.6} height={w * 0.14} rx={2} fill={C.ink} />
        <line x1={0} y1={string + w * 0.24 + h} x2={0} y2={string + w * 0.62 + h} stroke={C.marigold} strokeWidth={3} strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Flat paper-cut cloud: a back layer offset behind a front layer. */
export function Cloud({ x, y, s = 1, front = C.cream, back = C.roseLight }: XY & { s?: number; front?: string; back?: string }) {
  const d = "M-120 0 A36 36 0 0 1 -70 -36 A54 54 0 0 1 12 -62 A44 44 0 0 1 82 -30 A30 30 0 0 1 120 0 Z";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={d} fill={back} transform="translate(18 -14)" />
      <path d={d} fill={front} />
    </g>
  );
}

export function Bird({ x, y, s = 1, color = C.ink }: XY & { s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-12 0 Q-6 -7 0 0 Q6 -7 12 0" stroke={color} strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** Folk bird used in the pen scene: round body, wing, tail. */
export function SongBird({ x, y, s = 1, color = C.rose, flip = false }: XY & { s?: number; color?: string; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M-18 4 L-34 -8 L-30 10 Z" fill={color} />
      <ellipse cx={0} cy={2} rx={20} ry={14} fill={color} />
      <circle cx={16} cy={-8} r={10} fill={color} />
      <path d="M25 -9 L33 -6 L25 -3 Z" fill={C.marigold} />
      <circle cx={18} cy={-10} r={1.8} fill={C.ink} />
      <path d="M-8 -2 Q2 -20 12 -2 Z" fill={C.cream} opacity={0.6} />
    </g>
  );
}

/** Flat sun rays: n wedges around a centre. */
export function SunRays({ cx, cy, r1: inner, r2, n = 24, color, spread = 0.5 }: { cx: number; cy: number; r1: number; r2: number; n?: number; color: string; spread?: number }) {
  const wedges = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const da = (Math.PI / n) * spread;
    const p = (ang: number, r: number) => `${r1(cx + Math.cos(ang) * r)} ${r1(cy + Math.sin(ang) * r)}`;
    return <path key={i} d={`M${p(a - da * 0.25, inner)} L${p(a - da, r2)} L${p(a + da, r2)} L${p(a + da * 0.25, inner)} Z`} fill={color} />;
  });
  return <g>{wedges}</g>;
}

export function Petal({ x, y, rot = 0, s = 1, color = C.marigold }: XY & { rot?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 -12 C8 -6 8 6 0 12 C-8 6 -8 -6 0 -12 Z" fill={color} />
    </g>
  );
}

/** Four-point sparkle star. */
export function Star({ x, y, r = 10, color = C.cream, rot = 0 }: XY & { r?: number; color?: string; rot?: number }) {
  const k = r * 0.28;
  return <path transform={`translate(${x} ${y}) rotate(${rot})`} d={`M0 ${-r} Q${k} ${-k} ${r} 0 Q${k} ${k} 0 ${r} Q${-k} ${k} ${-r} 0 Q${-k} ${-k} 0 ${-r} Z`} fill={color} />;
}

/** Five-point star. */
export function Star5({ x, y, r = 10, color = C.marigold, rot = 0 }: XY & { r?: number; color?: string; rot?: number }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${r1(Math.cos(a) * rr)},${r1(Math.sin(a) * rr)}`;
  }).join(" ");
  return <polygon transform={`translate(${x} ${y}) rotate(${rot})`} points={pts} fill={color} />;
}

export function Moon({ x, y, r = 18, color = C.sun, rot = 0 }: XY & { r?: number; color?: string; rot?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) rotate(${rot})`}
      d={`M${r * 0.2} ${-r} A${r} ${r} 0 1 0 ${r * 0.2} ${r} A${r * 0.78} ${r * 0.78} 0 1 1 ${r * 0.2} ${-r} Z`}
      fill={color}
    />
  );
}

export function SpeechBubble({ x, y, w = 70, h = 40, color = C.teal, flip = false }: XY & { w?: number; h?: number; color?: string; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={color} />
      <path d={`M${-w * 0.15} ${h / 2 - 2} L${-w * 0.28} ${h / 2 + 14} L${-w * 0.02} ${h / 2 - 2} Z`} fill={color} />
    </g>
  );
}

export function MusicNote({ x, y, s = 1, color = C.ink, double = true }: XY & { s?: number; color?: string; double?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color}>
      <ellipse cx={-10} cy={14} rx={8} ry={6} transform="rotate(-20 -10 14)" />
      <rect x={-4} y={-22} width={3.5} height={36} />
      {double ? (
        <>
          <ellipse cx={18} cy={8} rx={8} ry={6} transform="rotate(-20 18 8)" />
          <rect x={24} y={-28} width={3.5} height={36} />
          <path d="M-4 -22 L27.5 -28 L27.5 -20 L-4 -14 Z" />
        </>
      ) : (
        <path d="M-1 -22 C10 -18 14 -10 10 -2 C10 -10 4 -14 -1 -14 Z" />
      )}
    </g>
  );
}

/** Fountain pen drawn horizontally, nib pointing right. Rotate it with the wrapping <g>. */
export function FountainPen({ length = 420 }: { length?: number }) {
  const L = length;
  const t = L * 0.12; // barrel thickness
  return (
    <g>
      <rect x={0} y={-t / 2} width={L * 0.55} height={t} rx={t / 2} fill={C.tealDeep} />
      <rect x={L * 0.08} y={-t / 2} width={L * 0.03} height={t} fill={C.sun} />
      <rect x={L * 0.52} y={-t / 2 - 2} width={L * 0.05} height={t + 4} rx={3} fill={C.sun} />
      <path d={`M${L * 0.57} ${-t * 0.46} L${L * 0.72} ${-t * 0.38} L${L * 0.72} ${t * 0.38} L${L * 0.57} ${t * 0.46} Z`} fill={C.ink} />
      <path d={`M${L * 0.72} ${-t * 0.4} C${L * 0.85} ${-t * 0.4} ${L * 0.95} ${-t * 0.12} ${L} 0 C${L * 0.95} ${t * 0.12} ${L * 0.85} ${t * 0.4} ${L * 0.72} ${t * 0.4} Z`} fill={C.sun} stroke={C.sunDeep} strokeWidth={2} />
      <line x1={L * 0.8} y1={0} x2={L * 0.99} y2={0} stroke={C.ink} strokeWidth={2} />
      <circle cx={L * 0.8} cy={0} r={t * 0.09} fill={C.ink} />
      <rect x={L * 0.12} y={-t / 2 - 6} width={L * 0.3} height={6} rx={3} fill={C.sun} />
    </g>
  );
}

export function MapPin({ x, y, s = 1, color = C.marigold, hole = C.cream }: XY & { s?: number; color?: string; hole?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 C-10 -18 -34 -40 -34 -66 A34 34 0 0 1 34 -66 C34 -40 10 -18 0 0 Z" fill={color} stroke={C.ink} strokeWidth={2.5} />
      <circle cx={0} cy={-66} r={13} fill={hole} stroke={C.ink} strokeWidth={2.5} />
    </g>
  );
}

export function Tree({ x, y, s = 1, canopy = C.teal, trunk = C.ink, dots = false }: XY & { s?: number; canopy?: string; trunk?: string; dots?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={-120} r={62} fill={canopy} filter="url(#kkk-paper)" />
      {dots ? <circle cx={0} cy={-120} r={62} fill="url(#kkk-dots)" /> : null}
      <path d="M-4 0 L-3 -110 M0 -60 L-26 -96 M0 -80 L24 -112 M-2 -100 L-14 -126" stroke={trunk} strokeWidth={6} strokeLinecap="round" fill="none" />
    </g>
  );
}

/** Generic paper layer wrapper so motifs get the shared soft paper shadow. */
export function Paper({ children }: { children: ReactNode }) {
  return <g filter="url(#kkk-paper)">{children}</g>;
}
