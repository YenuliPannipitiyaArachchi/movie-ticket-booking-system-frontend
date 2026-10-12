import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { bookingApi, paymentApi } from "../api/services";
import { errorMessage } from "../api/client";
import { useFetch } from "../hooks";
import { Alert, PageTitle, Spinner, money } from "../components/UI";
import type { Payment as PaymentT } from "../types";

export default function Payment() {
  const { bookingId } = useParams();
  const justBooked = (useLocation().state as { justBooked?: boolean } | null)?.justBooked;
  const booking = useFetch(() => bookingApi.get(bookingId!), [bookingId]);
  const [payment, setPayment] = useState<PaymentT | null>(null);
  const [loadingPay, setLoadingPay] = useState(true);
  const [method, setMethod] = useState("CARD");
  const [paying, setPaying] = useState(false);
  const [msg, setMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);

  // A 404 here simply means no payment has been made yet
  useFetch(() => paymentApi.forBooking(bookingId!).then(setPayment).catch(() => null).finally(() => setLoadingPay(false)), [bookingId]);

  const pay = async () => {
    setPaying(true);
    setMsg(null);
    try {
      const p = await paymentApi.pay({ bookingId: Number(bookingId), method });
      setPayment(p);
      setMsg({ type: "success", text: "Payment received. Your booking is confirmed." });
    } catch (e) {
      setMsg({ type: "error", text: errorMessage(e) });
    } finally {
      setPaying(false);
    }
  };

  if (booking.loading || loadingPay) return <Spinner />;
  if (booking.error || !booking.data) return <Alert>{booking.error || "Booking not found."}</Alert>;
  const b = booking.data;

  return (
    <div className="mx-auto max-w-xl">
      <PageTitle>Payment</PageTitle>
      {justBooked && !msg && <div className="mb-4"><Alert type="success">Seats reserved. Complete payment to confirm your booking.</Alert></div>}
      {msg && <div className="mb-4"><Alert type={msg.type}>{msg.text}</Alert></div>}
      <div className="card space-y-2">
        <p className="font-bold">Booking #{b.id}: {b.movieTitle ?? `Show #${b.showId}`}</p>
        <p>Seats: {b.seatNumbers.join(", ")}</p>
        <p>Status: {b.status}</p>
        <p className="text-xl font-extrabold">Amount: {money(b.totalAmount)}</p>
      </div>
      <div className="card mt-4 space-y-3">
        {payment ? (
          <>
            <h2 className="text-lg font-bold">Payment details</h2>
            <p>Method: {payment.method}</p>
            <p>Status: <span className="rounded bg-gold/30 px-2 py-0.5">{payment.status}</span></p>
            {payment.paidAt && <p>Paid at: {new Date(payment.paidAt).toLocaleString()}</p>}
          </>
        ) : b.status === "CANCELLED" ? (
          <p>This booking was cancelled, so no payment is due.</p>
        ) : (
          <>
            <label htmlFor="method" className="block text-sm font-semibold">Payment method</label>
            <select id="method" className="input" value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="CARD">Credit / debit card</option>
              <option value="CASH">Cash at theatre</option>
              <option value="ONLINE">Online transfer</option>
            </select>
            <button className="btn-primary w-full" disabled={paying} onClick={pay}>{paying ? "Processing..." : `Pay ${money(b.totalAmount)}`}</button>
          </>
        )}
      </div>
    </div>
  );
}
