import { useMemo, useState } from "react";
import { movieApi } from "../api/services";
import { useFetch } from "../hooks";
import MovieCard from "../components/MovieCard";
import { Alert, Empty, PageTitle, Spinner } from "../components/UI";

export default function Movies() {
  const { data, loading, error } = useFetch(movieApi.list);
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("");

  const genres = useMemo(() => Array.from(new Set((data ?? []).map((m) => m.genre).filter(Boolean))), [data]);
  const filtered = useMemo(
    () => (data ?? []).filter((m) => m.title.toLowerCase().includes(q.toLowerCase()) && (!genre || m.genre === genre)),
    [data, q, genre]
  );

  return (
    <>
      <PageTitle sub="Pick a film, then choose a show and your seats.">Now showing</PageTitle>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input className="input sm:max-w-xs" placeholder="Search by title" aria-label="Search movies" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input sm:max-w-xs" aria-label="Filter by genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">All genres</option>
          {genres.map((g) => <option key={g}>{g}</option>)}
        </select>
      </div>
      {loading ? <Spinner /> : error ? <Alert>{error}</Alert> : !filtered.length ? <Empty>No movies found. Try a different title or genre.</Empty> : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((m) => <MovieCard key={m.id} movie={m} />)}</div>
      )}
    </>
  );
}
