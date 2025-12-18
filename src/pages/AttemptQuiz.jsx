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

  const checkAttempt = async () => {
  const res = await axios.get(
    `${Endpoint.SUBMIT_QUIZ}/${quizId}/check`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (res.data.attempted) {
    toastError("You already attempted this quiz!")
    navigate("/dashboard"); // or anywhere you want
  }
};


  // Fetch quiz + questions
  const loadQuiz = async () => {
    try {
      const res = await axios.get(`${Endpoint.GET_QUIZ}/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setQuiz(res.data.quiz);
      setQuestions(res.data.questions);
      setTimeLeft(res.data.quiz.duration * 60);
    } catch (error) {
            toastError("Failed to load quiz")

    }
  };

  useEffect(() => {
    checkAttempt();
    loadQuiz();
  }, []);



useEffect(() => {
  // Don't start timer until quiz is loaded
  if (!quiz) return;

  if (timeLeft <= 0) {
    handleSubmit();
    return;
  }

  const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);

  return () => clearInterval(timer);
}, [timeLeft, quiz]);   // 👈 depend on quiz also


  // Format time (mm:ss)
  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Select answer
  const handleOption = (qId, index) => {
    setAnswers((prev) => ({ ...prev, [qId]: index }));
  };

  // // Submit quiz
  // const handleSubmit = async () => {
  //   const submitData = {
  //     answers: Object.keys(answers).map((questionId) => ({
  //       questionId,
  //       selectedOption: answers[questionId],
  //     })),
  //   };

  //   try {
  //     const res = await axios.post(
  //       `${Endpoint.SUBMIT_QUIZ}/${quizId}/submit`,
  //       submitData,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     navigate("/result", { state: res.data });
  //   } catch (error) {
  //     toastError("Error submitting quiz")
  //   }
  // };

const handleSubmit = async () => {
  if (!answers || Object.keys(answers).length === 0) {
    toast.error("Please answer at least one question");
    return;
  }

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
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate("/result", { state: res.data });
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Error submitting quiz"
    );
  }
};


  if (!quiz || questions.length === 0)
    return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">

      <h2>{quiz.title}</h2>
      <p className="text-muted">Time Left: {formatTime()}</p>

      <div className="card p-4 shadow-sm mt-4">
        <h4>
          Question {current + 1} / {questions.length}
        </h4>
        <p className="mt-3">{questions[current].questionText}</p>

        <div className="mt-3">
          {questions[current].options.map((opt, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`q-${questions[current]._id}`}
                checked={answers[questions[current]._id] === index}
                onChange={() =>
                  handleOption(questions[current]._id, index)
                }
              />
              <label className="form-check-label">{opt}</label>
            </div>
          ))}
        </div>

        <div className="mt-4 d-flex justify-content-between">

          <button
            className="btn btn-secondary"
            disabled={current === 0}
            onClick={() => setCurrent(current - 1)}
          >
            Previous
          </button>

          {current === questions.length - 1 ? (
            <button className="btn btn-success" onClick={handleSubmit}>
              Submit Quiz
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setCurrent(current + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
