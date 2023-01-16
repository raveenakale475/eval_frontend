import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const config = {
  headers: {
    token: localStorage.getItem("token"),
  },
};

const server = async () => {
  return await axios.get("http://localhost:8080/posts/", config);
};

const Navbar = () => {
  const token = localStorage.getItem("token");
  const toast = useToast();
  const [count, setCount] = useState(0);

  useEffect(() => {
    server()
      .then(({ data }) => {
        setCount(data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toast]);
  return (
    <Flex justifyContent={"space-evenly"} paddingY="5">
      <Link to={"/signup"}>
        {" "}
        <Box>Register</Box>
      </Link>
      <Link to={"/login"}>
        {" "}
        <Box>Login</Box>
      </Link>

      <Link to={"/createPost"}>
        <Box>createPost</Box>
      </Link>
      <Link to={"/"}>
        <Box>Home</Box>
      </Link>
      {token && (
        <Button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Signout
        </Button>
      )}
      <Box>
        Counter:
        {count}
      </Box>
    </Flex>
  );
};

export default Navbar;
