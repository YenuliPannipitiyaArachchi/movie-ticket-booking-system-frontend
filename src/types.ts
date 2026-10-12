export type Role = "CUSTOMER" | "ADMIN";

export interface AuthResponse { token: string; role: Role; name?: string; email?: string }
export interface Movie { id: number; title: string; genre: string; language?: string; durationMinutes?: number; description?: string; posterUrl?: string; rating?: string }
export interface Theatre { id: number; name: string; location: string; screens?: number }
export interface Show { id: number; movieId: number; movieTitle?: string; theatreId: number; theatreName?: string; showDate: string; showTime: string; ticketPrice: number; totalSeats?: number; bookedSeats?: string[] }
export interface Booking { id: number; showId: number; movieTitle?: string; theatreName?: string; showDate?: string; showTime?: string; seatNumbers: string[]; totalAmount: number; status: "CONFIRMED" | "PENDING" | "CANCELLED" | string; paymentStatus?: string; bookedAt?: string }
export interface Payment { id: number; bookingId: number; amount: number; method: string; status: string; paidAt?: string }
export interface User { id?: number; name: string; email: string; phone?: string; role?: Role }
