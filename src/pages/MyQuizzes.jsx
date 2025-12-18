
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../utils/toast";

export default function MyQuizzes() {
  const { token, user } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const loadQuizzes = async () => {
    try {
      const res = await axios.get(Endpoint.GET_QUIZZES, {
        headers: { Authorization: `Bearer ${token}` },
      });

 
      if (user?.role === "admin") {
  setQuizzes(res.data);
} else {
  // creator → only their quizzes
  const filtered = res.data.filter(
    (quiz) => quiz.createdBy?._id === user?._id
  );
  setQuizzes(filtered);
}

    } catch (error) {
      console.error(error);
      toastError("Failed to load quizzes");
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this quiz?")) return;
  try {
    await axios.delete(`${Endpoint.DELETE_QUIZ}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toastSuccess("Quiz deleted");
    loadQuizzes();
  } catch (error) {
    console.error("Delete error:", error.response?.data || error.message);
    toastError(error.response?.data?.message || "Delete failed");
  }
};


  return (
    <div className="container mt-5">
      <h2>Quizzes</h2>

      <div className="row mt-4">
        {quizzes.map((q) => (
          <div key={q._id} className="col-md-4">
<div className="card shadow-sm h-100 border-0 rounded-4 mb-4">
  <div className="card-body d-flex flex-column">

    <h5 className="fw-bold text-primary">{q.title}</h5>
    <p className="text-muted small">{q.description}</p>

    <span className="text-muted small mb-3">
      👤 By: {q.createdBy?.name || "Unknown"}
    </span>

    <div className="mt-auto d-grid gap-2">

      <Link
        to={`/add-question/${q._id}`}
        className="btn btn-outline-info btn-sm rounded-pill"
      >
        ➕ Add Questions
      </Link>

   

      <Link
        to={`/leaderboard/${q._id}`}
        className="btn btn-outline-dark btn-sm rounded-pill"
      >
        🏆 View Leaderboard
      </Link>

      {(user?.role === "creator" || user?.role === "admin") && (
        <div className="d-flex gap-2 mt-2">
          <Link
            to={`/update-quiz/${q._id}`}
            className="btn btn-warning btn-sm w-50 rounded-pill"
          >
            ✏ Edit
          </Link>

          <button
            onClick={() => handleDelete(q._id)}
            className="btn btn-danger btn-sm w-50 rounded-pill"
          >
            🗑 Delete
          </button>
        </div>
      )}

    </div>
  </div>
</div>

          </div>
        ))}
      </div>
    </div>
  );
}
