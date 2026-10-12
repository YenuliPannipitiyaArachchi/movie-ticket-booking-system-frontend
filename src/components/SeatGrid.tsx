const ROWS = "ABCDEFGHIJ".split("");

interface Props { totalSeats?: number; booked: string[]; selected: string[]; onToggle: (seat: string) => void; perRow?: number }

export default function SeatGrid({ totalSeats = 50, booked, selected, onToggle, perRow = 10 }: Props) {
  const rows = Math.min(ROWS.length, Math.ceil(totalSeats / perRow));
  return (
    <div>
      <div className="mx-auto mb-6 h-2 w-3/4 rounded-full bg-gold" aria-hidden />
      <p className="mb-4 text-center text-sm text-ink/60">Screen</p>
      <div className="space-y-2 overflow-x-auto">
        {ROWS.slice(0, rows).map((r) => (
          <div key={r} className="flex justify-center gap-2">
            {Array.from({ length: perRow }, (_, i) => {
              const id = `${r}${i + 1}`;
              const isBooked = booked.includes(id);
              const isSel = selected.includes(id);
              return (
                <button key={id} type="button" disabled={isBooked} onClick={() => onToggle(id)} aria-pressed={isSel} aria-label={`Seat ${id}${isBooked ? " (booked)" : ""}`}
                  className={`h-8 w-8 shrink-0 rounded-t-lg text-xs font-semibold sm:h-9 sm:w-9 ${isBooked ? "cursor-not-allowed bg-ink/20 text-ink/40" : isSel ? "bg-velvet text-white" : "border border-ink/30 bg-white hover:border-velvet"}`}>
                  {id}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-5 text-sm">
        <span className="flex items-center gap-2"><i className="inline-block h-4 w-4 rounded border border-ink/30 bg-white" />Available</span>
        <span className="flex items-center gap-2"><i className="inline-block h-4 w-4 rounded bg-velvet" />Selected</span>
        <span className="flex items-center gap-2"><i className="inline-block h-4 w-4 rounded bg-ink/20" />Booked</span>
      </div>
    </div>
  );
}
