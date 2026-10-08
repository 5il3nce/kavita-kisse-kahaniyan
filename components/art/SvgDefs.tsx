// Shared SVG definitions (paper shadow, jaali lattice, risograph dots).
// Rendered once in the layout so every inline SVG can reference these ids.

export function SvgDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        {/* Soft paper-cut shadow, tinted warm instead of black. */}
        <filter id="kkk-paper" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#8A5300" floodOpacity="0.22" />
        </filter>
        <filter id="kkk-paper-lg" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#8A5300" floodOpacity="0.2" />
        </filter>

        {/* Jaali lattice: marigold ground with cream diamond cut-outs. */}
        <pattern id="kkk-jaali" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#FF8A00" />
          <path d="M8 1.5 L14.5 8 L8 14.5 L1.5 8 Z" fill="#FFE7B0" />
          <circle cx="8" cy="8" r="1.6" fill="#FF8A00" />
        </pattern>

        {/* Teal ogee jaali for corners and strips. */}
        <pattern id="kkk-jaali-teal" width="28" height="28" patternUnits="userSpaceOnUse">
          <rect width="28" height="28" fill="#1FA6A0" />
          <path d="M14 3 C20 8 20 10 14 14 C8 10 8 8 14 3 Z M14 14 C20 18 20 20 14 25 C8 20 8 18 14 14 Z" fill="#FFF6DC" />
          <path d="M3 14 C8 8 10 8 14 14 C10 20 8 20 3 14 Z M14 14 C18 8 20 8 25 14 C20 20 18 20 14 14 Z" fill="#FFF6DC" opacity="0.55" />
        </pattern>

        <symbol id="kkk-mg" viewBox="-12 -12 24 24" overflow="visible">
          <circle cx="7.44" cy="0.0" r="5.04" fill="#FF8A00" /><circle cx="6.02" cy="4.37" r="5.04" fill="#FF8A00" /><circle cx="2.3" cy="7.08" r="5.04" fill="#FF8A00" /><circle cx="-2.3" cy="7.08" r="5.04" fill="#FF8A00" /><circle cx="-6.02" cy="4.37" r="5.04" fill="#FF8A00" /><circle cx="-7.44" cy="-0.0" r="5.04" fill="#FF8A00" /><circle cx="-6.02" cy="-4.37" r="5.04" fill="#FF8A00" /><circle cx="-2.3" cy="-7.08" r="5.04" fill="#FF8A00" /><circle cx="2.3" cy="-7.08" r="5.04" fill="#FF8A00" /><circle cx="6.02" cy="-4.37" r="5.04" fill="#FF8A00" />
          <circle r="6.6" fill="#FFC918" />
          <circle r="2.64" fill="#FF8A00" />
        </symbol>
        <symbol id="kkk-mg-rose" viewBox="-12 -12 24 24" overflow="visible">
          <circle cx="7.44" cy="0.0" r="5.04" fill="#FF5D8F" /><circle cx="6.02" cy="4.37" r="5.04" fill="#FF5D8F" /><circle cx="2.3" cy="7.08" r="5.04" fill="#FF5D8F" /><circle cx="-2.3" cy="7.08" r="5.04" fill="#FF5D8F" /><circle cx="-6.02" cy="4.37" r="5.04" fill="#FF5D8F" /><circle cx="-7.44" cy="-0.0" r="5.04" fill="#FF5D8F" /><circle cx="-6.02" cy="-4.37" r="5.04" fill="#FF5D8F" /><circle cx="-2.3" cy="-7.08" r="5.04" fill="#FF5D8F" /><circle cx="2.3" cy="-7.08" r="5.04" fill="#FF5D8F" /><circle cx="6.02" cy="-4.37" r="5.04" fill="#FF5D8F" />
          <circle r="6.6" fill="#FFC918" />
          <circle r="2.64" fill="#FF8A00" />
        </symbol>
        <symbol id="kkk-mg-sun" viewBox="-12 -12 24 24" overflow="visible">
          <circle cx="7.44" cy="0.0" r="5.04" fill="#FFC918" /><circle cx="6.02" cy="4.37" r="5.04" fill="#FFC918" /><circle cx="2.3" cy="7.08" r="5.04" fill="#FFC918" /><circle cx="-2.3" cy="7.08" r="5.04" fill="#FFC918" /><circle cx="-6.02" cy="4.37" r="5.04" fill="#FFC918" /><circle cx="-7.44" cy="-0.0" r="5.04" fill="#FFC918" /><circle cx="-6.02" cy="-4.37" r="5.04" fill="#FFC918" /><circle cx="-2.3" cy="-7.08" r="5.04" fill="#FFC918" /><circle cx="2.3" cy="-7.08" r="5.04" fill="#FFC918" /><circle cx="6.02" cy="-4.37" r="5.04" fill="#FFC918" />
          <circle r="6.6" fill="#FF8A00" />
          <circle r="2.64" fill="#FF8A00" />
        </symbol>
        {/* Risograph halftone dots for canopies and tags. */}
        <pattern id="kkk-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.3" fill="#FFF6DC" opacity="0.45" />
          <circle cx="7" cy="7" r="1" fill="#111111" opacity="0.12" />
        </pattern>
      </defs>
    </svg>
  );
}
