import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Box, Spinner } from "@chakra-ui/react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const {pathname} = useLocation()
  console.log(pathname)

  if (loading) {
   return <Box
      display={"flex"}
      alignItems={"center"}
      h={"100vh"}
      justifyContent={"center"}
    >
      <Spinner size="xl" color="primary" textAlign={"center"} />
    </Box>;
  }

  if (user?.email) {
    return children;
  }

  return <Navigate to={"/login"} state={pathname} replace></Navigate>;
};

export default PrivateRoute;
