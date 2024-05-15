import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import useAxios from "../utils/useAxios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const swal = require("sweetalert2");
function CourseDetails() {
  const navigate = useNavigate();
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const { course_id } = useParams();
  const [courseReviews, setCourseReviews] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [categories, setCategories] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [isInstructor, setIsInstructor] = useState(false);
  const [hasBought, setHasBought] = useState(false);
  const [rating, setRating] = useState("");
  const [reviewCount, setReviewCount] = useState("");

  const [review, setReview] = useState("");
  const [formRating, setFormRating] = useState("");

  const [hasReviewed, setHasReviewd] = useState(false);
  const [reviewId, setReviewId] = useState("");

  const [courseInstructor, setCourseInstructor] = useState({});

  const updateReview = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("review", review);
    formData.append("rating", formRating);
    formData.append("course", course_id);
    formData.append("user", user.user_id);
    api
      .put(`main/update-review/${reviewId}/`, formData)
      .then((response) => {
        if (response.status === 200) {
          window.location.href = `/course-detail/${course_id}`;
          swal.fire({
            icon: "success",
            title: "Review Updated",
            toast: true,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          swal.fire({
            icon: "error",
            title: "Something went wrong",
            toast: true,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        swal.fire({
          icon: "error",
          title: `${error}`,
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const submitReview = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("review", review);
    formData.append("rating", formRating);
    formData.append("course", course_id);
    formData.append("user", user.user_id);
    api
      .postForm(`main/create-review/`, formData)
      .then((response) => {
        if (response.status === 201) {
          window.location.href = `/course-detail/${course_id}`;
          swal.fire({
            icon: "success",
            title: "Review Submitted",
            toast: true,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          swal.fire({
            icon: "error",
            title: "Something went wrong",
            toast: true,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        swal.fire({
          icon: "error",
          title: `${error}`,
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  useEffect(() => {
    try {
      api
        .get(`main/course-detail/${course_id}/`)
        .then((response) => {
          console.log(response.data);
          setCourseData(response.data);
          setCategories(response.data.category);
          setRating(response.data.averageRating);
          setReviewCount(response.data.countReview);
          setCourseInstructor(response.data.Instructor);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    if (user != null) {
      api
        .get(`main/check_is_instructor/${course_id}/${user.user_id}`)
        .then((response) => {
          console.log("Is Instructor", response.data.bool);
          setIsInstructor(response.data.bool);
        });
      api
        .get(`/main/check_is_available/${course_id}/${user.user_id}/`)
        .then((response) => {
          setHasBought(response.data.bool);
        });
    } else {
      setIsInstructor(false);
    }
    api
      .get(`main/lecture-list/${course_id}/`)
      .then((response) => {
        setLectures(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (user != null) {
      api
        .get(`main/check-has-reviewd/${course_id}/${user.user_id}/`)
        .then((response) => {
          setHasReviewd(response.data.bool);
          setReviewId(response.data.review_id);
        });
    }
    api
      .get(`main/course-reviews/${course_id}/`)
      .then((response) => {
        setCourseReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          {courseData && (
            <img
              src={courseData.image}
              style={{ height: 300 }}
              className="img-thumbnail w-100"
              alt=""
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body mb-5">
              {courseData && (
                <>
                  <h5 className="card-title">{courseData.name}</h5>
                  <p className="card-text">{courseData.description}</p>

                  <p className="card-text">
                    <span className="fw-bold">Instructor: </span>
                    <Link to={`/instructor-details/${courseInstructor.id}`}>
                      {courseInstructor.full_name}
                    </Link>
                  </p>
                  <p className="card-text">
                    <span className="fw-bold">Enrolled Students: </span>
                    {courseData.enrolled_students}
                  </p>
                  <p className="card-text">
                    <span className="fw-bold">Rating: </span>
                    <span>{Number(rating).toFixed(2)} </span>
                    <i class="bi bi-star-fill" style={{ color: "yellow" }}></i>
                  </p>
                  <p className="card-text">
                    <span className="fw-bold">Total Reviews: </span>
                    <span>{reviewCount} </span>
                  </p>
                  <p className="card-text">
                    <span className="fw-bold">Tags: </span>
                    <div className="d-flex flex-wrap hstack gap-3">
                      {categories.map((category) => {
                        return (
                          <h5 key={category.id}>
                            <span className="badge badge-secondary text-white bg-dark">
                              {category.name}
                            </span>
                          </h5>
                        );
                      })}
                    </div>
                  </p>
                  <p className="card-text">
                    <span className="fw-bold">Price: </span>
                    {courseData.price}$
                  </p>
                  {!hasBought && (
                    <>
                      <Link
                        to={`/checkout/${courseData.id}`}
                        className="btn btn-dark"
                      >
                        Buy Course
                      </Link>
                      <br />
                      <br />
                    </>
                  )}
                  {isInstructor && (
                    <>
                      <Link
                        to={`/add-lecture/${courseData.id}`}
                        className="btn btn-dark"
                      >
                        Add Lecture
                      </Link>
                      <br />
                    </>
                  )}

                  <h5 className="my-4">Lectures:</h5>
                  <ul className="list-group my-4">
                    {lectures.map((lecture, index) => {
                      const modalId = `videoModal${index + 1}`;
                      return (
                        <li key={lecture.id} className="list-group-item">
                          {lecture.name}
                          <span className="float-end">
                            <span className="me-5">
                              {Math.floor(lecture.video_duration / 60)} mins
                            </span>
                            {(user && hasBought) || isInstructor ? (
                              <>
                                <button
                                  className="btn btn-dark"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#${modalId}`}
                                >
                                  <i className="bi bi-play-circle"></i>
                                </button>
                              </>
                            ) : (
                              <button
                                disabled
                                className="btn btn-dark"
                                data-bs-toggle="modal"
                                data-bs-target={`#${modalId}`}
                              >
                                <i className="bi bi-play-circle"></i>
                              </button>
                            )}
                          </span>
                          {/* Video Modal Start */}
                          <div
                            className="modal fade"
                            id={modalId}
                            tabIndex="-1"
                            aria-labelledby={`${modalId}Label`}
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-xl">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id={`${modalId}Label`}
                                  >
                                    {lecture.name}
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <div className="ratio ratio-16x9">
                                    {(!hasBought || !isInstructor) && (
                                      <h5>
                                        You don't have permission to view this.
                                      </h5>
                                    )}
                                    {(isInstructor || hasBought) && (
                                      <video
                                        id={`video-${index}`}
                                        controls
                                        src={lecture.video}
                                      ></video>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Video Modal End */}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-8">
          <h4>Submit a review</h4>
          <label htmlFor="" className="form-label">
            Review
          </label>
          <textarea
            type="text"
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
            className="form-control"
          />
          <label htmlFor="" className="form-label">
            Rating
          </label>
          <input
            type="number"
            max="5"
            min="1"
            step="0.5"
            className="form-control"
            value={formRating}
            onChange={(e) => {
              setFormRating(e.target.value);
            }}
          />
          <br />
          {!hasReviewed && user && hasBought && (
            <button
              type="button"
              onClick={(e) => {
                submitReview(e);
              }}
              className="btn btn-dark"
            >
              Submit
            </button>
          )}
          {hasReviewed && user && hasBought && (
            <button
              type="button"
              onClick={(e) => {
                updateReview(e);
              }}
              className="btn btn-dark"
            >
              Update Review
            </button>
          )}
          {!user && <p>You must be logged in to submit a review</p>}
          {user && !hasBought && (
            <p>You must buy the course to submit a review</p>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <hr />
        <h5>Reviews:</h5>
      </div>
      <div className="row mb-4">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          {courseReviews.length > 0 && (
            <div className="carousel-inner bg-dark text-white py-5">
              {courseReviews.map((review, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <figure className="text-center mt-3">
                    <blockquote className="blockquote">
                      <h5>{review.user.username} says:</h5>
                      <p>{review.review}</p>
                    </blockquote>
                  </figure>
                </div>
              ))}
            </div>
          )}
          {courseReviews.length <= 0 && (
            <div className="carousel-inner bg-dark text-white py-5">
              <div className="carousel-item active">
                <figure className="text-center mt-3">
                  <blockquote className="blockquote">
                    <h5>No Reviews</h5>
                  </blockquote>
                </figure>
              </div>
            </div>
          )}

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
