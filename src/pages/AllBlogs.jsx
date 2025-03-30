import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Cards from "../sheard/Cards";
import { Box, Grid, Spinner, Text } from "@chakra-ui/react";
import SectionTitle from "../components/SectionTitle";

const AllBlogs = () => {
  const instance = useAxios();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance.get("/blogs").then((res) => {
      setBlogs(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Box display={"flex"} alignItems={"center"} h={"100vh"} justifyContent={"center"}>
          <Spinner size="xl" color="primary" textAlign={"center"} />
        </Box>
      ) : (
        <Box>
          <SectionTitle title={"All Blogs"} />
          <Grid
            templateColumns={{
              lg: "repeat(4, 1fr)",
              md: "repeat(3, 1fr)",
              base: "repeat(1, 1fr)",
            }}
            gap={6}
          >
            {blogs.map((blog) => (
              <Cards key={blog._id} blog={blog}></Cards>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default AllBlogs;
