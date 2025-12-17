 const BASE_URL = "https://quiz-backend-1bjx.onrender.com/api";
export default {
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
GOOGLE_LOGIN: `${BASE_URL}/auth/google`,
  // Admin
  PENDING_USERS: `${BASE_URL}/admin/pending-users`,
  APPROVE_USER: `${BASE_URL}/admin/approve-user`,
  REJECT_USER: `${BASE_URL}/admin/reject-user`,
  LEADERBOARD: `${BASE_URL}/leaderboard`,
ADMIN_ALL_QUIZZES: `${BASE_URL}/admin/all-quizzes`,
ADMIN_QUIZ_QUESTIONS: `${BASE_URL}/admin/quiz`,

  // Quiz
  CREATE_QUIZ: `${BASE_URL}/quiz/create`,
  ADD_QUESTION: `${BASE_URL}/question`,
  GET_QUIZZES: `${BASE_URL}/quiz/all`,
  GET_QUIZ: `${BASE_URL}/quiz`,
  UPDATE_QUIZ: `${BASE_URL}/quiz/update`,
  DELETE_QUIZ: `${BASE_URL}/quiz/delete`, 
  SUBMIT_QUIZ: `${BASE_URL}/attempt`,
};
