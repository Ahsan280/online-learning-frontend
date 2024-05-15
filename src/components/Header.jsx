import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { useNavigate } from "react-router-dom";
function Header() {
  const { user, logoutUser } = useContext(AuthContext);
  const [isInstructor, setIsInstructor] = useState(false);
  const [search, setSearch] = useState("");
  const api = useAxios();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/search/${search}`;
  };
  useEffect(() => {
    const alreadyInstructor = () => {
      api.get(`main/instructor-by-user/${user.user_id}/`).then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          setIsInstructor(true);
        }
      });
    };
    if (user != null) {
      alreadyInstructor();
    }
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Online Learning Platform
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link onClick={logoutUser} className="nav-link" href="#">
                    Logout
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.full_name}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link to="/dashboard" className="dropdown-item" href="#">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/enrolled_courses" className="dropdown-item">
                        Enrolled Courses
                      </Link>
                    </li>

                    <li>
                      {!isInstructor && (
                        <Link
                          to="/instructor-register"
                          className="dropdown-item"
                        >
                          Become An Instructor
                        </Link>
                      )}
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" href="#">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/register" className="nav-link" href="#">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          <form className="d-flex">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
              />
              <button
                className="btn btn-success"
                onClick={(e) => {
                  handleSearch(e);
                }}
                type="button"
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
