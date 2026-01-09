import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Endpoint from "../api/EndPoint";
import { useParams } from "react-router-dom";

export default function Leaderboard() {
  const { quizId } = useParams();
  const { token } = useContext(AuthContext);

  const [results, setResults] = useState([]);

  const loadLeaderboard = async () => {
    const res = await axios.get(
      `${Endpoint.LEADERBOARD}/${quizId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setResults(res.data);
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
    <div className="container py-5">
      {/* HEADER SECTION WITH GRADIENT */}
      <div className="text-center mb-5 p-4 rounded-4 shadow-sm" 
           style={{ background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)', color: 'white' }}>
        <h1 className="fw-bold mb-2">🏆 Hall of Fame</h1>
        <p className="fst-italic opacity-75 mb-0">
          "Success is not final, failure is not fatal: it is the courage to continue that counts."
        </p>
      </div>

      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 border-0">Rank</th>
                <th className="py-3 border-0">User</th>
                <th className="py-3 border-0">Score</th>
                <th className="py-3 border-0 text-center">Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={r._id} className={i === 0 ? "table-warning-custom" : ""}>
                  <td className="px-4">
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                  </td>
                  <td className="fw-bold text-primary">
                    {r.userId.name}
                  </td>
                  <td>
                    <span className="badge rounded-pill bg-success px-3 py-2">
                      {r.score} / {r.totalQuestions}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="progress" style={{ height: "8px", minWidth: "100px" }}>
                      <div 
                        className="progress-bar bg-info" 
                        style={{ width: `${(r.score / r.totalQuestions) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-5 text-center text-muted">
        <p>✨ Keep learning, keep growing! Every attempt is a step closer to mastery. ✨</p>
      </div>
    </div>
  );
}