# Curtain Call: Movie Ticket Booking Frontend

React + TypeScript + React Router + Axios + Tailwind CSS (Vite).

## Run
    npm install
    npm run dev        # http://localhost:5173

Set the backend URL in `.env` (`VITE_API_URL`, default `http://localhost:8080/api`).

## Backend endpoints expected (edit `src/api/services.ts` to match yours)
| Purpose | Endpoint |
|---|---|
| Sign in / up | `POST /auth/signin` -> `{token, role, name}`, `POST /auth/signup` |
| Movies | `GET /movies`, `GET /movies/{id}`; admin: `POST`, `PUT /movies/{id}`, `DELETE /movies/{id}` |
| Theatres | `GET /theatres` |
| Shows | `GET /shows?movieId=&theatreId=&date=`, `GET /shows/{id}` (with `bookedSeats`) |
| Bookings | `POST /bookings {showId, seatNumbers}`, `GET /bookings/my`, `GET /bookings/{id}`, `DELETE /bookings/{id}` |
| Payments | `GET /payments/booking/{id}`, `POST /payments {bookingId, method}` |
| Profile | `GET /users/me`, `PUT /users/me` |

JWT is sent as `Authorization: Bearer <token>` by an Axios interceptor (`src/api/client.ts`). A 401 clears the token and redirects to sign-in.

## Structure
`api/` Axios client + services, `context/` auth state, `components/` reusable UI, `pages/` routed screens, `hooks.ts` loading/error fetch hook.

## Future expansion proposals
1. **Interactive theatre layout**: per-screen seat maps with seat categories (standard, premium) so customers can pick seats that match their budget and view.
2. **Promo code interface**: a code field on the booking summary showing the discount before payment, which makes offers visible and encourages repeat bookings.
