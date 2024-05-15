import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import useAxios from "../utils/useAxios";

function Search() {
  const [courses, setCourses] = useState([]);
  const { search } = useParams();
  const api = useAxios();

  useEffect(() => {
    api.get(`main/searched-courses/${search}/`).then((response) => {
      setCourses(response.data);
    });
  }, []);
  return (
    <div className="container">
      <div className="row ">
        {/* Searched Courses */}
        <h2 className="mt-1">Search Results:</h2>
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
      {/* End of Searched Courses */}
    </div>
  );
}

export default Search;
