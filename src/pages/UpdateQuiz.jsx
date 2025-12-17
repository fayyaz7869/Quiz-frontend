import { useEffect, useReducer, useContext } from "react";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [form, setForm] = useReducer((s, n) => ({ ...s, ...n }), {
    title: "",
    description: "",
    duration: "",
    category: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${Endpoint.GET_QUIZ}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm({
          title: res.data.quiz.title,
          description: res.data.quiz.description || "",
          duration: res.data.quiz.duration,
          category: res.data.quiz.category || "",
        });
      } catch (error) {
        alert("Failed to load quiz");
      }
    };
    load();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${Endpoint.UPDATE_QUIZ}/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Quiz updated");
      navigate("/creator/my-quizzes");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Quiz</h2>

      <form onSubmit={handleUpdate} className="mt-3">
        <input className="form-control mt-2" placeholder="Quiz Title" value={form.title} onChange={(e) => setForm({ title: e.target.value })} />
        <textarea className="form-control mt-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ description: e.target.value })} />
        <input className="form-control mt-2" type="number" placeholder="Duration (minutes)" value={form.duration} onChange={(e) => setForm({ duration: e.target.value })} />
        <input className="form-control mt-2" placeholder="Category" value={form.category} onChange={(e) => setForm({ category: e.target.value })} />
        <button className="btn btn-success mt-3">Update Quiz</button>
      </form>
    </div>
  );
}
