import { Link } from "react-router-dom";
import { theatreApi } from "../api/services";
import { useFetch } from "../hooks";
import { Alert, Empty, PageTitle, Spinner } from "../components/UI";

export default function Theatres() {
  const { data, loading, error } = useFetch(theatreApi.list);
  return (
    <>
      <PageTitle sub="Find a theatre and see what is playing.">Theatres</PageTitle>
      {loading ? <Spinner /> : error ? <Alert>{error}</Alert> : !data?.length ? <Empty>No theatres available yet.</Empty> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((t) => (
            <div key={t.id} className="card">
              <h3 className="text-lg font-bold">{t.name}</h3>
              <p className="text-ink/60">{t.location}</p>
              {t.screens != null && <p className="mt-1 text-sm">{t.screens} screen(s)</p>}
              <Link className="btn-ghost mt-3" to={`/shows?theatreId=${t.id}`}>View shows</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
