import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InstructorRegister from "./components/InstructorRegister";
import AddCourse from "./components/AddCourse";
import MyCourses from "./components/MyCourses";
import CourseDetails from "./components/CourseDetails";
import AddLecture from "./components/AddLecture";
import Checkout from "./components/Checkout";
import EnrolledCourses from "./components/EnrolledCourses";
import ProfileSettings from "./components/ProfileSettings";
import ChangePassword from "./components/ChangePassword";
import AllLatestCourses from "./components/AllLatestCourses";
import AllPopularCourses from "./components/AllPopularCourses";
import InstructorDetails from "./components/InstructorDetails";
import Search from "./components/Search";
function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <AuthProvider>
            <Header />
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoutes>
                    <Dashboard />
                  </ProtectedRoutes>
                }
              />

              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/instructor-register"
                element={
                  <ProtectedRoutes>
                    <InstructorRegister />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/add-course/:instructor_id"
                element={
                  <ProtectedRoutes>
                    <AddCourse />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/add-lecture/:course_id"
                element={
                  <ProtectedRoutes>
                    <AddLecture />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/my-courses/:instructor_id"
                element={
                  <ProtectedRoutes>
                    <MyCourses />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/course-detail/:course_id"
                element={<CourseDetails />}
              />
              <Route
                path="/checkout/:course_id"
                element={
                  <ProtectedRoutes>
                    <Checkout />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/enrolled_courses"
                element={
                  <ProtectedRoutes>
                    <EnrolledCourses />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/profile_settings"
                element={
                  <ProtectedRoutes>
                    <ProfileSettings />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/change_password"
                element={
                  <ProtectedRoutes>
                    <ChangePassword />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/all-latest-courses"
                element={<AllLatestCourses />}
              ></Route>

              <Route
                path="/all-popular-courses"
                element={<AllPopularCourses />}
              ></Route>
              <Route path="/" exact element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/search/:search" element={<Search />}></Route>
              <Route
                path="/instructor-details/:instructor_id"
                element={<InstructorDetails />}
              ></Route>
            </Routes>
            <Footer />
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;
