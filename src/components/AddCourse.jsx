import React, { useContext, useState } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const swal = require("sweetalert2");
function AddCourse() {
  const api = useAxios();
  const navigate = useNavigate();
  const { instructor_id } = useParams();
  const [id, setId] = useState(instructor_id);
  const [categories, setCategories] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(categories.length).fill(false)
  );
  const [image, setImage] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCourse = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", courseName);
    formData.append("Instructor", id);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    const cat_list = [];
    for (let index = 0; index < categories.length; index++) {
      const category = categories[index];
      if (checkedState[index]) {
        cat_list.push(Number(category.id));
      }
    }

    formData.append("category", cat_list);
    try {
      api.post("main/create-course/", formData).then((response) => {
        if (response.status === 201) {
          navigate(`/my-courses/${instructor_id}`);
          swal.fire({
            title: "Course Created Successfully",
            icon: "success",
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            position: "top-right",
            showConfirmButton: false,
            showCancelButton: false,
          });
        } else {
          setLoading(false);
          swal.fire({
            title: "Something went wrong",
            icon: "error",
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            position: "top-right",
            showConfirmButton: false,
            showCancelButton: false,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChange = (position) => {
    const updatedChecketState = checkedState.map((category, index) => {
      return index === position ? !category : category;
    });
    setCheckedState(updatedChecketState);
  };
  useEffect(() => {
    const GetAllCategories = () => {
      try {
        api.get("main/all-category/").then((response) => {
          setCategories(response.data);
          setCheckedState(new Array(response.data.length).fill(false));
        });
      } catch (err) {
        console.log(err);
      }
    };
    GetAllCategories();
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <SideBar />
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Course</h5>
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">Course Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={courseName}
                    onChange={(e) => {
                      setCourseName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Course Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Course Image</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Course Price in USD
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    className="form-control"
                  />
                </div>
                <label className="form-label fw-bold">Course Tags</label>
                <div className="d-flex flex-wrap">
                  {categories.map((category, index) => {
                    return (
                      <div key={index} className="mb-3 form-check me-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name={category}
                          value={category}
                          checkedState={checkedState[index]}
                          onChange={() => {
                            handleOnChange(index);
                          }}
                          id="exampleCheck1"
                        />
                        <label className="form-check-label">
                          {category.name}
                        </label>
                      </div>
                    );
                  })}
                </div>

                {!loading && (
                  <button
                    onClick={(e) => {
                      handleAddCourse(e);
                    }}
                    type="button"
                    className="btn btn-primary"
                  >
                    Add Course
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

export default AddCourse;
