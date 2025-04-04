import {
  Box,
  Button,
  Card,
  CardBody,
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
import { Link } from "react-router-dom";
import moment from "moment";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DetailCard = ({ detail }) => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [comments, setComments] = useState([]);
  const axiosSecure = useAxiosSecure();
  const email = user?.email;


  const handleComments = async (e) => {
    e.preventDefault();
    let comment = e.target.comment.value
    const commentsData = {
      id: detail?._id,
      email: user?.email,
      comment,
      image: user?.photoURL,
      name: user?.displayName,
      time: moment().format()
    };

    try {
      await axiosInstance.post(`/comment`, commentsData);  // ✅ Wait for POST request
      await axiosInstance.patch(`/comment/${detail?._id}`); // ✅ Wait for PATCH request
  
      const res = await axiosSecure.get(`/comment/${detail?._id}?email=${email}`);
      setComments(res?.data);
      e.target.comment.value = "";  // ✅ Reset input after successful submission
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  useEffect(() => {
    axiosSecure.get(`/comment/${detail?._id}?email=${email}`).then((res) => {
      setComments(res.data.sort((a, b) => b.time - a.time));
    });
  }, []);

  return (
    <Card maxW="4xl" mx={"auto"} mt={5}>
      <CardBody>
        <Image
          src={detail?.image}
          alt={detail?.title}
          borderRadius="lg"
          w="full"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textColor={"dark"}>
            {detail?.title}
          </Heading>
          <Text textColor={"dark"}>{detail.sortDescription}</Text>
          <Text textColor={"dark"}>{detail.logDescription}</Text>
        </Stack>
        {user?.email === detail?.email && (
          <Link to={`/update/${detail?._id}`}>
            <Button
              bg={"primary"}
              rounded={"full"}
              textColor={"light"}
              mt={"4"}
            >
              Update now
            </Button>
          </Link>
        )}
      </CardBody>
      <Divider textColor={"gray"} />

      {user?.email === detail?.email ? (
        <>
          <Text px={4} py={10} fontSize={"lg"} textColor={"dark"}>
            Can not comment on own blog
          </Text>
        </>
      ) : (
        <Box mb={10} mt={3} maxW={"2xl"} px={4}>
          <Text textColor={"dark"} py={4} fontSize={"xl"} fontWeight={"bold"}>
            Comments ({comments.length})
          </Text>
          <Box
            mb={4}
            display={"flex"}
            gap={2}
            alignItems={"center"}
            textColor={"dark"}
            fontSize={"md"}
            fontWeight={"medium"}
          >
            <Image src={user?.photoURL} w={10} h={10} rounded={"full"} />
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
      <Box px={4} gap={4} display={"flex"} flexDirection={"column"} mb={"20"}>
        {comments?.map((comment) => (
          <Box key={comment?._id}>
            <Box  display={"flex"} flexDirection={"column"}>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Image
                  src={comment?.image}
                  w={"10"}
                  h={"10"}
                  rounded={"full"}
                />
                <Text>{comment?.name}</Text>
              </Box>
              <Text my={4}>{comment?.comment}</Text>
            </Box>
            <Divider textColor={"gray"}></Divider>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default DetailCard;
