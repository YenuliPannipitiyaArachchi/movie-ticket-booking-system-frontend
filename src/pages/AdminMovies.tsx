import { useState, type FormEvent } from "react";
import { movieApi } from "../api/services";
import { errorMessage } from "../api/client";
import { useFetch } from "../hooks";
import { Alert, PageTitle, Spinner } from "../components/UI";
import type { Movie } from "../types";

const blank: Partial<Movie> = { title: "", genre: "", language: "", durationMinutes: 120, description: "", posterUrl: "" };

export default function AdminMovies() {
  const { data, loading, error, reload } = useFetch(movieApi.list);
  const [form, setForm] = useState<Partial<Movie>>(blank);
  const [msg, setMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim() || !form.genre?.trim()) return setMsg({ type: "error", text: "Title and genre are required." });
    try {
      form.id ? await movieApi.update(form.id, form) : await movieApi.create(form);
      setMsg({ type: "success", text: form.id ? "Movie updated." : "Movie added." });
      setForm(blank);
      reload();
    } catch (err) {
      setMsg({ type: "error", text: errorMessage(err) });
    }
  };

  const remove = async (m: Movie) => {
    if (!window.confirm(`Delete "${m.title}"?`)) return;
    try {
      await movieApi.remove(m.id);
      setMsg({ type: "success", text: "Movie deleted." });
      reload();
    } catch (err) {
      setMsg({ type: "error", text: errorMessage(err) });
    }
  };

  const txt = (k: keyof Movie, label: string, type = "text") => (
    <div><label className="mb-1 block text-sm font-semibold">{label}</label><input type={type} className="input" value={(form[k] as string | number | undefined) ?? ""} onChange={(e) => setForm({ ...form, [k]: type === "number" ? Number(e.target.value) : e.target.value })} /></div>
  );

  return (
    <>
      <PageTitle>Manage movies</PageTitle>
      {msg && <div className="mb-4"><Alert type={msg.type}>{msg.text}</Alert></div>}
      <form onSubmit={save} className="card mb-8 grid gap-3 sm:grid-cols-2">
        {txt("title", "Title")}{txt("genre", "Genre")}{txt("language", "Language")}{txt("durationMinutes", "Duration (minutes)", "number")}{txt("posterUrl", "Poster URL")}{txt("description", "Description")}
        <div className="flex gap-2 sm:col-span-2">
          <button className="btn-primary">{form.id ? "Update movie" : "Add movie"}</button>
          {form.id && <button type="button" className="btn-ghost" onClick={() => setForm(blank)}>Cancel edit</button>}
        </div>
      </form>
      {loading ? <Spinner /> : error ? <Alert>{error}</Alert> : (
        <ul className="space-y-2">
          {data?.map((m) => (
            <li key={m.id} className="card flex items-center justify-between">
              <span><b>{m.title}</b> <span className="text-ink/60">({m.genre})</span></span>
              <span className="flex gap-2"><button className="btn-ghost" onClick={() => setForm(m)}>Edit</button><button className="btn-danger" onClick={() => remove(m)}>Delete</button></span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
