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
  Divider,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = () => {
  const { createNewUser,googleLogin } = useAuth();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formObjectData = Object.fromEntries(formData.entries());

    console.log("Form Data as Object:", formObjectData);

    if (!/[a-zA-Z0-9]{6,}/.test(formObjectData?.password)) {
      return setError(" Is less than 6 characters");
    } else if (!/(?=.*[A-Z])/.test(formObjectData?.password)) {
      return setError("don't have a capital letter");
    } else if (!/(?=.*[!#$%&?"])/.test(formObjectData?.password)) {
      return setError("Don't have a special character");
    } else if (/^[^0-9]*$/.test(formObjectData?.password)) {
      return setError("Don't have a numeric character");
    } else {
      setError("");
    }

    createNewUser(formObjectData.email, formObjectData.password)
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
        console.log("Error creating user", error);
      });
  };
    const handleGoogleLogin = () => {
      googleLogin()
        .then((res) => {
          if(res?.user?.email){
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
          setError("Error logging in with Google", error);
        })
    }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
    >
      <Card
        p={6}
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
            Register
          </Text>

          <form onSubmit={handleRegister}>
            <FormControl>
              <FormLabel color={"gray"}>Name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                color={"gray"}
                borderRadius="full"
                required
                focusBorderColor="primary"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"gray"}>Email</FormLabel>
              <Input
                type="email"
                color={"gray"}
                placeholder="Email"
                name="email"
                borderRadius="full"
                focusBorderColor="primary"
                required
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
                required
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
              type="submit"
              color="light"
              _hover={{ bg: "secondary", color: "dark" }}
              bg="primary"
              borderRadius="full"
              w="full"
              mt={4}
            >
              Register
            </Button>
          </form>

          <Divider color={"gray"} />

          <Button
            leftIcon={<FcGoogle />}
            variant="outline"
            borderRadius="full"
            w="full"
            _hover={{ color: "gray" }}
            borderColor={"primary"}
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>

          <Text textAlign="center" color="blue">
            Already have an account?
            <Link to="/login" style={{ textDecoration: "underline" }}>
              Login
            </Link>
          </Text>
        </VStack>
      </Card>
    </Box>
  );
};

export default Register;
