import { Link } from "react-router-dom";
import type { Show } from "../types";
import { Empty, money } from "./UI";

export default function ShowList({ shows }: { shows: Show[] }) {
  if (!shows.length) return <Empty>No shows match your filters. Try another date or theatre.</Empty>;
  return (
    <ul className="space-y-3">
      {shows.map((s) => (
        <li key={s.id} className="card flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-bold">{s.movieTitle ?? `Movie #${s.movieId}`}</p>
            <p className="text-sm text-ink/60">{s.theatreName ?? `Theatre #${s.theatreId}`}, {s.showDate} at {s.showTime}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">{money(s.ticketPrice)}</span>
            <Link to={`/shows/${s.id}/book`} className="btn-primary">Select seats</Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
