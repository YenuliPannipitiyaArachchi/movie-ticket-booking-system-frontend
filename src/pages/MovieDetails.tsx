import { Link, useParams } from "react-router-dom";
import { movieApi, showApi } from "../api/services";
import { useFetch } from "../hooks";
import ShowList from "../components/ShowList";
import { Alert, Spinner } from "../components/UI";
import { moviePosterUrl } from "../utils/moviePosters";

export default function MovieDetails() {
  const { id } = useParams();
  const movie = useFetch(() => movieApi.get(id!), [id]);
  const shows = useFetch(() => showApi.list({ movieId: id }), [id]);

  if (movie.loading) return <Spinner />;
  if (movie.error || !movie.data)
    return <Alert>{movie.error || "Movie not found."}</Alert>;
  const m = movie.data;

  return (
    <>
      <Link to="/" className="text-sm font-semibold text-velvet">
        Back to movies
      </Link>
      <div className="mt-4 grid gap-6 md:grid-cols-[260px_1fr]">
        <img
          src={moviePosterUrl(m)}
          alt={m.title}
          className="h-72 w-full rounded-md object-cover"
        />
        <div>
          <h1 className="text-4xl font-extrabold">{m.title}</h1>
          <p className="mt-2 text-ink/60">
            {[
              m.genre,
              m.language,
              m.durationMinutes && `${m.durationMinutes} min`,
              m.rating,
            ]
              .filter(Boolean)
              .join(", ")}
          </p>
          <p className="mt-4 max-w-prose">
            {m.description ?? "No description available."}
          </p>
        </div>
      </div>
      <h2 className="mb-3 mt-10 text-2xl font-bold">Shows for this movie</h2>
      {shows.loading ? (
        <Spinner />
      ) : shows.error ? (
        <Alert>{shows.error}</Alert>
      ) : (
        <ShowList shows={shows.data ?? []} />
      )}
    </>
  );
}
