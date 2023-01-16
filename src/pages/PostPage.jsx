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

const PostPage = () => {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [device, setDevice] = useState("");
  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  const handleCreateBtn = async () => {
    if (title && body && device) {
      const data = {
        title,
        body,
        device,
      };
      await axios
        .post("http://localhost:8080/posts/create", data, config)
        .then(
          () =>
            toast({
              title: "Post created.",
              description: "We've created your Notes for you.",
              status: "success",
              duration: 5000,
              isClosable: true,
            }),
          setTitle(""),
          setBody(""),
          setDevice("")
        )
        .catch((err) =>
          toast({
            description: err.message,
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
        <FormControl id="title" isRequired>
          <FormLabel>title</FormLabel>
          <Input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl id="body" isRequired>
          <FormLabel>body</FormLabel>
          <Input
            type="text"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl id="device" isRequired>
          <FormLabel>device</FormLabel>
          <Input
            type="text"
            onChange={(e) => setDevice(e.target.value)}
            value={device}
          />
        </FormControl>
      </Box>
      <Button mt="5px" onClick={handleCreateBtn}>
        createPost
      </Button>
    </Box>
  );
};

export default PostPage;
