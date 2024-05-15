import React, { useContext, useState } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import { useEffect } from "react";
function SideBar() {
  const api = useAxios();
  const [isInstructor, setIsInstructor] = useState(false);
  const [instructorData, setInstructorData] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const GetInstructor = () => {
      api.get(`main/instructor-by-user/${user.user_id}/`).then((response) => {
        setInstructorData(response.data);
      });
    };
    const alreadyInstructor = () => {
      api.get(`main/instructor-by-user/${user.user_id}/`).then((response) => {
        if (response.data.length > 0) {
          setIsInstructor(true);

          GetInstructor();
        }
      });
    };
    alreadyInstructor();
  }, []);

  return (
    <div className="col-md-4">
      <div className="list-group">
        <Link
          to="/dashboard"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          Dashboard
        </Link>
        <Link
          to={`/enrolled_courses`}
          className="list-group-item list-group-item-action"
        >
          Enrolled Courses
        </Link>
        <Link
          to="/profile_settings"
          className="list-group-item list-group-item-action"
        >
          Profile Settings
        </Link>
        {isInstructor && instructorData.length > 0 && (
          <>
            <Link
              to={`/add-course/${instructorData[0].id}`}
              className="list-group-item list-group-item-action"
            >
              Add Course
            </Link>

            <Link
              to={`/my-courses/${instructorData[0].id}`}
              className="list-group-item list-group-item-action"
            >
              My Courses
            </Link>
          </>
        )}
        <Link
          to="/change_password"
          className="list-group-item list-group-item-action"
        >
          Change Password
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
