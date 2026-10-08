// About KKK illustration: a large diagonal fountain pen whose yellow ink ribbon turns into
// moons, stars, flowers, speech bubbles, notes and birds.

import { C, Diya, FountainPen, Marigold, Moon, MusicNote, SongBird, SpeechBubble, Star5, scallopArchPath } from "./motifs";

const ribbons = [
  { d: "M352 326 C330 258 382 206 452 228 C540 254 560 322 640 302 C722 282 732 200 684 168", w: 30 },
  { d: "M352 326 C420 332 470 402 560 382 C650 362 694 420 664 470 C644 502 602 492 604 468", w: 22 },
  { d: "M352 326 C362 232 432 160 522 170 C592 178 604 132 642 108", w: 13 },
];

export function PenScene() {
  return (
    <svg viewBox="0 0 800 760" className="h-auto w-full" aria-hidden="true" focusable="false">
      {/* jaali corner */}
      <path d="M30 30 H330 C276 44 236 70 206 104 C166 150 150 200 120 236 C94 266 64 284 30 292 Z" fill="url(#kkk-jaali-teal)" />
      <path d="M30 30 H330 C276 44 236 70 206 104 C166 150 150 200 120 236 C94 266 64 284 30 292 Z" fill="none" stroke={C.teal} strokeWidth={6} />

      {/* layered rose arch */}
      <path d={scallopArchPath(330, 712, 430, 610, 4)} fill={C.roseDeep} transform="translate(12 10)" />
      <path d={scallopArchPath(330, 712, 430, 610, 4)} fill={C.rose} filter="url(#kkk-paper-lg)" />

      {/* ink ribbons, revealed by a scaled clip rect */}
      <clipPath id="kkk-ink-clip">
        <rect className="kkk-ink-wipe" x={330} y={60} width={460} height={500} />
      </clipPath>
      <g clipPath="url(#kkk-ink-clip)">
        {ribbons.map((r) => (
          <path key={r.d} d={r.d} stroke={C.sunDeep} strokeWidth={r.w} fill="none" strokeLinecap="round" transform="translate(3 6)" />
        ))}
        {ribbons.map((r) => (
          <path key={`${r.d}-f`} d={r.d} stroke={C.sun} strokeWidth={r.w} fill="none" strokeLinecap="round" />
        ))}
      </g>

      {/* what the ink becomes */}
      <g>
        <g className="kkk-pop"><Moon x={418} y={176} r={20} color={C.sun} rot={-20} /></g>
        <g className="kkk-pop"><Star5 x={462} y={150} r={10} color={C.marigold} /></g>
        <g className="kkk-pop"><Marigold x={486} y={262} r={18} /></g>
        <g className="kkk-pop"><SpeechBubble x={520} y={110} w={74} h={40} color={C.marigold} /></g>
        <g className="kkk-pop"><Moon x={580} y={70} r={24} color={C.sun} rot={10} /></g>
        <g className="kkk-pop"><Star5 x={636} y={60} r={11} color={C.teal} /></g>
        <g className="kkk-pop"><MusicNote x={700} y={84} s={1} color={C.rose} /></g>
        <g className="kkk-pop"><SongBird x={730} y={150} s={1} color={C.rose} /></g>
        <g className="kkk-pop"><Star5 x={622} y={232} r={14} color={C.marigold} /></g>
        <g className="kkk-pop"><SpeechBubble x={560} y={318} w={66} h={38} color={C.teal} /></g>
        <g className="kkk-pop"><MusicNote x={712} y={290} s={0.9} color={C.ink} double={false} /></g>
        <g className="kkk-pop"><Star5 x={760} y={240} r={12} color={C.sun} /></g>
        <g className="kkk-pop"><Marigold x={726} y={378} r={16} outer={C.rose} inner={C.sun} /></g>
        <g className="kkk-pop"><MusicNote x={510} y={430} s={1} color={C.ink} /></g>
        <g className="kkk-pop"><Moon x={610} y={520} r={20} color={C.sun} rot={30} /></g>
        <g className="kkk-pop"><SpeechBubble x={432} y={476} w={58} h={34} color={C.sun} flip /></g>
        <g className="kkk-pop"><SongBird x={706} y={540} s={0.9} color={C.marigold} flip /></g>
        <g className="kkk-pop"><Star5 x={660} y={588} r={9} color={C.teal} /></g>
      </g>

      {/* pen */}
      <g className="kkk-pen">
        <g transform="translate(150 650) rotate(-58)" filter="url(#kkk-paper)">
          <FountainPen length={380} />
        </g>
      </g>

      {/* open book */}
      <g transform="translate(486 640)" filter="url(#kkk-paper)">
        <path d="M-150 10 L-150 104 L150 104 L150 10 Z" fill={C.teal} />
        <path d="M-140 -2 C-90 -16 -30 -10 0 6 L0 96 C-30 80 -90 76 -140 88 Z" fill={C.cream} />
        <path d="M140 -2 C90 -16 30 -10 0 6 L0 96 C30 80 90 76 140 88 Z" fill="#F7E7BC" />
        {[18, 34, 50, 66].map((y) => (
          <path key={y} d={`M-120 ${y} C-80 ${y - 8} -40 ${y - 6} -16 ${y + 4}`} stroke={C.sandDeep} strokeWidth={3} fill="none" strokeLinecap="round" />
        ))}
      </g>

      <Diya x={110} y={700} s={1.7} />
    </svg>
  );
}
