import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminQuizzes() {
  const { token } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);

  const loadQuizzes = async () => {
    try {
      const res = await axios.get(Endpoint.ADMIN_ALL_QUIZZES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(res.data);
    } catch (err) {
      console.error("Failed to load admin quizzes:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="fw-bold m-0">📚 All Platform Quizzes</h2>
        <span className="badge bg-primary rounded-pill px-3 py-2">Total: {quizzes.length}</span>
      </div>

      <div className="row g-4">
        {quizzes.map((q) => (
          <div className="col-md-6 col-lg-4" key={q._id}>
            <div className="card h-100 border-0 shadow-sm rounded-4 hover-lift">
              <div className="card-body p-4 d-flex flex-column">
                <div className="d-flex justify-content-between mb-2">
                  <span className="badge bg-light text-primary border border-primary-subtle">
                    {q.category || "General"}
                  </span>
                </div>
                
                <h4 className="fw-bold text-dark">{q.title}</h4>
                <p className="text-muted small flex-grow-1">{q.description}</p>
                
                <div className="py-3 border-top mt-3">
                  <p className="small mb-3">
                    <span className="text-muted">Creator:</span> <b>{q.createdBy?.name || "Admin"}</b>
                  </p>
                  
                  <div className="d-grid gap-2">
                    <Link to={`/admin/questions/${q._id}`} className="btn btn-outline-primary btn-sm rounded-pill">
                      ⚙️ Manage Questions
                    </Link>
                    {/* LEADERBOARD OPTION ADDED HERE */}
                    <Link to={`/leaderboard/${q._id}`} className="btn btn-outline-info btn-sm rounded-pill">
                      🏆 View Leaderboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}