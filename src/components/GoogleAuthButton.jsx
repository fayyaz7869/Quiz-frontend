export default function GoogleAuthButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-outline-dark w-100 mt-2 d-flex align-items-center justify-content-center gap-2"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        width="18"
      />
      Continue with Google
    </button>
  );
}
