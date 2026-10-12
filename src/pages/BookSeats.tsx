import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { bookingApi, showApi } from "../api/services";
import { errorMessage } from "../api/client";
import { useFetch } from "../hooks";
import SeatGrid from "../components/SeatGrid";
import { Alert, Spinner, money } from "../components/UI";

export default function BookSeats() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: show, loading, error } = useFetch(() => showApi.get(id!), [id]);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [bookError, setBookError] = useState("");

  const toggle = (seat: string) =>
    setSelected((s) =>
      s.includes(seat) ? s.filter((x) => x !== seat) : [...s, seat],
    );

  const confirm = async () => {
    if (!show) return;
    setSubmitting(true);
    setBookError("");
    try {
      const booking = await bookingApi.create({
        showId: show.id,
        seatNumbers: selected,
        numberOfTickets: selected.length,
      });
      navigate(`/payment/${booking.id}`, { state: { justBooked: true } });
    } catch (e) {
      setBookError(errorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;
  if (error || !show) return <Alert>{error || "Show not found."}</Alert>;
  const total = selected.length * show.ticketPrice;

  return (
    <>
      <Link to="/shows" className="text-sm font-semibold text-velvet">
        Back to shows
      </Link>
      <h1 className="mt-2 text-3xl font-extrabold">
        {show.movieTitle ?? `Show #${show.id}`}
      </h1>
      <p className="mb-6 text-ink/60">
        {show.theatreName}, {show.showDate} at {show.showTime}.{" "}
        {money(show.ticketPrice)} per ticket.
      </p>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card">
          <SeatGrid
            totalSeats={show.totalSeats}
            booked={show.bookedSeats ?? []}
            selected={selected}
            onToggle={toggle}
          />
        </div>
        <aside className="card h-fit space-y-3">
          <h2 className="text-xl font-bold">Your selection</h2>
          {bookError && <Alert>{bookError}</Alert>}
          <p>
            <span className="text-ink/60">Seats:</span>{" "}
            {selected.length ? selected.sort().join(", ") : "None selected"}
          </p>
          <p>
            <span className="text-ink/60">Tickets:</span> {selected.length}
          </p>
          <p className="text-xl font-extrabold">Total: {money(total)}</p>
          <button
            className="btn-primary w-full"
            disabled={!selected.length || submitting}
            onClick={confirm}
          >
            {submitting ? "Booking..." : "Book tickets"}
          </button>
        </aside>
      </div>
    </>
  );
}
