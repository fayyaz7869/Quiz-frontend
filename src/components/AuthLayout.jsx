

export default function AuthLayout({ children }) {
  return (
    <div className="container-fluid min-vh-100">
      <div className="row min-vh-100">

        {/* LEFT SIDE */}
        <div
          className="col-md-7 d-none d-md-flex align-items-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="p-5"
            style={{
              backgroundColor: "rgba(255,255,255,0.85)",
              marginLeft: "50px",
              maxWidth: "500px",
            }}
          >
            <h1 className="fw-bold text-dark">QuizApp 🎯</h1>
            <p className="fs-5 text-dark mt-3">
              Learn • Compete • Improve
            </p>
            <p className="text-dark opacity-75">
              Test your knowledge, track progress, and climb the leaderboard.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-5 d-flex align-items-center justify-content-center">
          <div className="w-75">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}

