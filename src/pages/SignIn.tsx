import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../api/services";
import { errorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Alert } from "../components/UI";

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: string } | null)?.from ?? "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    setApiError("");
    if (!validate()) return;
    setLoading(true);
    try {
      login(await authApi.signIn(form));
      navigate(from, { replace: true });
    } catch (e) {
      setApiError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-3xl font-extrabold">Sign in</h1>
      <form onSubmit={submit} className="card space-y-4" noValidate>
        {apiError && <Alert>{apiError}</Alert>}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold">Email</label>
          <input id="email" type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          {errors.email && <p className="mt-1 text-sm text-red-700">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-semibold">Password</label>
          <input id="password" type="password" className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {errors.password && <p className="mt-1 text-sm text-red-700">{errors.password}</p>}
        </div>
        <button className="btn-primary w-full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        <p className="text-center text-sm">New here? <Link className="font-semibold text-velvet" to="/signup">Create an account</Link></p>
      </form>
    </div>
  );
}
