import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminQuizzes() {
  const { token } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);

  const loadQuizzes = async () => {
    try{
    const res = await axios.get(Endpoint.ADMIN_ALL_QUIZZES, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setQuizzes(res.data);
} catch(err){
    console.error("Failed to load admin quizzes:", err.response?.data || err.message);
}
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  return (
    <div className="container mt-5">
      <h2>All Quizzes</h2>

      <div className="row mt-4">
        {quizzes.map((q) => (
          <div className="col-md-4" key={q._id}>
            <div className="card shadow-sm p-3 mb-3">
              <h4>{q.title}</h4>
              <p>{q.description}</p>
              <p><b>Creator:</b> {q.createdBy?.name}</p>

              <Link
                className="btn btn-primary btn-sm"
                to={`/admin/questions/${q._id}`}
              >
                View Questions
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

