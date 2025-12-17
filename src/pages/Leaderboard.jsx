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
    <div className="container mt-5">
      <h2>Leaderboard</h2>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={r._id}>
              <td>{i + 1}</td>
              <td>{r.userId.name}</td>
              <td>{r.score}</td>
              <td>{r.totalQuestions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
