import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Picsum is allowed for any future photographic slot. The current page
    // uses only the real logos and artist photos from /public.
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
