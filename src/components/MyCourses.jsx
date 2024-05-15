import React from "react";
import SideBar from "./SideBar";
import { useContext, useState } from "react";
import useAxios from "../utils/useAxios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Swal = require("sweetalert2");

function MyCourses() {
  const api = useAxios();
  const navigate = useNavigate();
  const { instructor_id } = useParams();
  const [myCourses, setMyCourses] = useState([]);
  const deleteCourse = (e, course_id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to delete this?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`main/delete-course/${course_id}/`)
          .then((response) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            try {
              api
                .get(`main/instructor-courses/${instructor_id}/`)
                .then((response) => {
                  console.log(response.data);
                  setMyCourses(response.data);
                });
            } catch (error) {}
          })
          .catch((error) => {
            Swal.fire("Error", error, "error");
          });
      }
    });
  };
  useEffect(() => {
    try {
      api.get(`main/instructor-courses/${instructor_id}/`).then((response) => {
        console.log(response.data);
        setMyCourses(response.data);
      });
    } catch (error) {}
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <SideBar />
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">My Courses</h5>
              <div className="row">
                {myCourses.map((course) => {
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
                            class="btn btn-warning me-1 text-white"
                          >
                            View Details
                          </Link>
                          <button
                            type="button"
                            onClick={(e) => {
                              deleteCourse(e, course.id);
                            }}
                            class="btn btn-danger text-white"
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
