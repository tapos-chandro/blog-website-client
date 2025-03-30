import { Box, Button, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Cards = ({blog}) => {
  const {title, sortDescription, logDescription, category, image} = blog
  return (
    <Card>
      <CardBody>
        <Image
          src={image}
          alt={title}
          borderRadius="lg"
          w='full'
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
            <Button
              border={"1px"}
              bg={"primary"}
              rounded={"full"}
              color={"light"}
              _hover={{ bg: "secondary", color: "dark", border: "none" }}
            >
              Details
            </Button>
          </Box>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default Cards;
