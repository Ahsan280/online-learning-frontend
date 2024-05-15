import React, { useContext, useState } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const swal = require("sweetalert2");
function ProfileSettings() {
  const api = useAxios();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [full_name, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("profile_picture", profilePicture);
    api.post(`update-profile/${user.user_id}/`, formData).then((response) => {
      if (response.data.status === "success") {
        navigate("/dashboard");
        swal.fire({
          title: "Profile Updated Successfully",
          icon: "success",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        swal.fire({
          title: "Something went wrong",
          icon: "error",
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <SideBar />
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Update Profile</h5>
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={full_name}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Profile Picture</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      setProfilePicture(e.target.files[0]);
                    }}
                    className="form-control"
                  />
                </div>

                <button
                  onClick={(e) => {
                    handleUpdate(e);
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
