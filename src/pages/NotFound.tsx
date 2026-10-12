import { Link } from "react-router-dom";
export default function NotFound() {
  return <div className="py-16 text-center"><h1 className="text-4xl font-extrabold">Page not found</h1><p className="my-3 text-ink/60">That page does not exist.</p><Link to="/" className="btn-primary">Back to movies</Link></div>;
}
