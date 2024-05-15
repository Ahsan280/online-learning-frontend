import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { Link } from "react-router-dom";

function InstructorDetails() {
  const { instructor_id } = useParams();
  const api = useAxios();
  const [instructorData, setInstructorData] = useState({});
  const [instructorCourses, setInstructorCourses] = useState([]);

  useEffect(() => {
    api
      .get(`main/instructor-details/${instructor_id}/`)
      .then((response) => {
        setInstructorData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    api
      .get(`main/instructor-detail-courses/${instructor_id}/`)
      .then((response) => {
        setInstructorCourses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={instructorData.profile_picture}
            style={{ height: 300 }}
            className="img-thumbnail w-100"
            alt=""
          />
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body mb-5">
              <h5 className="card-title">{instructorData.full_name}</h5>
              <p className="card-text">
                <span className="fw-bold">Email: </span>
                {instructorData.email}
              </p>

              <p className="card-text">
                <span className="fw-bold">Description: </span>

                {instructorData.description}
              </p>
              <div className="row">
                <h5>Courses:</h5>
                {instructorCourses.map((course) => {
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorDetails;
