import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Box, Button, Input, Text, VStack, Card } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { createNewUser } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formObjectData = Object.fromEntries(formData.entries());

    console.log("Form Data as Object:", formObjectData);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minH="100vh" bg="gray.50">
      <Card p={6} boxShadow="xl" w={{ base: "90%", md: "400px" }} bg="white">
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="blue.600">Register</Text>
          
          <form onSubmit={handleRegister}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="Name" name="name" borderRadius="full" focusBorderColor="blue.400" />
            </FormControl>
            
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" name="email" borderRadius="full" focusBorderColor="blue.400" />
            </FormControl>
            
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Password" name="password" borderRadius="full" focusBorderColor="blue.400" />
            </FormControl>
            
            <Text textAlign="right" color="blue.600" cursor="pointer" mt={2}>Forgot password?</Text>
            
            <Button type="submit" colorScheme="blue" borderRadius="full" w="full" mt={4}>Register</Button>
          </form>
          
          {/* <Divider /> */}
          
          <Button leftIcon={<FcGoogle />} variant="outline" borderRadius="full" w="full">
            Continue with Google
          </Button>
          
          <Text textAlign="center" color="blue.600">
            Already have an account? <Link to="/login" style={{ textDecoration: "underline" }}>Login</Link>
          </Text>
        </VStack>
      </Card>
    </Box>
  );
};

export default Register;
