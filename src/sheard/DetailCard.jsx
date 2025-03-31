import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "./../hooks/useAuth";

const DetailCard = ({ detail }) => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [comments, setComments] = useState([])


  // _id,title,sortDescription,logDescription,category,image,time,email

  const handleComments = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    console.log(comment);
    const commentsData = {id:detail?._id, email: user?.email, comment, image: user?.photoURL, name: user?.displayName }
    console.log(commentsData) 
    axiosInstance.post(`/comment` , commentsData)
    .then(res => {
        console.log(res)
    })

};

useEffect(() => {
    axiosInstance.get(`/comment/${detail?._id}`)
    .then(res => {
        setComments(res.data)
        console.log(res.data)
    })
}, [comments])

  return (
    <Card maxW="4xl" mx={"auto"}>
      <CardBody>
        <Image src={detail?.image} alt={detail?.title} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md" textColor={"dark"}>
            {detail?.title}
          </Heading>
          <Text textColor={"dark"}>{detail.sortDescription}</Text>
          <Text textColor={"dark"}>{detail.logDescription}</Text>
        </Stack>
      </CardBody>
      <Divider textColor={"gray"} />

      {user?.email === detail?.email ? (
        <Text px={4} py={10} fontSize={"lg"} textColor={"dark"}>
          Can not comment on own blog
        </Text>
      ) : (
        <Box mb={10} mt={3} maxW={"2xl"} px={4}>
          <Text textColor={"dark"} py={4} fontSize={"xl"} fontWeight={"bold"}>Comments </Text>
          <Box mb={4} display={"flex"} gap={2} alignItems={"center"} textColor={"dark"} fontSize={"md"} fontWeight={"medium"}>
            <Image src={user?.photoURL} w={10} h={10} rounded={"full"}  /> 
            <Text>{user?.displayName}</Text>
          </Box>
          <form onSubmit={handleComments}>
            <Textarea
              name="comment"
              type="text"
              placeholder="Enter your comments"
              border={"1px"}
              _placeholder={{ color: "gray" }}
              _focus={{ border: "none" }}
              borderColor={"primary"}
              required
            />{" "}
            <br></br>
            <Box display={"flex"} justifyContent={"end"}>
              <Button
                type="submit"
                bg={"primary"}
                rounded={"full"}
                mt={"2"}
                textColor={"light"}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      )}
      <Box px={4} gap={4} display={"flex"} flexDirection={"column"}>
        {
            comments?.map(comment => <Box key={comment?._id} display={"flex"} flexDirection={"column"} >
                <Box display={"flex"} alignItems={"center"} gap={2}>
                <Image src={comment?.image} w={"10"} h={"10"} rounded={"full"}  /> 
                <Text>{comment?.name}</Text>
                </Box>
                <Text mt={4}>{comment?.comment}</Text>
            </Box>)
        }
      </Box>
    </Card>
  );
};

export default DetailCard;
