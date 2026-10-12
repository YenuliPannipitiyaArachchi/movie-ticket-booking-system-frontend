import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, role, name, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const link = ({ isActive }: { isActive: boolean }) => `px-2 py-1 border-b-2 ${isActive ? "border-gold text-gold" : "border-transparent hover:text-gold"}`;
  const close = () => setOpen(false);

  return (
    <header className="bg-ink text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-extrabold text-gold">Curtain Call</Link>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>☰</button>
        <div className={`${open ? "flex" : "hidden"} absolute left-0 top-12 z-10 w-full flex-col gap-3 bg-ink p-4 md:static md:flex md:w-auto md:flex-row md:items-center md:gap-5 md:p-0`} onClick={close}>
          <NavLink to="/" end className={link}>Movies</NavLink>
          <NavLink to="/theatres" className={link}>Theatres</NavLink>
          <NavLink to="/shows" className={link}>Shows</NavLink>
          {isAuthenticated && <NavLink to="/bookings" className={link}>My bookings</NavLink>}
          {role === "ADMIN" && <NavLink to="/admin/movies" className={link}>Manage movies</NavLink>}
          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className={link}>{name}</NavLink>
              <button className="btn-ghost border-white/40 text-white hover:bg-white/10" onClick={() => { logout(); navigate("/signin"); }}>Sign out</button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className={link}>Sign in</NavLink>
              <Link to="/signup" className="btn-primary">Create account</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
