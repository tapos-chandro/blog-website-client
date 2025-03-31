import { useEffect, useState } from "react";
import Cards from "../sheard/Cards";
import { Box, Grid, Input, Spinner, Text } from "@chakra-ui/react";
import SectionTitle from "../components/SectionTitle";
import useAxios from "../hooks/useAxios";
import { FiSearch } from "react-icons/fi";

const AllBlogs = () => {
  const axiosInstance = useAxios();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axiosInstance.get(`/blogs?searchText=${search}`).then((res) => {
      setBlogs(res.data);
      setLoading(false);
    });
  }, [search]);

  return (
    <>
      {loading ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          h={"100vh"}
          justifyContent={"center"}
        >
          <Spinner size="xl" color="primary" textAlign={"center"} />
        </Box>
      ) : (
        <Box>
          <SectionTitle title={"All Blogs"} />

          <Box
            display={"flex"}
            mx={"auto"}
            alignItems={"center"}
            justifyContent={"center"}
            position={"relative"}
            maxW="2xl"
          >
            <Input
              placeholder="Search"
              rounded="full"
              textColor={"gray"}
              _focus={{ border: "none" }}
              name="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              border={"1px"}
              borderColor={"primary"}
              maxW={"2xl"}
            />
            <Box position={"absolute"} top={"3"} right={"3"} color={"primary"}>
              <FiSearch />
            </Box>
          </Box>
          {blogs.length == 0 ? (
            <Box>
              <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"} py={20} textColor={"dark"}>Search Value Not Available</Text>
            </Box>
          ) : (
            <Grid
              templateColumns={{
                lg: "repeat(4, 1fr)",
                md: "repeat(3, 1fr)",
                base: "repeat(1, 1fr)",
              }}
              mt={8}
              gap={6}
            >
              {blogs.map((blog) => (
                <Cards key={blog._id} blog={blog}></Cards>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </>
  );
};

export default AllBlogs;
