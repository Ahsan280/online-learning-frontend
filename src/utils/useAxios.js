import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
// const baseURL = "http://127.0.0.1:8000/api/";
const baseURL = "https://online-learning-api-b16d8aab79f8.herokuapp.com/api/";
const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logoutUser } =
    useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: authTokens ? `Bearer ${authTokens.access}` : "",
    },
  });
  axiosInstance.interceptors.request.use(async (req) => {
    if (!authTokens?.access) return req;
    const user = jwtDecode(authTokens.access);
    // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    const currentTime = dayjs();
    const isExpired = dayjs.unix(user.exp).isBefore(currentTime);

    if (!isExpired) return req;

    // const response = await axios.post(`${baseURL}token/refresh/`, {
    //   refresh: authTokens.refresh,
    // });
    try {
      const response = await axios({
        method: "post",
        url: `${baseURL}token/refresh/`,
        data: {
          refresh: authTokens.refresh,
        },
      });
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));

      req.headers.Authorization = `Bearer ${jwtDecode(response.data.access)}`;

      return req;
    } catch (err) {
      logoutUser();
      return req;
    }
  });

  return axiosInstance;
};

export default useAxios;
