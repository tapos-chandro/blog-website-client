import axios from "axios";


const useAxios = () => {
    const axiosInstance = axios.create({
        baseURL: 'https://blog-website-server-nu.vercel.app',
      });

      return axiosInstance
};

export default useAxios;