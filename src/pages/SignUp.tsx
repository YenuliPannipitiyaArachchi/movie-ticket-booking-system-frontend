import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/services";
import { errorMessage } from "../api/client";
import { Alert } from "../components/UI";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.phone && !/^\+?\d{9,15}$/.test(form.phone)) e.phone = "Enter 9-15 digits, optionally starting with +.";
    if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(form.password)) e.password = "Use 6+ characters with letters and numbers.";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match.";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    try {
      await authApi.signUp({ name: form.name, email: form.email, password: form.password, phone: form.phone || undefined });
      navigate("/signin");
    } catch (e) {
      setApiError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  const fields: [string, string, string][] = [["name", "Full name", "text"], ["email", "Email", "email"], ["phone", "Phone (optional)", "tel"], ["password", "Password", "password"], ["confirm", "Confirm password", "password"]];
  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-3xl font-extrabold">Create your account</h1>
      <form onSubmit={submit} className="card space-y-4" noValidate>
        {apiError && <Alert>{apiError}</Alert>}
        {fields.map(([k, label, type]) => (
          <div key={k}>
            <label htmlFor={k} className="mb-1 block text-sm font-semibold">{label}</label>
            <input id={k} type={type} className="input" value={form[k as keyof typeof form]} onChange={set(k)} />
            {errors[k] && <p className="mt-1 text-sm text-red-700">{errors[k]}</p>}
          </div>
        ))}
        <button className="btn-primary w-full" disabled={loading}>{loading ? "Creating account..." : "Create account"}</button>
        <p className="text-center text-sm">Already registered? <Link className="font-semibold text-velvet" to="/signin">Sign in</Link></p>
      </form>
    </div>
  );
}
