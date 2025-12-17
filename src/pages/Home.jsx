import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-3">Online Quiz Application</h1>
      <p className="text-muted">
        Attempt quizzes, track results, and learn smarter.
      </p>

      <div className="mt-4">
        <Link to="/login" className="btn btn-primary me-3">
          Login
        </Link>
        <Link to="/register" className="btn btn-outline-secondary">
          Register
        </Link>
      </div>
    </div>
  );
}
