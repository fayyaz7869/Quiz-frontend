
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          QuizApp
        </Link>

        {/* ✅ TOGGLER (MOST IMPORTANT) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            {/* NOT LOGGED IN */}
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

            {/* LOGGED IN */}
            {user && (
              <>
                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/dashboard">
                      Admin Dashboard
                    </Link>
                  </li>
                )}

                {user.role === "creator" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/creator/dashboard">
                      Creator Dashboard
                    </Link>
                  </li>
                )}

                {user.role === "user" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/dashboard">
                      Dashboard
                    </Link>
                  </li>
                )}

                <li className="nav-item mt-2 mt-lg-0 ms-lg-3">
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger btn-sm w-100"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

