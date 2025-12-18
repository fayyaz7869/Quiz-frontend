
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function CreatorDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container-fluid px-4 py-5">

      {/* HERO SECTION */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">
          Welcome, Quiz Creator 🎉
        </h1>
        <p className="text-muted mt-2">
          {user?.email}
        </p>
      </div>

      {/* ACTION CARDS */}
      <div className="row justify-content-center g-4">

        {/* CREATE QUIZ */}
        <div className="col-md-5 col-lg-4">
          <div className="card shadow-sm border-0 rounded-4 h-100 text-center">
            <div className="card-body p-4">

              <div className="mb-3 fs-1">📝</div>

              <h4 className="fw-bold">Create New Quiz</h4>
              <p className="text-muted">
                Start building a new quiz for users
              </p>

              <Link
                to="/create-quiz"
                className="btn btn-primary w-100 rounded-pill mt-3"
              >
                ➕ Create Quiz
              </Link>
            </div>
          </div>
        </div>

        {/* MY QUIZZES */}
        <div className="col-md-5 col-lg-4">
          <div className="card shadow-sm border-0 rounded-4 h-100 text-center">
            <div className="card-body p-4">

              <div className="mb-3 fs-1">📚</div>

              <h4 className="fw-bold">My Quizzes</h4>
              <p className="text-muted">
                Manage, edit & track your quizzes
              </p>

              <Link
                to="/creator/my-quizzes"
                className="btn btn-outline-dark w-100 rounded-pill mt-3"
              >
                👀 View Quizzes
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
