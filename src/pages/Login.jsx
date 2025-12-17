import AuthLayout from "../components/AuthLayout";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../auth/firebase";

import { useState, useContext, useReducer } from "react";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toastError } from "../utils/toast";
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

      // if (res.data.user.role === "admin") navigate("/admin");
      // else navigate("/quizzes");

      if (res.data.user.role === "admin") {
  navigate("/admin/dashboard");
} 
else if (res.data.user.role === "creator") {
  navigate("/creator/dashboard");
} 
else {
  navigate("/user/dashboard");
}

    } catch (error) {
      toastError(error.response?.data?.message || "Login failed");
    }
  };

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const googleUser = {
      name: result.user.displayName,
      email: result.user.email,
    };

    const res = await axios.post(Endpoint.GOOGLE_LOGIN, googleUser);

    // ✅ ONLY APPROVED USERS REACH HERE
    dispatch({
      type: "LOGIN",
      payload: {
        token: res.data.token,
        user: res.data.user,
      },
    });

    if (res.data.user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (res.data.user.role === "creator") {
      navigate("/creator/dashboard");
    } else {
      navigate("/user/dashboard");
    }

  } catch (error) {
    // 🟡 Google signup but not approved
    if (error.response?.status === 403) {
      toastError(error.response.data.message);
    } else {
      toastError("Google login failed");
    }
  }
};



return (
    <AuthLayout>
      <h3 className="mb-3">Log in to your account</h3>

      <form onSubmit={handleLogin}>

        <input
          className="form-control mt-2"
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setForm({ email: e.target.value })}
        />

        <input
          className="form-control mt-2"
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ password: e.target.value })}
        />

        <button className="btn btn-dark w-100 mt-3">
          Continue
        </button>
      </form>

<div className="d-flex align-items-center my-3">
  <hr className="flex-grow-1" />
  <span className="mx-2 text-muted">OR</span>
  <hr className="flex-grow-1" />
</div>

      <GoogleAuthButton onClick={handleGoogleLogin} />

    </AuthLayout>
  );

}
