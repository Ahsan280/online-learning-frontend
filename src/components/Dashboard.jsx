import React, { useContext, useState } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import SideBar from "./SideBar";

import { useEffect } from "react";
function Dashboard() {
  const api = useAxios();
  const [isInstructor, setIsInstructor] = useState(false);
  const [instructorData, setInstructorData] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const GetInstructor = () => {
      try {
        api
          .get(`main/instructor-by-user/${user.user_id}/`)
          .then((response) => {
            setInstructorData(response.data);

            console.log(instructorData);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        navigate("/");
        console.log(err);
      }
    };
    const alreadyInstructor = () => {
      try {
        api
          .get(`main/instructor-by-user/${user.user_id}/`)
          .then((response) => {
            if (response.data.length > 0) {
              setIsInstructor(true);

              GetInstructor();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    };
    const GetProfileData = () => {
      try {
        api.get(`dashboard/${user.user_id}/`).then((response) => {
          setUserProfile(response.data.profile);
        });
      } catch (err) {
        console.log(err);
      }
    };
    alreadyInstructor();
    GetProfileData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <SideBar />
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{userProfile.full_name}</h5>

              {isInstructor && (
                <>
                  {instructorData.map((instructor) => (
                    <>
                      <p className="card-text">{instructor.description}</p>
                      <p className="card-text">{instructor.qualifications}</p>
                      <img src={instructor.profile_picture} className="w-100" />
                    </>
                  ))}
                </>
              )}
              {!isInstructor && (
                <>
                  <p className="card-text">{user.email}</p>
                  <h5>Profile Picture:</h5>
                  {userProfile.profile_picture && (
                    <img
                      src={userProfile.profile_picture}
                      className="w-100"
                      style={{ height: 300 }}
                    />
                  )}
                  {!userProfile.profile_picture && (
                    <h5>You have not uploaded a profile picture</h5>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
