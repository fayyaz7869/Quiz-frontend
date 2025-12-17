
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

      // If creator role -> show ALL quizzes
      if (user?.role === "creator" || user?.role === "admin") {
        setQuizzes(res.data);
      } else {
        // normal user (shouldn't be able to edit) - show only their created ones
        const filtered = res.data.filter(
          (quiz) => quiz.createdBy && quiz.createdBy._id === user?.id
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
            <div className="card p-3 shadow-sm mb-3">
              <h4>{q.title}</h4>
              <p>{q.description}</p>
              <p className="text-muted">By: {q.createdBy?.name || "Unknown"}</p>

              <Link className="btn btn-sm btn-info me-2" to={`/add-question/${q._id}`}>
                Add Question
              </Link>

              <Link className="btn btn-sm btn-primary me-2" to={`/attempt/${q._id}`}>
                Start
              </Link>

              {/* Only show Edit/Delete to creators and admin */}
              {(user?.role === "creator" || user?.role === "admin") && (
                <>
                  <Link className="btn btn-sm btn-warning me-2" to={`/update-quiz/${q._id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(q._id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
