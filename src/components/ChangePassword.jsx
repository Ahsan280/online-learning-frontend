import React, { useContext, useState } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import SideBar from "./SideBar";

const swal = require("sweetalert2");
function ChangePassword() {
  const api = useAxios();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const handleChangePassword = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("old_password", oldPassword);
    formData.append("password", password);
    formData.append("password2", password2);
    api.post(`change-password/${user.user_id}/`, formData).then((response) => {
      if (response.data.message === "Password changed successfully") {
        navigate("/dashboard");
        swal.fire({
          title: response.data.message,
          toast: true,
          icon: "success",
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        swal.fire({
          title: response.data.message,
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
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Change Password</h5>
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password2}
                    onChange={(e) => {
                      setPassword2(e.target.value);
                    }}
                  />
                </div>

                <button
                  onClick={(e) => {
                    handleChangePassword(e);
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
