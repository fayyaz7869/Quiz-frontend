import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h2>Welcome, Admin 👋</h2>
      <p>Email: {user.email}</p>

      <div className="row mt-4">

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h4>Pending Approvals</h4>
            <p>Approve new registrations</p>
            <Link to="/admin/pending-users" className="btn btn-primary">
              Manage Users
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h4>Quizzes</h4>
            <p>Manage all quizzes</p>
            <Link to="/quizzes" className="btn btn-secondary">
              View Quizzes
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
