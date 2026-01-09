import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const { user, token } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("all");

  const loadQuizzes = async () => {
    try {
      const res = await axios.get(Endpoint.GET_QUIZZES, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setQuizzes(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleCategoryChange = (value) => {
    setCategory(value);
    if (value === "all") setFiltered(quizzes);
    else setFiltered(quizzes.filter((q) => q.category === value));
  };

return (
  <div className="container py-5">
    {/* Hero Section with Gradient */}
    <div className="p-5 mb-5 text-white rounded-4 shadow-lg" 
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <h1 className="display-5 fw-bold">Hello, {user?.name || 'Explorer'}! 👋</h1>
      <p className="lead opacity-75">Ready to crush some quizzes today?</p>
    </div>

    {/* Filtering Section */}
    <div className="row align-items-center mb-5 bg-light p-3 rounded-3 mx-0 shadow-sm">
      <div className="col-md-6">
        <h3 className="mb-0 fw-bold">Available Challenges</h3>
      </div>
      <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
        <select
          className="form-select w-auto border-0 shadow-sm"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="all">🎯 All Topics</option>
          <option value="Technology">💻 Technology</option>
          <option value="General Knowledge">🌍 General Knowledge</option>
          <option value="Science">🔬 Science</option>
          <option value="Math">🔢 Math</option>
        </select>
      </div>
    </div>

    {/* Quiz Grid */}
    <div className="row g-4">
      {filtered.map((quiz) => (
        <div key={quiz._id} className="col-md-6 col-lg-4">
          <div className="card h-100 p-2 rounded-4">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2">
                  {quiz.category}
                </span>
                <small className="text-muted fw-bold">⏱ {quiz.duration}m</small>
              </div>
              <h4 className="card-title fw-bold">{quiz.title}</h4>
              <p className="text-muted flex-grow-1">{quiz.description}</p>
              
              <div className="pt-3 border-top">
                <div className="d-flex gap-2">
                  <Link to={`/attempt/${quiz._id}`} className="btn btn-primary rounded-pill flex-grow-1 py-2">
                    Start Quiz
                  </Link>
                  <Link to={`/leaderboard/${quiz._id}`} className="btn btn-outline-secondary rounded-pill px-3">
                    🏆
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}


