// Stats illustration: a faceless, colourful crowd on a stepped stage under four map pins.

import { C, Cloud, MapPin, Star } from "./motifs";

const SKIN = ["#C68642", "#8D5524", "#E0AC69", "#A0663A", "#D69E6A"];

type PersonProps = {
  x: number;
  y: number;
  s?: number;
  skin: number;
  hair?: "bun" | "short" | "long" | "turban";
  top: string;
  bottom: string;
  drape?: string;
  back?: boolean;
  mic?: boolean;
  armUp?: boolean;
};

/** Flat faceless figure, about 170 units tall at s = 1, standing on (x, y). */
function Person({ x, y, s = 1, skin, hair = "short", top, bottom, drape, back = false, mic = false, armUp = false }: PersonProps) {
  const sk = SKIN[skin % SKIN.length];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* lower body */}
      <path d="M-24 -70 L24 -70 L30 0 L-30 0 Z" fill={bottom} />
      {/* torso */}
      <path d="M-26 -128 C-12 -136 12 -136 26 -128 L24 -68 L-24 -68 Z" fill={top} />
      {drape ? <path d="M-22 -130 L8 -130 L24 -70 L10 -70 Z" fill={drape} /> : null}
      {/* arms */}
      <path d={armUp ? "M24 -124 L44 -168" : "M24 -124 L34 -78"} stroke={sk} strokeWidth={11} strokeLinecap="round" />
      <path d={mic ? "M-24 -124 L-34 -100 L-18 -112" : "M-24 -124 L-32 -78"} stroke={sk} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {mic ? (
        <g>
          <rect x={-22} y={-132} width={6} height={20} rx={3} fill={C.ink} transform="rotate(20 -19 -122)" />
          <circle cx={-15} cy={-136} r={6} fill={C.ink} />
        </g>
      ) : null}
      {/* neck and head */}
      <rect x={-6} y={-146} width={12} height={16} fill={sk} />
      <circle cx={0} cy={-160} r={18} fill={back ? C.ink : sk} />
      {hair === "bun" ? <circle cx={back ? 0 : -14} cy={-176} r={9} fill={C.ink} /> : null}
      {hair === "short" ? <path d="M-18 -164 C-18 -184 18 -184 18 -164 C10 -172 -10 -172 -18 -164 Z" fill={C.ink} /> : null}
      {hair === "long" ? <path d="M-19 -160 C-20 -186 20 -186 19 -160 L20 -126 L12 -128 L12 -158 L-12 -158 L-12 -128 L-20 -126 Z" fill={C.ink} /> : null}
      {hair === "turban" ? <path d="M-21 -164 C-22 -190 22 -190 21 -164 C12 -170 -12 -170 -21 -164 Z" fill={C.rose} /> : null}
    </g>
  );
}

export function CrowdScene() {
  return (
    <svg viewBox="0 0 1600 640" className="h-auto w-full" aria-hidden="true" focusable="false">
      {/* sky decor */}
      <Cloud x={960} y={130} s={0.9} back={C.rose} />
      <Cloud x={1420} y={90} s={1.1} back={C.rose} />
      <circle cx={1240} cy={120} r={70} fill={C.cream} />
      <Star x={760} y={90} r={12} />
      <Star x={1560} y={250} r={10} color={C.rose} />

      {/* cream hills behind the stage */}
      <path d="M560 640 C600 420 760 380 900 420 C1000 300 1220 300 1320 380 C1420 330 1560 350 1600 380 L1600 640 Z" fill={C.cream} />

      {/* four map pins, one per city */}
      {[900, 1060, 1220, 1380].map((x, i) => (
        <MapPin key={x} x={x} y={300 + (i % 2) * 18} s={1} color={C.marigold} />
      ))}

      {/* stepped stage */}
      <g filter="url(#kkk-paper)">
        <rect x={760} y={470} width={840} height={40} fill={C.rose} />
        <rect x={700} y={510} width={900} height={40} fill={C.cream} />
        <rect x={640} y={550} width={960} height={44} fill={C.teal} />
        <rect x={580} y={594} width={1020} height={46} fill={C.sand} />
        <path d="M760 486 l20 14 l20 -14 l20 14 l20 -14 l20 14 l20 -14 l20 14 l20 -14 l20 14 l20 -14" stroke={C.cream} strokeWidth={4} fill="none" />
        {[680, 720, 760, 800, 840, 880].map((x) => (
          <circle key={x} cx={x} cy={572} r={4} fill={C.cream} />
        ))}
      </g>

      {/* performers on stage */}
      <g>
        <Person x={880} y={470} skin={2} hair="bun" top={C.rose} bottom={C.rose} drape={C.teal} mic />
        <Person x={990} y={470} skin={0} hair="long" top={C.sun} bottom={C.rose} drape={C.marigold} />
        <Person x={1110} y={470} skin={1} hair="short" top={C.teal} bottom={C.cream} />
        <Person x={1230} y={470} skin={3} hair="turban" top={C.ink} bottom={C.sun} armUp />
        <Person x={1350} y={470} skin={4} hair="bun" top={C.sun} bottom={C.marigold} drape={C.teal} mic />
        <Person x={1470} y={470} skin={2} hair="short" top={C.teal} bottom={C.sun} armUp />
      </g>

      {/* audience, seen from behind */}
      <g>
        <Person x={90} y={660} s={1.25} skin={0} hair="bun" back top={C.teal} bottom={C.rose} drape={C.rose} />
        <Person x={250} y={680} s={1.3} skin={1} hair="short" back top={C.ink} bottom={C.marigold} />
        <Person x={410} y={670} s={1.25} skin={2} hair="long" back top={C.marigold} bottom={C.sun} />
      </g>
      <g>
        <Person x={1000} y={700} s={1.2} skin={3} hair="short" back top={C.rose} bottom={C.cream} armUp />
        <Person x={1160} y={700} s={1.2} skin={4} hair="turban" back top={C.marigold} bottom={C.ink} />
        <Person x={1320} y={700} s={1.2} skin={0} hair="long" back top={C.teal} bottom={C.rose} />
        <Person x={1480} y={700} s={1.2} skin={1} hair="short" back top={C.sun} bottom={C.teal} armUp />
      </g>
    </svg>
  );
}
