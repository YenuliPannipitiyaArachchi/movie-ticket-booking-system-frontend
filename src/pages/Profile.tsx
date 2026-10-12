import { useEffect, useState, type FormEvent } from "react";
import { userApi } from "../api/services";
import { errorMessage } from "../api/client";
import { useFetch } from "../hooks";
import { Alert, PageTitle, Spinner } from "../components/UI";

export default function Profile() {
  const { data, loading, error } = useFetch(userApi.me);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [msg, setMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);

  useEffect(() => { if (data) setForm({ name: data.name ?? "", phone: data.phone ?? "" }); }, [data]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setMsg({ type: "error", text: "Name must be at least 2 characters." });
    try {
      await userApi.update(form);
      setMsg({ type: "success", text: "Profile updated." });
    } catch (err) {
      setMsg({ type: "error", text: errorMessage(err) });
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Alert>{error}</Alert>;
  return (
    <div className="mx-auto max-w-md">
      <PageTitle>My profile</PageTitle>
      <form onSubmit={save} className="card space-y-4">
        {msg && <Alert type={msg.type}>{msg.text}</Alert>}
        <div><label className="mb-1 block text-sm font-semibold">Email</label><input className="input bg-ink/5" value={data?.email ?? ""} disabled /></div>
        <div><label htmlFor="n" className="mb-1 block text-sm font-semibold">Name</label><input id="n" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><label htmlFor="p" className="mb-1 block text-sm font-semibold">Phone</label><input id="p" className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
        <button className="btn-primary w-full">Save changes</button>
      </form>
    </div>
  );
}
