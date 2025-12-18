import { useLocation, Link } from "react-router-dom";

export default function ResultPage() {
  const { state } = useLocation();

  if (!state)
    return <div className="container mt-5">No result data available.</div>;

  return (
    <div className="container mt-5">
      <h2>Quiz Result 🎉</h2>

      <div className="card p-4 shadow-sm mt-4">
        <h3>Score: {state.score} / {state.totalQuestions}</h3>
        <h4>Percentage: {state.percentage.toFixed(2)}%</h4>

        <Link to="/quizzes" className="btn btn-primary mt-3">
          Back to Quizzes
        </Link>

        {/* ✅ FIXED */}
        <Link
          to={`/leaderboard/${state.quizId}`}
          className="btn btn-secondary mt-3 ms-2"
        >
          View Leaderboard
        </Link>
      </div>
    </div>
  );
}
