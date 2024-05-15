import { useContext, useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const swal = require("sweetalert2");

const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const loginUser = async (email, password) => {
    // let url = `http://127.0.0.1:8000/api/token/`;
    let url = `https://online-learning-api-b16d8aab79f8.herokuapp.com/api/token/`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
      swal.fire({
        title: "Login Success",
        icon: "success",
        toast: true,
        timer: 6000,
        timerProgressBar: true,
        position: "top-right",
        showConfirmButton: false,
        showCancelButton: false,
      });
    } else {
      swal.fire({
        title: "Email - Password Does Not Exist",
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
      });
    }
  };

  const registerUser = async (
    full_name,
    password,
    password2,
    email,
    username
  ) => {
    // let url = "http://127.0.0.1:8000/api/register/";
    let url =
      "https://online-learning-api-b16d8aab79f8.herokuapp.com/api/register/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ full_name, password, password2, email, username }),
    });
    const data = await response.json();
    if (response.status === 201) {
      navigate("/login");
      swal.fire({
        title: "Registeration Success",
        icon: "success",
        toast: true,
        timer: 6000,
        timerProgressBar: true,
        position: "top-right",
        showConfirmButton: false,
        showCancelButton: false,
      });
    } else {
      swal.fire({
        title: "Something went wrong",
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
      });
    }
  };
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
    swal.fire({
      title: "Logout Success",
      icon: "success",
      toast: true,
      timer: 6000,
      timerProgressBar: true,
      position: "top-right",
      showConfirmButton: false,
      showCancelButton: false,
    });
  };
  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
  };
  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, []);
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
