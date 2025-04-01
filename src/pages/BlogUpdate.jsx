import moment from "moment";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useEffect, useRef, useState } from "react";
import useImageUploaded from "../hooks/useImageUploaded";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";

const BlogUpdate = () => {
  const inputRef = useRef(null);
  const [localUrl, setLocalUrl] = useState(null);
  const handleClick = () => inputRef.current.click();
  const { uploadUrl, loading } = useImageUploaded(localUrl);
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(blog?.category);
  const [localLoading, setLocalLoading] = useState(true);

  const axiosInstance = useAxios();
  const { user } = useAuth();
  const { id } = useParams();

  const handAddBlog = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    const formFinalData = {
      ...formObject,
      image: uploadUrl,
      time: moment().format(),
      email: user?.email,
    };

    const res = await axiosInstance.patch(`/update/${id}`, formFinalData);

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Update Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/details/${id}`);
    }
  };

  useEffect(() => {
    axiosInstance.get(`/update/${id}`).then((res) => {
      console.log(res?.data);
      setBlog(res?.data);
      setSelectedCategory(res?.data?.category);
      setLocalLoading(false);
    });
  }, [id]);

  if (localLoading) {
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
    <Box
      p={{ lg: "10", md: "10", base: "3.5" }}
      my={5}
      maxW={{ lg: "3xl" }}
      mx={"auto"}
      border={"1px"}
      borderColor={"primary"}
      rounded={"2xl"}
    >
      <Text
        textAlign={"center"}
        fontSize={{ lg: "xl" }}
        fontWeight={"bold"}
        textColor={"dark"}
        mb={6}
      >
        Update
      </Text>
      <Box>
        <form onSubmit={handAddBlog}>
          <Box display={"flex"} gap={2} flexDirection={"column"}>
            <FormControl>
              <FormLabel color={"gray"}>Title</FormLabel>
              <Input
                placeholder="Enter title "
                name="title"
                rounded={"full"}
                borderColor={"primary"}
                color={"gray"}
                type="text"
                defaultValue={blog?.title}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={"gray"}>Sort description</FormLabel>
              <Input
                placeholder="Enter Short Description "
                name="sortDescription"
                rounded={"full"}
                borderColor={"primary"}
                color={"gray"}
                type="text"
                defaultValue={blog?.sortDescription}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={"gray"}>Long description</FormLabel>
              <Input
                placeholder="Enter Long Description "
                name="logDescription"
                rounded={"full"}
                borderColor={"primary"}
                color={"gray"}
                type="text"
                defaultValue={blog?.logDescription}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={"gray"}>Select Category</FormLabel>
              <Select
                rounded={"full"}
                name="category"
                border={"1px"}
                borderColor={"primary"}
                color={"gray"}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value={blog?.category}>{blog?.category}</option>
                <option value="Health">Health</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Travel">Travel</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel color={"gray"}>Chose Photo</FormLabel>
              <Box>
                <Input
                  type="file"
                  ref={inputRef}
                  onChange={(e) => setLocalUrl(e.target.files[0])}
                  display="none"
                  name="image"
                />
                <Button
                  border={"1px"}
                  color="gray"
                  leftIcon={<FiUpload />}
                  onClick={handleClick}
                  variant="solid"
                  size="md"
                  px={8}
                  rounded="full"
                  boxShadow="md"
                  w="full"
                  transition="all 0.2s"
                  borderColor={"primary"}
                >
                  {/* {!localUrl ?   : uploadUrl ? uploadUrl : loading && <Spinner />} */}
                  {!localUrl
                    ? `${blog?.image}`
                    : uploadUrl
                    ? uploadUrl
                    : loading && <Spinner />}
                </Button>
              </Box>
            </FormControl>
            <Button
              w="full"
              bg={"primary"}
              textColor={"light"}
              rounded={"full"}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default BlogUpdate;
