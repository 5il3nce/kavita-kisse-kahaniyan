// Ticket link for every Book Tickets button. Set NEXT_PUBLIC_DISTRICT_TICKET_URL in .env.local.
export const TICKET_URL =
  process.env.NEXT_PUBLIC_DISTRICT_TICKET_URL ||
  "https://www.district.in/events/spill-the-word-fest-season-4-oct24-2026-buy-tickets";

// 24 Oct 2026 00:00 Asia/Kolkata (UTC+05:30) is 23 Oct 2026 18:30 UTC.
export const FEST_START_MS = Date.UTC(2026, 9, 23, 18, 30, 0);
