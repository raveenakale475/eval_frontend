import { Box, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const config = {
  headers: {
    token: localStorage.getItem("token"),
  },
};

const server = async () => {
  return await axios.get("http://localhost:8080/posts/", config);
};

const Homepage = () => {
  const [data, setData] = useState([]);
  const toast = useToast();
  const [dataChange, setDataChange] = useState(false);

  const handlebtn = async (_id) => {
    await axios
      .delete(`http://localhost:8080/posts/delete/${_id}`, config)
      .then(() => {
        toast({
          description: "Notes deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setDataChange(!dataChange);
      })
      .catch((err) =>
        toast({
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      );
  };
  useEffect(() => {
    server()
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        toast({
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast, dataChange]);
  return (
    <Box
      display="grid"
      gridTemplateColumns={"repeat(5,1fr)"}
      gap="10px"
      width={"95%"}
      margin="auto"
    >
      {data.length > 0 ? (
        data.map(({ title, body, device, _id }) => {
          return (
            <Flex
              key={_id}
              border="5px solid red"
              padding="5"
              flexDirection={"column"}
              gap="1.5"
            >
              <Heading as={"h2"} fontSize="xl">
                title:{title}
              </Heading>
              <Heading as={"p"} fontSize="sm">
                body:{body}
              </Heading>
              <Heading as={"p"} fontSize="small">
                device:{device}
              </Heading>
              <Button onClick={() => handlebtn(_id)}>Delete</Button>
            </Flex>
          );
        })
      ) : (
        <Heading textAlign={"center"}>No Product</Heading>
      )}
    </Box>
  );
};

export default Homepage;
