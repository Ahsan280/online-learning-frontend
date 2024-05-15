import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
function Register() {
  const { registerUser, user } = useContext(AuthContext);
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    await registerUser(full_name, password, password2, email, username);
    setLoading(false);
  };
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card shadow mb-5 bg-body ">
            <div className="card-body bg-dark text-white rounded">
              <h5 class="card-title mb-3">Register</h5>

              <label className="form-label" htmlFor="">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={full_name}
                className="form-control"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />

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
              <label className="form-label" htmlFor="">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                className="form-control"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />

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

              <label className="form-label" htmlFor="">
                Confirm Password
              </label>
              <input
                className="form-control mb-3"
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
              />
              {!loading && (
                <button
                  type="button"
                  className="btn btn-success fw-semibold"
                  onClick={handleRegister}
                >
                  Register
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

              <p>
                Already have an account?
                <span>
                  <Link to="/login" className="ms-1">
                    Login
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

export default Register;
