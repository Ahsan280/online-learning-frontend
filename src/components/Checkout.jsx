import React, { useState } from "react";
import useAxios from "../utils/useAxios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PAYPAL_CLIENT_ID } from "./Constant";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
const swal = require("sweetalert2");
function Checkout() {
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState();
  const [categories, setCategories] = useState();
  const { course_id } = useParams();
  const initialOptions = {
    clientId: PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };
  useEffect(() => {
    api
      .get(`main/course-detail/${course_id}/`)
      .then((response) => {
        console.log(response.data);
        setCourseData(response.data);
        setCategories(response.data.category);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              {courseData && (
                <>
                  <h5 className="card-title">{courseData.name}</h5>
                  <img src={courseData.image} className="w-100" alt="" />
                  <p
                    className="card-text"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span className="fw-bold">Description: </span>
                    {courseData.description}
                  </p>
                  <p className="card-text">
                    <span className="fw-bold">Price: </span>
                    {courseData.price}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-8 ">
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: `${courseData.price}`,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  const status = details.status;
                  if (status === "COMPLETED") {
                    api
                      .get(
                        `main/make_course_available/${course_id}/${user.user_id}/`
                      )
                      .then((response) => {
                        if (response.data.bool) {
                          navigate(`/course-detail/${course_id}`);
                          swal.fire({
                            title: "Course Bought Successfully",
                            icon: "success",
                            text: "The Course has been added to your learning",
                          });
                        } else {
                          console.log("Something went wrong");
                        }
                      });
                  }
                });
              }}
            ></PayPalButtons>
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
