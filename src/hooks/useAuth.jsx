import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "../context/AuthContextProvider";


const useAuth = () => {

    const authContext = useContext(AuthContext);

    return authContext;
};

export default useAuth;