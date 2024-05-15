import React from "react";
import SideBar from "./SideBar";
import { useContext, useState } from "react";
import useAxios from "../utils/useAxios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
function EnrolledCourses() {
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  useEffect(() => {
    api.get(`main/enrolled_courses/${user.user_id}/`).then((response) => {
      setEnrolledCourses(response.data);
    });
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <SideBar />
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Enrolled Courses</h5>
              <div className="row">
                {enrolledCourses.map((course) => {
                  return (
                    <div className="col-md-6">
                      <div
                        class="card my-4 p-4 rounded-5 bg-light"
                        style={{ height: 450 }}
                      >
                        <img
                          src={course.image}
                          className="card-img"
                          style={{ height: 300 }}
                          alt=""
                        />
                        <div class="card-body">
                          <h5 class="card-title">{course.name}</h5>

                          <Link
                            to={`/course-detail/${course.id}`}
                            class="btn btn-primary"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <div className="d-flex flex-wrap mb-5">
                {enrolledCourses.map((course) => {
                  return (
                    <div class="card w-50 mb-2 p-3" style={{ height: 500 }}>
                      <img
                        class="card-img-top"
                        src={course.image}
                        style={{ height: 300 }}
                        alt="Card image cap"
                      />
                      <div class="card-body">
                        <h5 class="card-title">{course.name}</h5>
                        <p
                          class="card-text"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {course.description}
                        </p>
                        <Link
                          to={`/course-detail/${course.id}`}
                          class="btn text-white btn-warning me-1"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourses;
