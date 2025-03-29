import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import SectionTitle from "./SectionTitle";

const ResentPosts = () => {
  return (
    <Box>
      <SectionTitle title={"Resent Posts"} />
      <Grid
        templateColumns={{
          lg: "repeat(3, 1fr)",
          md: "repeat(2, 1fr)",
          base: "repeat(1, 1fr)",
        }}
        gap={6}
      >
        <Card>
          <CardBody>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md" color={"dark"}>Living room Sofa</Heading>
              <Text color={"gray"}>
                This sofa is perfect for modern tropical spaces, baroque
                inspired spaces, earthy toned spaces and for people who love a
                chic design with a sprinkle of vintage design.
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
                  _hover={{bg:"secondary", color:"dark", border:"none"}}
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
                  _hover={{bg:"secondary", color:"dark", border:"none"}}
                >
                  Details
                </Button>
              </Box>
            </Flex>
          </CardFooter>
        </Card>
      </Grid>
    </Box>
  );
};

export default ResentPosts;
