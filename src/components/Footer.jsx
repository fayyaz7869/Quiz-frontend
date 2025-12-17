export default function Footer() {
  return (
    <footer className="footer bg-dark text-light fixed-bottom">
      <div className="container-fluid text-center py-2 small">
        © {new Date().getFullYear()} QuizApp |
        Learn • Compete • Improve
      </div>
    </footer>
  );
}
