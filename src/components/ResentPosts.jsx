import {
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import useAxios from "../hooks/useAxios";
import Cards from "../sheard/Cards";

const ResentPosts = () => {
  const axiosInstance = useAxios();
  const [posts, setPosts] = useState(null);



  useEffect(() => {
    axiosInstance.get("/resent-post")
    .then(res => {
      setPosts(res.data)
    })
  },[])


  return (
    <Box>
      <SectionTitle title={"Resent Posts"} />
      <Grid
        templateColumns={{
          lg: "repeat(3, 1fr)",
          md: "repeat(2, 1fr)",
          base: "repeat(1, 1fr)",
        }}
        gap={6}
      >
        {
          posts?.map(post => <Cards key={post._id} blog={post}></Cards>)
        }
      </Grid>
    </Box>
  );
};

export default ResentPosts;
