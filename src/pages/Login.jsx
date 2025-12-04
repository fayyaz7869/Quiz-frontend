import { useState, useContext, useReducer } from "react";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { email: "", password: "" }
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(Endpoint.LOGIN, form);

      dispatch({
        type: "LOGIN",
        payload: {
          token: res.data.token,
          user: res.data.user,
        },
      });

      if (res.data.user.role === "admin") navigate("/admin");
      else navigate("/quizzes");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="mt-3">

        <input
          className="form-control mt-2"
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ email: e.target.value })}
        />

        <input
          className="form-control mt-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ password: e.target.value })}
        />

        <button className="btn btn-primary mt-3">Login</button>
      </form>
    </div>
  );
}
