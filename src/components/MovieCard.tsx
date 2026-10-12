import { Link } from "react-router-dom";
import type { Movie } from "../types";
import { moviePosterUrl } from "../utils/moviePosters";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group card flex flex-col overflow-hidden !p-0 hover:border-velvet"
    >
      <img
        src={moviePosterUrl(movie)}
        alt={movie.title}
        className="h-64 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold group-hover:text-velvet">{movie.title}</h3>
        <p className="text-sm text-ink/60">
          {[
            movie.genre,
            movie.language,
            movie.durationMinutes && `${movie.durationMinutes} min`,
          ]
            .filter(Boolean)
            .join(", ")}
        </p>
      </div>
    </Link>
  );
}
