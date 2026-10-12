import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Theatres from "./pages/Theatres";
import Shows from "./pages/Shows";
import BookSeats from "./pages/BookSeats";
import Bookings from "./pages/Bookings";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import AdminMovies from "./pages/AdminMovies";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/theatres" element={<Theatres />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shows/:id/book" element={<ProtectedRoute><BookSeats /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/payment/:bookingId" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin/movies" element={<ProtectedRoute role="ADMIN"><AdminMovies /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
