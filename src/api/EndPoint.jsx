const BASE_URL = "http://localhost:5000/api";

export default {
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,

  // Admin
  PENDING_USERS: `${BASE_URL}/admin/pending-users`,
  APPROVE_USER: `${BASE_URL}/admin/approve-user`,
  REJECT_USER: `${BASE_URL}/admin/reject-user`,
  LEADERBOARD: `${BASE_URL}/leaderboard`,

  // Quiz
  CREATE_QUIZ: `${BASE_URL}/quiz/create`,
  ADD_QUESTION: `${BASE_URL}/question`,
  GET_QUIZZES: `${BASE_URL}/quiz/all`,
  GET_QUIZ: `${BASE_URL}/quiz`,
  SUBMIT_QUIZ: `${BASE_URL}/attempt`,
};
