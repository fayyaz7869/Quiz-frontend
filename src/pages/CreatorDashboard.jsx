import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function CreatorDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">

      <h2>Welcome, Quiz Creator 🎉</h2>
      <p className="text-muted">Email: {user.email}</p>

      <div className="row mt-4">

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4>Create New Quiz</h4>
            <p>Start building a new quiz</p>
            <Link to="/create-quiz" className="btn btn-primary">
              Create Quiz
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4>My Quizzes</h4>
            <p>View and manage your created quizzes</p>
            <Link to="/creator/my-quizzes" className="btn btn-secondary">
              View Quizzes
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
