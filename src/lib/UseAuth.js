import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_LOCAL_URL;

const useAuth = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/refreshtoken`, {
        withCredentials: true,
      });
      setToken(response.data.token);
      const decoded = jwtDecode(response.data.token);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(`${API_BASE_URL}/refreshtoken`, {
          withCredentials: true,
        });
        config.headers.Authorization = `Bearer ${response.data.token}`;
        setToken(response.data.token);
        const decoded = jwtDecode(response.data.token);
        setExpire(decoded.exp);
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    refreshToken();
  }, []);

  return { token, axiosJWT };
};

export default useAuth;
