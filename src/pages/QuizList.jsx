import { useEffect, useState } from "react";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { Link } from "react-router-dom";
import { toastError } from "../utils/toast";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  const loadQuizzes = async () => {
    try {
      const res = await axios.get(Endpoint.GET_QUIZZES);
      setQuizzes(res.data);
    } catch (error) {
      console.log(error);
      toastError("Failed to load quizzes");
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Available Quizzes</h2>
      <div className="row mt-4">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="col-md-4">
            <div className="card p-3 shadow-sm mb-3">
              <h4>{quiz.title}</h4>
              <p>{quiz.description}</p>
              <p className="text-muted">Duration: {quiz.duration} mins</p>

              <Link
                className="btn btn-primary"
                to={`/attempt/${quiz._id}`}
              >
                Start Quiz
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
