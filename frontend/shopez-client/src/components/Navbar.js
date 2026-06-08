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
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ShopEZ
        </Link>

        <div className="navbar-nav ms-auto">
          {isLoggedIn ? (
            <>
              <Link className="nav-link" to="/">
                Home
              </Link>

              <Link className="nav-link" to="/products">
                Products
              </Link>

              <Link className="nav-link" to="/cart">
                Cart
              </Link>

              <Link className="nav-link" to="/orders">
                Orders
              </Link>

              {user?.role === "ADMIN" && (
                <Link
                  className="nav-link"
                  to="/admin"
                >
                  Admin
                </Link>
              )}

              <button
                className="btn btn-danger ms-3"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>

              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;