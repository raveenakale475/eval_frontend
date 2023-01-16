import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useReducer } from "react";
import { initialState, SignupReducer } from "../reducer/Signup.reducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [state, dispatch] = useReducer(SignupReducer, initialState);
  const { name, email, password, gender } = state;
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignupBtn = async () => {
    if (name && gender && email && password) {
      const data = {
        name,
        gender,
        email,
        password,
      };
      await axios
        .post("http://localhost:8080/users/register", data)
        .then(
          () =>
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 5000,
              isClosable: true,
            }),
          navigate("/login")
        )
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
        <FormControl id="Name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              dispatch({ type: "name", payload: e.target.value })
            }
            value={name}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl id="email" isRequired>
          <FormLabel>email</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
            value={email}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl id="gender" isRequired>
          <FormLabel>gender</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              dispatch({ type: "gender", payload: e.target.value })
            }
            value={gender}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl id="password" isRequired>
          <FormLabel>password</FormLabel>
          <Input
            type="text"
            onChange={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
            value={password}
          />
        </FormControl>
      </Box>
      <Button mt="5px" onClick={handleSignupBtn}>
        Signup
      </Button>
    </Box>
  );
};

export default SignupPage;
