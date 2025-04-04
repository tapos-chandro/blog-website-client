import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailCard from "../sheard/DetailCard";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Details = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

  const email = user?.email

  useEffect(() => {
    axiosSecure.get(`/details/${id}?email=${email}`).then((res) => {
      setDetail(res?.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Box
        display={"flex"}
        alignItems={"center"}
        h={"100vh"}
        justifyContent={"center"}
      >
        <Spinner size="xl" color="primary" textAlign={"center"} />
      </Box>
    );
  }

  return (
    <Box>
      <DetailCard detail={detail}></DetailCard>
    </Box>
  );
};

export default Details;
