import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background:
          "linear-gradient(90deg, #141E30, #243B55)",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold text-white"
          to="/"
          style={{
            fontSize: "1.8rem",
          }}
        >
          🛒 ShopEZ
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <div className="navbar-nav ms-auto align-items-center">
            {isLoggedIn ? (
              <>
                <Link
                  className="nav-link text-white mx-2"
                  to="/"
                >
                  Home
                </Link>

                <Link
                  className="nav-link text-white mx-2"
                  to="/products"
                >
                  Products
                </Link>

                <Link
                  className="nav-link text-white mx-2"
                  to="/cart"
                >
                  🛒 Cart
                </Link>

                <Link
                  className="nav-link text-white mx-2"
                  to="/orders"
                >
                  Orders
                </Link>

                {user?.role === "ADMIN" && (
                  <Link
                    className="nav-link text-warning fw-bold mx-2"
                    to="/admin"
                  >
                    Admin
                  </Link>
                )}

                <span
                  className="badge bg-light text-dark mx-3 p-2"
                  style={{
                    fontSize: "0.9rem",
                  }}
                >
                  👤 {user?.name}
                </span>

                <button
                  className="btn btn-danger"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="nav-link text-white"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="btn btn-success ms-3"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;