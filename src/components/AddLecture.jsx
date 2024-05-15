import React, { useContext, useState } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const swal = require("sweetalert2");
function AddLecture() {
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const { course_id } = useParams();
  const [lectureName, setLectureName] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddLecture = (e) => {
    e.preventDefault();
    const formData = new FormData();
    setLoading(true);
    formData.append("course", course_id);
    formData.append("name", lectureName);
    formData.append("video", video);
    formData.append("is_available_to", [user.user_id]);

    try {
      api
        .post("main/add-lecture/", formData)
        .then((response) => {
          console.log(response);
          swal.fire({
            title: "Lecture Added Successfully",
            icon: "success",
            toast: true,
            timer: 5000,
            timerProgressBar: true,
            position: "top-right",
            showConfirmButton: false,
            showCancelButton: false,
          });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response);
          swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            toast: true,
            timer: 5000,
            timerProgressBar: true,
            position: "top-right",
            showConfirmButton: false,
            showCancelButton: false,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <SideBar />
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Lecture</h5>
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">Lecture Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lectureName}
                    onChange={(e) => {
                      setLectureName(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Lecture Video</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      setVideo(e.target.files[0]);
                    }}
                    className="form-control"
                  />
                </div>
                {!loading && (
                  <button
                    onClick={(e) => {
                      handleAddLecture(e);
                    }}
                    type="button"
                    className="btn btn-primary mb-5"
                  >
                    Add Lecture
                  </button>
                )}

                {loading && (
                  <>
                    <button
                      class="btn btn-primary fw-semibold"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLecture;
