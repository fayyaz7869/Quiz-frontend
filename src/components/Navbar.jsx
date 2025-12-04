import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        QuizApp
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">

          {!user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/pending-users">
                  Pending Users
                </Link>
              </li>
            </>
          )}

          {user && user.role === "creator" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/creator">
                  Creator Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/creator/my-quizzes">
                  My Quizzes
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/create-quiz">
                  Create Quiz
                </Link>
              </li>
            </>
          )}

          {user && user.role === "user" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/quizzes">
                  Quizzes
                </Link>
              </li>
            </>
          )}

          {user && (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-warning"
                href="#"
                id="userMenu"
                role="button"
                data-bs-toggle="dropdown"
              >
                {user.name}
              </a>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
