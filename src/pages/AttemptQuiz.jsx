import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { AuthContext } from "../context/AuthContext";
import { toastError } from "../utils/toast";

export default function AttemptQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const checkAttempt = async () => {
    try {
      const res = await axios.get(
        `${Endpoint.SUBMIT_QUIZ}/${quizId}/check`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.attempted) {
        toastError("You already attempted this quiz!");
        navigate("/dashboard");
      }
    } catch (e) { console.error(e); }
  };

  const loadQuiz = async () => {
    try {
      const res = await axios.get(`${Endpoint.GET_QUIZ}/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuiz(res.data.quiz);
      setQuestions(res.data.questions);
      setTimeLeft(res.data.quiz.duration * 60);
    } catch (error) {
      toastError("Failed to load quiz");
    }
  };

  useEffect(() => {
    checkAttempt();
    loadQuiz();
  }, []);

  useEffect(() => {
    if (!quiz || submitted || questions.length === 0) return;
    if (timeLeft <= 0) {
      setSubmitted(true);
      handleSubmit(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quiz, submitted, questions]);

  const handleOption = (qId, index) => {
    setAnswers((prev) => ({ ...prev, [qId]: index }));
  };

  const handleSubmit = async (auto = false) => {
    if (submitted) return;
    if (!auto && Object.keys(answers).length === 0) {
      toastError("Please answer at least one question");
      return;
    }
    setSubmitted(true);
    const submitData = {
      answers: Object.keys(answers).map((questionId) => ({
        questionId,
        selectedOption: answers[questionId],
      })),
    };

    try {
      const res = await axios.post(
        `${Endpoint.SUBMIT_QUIZ}/${quizId}/submit`,
        submitData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/result", { state: res.data });
    } catch (error) {
      toastError(error.response?.data?.message || "Error submitting quiz");
      setSubmitted(false);
    }
  };

  // Fixed the condition to check the "questions" array directly
  if (!quiz || questions.length === 0) {
    return <div className="text-center mt-5">✨ Preparing your quiz... ✨</div>;
  }

  const currentQuestion = questions[current];

  return (
    <div className="container py-5 mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="badge bg-purple-gradient px-4 py-2 rounded-pill shadow-sm">
              Question {current + 1} / {questions.length}
            </span>
            <div className="timer-box shadow-sm fw-bold">
               ⏱ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          </div>

          <div className="card border-0 shadow-lg rounded-4 p-4 mb-4 question-card-animation" key={current}>
            <div className="card-body">
              <h3 className="fw-bold mb-4 text-dark-emphasis">
                {currentQuestion.questionText}
              </h3>

              <div className="options-grid">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    // Updated className to use answers[currentQuestion._id]
                    className={`option-btn ${answers[currentQuestion._id] === idx ? "selected" : ""}`}
                    onClick={() => handleOption(currentQuestion._id, idx)}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                    <span className="option-text">{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-light rounded-pill px-4 shadow-sm"
              disabled={current === 0}
              onClick={() => setCurrent(current - 1)}
            >
              ← Previous
            </button>

            {current < questions.length - 1 ? (
              <button
                className="btn btn-primary-gradient rounded-pill px-5 shadow"
                onClick={() => setCurrent(current + 1)}
              >
                Next Step →
              </button>
            ) : (
              <button
                className="btn btn-success-gradient rounded-pill px-5 shadow"
                onClick={() => handleSubmit(false)}
              >
                ✨ Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}