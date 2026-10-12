import api from "./client";
import type { AuthResponse, Booking, Movie, Payment, Show, Theatre, User } from "../types";

// Adjust these paths if your backend uses different routes.
export const authApi = {
  signIn: (d: { email: string; password: string }) => api.post<AuthResponse>("/auth/signin", d).then((r) => r.data),
  signUp: (d: { name: string; email: string; password: string; phone?: string }) => api.post("/auth/signup", d).then((r) => r.data),
};
export const movieApi = {
  list: () => api.get<Movie[]>("/movies").then((r) => r.data),
  get: (id: number | string) => api.get<Movie>(`/movies/${id}`).then((r) => r.data),
  create: (m: Partial<Movie>) => api.post<Movie>("/movies", m).then((r) => r.data),
  update: (id: number, m: Partial<Movie>) => api.put<Movie>(`/movies/${id}`, m).then((r) => r.data),
  remove: (id: number) => api.delete(`/movies/${id}`),
};
export const theatreApi = { list: () => api.get<Theatre[]>("/theatres").then((r) => r.data) };
export const showApi = {
  list: (p: { movieId?: string; theatreId?: string; date?: string }) =>
    api.get<Show[]>("/shows", { params: Object.fromEntries(Object.entries(p).filter(([, v]) => v)) }).then((r) => r.data),
  get: (id: number | string) => api.get<Show>(`/shows/${id}`).then((r) => r.data),
};
export const bookingApi = {
  create: (d: { showId: number; seatNumbers: string[] }) => api.post<Booking>("/bookings", d).then((r) => r.data),
  mine: () => api.get<Booking[]>("/bookings/my-bookings").then((r) => r.data),
  get: (id: number | string) => api.get<Booking>(`/bookings/${id}`).then((r) => r.data),
  cancel: (id: number) => api.put(`/bookings/${id}/cancel`),
};
export const paymentApi = {
  forBooking: (bookingId: number | string) => api.get<Payment>(`/payments/booking/${bookingId}`).then((r) => r.data),
  pay: (d: { bookingId: number; method: string }) => api.post<Payment>("/payments", d).then((r) => r.data),
};
export const userApi = {
  me: () => api.get<User>("/users/me").then((r) => r.data),
  update: (u: Partial<User>) => api.put<User>("/users/me", u).then((r) => r.data),
};
