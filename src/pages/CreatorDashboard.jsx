import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function CreatorDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container py-5">
      {/* MAGIC HERO SECTION */}
      <div className="card border-0 rounded-4 shadow-lg mb-5 overflow-hidden">
        <div className="card-body p-5 text-white" 
             style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-5 fw-bold mb-2">Welcome, Quiz Master! 🚀</h1>
              <p className="lead opacity-75 mb-0">Logged in as: {user?.email}</p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <div className="display-1 opacity-25">✨</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-5">
        <figure>
          <blockquote className="blockquote">
            <p className="text-dark fw-medium">"Knowledge is power. Sharing it is a superpower."</p>
          </blockquote>
          <figcaption className="blockquote-footer mt-1">
            Inspire your students today
          </figcaption>
        </figure>
      </div>

      <div className="row justify-content-center g-4">
        {/* CREATE QUIZ CARD */}
        <div className="col-md-6 col-lg-5">
          <div className="card dashboard-card border-0 shadow-sm rounded-4 h-100 transition-hover">
            <div className="card-body p-5 text-center d-flex flex-column">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center bg-primary bg-gradient text-white fs-2 mb-4 rounded-3 mx-auto" style={{width: "80px", height: "80px"}}>
                📝
              </div>
              <h3 className="fw-bold">Create New Quiz</h3>
              <p className="text-muted flex-grow-1">
                Design engaging questions and challenge your audience with new topics.
              </p>
              <Link
                to="/create-quiz"
                className="btn btn-primary btn-lg rounded-pill mt-4 shadow-sm"
              >
                + Start Building
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-5">
          <div className="card dashboard-card border-0 shadow-sm rounded-4 h-100 transition-hover">
            <div className="card-body p-5 text-center d-flex flex-column">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center bg-dark bg-gradient text-white fs-2 mb-4 rounded-3 mx-auto" style={{width: "80px", height: "80px"}}>
                📚
              </div>
              <h3 className="fw-bold">My Collection</h3>
              <p className="text-muted flex-grow-1">
                Review your existing quizzes, track performance, and make updates.
              </p>
              <Link
                to="/creator/my-quizzes"
                className="btn btn-outline-dark btn-lg rounded-pill mt-4 shadow-sm"
              >
                View Library
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-5 text-center">
        <p className="text-muted small">✨ Tip: Adding clear descriptions helps users choose your quiz! ✨</p>
      </div>
    </div>
  );
}