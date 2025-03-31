import { Box, Button, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";


const Cards = ({blog}) => {
  const {title, sortDescription, logDescription, category, image , _id} = blog
  return (
    <Card>
      <CardBody>
        <Image
          src={image}
          alt={title}
          borderRadius="lg"
          w='full'
          h={"44"}
          objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" color={"dark"}>
            {title}
          </Heading>
          <Text color={"gray"}>
           {sortDescription}
          </Text>
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
    </Card>
  );
};

export default Cards;
