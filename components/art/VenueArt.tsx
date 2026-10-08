// Date and Venue illustrations: a paper calendar page and a park map with a big pin.

import { venue } from "@/lib/copy";
import { C, Bird, Cloud, Marigold, Star5 } from "./motifs";

/** October 2026 starts on a Thursday. The festival days are circled. */
export function CalendarArt() {
  const firstCol = 4;
  const cells = Array.from({ length: 31 }, (_, i) => {
    const n = i + 1;
    const pos = firstCol + i;
    return { n, col: pos % 7, row: Math.floor(pos / 7) };
  });
  const cw = 50;
  const ch = 40;
  const ox = 30;
  const oy = 128;
  return (
    <svg viewBox="0 0 410 390" className="h-auto w-full" aria-hidden="true" focusable="false">
      <g filter="url(#kkk-paper-lg)">
        <rect x={14} y={30} width={382} height={350} rx={18} fill={C.marigold} transform="rotate(2 205 205)" />
        <rect x={10} y={24} width={384} height={350} rx={18} fill={C.cream} />
      </g>
      <rect x={10} y={24} width={384} height={64} rx={18} fill={C.rose} />
      <rect x={10} y={70} width={384} height={18} fill={C.rose} />
      {[90, 160, 240, 310].map((x) => (
        <g key={x}>
          <rect x={x - 5} y={6} width={10} height={36} rx={5} fill={C.ink} />
          <circle cx={x} cy={44} r={6} fill={C.cream} />
        </g>
      ))}
      <text x={202} y={72} textAnchor="middle" fontFamily="var(--font-palanquin-dark)" fontWeight={700} fontSize={26} fill={C.ink}>
        {venue.calendar.month}
      </text>
      {venue.calendar.weekdays.map((d, i) => (
        <text key={i} x={ox + i * cw + cw / 2} y={114} textAnchor="middle" fontFamily="var(--font-palanquin)" fontWeight={700} fontSize={15} fill={C.ink} opacity={0.55}>
          {d}
        </text>
      ))}
      {cells.map(({ n, col, row }) => {
        const x = ox + col * cw + cw / 2;
        const y = oy + row * ch + ch / 2;
        const hot = n === 24 || n === 25;
        return (
          <g key={n}>
            {hot ? <circle cx={x} cy={y - 5} r={19} fill={n === 24 ? C.sun : C.teal} stroke={C.ink} strokeWidth={2.5} /> : null}
            <text x={x} y={y + 1} textAnchor="middle" fontFamily="var(--font-palanquin)" fontWeight={hot ? 700 : 500} fontSize={hot ? 19 : 16} fill={C.ink} opacity={hot ? 1 : 0.7}>
              {n}
            </text>
          </g>
        );
      })}
      <Marigold x={372} y={362} r={20} />
      <Star5 x={36} y={360} r={12} color={C.rose} />
    </svg>
  );
}

export function MapArt() {
  return (
    <svg viewBox="0 0 700 440" className="h-auto w-full" aria-hidden="true" focusable="false">
      <rect width={700} height={440} fill={C.sun} />
      <Cloud x={130} y={86} s={0.6} back={C.roseLight} />
      <Bird x={300} y={70} s={1} />
      <Bird x={330} y={58} s={0.8} />
      {/* road */}
      <path d="M-20 300 L700 210 L700 260 L-20 360 Z" fill={C.cream} />
      {/* river */}
      <path d="M-20 160 C120 130 220 190 330 170 C440 150 470 110 560 120 C640 128 690 160 720 150" stroke={C.teal} strokeWidth={34} fill="none" strokeLinecap="round" />
      <path d="M-20 160 C120 130 220 190 330 170 C440 150 470 110 560 120 C640 128 690 160 720 150" stroke={C.cream} strokeWidth={3} strokeDasharray="10 16" fill="none" opacity={0.7} />
      {/* park island */}
      <g filter="url(#kkk-paper-lg)">
        <path d="M150 300 C150 230 260 210 360 222 C470 236 600 214 640 280 C680 350 600 410 470 410 C350 410 280 430 210 400 C160 380 150 340 150 300 Z" fill={C.cream} />
        <path d="M172 302 C174 246 268 232 360 242 C462 254 586 236 618 286 C648 340 584 390 470 390 C352 390 286 408 222 384 C182 368 172 334 172 302 Z" fill={C.teal} />
      </g>
      {/* mini amphitheatre */}
      <g transform="translate(300 330)">
        {[64, 50, 36].map((r, i) => (
          <path key={r} d={`M${-r} 0 A${r} ${r * 0.62} 0 0 1 ${r} 0`} stroke={i % 2 ? C.teal : C.marigold} strokeWidth={12} fill="none" />
        ))}
        <ellipse cx={0} cy={6} rx={22} ry={9} fill={C.marigold} />
      </g>
      {/* dotted trees */}
      {[[220, 300, C.rose], [252, 286, C.marigold], [560, 300, C.rose], [592, 318, C.marigold], [520, 370, "#FF7A2F"]].map(([x, y, c], i) => (
        <g key={i}>
          <line x1={x as number} y1={y as number} x2={x as number} y2={(y as number) + 30} stroke={C.ink} strokeWidth={4} />
          <circle cx={x as number} cy={y as number} r={18} fill={c as string} />
          <circle cx={x as number} cy={y as number} r={18} fill="url(#kkk-dots)" />
        </g>
      ))}
      {/* the pin */}
      <ellipse cx={440} cy={334} rx={34} ry={10} fill={C.marigold} />
      <g className="kkk-pin-bob">
        <path d="M440 330 C424 300 384 262 384 214 A56 56 0 0 1 496 214 C496 262 456 300 440 330 Z" fill={C.rose} stroke={C.ink} strokeWidth={4} />
        <circle cx={440} cy={214} r={21} fill={C.sun} stroke={C.ink} strokeWidth={4} />
      </g>
    </svg>
  );
}
