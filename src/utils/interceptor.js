import { useContext } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 
import dayjs from "dayjs";
import { AuthContext } from "../context/authContext";

let baseURL ="http://82.180.145.66/api/v1";  

const useAxios = () => {
  const authTokens=JSON.parse(localStorage.getItem('authTokens'))
 
  // console.log('token',authTokens.access)
  const {  setUser, setAuthTokens, logoutUser } = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL,
  });

  authAxios.interceptors.request.use(async (req) => {
    if (!authTokens?.access) {
      return req;
    }

    const user = jwtDecode(authTokens?.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      req.headers.Authorization = `Bearer ${authTokens.access}`;
      return req;
    }

    try {
      const response = await axios.post(`${baseURL}/refresh/`, {
        refresh: authTokens?.refresh, 
      });

      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));

      req.headers.Authorization = `Bearer ${response.data.access}`;
    } catch (error) {
      console.error("Token refresh failed: ", error);
      logoutUser();
    }

    return req;
  });

  return authAxios;
};

export default useAxios;