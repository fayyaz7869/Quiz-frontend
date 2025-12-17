import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container-fluid py-5 px-5">

      <h2 className="fw-bold mb-1">
        Welcome, Admin 👋
      </h2>
      <p className="text-muted mb-5">
        Email: {user.email}
      </p>

      {/* FULL WIDTH ROW */}
<div className="row mt-4 g-4 justify-content-center">

        {/* Pending Users */}
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
          <div className="card dashboard-card h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="fw-bold">Pending Approvals</h5>

              <p className="text-muted flex-grow-1">
                Approve new registrations
              </p>

              <Link
                to="/admin/pending-users"
                className="btn btn-primary mt-auto"
              >
                Manage Users
              </Link>
            </div>
          </div>
        </div>

        {/* Quizzes */}
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
          <div className="card dashboard-card h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="fw-bold">Quizzes</h5>

              <p className="text-muted flex-grow-1">
                Manage all quizzes
              </p>

              <Link
                to="/admin/all-quizzes"
                className="btn btn-secondary mt-auto"
              >
                View Quizzes
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
