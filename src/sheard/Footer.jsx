import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import footerLogo from "../../src/assets/big-logo.png";
import { Link, NavLink } from "react-router-dom";
import NewsLitter from "../components/NewsLitter";

const Footer = () => {
  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={{ lg: "row", base: "column" }}
        justifyContent={"space-between"}
        textAlign={"center"}
        alignItems={{ lg: "start", base: "center" }}
        gap={5}
        textColor={"light"}
        w="full"
        py={20}
      >
        <Box>
          <Link to={"/"}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={{ lg: "start", base: "center", md: "center" }}
              gap={4}
            >
              <Image src={footerLogo} />{" "}
              <Text textColor={"primary"} fontWeight={"bold"} fontSize={40}>
                Blogs
              </Text>
            </Box>
          </Link>
        </Box>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            This is Link{" "}
          </Text>
          <Box display={"flex"} flexDirection={"column"} color={"gray"}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/add-blog">Add Blog</NavLink>
            <NavLink to="/all-blogs">All Blogs</NavLink>
            <NavLink to="/featured-blogs">Featured Blogs</NavLink>
            <NavLink to="/wishlist">Wishlist</NavLink>
          </Box>
        </Box>
        <Box>
          <NewsLitter titleColor={"light"}></NewsLitter>
        </Box>
      </Box>
      <Divider color={"gray"}/>
      <Text py={5} textAlign={"center"} color={"gray"}>	&copy;2025 | All Right Reserved</Text>
    </Box>
  );
};

export default Footer;
