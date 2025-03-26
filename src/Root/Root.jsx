import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../sheard/NavBar";
import { Box, Button, Container, HStack } from "@chakra-ui/react";
const Root = () => {
  return (
    <>
      <Box height={20} >
        <NavBar />
      </Box>
      <Container maxW="container.xl"   mt={4}>
      <Box mx={1} p={4}>
      <Outlet />
      </Box>
      </Container>
    </>
  );
};

export default Root;
