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

  // Load all quizzes
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

  // Filter quizzes by category
  const handleCategoryChange = (value) => {
    setCategory(value);
    if (value === "all") setFiltered(quizzes);
    else setFiltered(quizzes.filter((q) => q.category === value));
  };

  return (
    <div className="container py-4">

      {/* Welcome Banner */}
      <div className="p-4 mb-4 bg-primary text-white rounded shadow-sm">
        <h2>Welcome, {user?.name} 👋</h2>
        <p>Ready to challenge yourself? Explore quizzes and test your skills!</p>
      </div>

      {/* Stats Section */}
      <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="p-3 bg-white shadow-sm rounded">
            <h4>Total Quizzes</h4>
            <h2 className="text-primary">{quizzes.length}</h2>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Available Quizzes</h3>

        <select
          className="form-select w-auto"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="General Knowledge">General Knowledge</option>
          <option value="Science">Science</option>
          <option value="Math">Math</option>
        </select>
      </div>

      {/* Quiz Cards */}
      <div className="row">
        {filtered.map((quiz) => (
          <div key={quiz._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 quiz-card border-0">
              <div className="card-body d-flex flex-column">

                <h4 className="card-title text-primary">{quiz.title}</h4>
                <p className="text-muted">{quiz.description}</p>

                <span className="badge bg-secondary mb-2">
                  {quiz.category}
                </span>

                <p className="mb-2">
                  Duration: <b>{quiz.duration} min</b>
                </p>

                <div className="mt-auto d-flex justify-content-between">
                  <span className="text-muted small">
                    Creator: {quiz.createdBy?.name}
                  </span>

                  <Link
                    to={`/attempt/${quiz._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Start Quiz →
                  </Link>
                </div>

              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center mt-5">
            <h5>No quizzes found</h5>
            <p>Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
}


