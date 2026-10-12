import type { ReactNode } from "react";

export const Spinner = () => (
  <div className="flex justify-center py-12" role="status" aria-label="Loading">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-velvet/20 border-t-velvet" />
  </div>
);

export const Alert = ({ type = "error", children }: { type?: "error" | "success"; children: ReactNode }) => (
  <div role="alert" className={`rounded-md border px-4 py-3 text-sm ${type === "error" ? "border-red-300 bg-red-50 text-red-800" : "border-green-300 bg-green-50 text-green-800"}`}>
    {children}
  </div>
);

export const Empty = ({ children }: { children: ReactNode }) => <p className="py-10 text-center text-ink/60">{children}</p>;

export const PageTitle = ({ children, sub }: { children: ReactNode; sub?: string }) => (
  <div className="mb-6">
    <h1 className="text-3xl font-extrabold tracking-tight">{children}</h1>
    {sub && <p className="mt-1 text-ink/60">{sub}</p>}
  </div>
);

export const money = (n: number) => `LKR ${Number(n).toLocaleString("en-LK", { minimumFractionDigits: 2 })}`;
