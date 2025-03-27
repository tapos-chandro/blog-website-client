import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Button,
  VStack,
  useTheme,
  Avatar,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Divider,
  ModalBody,
  Input,
  FormLabel,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import logo from "../../src/assets/smal-logo.png";
import useAuth from "../hooks/useAuth";
import { useRef } from "react";

import { FiUpload } from "react-icons/fi";
import Swal from "sweetalert2";

const NavBar = () => {
  const { pathname } = useLocation();
  const { user, updateUserProfile } = useAuth();
  const [isToggle, setIsToggle] = useState(true);
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const inputRef = useRef(null);
  const handleClick = () => inputRef.current.click();

  const naveLinks = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/add-blog">Add Blog</NavLink>
      <NavLink to="/all-blogs">All Blogs</NavLink>
      <NavLink to="/featured-blogs">Featured Blogs</NavLink>
      <NavLink to="/wishlist">Wishlist</NavLink>
    </>
  );

  const loginRegisterBtn = user?.email ? (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
    >
      <Button bg="red" borderRadius={"full"} h="8" color="light">
        Sign Out
      </Button>
      {user?.photoURL ? (
        <>
          <Tooltip hasArrow label={user?.displayName} bg="gray.300" color="black">
            <Avatar
              onClick={onOpen}
              _hover={{ cursor: "pointer" }}
              name={user?.displayName}
              src={user?.photoURL}
              referrerPolicy="no-referrer"
            />
          </Tooltip>
        </>
      ) : (
        <Avatar
          onClick={onOpen}
          _hover={{ cursor: "pointer" }}
          src="https://bit.ly/broken-link"
          bg={"primary"}
        />
      )}
    </Box>
  ) : (
    <>
      {" "}
      <Button
        as={Link}
        to="/login"
        bg={pathname === "/login" ? "primary" : "transparent"}
        border="1px"
        borderColor={pathname === "/login" ? "primary" : "primary"}
        color={pathname === "/login" ? "light" : "gray"}
        borderRadius="full"
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
        borderRadius="full"
        _hover={{ bg: "primary" }}
        height={8}
      >
        Register
      </Button>
    </>
  );

  useEffect(() => {
    const uploadImage = async () => {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KYE}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.success) {
          console.log("uploaded image url", data.data.url);
          setUploadUrl(data.data.url);
        } else {
          console.error("uploaded failed", data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    uploadImage();
  }, [image]);

  // The profile image and name set

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    updateUserProfile(name, uploadUrl).then(() => {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Update your profile successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      <Button onClick={onClose} color={"red"}>
        Close
      </Button>;
      onClose();
    });
  };

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
          <Flex align="center" color={primaryColor} fontWeight={700}>
            <Image src={logo} alt="Logo" boxSize="40px" mr={2} />
            Blogs
          </Flex>
        </Link>

        {/* Mobile Menu Button */}
        <Box display={{ base: "block", md: "none" }}>
          {isToggle ? (
            <IoMdMenu
              style={{ fontSize: "2rem", color: primaryColor }}
              onClick={() => setIsToggle(!isToggle)}
            />
          ) : (
            <RxCross2
              style={{ fontSize: "2rem", color: primaryColor }}
              onClick={() => setIsToggle(!isToggle)}
            />
          )}
        </Box>

        {/* Navbar Links - Desktop */}
        <Flex display={{ base: "none", md: "flex" }} gap={4}>
          {naveLinks}
        </Flex>

        {/* Authentication Section - Desktop */}
        <Flex
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap={4}
        >
          {loginRegisterBtn}
        </Flex>
      </Flex>

      {/* Mobile Menu */}
      {isToggle && (
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

      {/*The update modal start */}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Box w="full" display={"flex"} justifyContent={"center"}>
            <Avatar
              src={uploadUrl}
              textAlign={"center"}
              w="24"
              h="24"
              mt="10"
              bg={"primary"}
            />
          </Box>
          <ModalHeader textAlign={"center"} color={"dark"}>
            Profile
          </ModalHeader>

          <ModalBody>
            <form onSubmit={handleProfileUpdate}>
              <FormLabel color={"gray"}>Change Your name</FormLabel>
              <Input
                border={"1px"}
                required
                borderColor={"gray"}
                _focus={{ border: "none" }}
                color={"gray"}
                rounded={"full"}
                type="text"
                name="name"
                placeholder="Enter Your Name"
              />
              <FormLabel color={"gray"} mt={"3"}>
                Set Your Photo
              </FormLabel>

              <Box>
                <Input
                  type="file"
                  ref={inputRef}
                  onChange={(e) => setImage(e.target.files[0])}
                  display="none"
                />
                <Button
                  border={"1px"}
                  borderColor={"gray"}
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
                >
                  Upload Your Profile Image
                </Button>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                mt={3}
                w="full"
                bg="red.100"
              >
                <Button
                  bg="primary"
                  color={"light"}
                  type="submit"
                  borderRadius={"full"}
                  my={4}
                  px={10}
                >
                  Save
                </Button>
              </Box>
            </form>
          </ModalBody>
          <Divider py={0} color={"gray"} />
          <ModalFooter>
            <Button onClick={onClose} color={"red"}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/*The update modal end */}
    </Box>
  );
};

export default NavBar;
