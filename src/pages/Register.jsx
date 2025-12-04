import { useReducer } from "react";
import axios from "axios";
import Endpoint from "../api/EndPoint";

export default function Register() {
  const [form, setForm] = useReducer(
    (state, next) => ({ ...state, ...next }),
    { name: "", email: "", password: "", desiredRole: "user" }
  );

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(Endpoint.REGISTER, form);
      alert("Registered! Wait for admin approval.");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <input
          className="form-control mt-2"
          placeholder="Name"
          onChange={(e) => setForm({ name: e.target.value })}
        />

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

        <select
          className="form-control mt-2"
          onChange={(e) => setForm({ desiredRole: e.target.value })}
        >
          <option value="user">Normal User</option>
          <option value="creator">Quiz Creator</option>
        </select>

        <button className="btn btn-success mt-3">Register</button>
      </form>
    </div>
  );
}
