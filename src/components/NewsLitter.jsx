import { Box, Button, Input, InputGroup, Text } from "@chakra-ui/react";
import React from "react";
import Swal from "sweetalert2";

const NewsLitter = ({titleColor}) => {


  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Thank you for subscribing to our newsletter",
        iconColor: "#3fbf57",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Box
      w="full"
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}

    >
      <Text
        fontSize={"3xl"}
        fontWeight={"bold"}
        color={titleColor}
        textAlign={"center"}
      >
        Subscribe to Our Newsletter
      </Text>
      <Text color={"gray"} textAlign={"center"} mt={"2"}>
        Get the latest updates and exclusive content.
      </Text>
      <form onSubmit={handleSubmit}>
        <Box>
          <InputGroup
            display={"flex"}
            maxW={"3xl"}
            border="1px"
            borderColor={"primary"}
            rounded={"full"}
            justifyContent={"center"}
            mt={4}
          >
            <Input
              required
              placeholder="Enter your email"
              color={"gray"}
              roundedLeft={"full"}
              border={"none"}
              name="email"
              type="email"
              _focus={{ border: "none", outline: "none" }}
              _hover={{ border: "none", outline: "none" }}
            />
            <Button
              type="submit"
              bg="primary"
              roundedRight={"full"}
              color={"light"}
              px={6}
            >
              Subscriber
            </Button>
          </InputGroup>
        </Box>
      </form>
    </Box>
  );
};

export default NewsLitter;
