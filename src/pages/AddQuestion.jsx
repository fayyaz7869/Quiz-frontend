import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { AuthContext } from "../context/AuthContext";
import { toastError, toastSuccess } from "../utils/toast";

export default function AddQuestion() {
  const { quizId } = useParams();
  const { token } = useContext(AuthContext);

  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${Endpoint.ADD_QUESTION}/${quizId}/add-question`,
        {
          questionText: text,
          options,
          correctAnswer: Number(correct),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

toastSuccess("Question added successful");
      setText("");
      setOptions(["", "", "", ""]);
    } catch (error) {
toastError(" failed to add question ");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Questions</h2>

      <form onSubmit={handleAdd} className="mt-3">

        <input
          className="form-control mt-2"
          placeholder="Question Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {options.map((opt, i) => (
          <input
            key={i}
            className="form-control mt-2"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
          />
        ))}

        <select
          className="form-control mt-2"
          value={correct}
          onChange={(e) => setCorrect(e.target.value)}
        >
          <option value="0">Correct Answer: Option 1</option>
          <option value="1">Correct Answer: Option 2</option>
          <option value="2">Correct Answer: Option 3</option>
          <option value="3">Correct Answer: Option 4</option>
        </select>

        <button className="btn btn-primary mt-3">Add Question</button>
      </form>
    </div>
  );
}
