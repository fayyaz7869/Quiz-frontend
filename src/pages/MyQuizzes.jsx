import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function MyQuizzes() {
  const { token, user } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);

  const loadQuizzes = async () => {
    try {
      const res = await axios.get(Endpoint.GET_QUIZZES,
        {
             headers: {
    Authorization: `Bearer ${token}`,
  }, 
        }
      );
      const filtered = res.data.filter(
        (quiz) => quiz.createdBy._id === user.id
      );
      setQuizzes(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Quizzes</h2>

      <div className="row mt-4">
        {quizzes.map((q) => (
          <div key={q._id} className="col-md-4">
            <div className="card p-3 shadow-sm mb-3">
              <h4>{q.title}</h4>
              <p>{q.description}</p>

              <Link className="btn btn-sm btn-info" to={`/add-question/${q._id}`}>
                Add More Questions
              </Link>
              <Link
  className="btn btn-sm btn-warning mt-2"
  to={`/leaderboard/${q._id}`}
>
  View Leaderboard
</Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
