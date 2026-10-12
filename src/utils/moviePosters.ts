import type { Movie } from "../types";

const posterByTitle: Record<string, string> = {
  midnightreel: "/demo-posters/midnight-reel.svg",
  monsoonroad: "/demo-posters/monsoon-road.svg",
  stellardrift: "/demo-posters/stellar-drift.svg",
  comingsoonpaperlanterns: "/demo-posters/paper-lanterns.svg",
};

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function moviePosterUrl(movie: Pick<Movie, "title" | "posterUrl">): string {
  if (movie.posterUrl?.trim()) return movie.posterUrl;
  return posterByTitle[normalizeTitle(movie.title)] ?? "/demo-posters/default.svg";
}
