import { useReducer, useContext } from "react";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../utils/toast";

export default function CreateQuiz() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [form, setForm] = useReducer(
    (state, next) => ({ ...state, ...next }),
    {
      title: "",
      description: "",
      duration: "",
      category: "",
    }
  );

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(Endpoint.CREATE_QUIZ, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toastSuccess("Quiz created successfully!")
      navigate(`/add-question/${res.data.quiz._id}`);
    } catch (error) {
      toastError("Failed to create quiz")
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Quiz</h2>

      <form onSubmit={handleCreate} className="mt-3">

        <input
          className="form-control mt-2"
          placeholder="Quiz Title"
          onChange={(e) => setForm({ title: e.target.value })}
        />

        <textarea
          className="form-control mt-2"
          placeholder="Description"
          onChange={(e) => setForm({ description: e.target.value })}
        ></textarea>

        <input
          className="form-control mt-2"
          type="number"
          placeholder="Duration (minutes)"
          onChange={(e) => setForm({ duration: e.target.value })}
        />

        <input
          className="form-control mt-2"
          placeholder="Category (Optional)"
          onChange={(e) => setForm({ category: e.target.value })}
        />

        <button className="btn btn-success mt-3">Create Quiz</button>
      </form>
    </div>
  );
}
