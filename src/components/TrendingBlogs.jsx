import { Box, Grid, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import useAxios from "../hooks/useAxios";
import Cards from "./../sheard/Cards";

const TrendingBlogs = () => {
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/trending").then((res) => {
      setTrendingBlogs(res.data);
      setLoading(false);
    });
  }, []);

  
      if(loading) {
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
      <SectionTitle title={"Trending Blogs"} />
      <Grid
        templateColumns={{
          lg: "repeat(3, 1fr)",
          md: "repeat(2, 1fr)",
          base: "repeat(1, 1fr)",
        }}
        gap={6}
      >
        {trendingBlogs?.map((trendingBlog) => (
          <Cards blog={trendingBlog} key={trendingBlog?._id}></Cards>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingBlogs;
