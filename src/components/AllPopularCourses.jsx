import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api/";
function AllPopularCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get(`${baseUrl}main/all-popular-courses/`);
      setCourses(response.data);
    };
    fetchCourses();
  }, []);
  return (
    <div className="container">
      <div className="row ">
        {/* Latest Courses */}
        <h2 className="mt-1">Popular Courses </h2>
        {courses.map((course) => {
          return (
            <div key={course.id} className="col-md-4">
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
      {/* End of Latest Courses */}
    </div>
  );
}

export default AllPopularCourses;
