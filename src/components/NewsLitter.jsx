import { Box, Button, Input, InputGroup, Text } from "@chakra-ui/react";
import React from "react";

const NewsLitter = () => {
  return (
    <Box  w="full" display={"flex"} flexDir={"column"}  alignItems={"center"} justifyContent={"center"} py={40}>
      <Text fontSize={"3xl"} fontWeight={"bold"} color={"dark"} textAlign={"center"}>Subscribe to Our Newsletter</Text>
      <Text color={"gray"} textAlign={"center"}>Get the latest updates and exclusive content.</Text>
      <form>
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
            <Input  roundedLeft={"full"} border={"none"} _focus={{border:"none", outline:"none"} } _hover={{border:"none", outline:"none"}}/>
            <Button bg="primary" roundedRight={"full"} color={"light"} px={6}>Subscriber</Button>
          </InputGroup>
        </Box>
      </form>
    </Box>
  );
};

export default NewsLitter;
