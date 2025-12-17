// AdminQuestions.jsx
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { AuthContext } from "../context/AuthContext";

export default function AdminQuestions() {
  const { quizId } = useParams();
  const { token } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);

  const loadQuestions = async () => {
    try {
      const res = await axios.get(
        `${Endpoint.ADMIN_QUIZ_QUESTIONS}/${quizId}/questions`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestions(res.data);
    } catch (err) {
      console.error("Failed to load admin questions:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [quizId]);

  return (
    <div className="container mt-5">
      <h2>Questions for Quiz</h2>
      {questions.map((q, i) => (
        <div className="card p-3 mt-3" key={q._id}>
          <h5>Q{i + 1}: {q.questionText}</h5>
          <ul>
            {q.options.map((opt, index) => (
              <li key={index}>{opt}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
