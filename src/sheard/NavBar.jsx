import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Box, Flex, IconButton, Image, Button, VStack, useDisclosure } from "@chakra-ui/react";

import logo from "../../src/assets/smal-logo.png";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { isOpen, onToggle } = useDisclosure();

  const naveLinks = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/add-blog">Add Blog</NavLink>
      <NavLink to="/all-blogs">All Blogs</NavLink>
      <NavLink to="/featured-blogs">Featured Blogs</NavLink>
      <NavLink to="/wishlist">Wishlist</NavLink>
    </>
  );

  const loginRegisterBtn = (
    <>
      <Button
        as={Link}
        to="/login"
        colorScheme={pathname === "/login" ? "blue" : "gray"}
      >
        Login
      </Button>
      <Button
        as={Link}
        to="/register"
        borderRadius="full" 
        colorScheme={pathname === "/register" ? "blue" : "gray"}
      >
        Register
      </Button>
    </>
  );

  return (
    <Box as="nav" p={4} position="fixed" top={0} width="100%" bg="white" boxShadow="md" zIndex={50}>
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo */}
        <Link to="/">
          <Flex align="center">
            <Image src={logo} alt="Logo" boxSize="40px" mr={2} />
            Blogs
          </Flex>
        </Link>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: "block", md: "none" }}
          icon={isOpen ? "x": "menu"}
          onClick={onToggle}
          aria-label="Toggle Menu"
        />

        {/* Navbar Links - Desktop */}
        <Flex display={{ base: "none", md: "flex" }} gap={4}>
          {naveLinks}
        </Flex>

        {/* Authentication Section - Desktop */}
        <Flex display={{ base: "none", md: "flex" }} gap={4}>
          {loginRegisterBtn}
        </Flex>
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <VStack bg="white" p={4} mt={2} spacing={4} display={{ md: "none" }}>
          {naveLinks}
          {loginRegisterBtn}
        </VStack>
      )}
    </Box>
  );
};

export default NavBar;
