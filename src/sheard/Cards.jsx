import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "motion/react";

const MotionCards = motion(Card);

const Cards = ({ blog }) => {
  const { title, sortDescription, image, _id } = blog;
  const axiosInstance = useAxios();
  const { user } = useAuth();

  const handleWishlist = (id) => {
    
    const { _id, ...rest } = blog;
    const wishlistData = { ...rest, userEmail: user?.email, id: _id };

    axiosInstance.post(`/wishlist/${id}`, wishlistData).then((res) => {
      if (res.data.acknowledged === true) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Wishlist added Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      
      if (res.data.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res?.data?.message}`,
        });
      }
    });
  };
  return (
    <MotionCards
      initial={{ opacity: 0, y: 100 }} // Fade-in from bottom
      animate={{ opacity: 1, y: 0 }} // Animate to visible
      transition={{ duration: 0.2, ease: "easeOut" }} // Smooth transition
      whileHover={{ scale: 1.05 }} // Slight scale on hover
      whileInView={{ opacity: 1 }}
    >
      <CardBody>
        <Image
          src={image}
          alt={title}
          borderRadius="lg"
          w="full"
          h={"44"}
          objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" color={"dark"}>
            {title}
          </Heading>
          <Text color={"gray"}>{sortDescription}</Text>
        </Stack>
      </CardBody>
      <Divider color={"gray"} />
      <CardFooter>
        <Flex display={"flex"} justify={"space-between"} w="full">
          <Box>
            <Button
              border={"1px"}
              bg={"primary"}
              w={"20"}
              rounded={"full"}
              color={"light"}
              _hover={{ bg: "secondary", color: "dark", border: "none" }}
              onClick={() => handleWishlist(_id)}
            >
              Wishlist
            </Button>
          </Box>
          <Box>
            <Link to={`/details/${_id}`}>
              <Button
                border={"1px"}
                bg={"primary"}
                rounded={"full"}
                color={"light"}
                _hover={{ bg: "secondary", color: "dark", border: "none" }}
              >
                Details
              </Button>
            </Link>
          </Box>
        </Flex>
      </CardFooter>
    </MotionCards>
  );
};

export default Cards;
