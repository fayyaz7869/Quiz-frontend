import { useReducer } from "react";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import AuthLayout from "../components/AuthLayout";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../auth/firebase";
import { toastError, toastSuccess } from "../utils/toast";

export default function Register() {
  const [form, setForm] = useReducer(
    (state, next) => ({ ...state, ...next }),
    { name: "", email: "", password: "", desiredRole: "user" }
  );

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(Endpoint.REGISTER, form);
      toastSuccess("Registered! Wait for admin approval.");
    } catch (error) {
      toastError(error.response?.data?.message || "Registration failed");
    }
  };

  // 🔥 GOOGLE SIGNUP
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const googleUser = {
        name: result.user.displayName,
        email: result.user.email,
      };

      await axios.post(Endpoint.GOOGLE_LOGIN, googleUser);

      toastSuccess("Google signup successful! Wait for admin approval.");
    } catch (error) {
      toastError("Google signup failed");
    }
  };

  return (
    <AuthLayout>
      <h3 className="mb-2 fw-bold">Create your account</h3>
      <p className="text-muted mb-4">
        Join QuizApp and test your knowledge 🚀
      </p>

      <form onSubmit={handleRegister}>
        <input
          className="form-control mb-3"
          placeholder="Full Name"
          required
          onChange={(e) => setForm({ name: e.target.value })}
        />

        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email address"
          required
          onChange={(e) => setForm({ email: e.target.value })}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ password: e.target.value })}
        />

        <select
          className="form-select mb-3"
          onChange={(e) => setForm({ desiredRole: e.target.value })}
        >
          <option value="user">I want to take quizzes</option>
          <option value="creator">I want to create quizzes</option>
        </select>

        <button className="btn btn-dark w-100 py-2">
          Sign Up
        </button>
      </form>

      {/* OR divider */}
      <div className="text-center my-3 text-muted">OR</div>

      <GoogleAuthButton onClick={handleGoogleSignup} />

      <p className="text-center mt-4 small">
        Already have an account?{" "}
        <a href="/login" className="fw-semibold text-decoration-none">
          Login here
        </a>
      </p>
    </AuthLayout>
  );
}
