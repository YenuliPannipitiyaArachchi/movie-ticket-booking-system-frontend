import { useState } from "react";
import { Link } from "react-router-dom";
import { bookingApi } from "../api/services";
import { errorMessage } from "../api/client";
import { useFetch } from "../hooks";
import { Alert, Empty, PageTitle, Spinner, money } from "../components/UI";

export default function Bookings() {
  const { data, loading, error, reload } = useFetch(bookingApi.mine);
  const [msg, setMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const cancel = async (id: number) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await bookingApi.cancel(id);
      setMsg({ type: "success", text: `Booking #${id} cancelled.` });
      reload();
    } catch (e) {
      setMsg({ type: "error", text: errorMessage(e) });
    }
  };

  return (
    <>
      <PageTitle sub="Your tickets and their payment status.">My bookings</PageTitle>
      {msg && <div className="mb-4"><Alert type={msg.type}>{msg.text}</Alert></div>}
      {loading ? <Spinner /> : error ? <Alert>{error}</Alert> : !data?.length ? <Empty>You have no bookings yet. <Link className="font-semibold text-velvet" to="/">Browse movies</Link></Empty> : (
        <ul className="space-y-3">
          {data.map((b) => (
            <li key={b.id} className="card flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold">#{b.id} {b.movieTitle ?? `Show #${b.showId}`}</p>
                <p className="text-sm text-ink/60">{[b.theatreName, b.showDate, b.showTime].filter(Boolean).join(", ")}</p>
                <p className="text-sm">Seats: {b.seatNumbers.join(", ")} ({money(b.totalAmount)})</p>
                <p className="mt-1 text-sm"><span className="rounded bg-ink/10 px-2 py-0.5">{b.status}</span> {b.paymentStatus && <span className="ml-1 rounded bg-gold/30 px-2 py-0.5">Payment: {b.paymentStatus}</span>}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/payment/${b.id}`} className="btn-ghost">Payment</Link>
                {b.status !== "CANCELLED" && <button className="btn-danger" onClick={() => cancel(b.id)}>Cancel</button>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
