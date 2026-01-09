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
    <div className="container py-5 mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          {/* MAGIC CARD CONTAINER */}
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden animate-fade-in">
            <div className="card-header bg-primary-gradient text-white p-4 text-center border-0">
              <h2 className="fw-bold mb-0">✨ Start Building ✨</h2>
              <p className="opacity-75 small mb-0">Bring your knowledge to the world</p>
            </div>
            
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleCreate}>
                <div className="mb-3">
                  <label className="form-label fw-bold text-muted small">QUIZ TITLE</label>
                  <input
                    className="form-control custom-input"
                    placeholder="e.g. Modern Web Development"
                    onChange={(e) => setForm({ title: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-muted small">DESCRIPTION</label>
                  <textarea
                    className="form-control custom-input"
                    rows="3"
                    placeholder="Briefly describe what this quiz covers..."
                    onChange={(e) => setForm({ description: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-muted small">DURATION (MIN)</label>
                    <input
                      className="form-control custom-input"
                      type="number"
                      placeholder="e.g. 15"
                      onChange={(e) => setForm({ duration: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-muted small">CATEGORY</label>
                    <input
                      className="form-control custom-input"
                      placeholder="e.g. Technology"
                      onChange={(e) => setForm({ category: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button className="btn btn-primary-gradient w-100 py-3 rounded-pill fw-bold shadow">
                    Create Quiz & Add Questions →
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-muted fst-italic">"Instruction is the best legacy."</p>
          </div>
        </div>
      </div>
    </div>
  );
}