import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container py-5">
      {/* Header Card */}
      <div className="card border-0 rounded-4 shadow-sm mb-5 overflow-hidden">
        <div className="card-body p-5 text-white" 
             style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
          <h2 className="fw-bold mb-1">Welcome, Admin 👋</h2>
          <p className="opacity-75 mb-0">{user?.email}</p>
        </div>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Pending Users Card */}
        <div className="col-md-5 col-lg-4">
          <div className="card dashboard-card h-100 border-0 shadow-sm rounded-4 text-center">
            <div className="card-body p-4 d-flex flex-column">
              <div className="display-4 mb-3">👥</div>
              <h5 className="fw-bold">Pending Approvals</h5>
              <p className="text-muted flex-grow-1">
                Review and approve new creator registrations to keep the platform growing.
              </p>
              <Link to="/admin/pending-users" className="btn btn-primary rounded-pill py-2 mt-auto">
                Manage Users
              </Link>
            </div>
          </div>
        </div>

        {/* Quizzes Management Card */}
        <div className="col-md-5 col-lg-4">
          <div className="card dashboard-card h-100 border-0 shadow-sm rounded-4 text-center">
            <div className="card-body p-4 d-flex flex-column">
              <div className="display-4 mb-3">📝</div>
              <h5 className="fw-bold">Quiz Library</h5>
              <p className="text-muted flex-grow-1">
                Monitor all platform quizzes, manage questions, and view performance results.
              </p>
              <Link to="/admin/all-quizzes" className="btn btn-secondary rounded-pill py-2 mt-auto">
                View Quizzes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}