// Single source for the Artists strip. One entry per photo in Assets/Elements & photos.
// Names are intentionally not shown (per the client). Alt text describes each photo.

export type Artist = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Paper-cut frame colour behind the cut-out photo. */
  frame: "sun" | "rose" | "marigold" | "cream";
};

export const artists: Artist[] = [
  { id: "artist-1", src: "/images/artists/artist-1.png", width: 774, height: 900, frame: "cream", alt: "Artist seated on a folding chair playing a ukulele under a festival umbrella" },
  { id: "artist-2", src: "/images/artists/artist-2.png", width: 669, height: 805, frame: "sun", alt: "Artist in a maroon t-shirt and glasses singing into a microphone" },
  { id: "artist-3", src: "/images/artists/artist-3.png", width: 494, height: 900, frame: "marigold", alt: "Poet in a red dress smiling at the microphone beside a music stand" },
  { id: "artist-4", src: "/images/artists/artist-4.png", width: 442, height: 900, frame: "rose", alt: "Poet in a gold saree reciting at a music stand" },
  { id: "artist-5", src: "/images/artists/artist-5.png", width: 480, height: 790, frame: "cream", alt: "Storyteller in a lavender kurta and shawl gesturing while speaking into a microphone" },
  { id: "artist-6", src: "/images/artists/artist-6.png", width: 660, height: 900, frame: "sun", alt: "Artist in a white shirt seated on stage, laughing into a microphone" },
  { id: "artist-7", src: "/images/artists/artist-7.png", width: 364, height: 628, frame: "rose", alt: "Senior poet seated in a cane chair reading into a microphone" },
  { id: "artist-8", src: "/images/artists/artist-8.png", width: 413, height: 753, frame: "marigold", alt: "Poet in a dark saree performing at a standing microphone" },
  { id: "artist-9", src: "/images/artists/artist-9.png", width: 407, height: 673, frame: "cream", alt: "Artist in a white shirt smiling, holding a microphone" },
  { id: "artist-10", src: "/images/artists/artist-10.png", width: 524, height: 730, frame: "sun", alt: "Musician in sunglasses seated with an acoustic guitar at a microphone" },
  { id: "artist-11", src: "/images/artists/artist-11.png", width: 380, height: 749, frame: "rose", alt: "Poet in a yellow printed saree singing at a standing microphone" },
];
