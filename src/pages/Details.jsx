import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import DetailCard from "../sheard/DetailCard";

const Details = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/details/${id}`).then((res) => {
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
