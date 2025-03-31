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
import React, { useRef, useState } from "react";
import useImageUploaded from "../hooks/useImageUploaded";
import { FiUpload } from "react-icons/fi";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useAuth from "./../hooks/useAuth";

const AddBlog = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const handleClick = () => inputRef.current.click();
  const { uploadUrl, setUploadUrl, loading } = useImageUploaded(image);
  const navigate = useNavigate();
  const categories = [
    "Technology",
    "Health",
    "Travel",
    "Education",
    "Business",
    "Lifestyle",
  ];
  const axiosInstance = useAxios();
  const { user } = useAuth();
  console.log(loading);

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

    const res = await axiosInstance.post("/add-blog", formFinalData);

    if (res.data.acknowledged === true) {
      form.reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Login is Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/all-blogs");
    }
    setUploadUrl("");
    setImage("");
  };

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
        Add Blog
      </Text>
      <Box>
        <form onSubmit={handAddBlog}>
          <Box display={"flex"} gap={2} flexDirection={"column"}>
            <FormControl>
              <FormLabel color={"gray"}>Title</FormLabel>
              <Input
                placeholder="Enter title "
                name="title"
                required
                rounded={"full"}
                borderColor={"primary"}
                color={"gray"}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel color={"gray"}>Sort description</FormLabel>
              <Input
                placeholder="Enter Short Description "
                required
                name="sortDescription"
                rounded={"full"}
                borderColor={"primary"}
                color={"gray"}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel color={"gray"}>Long description</FormLabel>
              <Input
                placeholder="Enter Long Description "
                required
                name="logDescription"
                rounded={"full"}
                borderColor={"primary"}
                color={"gray"}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel color={"gray"}>Select Category</FormLabel>
              <Select
                placeholder="Select Category"
                defaultValue={"Select Category"}
                rounded={"full"}
                name="category"
                required
                border={"1px"}
                borderColor={"primary"}
                color={"gray"}
              >
                {categories.map((category, index) => (
                  <option key={index}>{category}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel color={"gray"}>Chose Photo</FormLabel>
              <Box>
                <Input
                  type="file"
                  ref={inputRef}
                  onChange={(e) => setImage(e.target.files[0])}
                  display="none"
                  required
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
                  {!image ? (
                    
                    "Added Blog Image"
                  ) : uploadUrl ? uploadUrl : loading && (
                    <Spinner />
                  )}
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

export default AddBlog;
