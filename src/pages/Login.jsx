import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Card,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    if (!/[a-zA-Z0-9]{6,}/.test(formData?.password)) {
      return setError(" Is less than 6 characters");
    } else if (!/(?=.*[A-Z])/.test(formData?.password)) {
      return setError("don't have a capital letter");
    } else if (!/(?=.*[!#$%&?"])/.test(formData?.password)) {
      return setError("Don't have a special character");
    } else if (/^[^0-9]*$/.test(formData?.password)) {
      return setError("Don't have a numeric character");
    } else {
      setError("");
    }

    loginUser(formData.email, formData.password)
      .then((res) => {
        if (res?.user?.email) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Login is Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error logging in user", error);
      });
  };

  console.log(error);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card
        p={{ md: 6, base: 4 }}
        boxShadow="xl"
        w={{ base: "100%", md: "400px" }}
        bg="white"
        border={"1px"}
        borderColor={"primary"}
      >
        <VStack spacing={4} align="stretch">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            color="dark"
          >
            Login
          </Text>

          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel color={"gray"}>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter email"
                borderRadius="full"
                name="email"
                focusBorderColor="primary"
                color="gray"
                border={"1px"}
                borderColor={"gray"}
              />
            </FormControl>
            <FormLabel color={"gray"}>Password</FormLabel>
            <InputGroup size="md" rounded={"full"}>
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                borderRadius={"full"}
                color={"gray"}
                name="password"
                focusBorderColor="primary"
              />

              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? (
                    <FaEye color="gray" />
                  ) : (
                    <FaRegEyeSlash color="gray" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text color="red" fontSize="sm">
              {error}
            </Text>
            <Text textAlign="right" color="blue" cursor="pointer" mt={2}>
              Forgot password?
            </Text>

            <Button
              color="light"
              bg="primary"
              type="submit"
              _hover={{ bg: "secondary", color: "dark" }}
              borderRadius="full"
              w="full"
              mt={4}
            >
              Login
            </Button>
          </form>

          {/* <Divider />
           */}
          <Button
            leftIcon={<FcGoogle />}
            border={"1px"}
            textColor={"dark"}
            borderColor={"primary"}
            _hover={{ color: "gray" }}
            borderRadius="full"
            w="full"
          >
            Continue with Google
          </Button>

          <Text textAlign="center" color="blue">
            Need an account?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "underline" }}
              _hover={{ color: "gray" }}
            >
              Register
            </Link>
          </Text>
        </VStack>
      </Card>
    </Box>
  );
};

export default Login;
