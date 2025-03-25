import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Box, Button, Input, Text, VStack, Card,  } from "@chakra-ui/react";

const Login = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minH="100vh" bg="gray.50">
      <Card p={6} boxShadow="xl" w={{ base: "90%", md: "400px" }} bg="white">
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="blue.600">Login</Text>
          
          <form>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" borderRadius="full" focusBorderColor="blue.400" />
            </FormControl>
            
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Password" borderRadius="full" focusBorderColor="blue.400" />
            </FormControl>
            
            <Text textAlign="right" color="blue.600" cursor="pointer" mt={2}>Forgot password?</Text>
            
            <Button colorScheme="blue" borderRadius="full" w="full" mt={4}>Login</Button>
          </form>
          
          {/* <Divider />
           */}
          <Button leftIcon={<FcGoogle />} variant="outline" borderRadius="full" w="full">
            Continue with Google
          </Button>
          
          <Text textAlign="center" color="blue.600">
            Need an account? <Link to="/register" style={{ textDecoration: "underline" }}>Register</Link>
          </Text>
        </VStack>
      </Card>
    </Box>
  );
};

export default Login;