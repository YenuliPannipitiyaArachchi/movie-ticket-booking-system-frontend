import { useSearchParams } from "react-router-dom";
import { movieApi, showApi, theatreApi } from "../api/services";
import { useFetch } from "../hooks";
import ShowList from "../components/ShowList";
import { Alert, PageTitle, Spinner } from "../components/UI";

export default function Shows() {
  const [params, setParams] = useSearchParams();
  const movieId = params.get("movieId") ?? "";
  const theatreId = params.get("theatreId") ?? "";
  const date = params.get("date") ?? "";

  const movies = useFetch(movieApi.list);
  const theatres = useFetch(theatreApi.list);
  const shows = useFetch(() => showApi.list({ movieId, theatreId, date }), [movieId, theatreId, date]);

  const setFilter = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    v ? next.set(k, v) : next.delete(k);
    setParams(next);
  };

  return (
    <>
      <PageTitle sub="Filter by movie, theatre or date.">Shows</PageTitle>
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        <select className="input" aria-label="Movie" value={movieId} onChange={(e) => setFilter("movieId", e.target.value)}>
          <option value="">All movies</option>
          {movies.data?.map((m) => <option key={m.id} value={m.id}>{m.title}</option>)}
        </select>
        <select className="input" aria-label="Theatre" value={theatreId} onChange={(e) => setFilter("theatreId", e.target.value)}>
          <option value="">All theatres</option>
          {theatres.data?.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <input type="date" className="input" aria-label="Date" value={date} onChange={(e) => setFilter("date", e.target.value)} />
        <button className="btn-ghost" onClick={() => setParams({})}>Clear filters</button>
      </div>
      {shows.loading ? <Spinner /> : shows.error ? <Alert>{shows.error}</Alert> : <ShowList shows={shows.data ?? []} />}
    </>
  );
}
