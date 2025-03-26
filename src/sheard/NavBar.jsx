import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Button,
  VStack,
  MenuButton,
  useTheme,
} from "@chakra-ui/react";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import logo from "../../src/assets/smal-logo.png";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const theme = useTheme();
const primaryColor = theme.colors.primary
  

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
      bg={pathname === "/login" ? "primary" : "transparent"}
      border="1px" 
      borderColor={pathname === "/login" ? "primary" : "primary"}
      color={pathname === "/login" ? "light" : "gray"} 
      borderRadius='full' 
      _hover={{ bg: "primary" }}
      height={8}
    >
      Login
    </Button>
    <Button
      as={Link}
      to="/register" 
      bg={pathname === "/register" ? "primary" : "transparent"}
      border="1px" 
      borderColor={pathname === "/register" ? "primary" : "primary"}
      color={pathname === "/register" ? "light" : "gray"} 
      borderRadius='full' 
      _hover={{ bg: "primary" }}
      height={8}
    >
      Register
    </Button>
    </>
  );

  return (
    <Box
      as="nav"
      p={4}
      position="fixed"
      top={0}
      width="100%"
      bg="white"
      boxShadow="md"
      zIndex={50}
    >
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        {/* Logo */}
        <Link to="/">
          <Flex align="center">
            <Image src={logo} alt="Logo" boxSize="40px" mr={2} />
            Blogs
          </Flex>
        </Link>

        {/* Mobile Menu Button */}
        <Box display={{ base: "block", md: "none" }} >
          {isOpen ? (
            <IoMdMenu
              style={{ fontSize: "2rem", color: primaryColor }}
              onClick={() => setIsOpen(!isOpen)}
            />

          ) : (
            <RxCross2
              style={{ fontSize: "2rem" , color: primaryColor }}
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </Box>

        {/* Navbar Links - Desktop */}
        <Flex display={{ base: "none", md: "flex" }} gap={4}>
          {naveLinks}
        </Flex>

        {/* Authentication Section - Desktop */}
        <Flex display={{ base: "none", md: "flex" }} alignItems='center' gap={4}>
          {loginRegisterBtn}
        </Flex>
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <VStack
          p={4}
          mt={2}
          spacing={4}
          display={{ md: "none", base: "flex" }}
          textAlign="center"
          direction="column"
          align="stretch"
        >
          {naveLinks}
          {loginRegisterBtn}
        </VStack>
      )}
    </Box>
  );
};

export default NavBar;
