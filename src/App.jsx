import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import PendingUsers from "./pages/PendingUsers";
import CreatorDashboard from "./pages/CreatorDashboard";
import MyQuizzes from "./pages/MyQuizzes";
import CreateQuiz from "./pages/CreateQuiz";
import AddQuestion from "./pages/AddQuestion";
import QuizList from "./pages/QuizList";
import AttemptQuiz from "./pages/AttemptQuiz";
import ResultPage from "./pages/ResultPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* DEFAULT ROUTE FIX */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/pending-users"
          element={
            <ProtectedRoute role="admin">
              <PendingUsers />
            </ProtectedRoute>
          }
        />

        {/* CREATOR */}
        <Route
          path="/creator"
          element={
            <ProtectedRoute role="creator">
              <CreatorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/creator/my-quizzes"
          element={
            <ProtectedRoute role="creator">
              <MyQuizzes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-quiz"
          element={
            <ProtectedRoute role="creator">
              <CreateQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-question/:quizId"
          element={
            <ProtectedRoute role="creator">
              <AddQuestion />
            </ProtectedRoute>
          }
        />

        {/* USER */}
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute role="user">
              <QuizList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attempt/:quizId"
          element={
            <ProtectedRoute role="user">
              <AttemptQuiz />
            </ProtectedRoute>
          }
        />
        <Route path="/leaderboard/:quizId" element={<Leaderboard />} />


        <Route
          path="/result"
          element={
            <ProtectedRoute role="user">
              <ResultPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;
