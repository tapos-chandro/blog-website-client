import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.status === 401 || error.status === 403) {
          await signOutUser().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
