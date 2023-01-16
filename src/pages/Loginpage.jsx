import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      const data = {
        email,
        password,
      };
      await axios
        .post("http://localhost:8080/users/login", data)
        .then((res) => {
          const { token } = res.data;
          localStorage.setItem("token", token);
          toast({
            description: "Login Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setEmail("");
          setPassword("");
          window.location.reload();
        })
        .catch((err) =>
          toast({
            description: err.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        );
    } else {
      toast({
        description: "Please enter the required details.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Box width={"500px"} padding="20px" margin={"auto"}>
      <Box>
        <FormControl id="email" isRequired>
          <FormLabel>email</FormLabel>
          <Input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl id="password" isRequired>
          <FormLabel>password</FormLabel>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormControl>
      </Box>
      <Button mt="5px" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
