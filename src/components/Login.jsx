import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const { loginUser, user } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await loginUser(email, password);
    setLoading(false);
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card shadow mb-5 bg-body ">
            <div className="card-body bg-dark text-white rounded">
              <h5 class="card-title mb-3">Login</h5>

              <label className="form-label" htmlFor="">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <label className="form-label" htmlFor="">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              {!loading && (
                <button
                  type="button"
                  className="btn btn-success fw-semibold"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}

              {loading && (
                <>
                  <button
                    class="btn btn-success fw-semibold"
                    type="button"
                    disabled
                  >
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Loading...</span>
                  </button>
                </>
              )}
              <br />
              <br />
              <p>
                Don't have an account?
                <span>
                  <Link to="/register" className="ms-1">
                    Register
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
