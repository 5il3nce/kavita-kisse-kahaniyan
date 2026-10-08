// Risograph grain: an inline SVG feTurbulence filter rasterised once as a tiled background
// on a fixed, pointer-events-none layer (never on a scrolling container). Normal blending, since the
// noise is already dark and translucent; a blend mode here would force costly compositing on phones.

const noise = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.07  0 0 0 0 0.05  0 0 0 0 0.02  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
);

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.16]"
      style={{ backgroundImage: `url("data:image/svg+xml,${noise}")`, backgroundSize: "220px 220px" }}
    />
  );
}
