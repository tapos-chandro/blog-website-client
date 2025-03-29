import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import useImageUploaded from "../hooks/useImageUploaded";
import { FiUpload } from "react-icons/fi";

const AddBlog = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const handleClick = () => inputRef.current.click();
  const uploadUrl = useImageUploaded(image);


  const handAddBlog = (e) => {
    e.preventDefault() ;
    const formData = new FormData(e.target)
    const formObject = Object.fromEntries(formData.entries())
    const formFinalData = {...formObject, file:uploadUrl}
    console.log(formFinalData)


  }
  

  return (
    <Box my={20} maxW={"3xl"} mx={"auto"} border={"1px"} borderColor={"primary"} rounded={"2xl"} p={10}>
      <Text
        textAlign={"center"}
        fontSize={"xl"}
        fontWeight={"bold"}
        textColor={"dark"}
        mb={6}
      >
        Add Blog
      </Text>
      <Box>
        <form onSubmit={handAddBlog}>
          <Box display={"flex"} gap={4} flexDirection={"column"}>
            <Input placeholder="Enter title " name="title" required rounded={"full"} borderColor={"primary"} color={"gray"} type="text"/>
            <Input placeholder="Enter Short Description " required name="sortDescription" rounded={"full"} borderColor={"primary"} color={"gray"} type="text" />
            <Input placeholder="Enter Long Description " required name="logDescription" rounded={"full"} borderColor={"primary"} color={"gray"} type="text"/>
            <Box>
              <Input
                type="file"
                ref={inputRef}
                onChange={(e) => setImage(e.target.files[0])}
                display="none"
                required
                name="file"
                
              />
              <Button
                border={"1px"}

                color="gray"
                leftIcon={<FiUpload />}
                onClick={handleClick}
                variant="solid"
                size="lg"
                px={8}
                rounded="full"
                boxShadow="md"
                w="full"
                transition="all 0.2s"
              borderColor={"primary"}
              >
                Upload Your Profile Image
              </Button>
            </Box>
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
