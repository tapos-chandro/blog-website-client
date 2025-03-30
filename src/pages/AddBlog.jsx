import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import useImageUploaded from "../hooks/useImageUploaded";
import { FiUpload } from "react-icons/fi";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

const AddBlog = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const handleClick = () => inputRef.current.click();
  const { uploadUrl, setUploadUrl } = useImageUploaded(image);
  const categories = [
    "Technology",
    "Health",
    "Travel",
    "Education",
    "Business",
  ];
  const instance = useAxios();

  const handAddBlog = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    const formFinalData = { ...formObject, image: uploadUrl };

    const res = await instance.post("/add-blog", formFinalData);
    console.log(res)

    if (res.data.acknowledged === true) {

      form.reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Login is Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setUploadUrl(null);
    setImage(null);
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
                  {uploadUrl ? uploadUrl : "Added Blog Image"}
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
