import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import useAxios from "../utils/useAxios";
const swal = require("sweetalert2");
function InstructorRegister() {
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [profile_picture, setProfilePicture] = useState(null);
  const [qualifications, setQualifications] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("user", user.user_id);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("profile_picture", profile_picture);
    formData.append("qualifications", qualifications);
    try {
      const response = await api.post("main/create-instructor/", formData);
      setLoading(true);
      navigate("/");
      swal.fire({
        title: "Congratulations! You Have Become An Instructor",
        icon: "success",
        toast: true,
        timer: 5000,
        position: "top-right",
        timerProgressBar: true,
      });
    } catch (eroor) {
      swal.fire({
        title: "An Error Occured",
        icon: "eroor",
        toast: true,
        timer: 5000,
        position: "top-right",
        timerProgressBar: true,
      });
    }
  };
  useEffect(() => {
    const alreadyInstructor = () => {
      api.get(`main/instructor-by-user/${user.user_id}/`).then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          navigate("/");
        }
      });
    };
    alreadyInstructor();
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card shadow mb-5 bg-body ">
            <div className="card-body bg-dark text-white rounded">
              <h5 className="card-title mb-3">Become An Instructor</h5>

              <label className="form-label" htmlFor="">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={full_name}
                className="form-control"
                required
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
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="form-label" htmlFor="">
                Describe Yourself
              </label>
              <input
                type="text"
                name="description"
                value={description}
                className="form-control"
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <label className="form-label" htmlFor="">
                Profile Picture
              </label>
              <input
                type="file"
                name="profile_picture"
                className="form-control"
                required
                onChange={(e) => {
                  setProfilePicture(e.target.files[0]);
                }}
              />
              <label className="form-label" htmlFor="">
                Qualifications
              </label>
              <input
                type="text"
                name="qualifications"
                value={qualifications}
                className="form-control"
                required
                onChange={(e) => {
                  setQualifications(e.target.value);
                }}
              />

              {!loading && (
                <button
                  type="button"
                  className="btn btn-success fw-semibold mt-3"
                  onClick={handleRegister}
                >
                  Become An Instructor
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorRegister;
