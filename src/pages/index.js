import Message from "@/components/Message";
import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  onAuthStateChanged,
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase";
import React, { useEffect, useState } from "react";

const auth = getAuth(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const logoutHandler = () => {
  signOut(auth);
};

const index = () => {
  const [user, setuser] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (data) => {
      setuser(data);
    });
    return () => {
      unsuscribe();
    };
  });

  return (
    <Box bg={"red.100"}>
      {user ? (
        <Container h={"100vh"} bg={"white"}>
          <VStack h={"full"} py={4}>
            <Button onClick={logoutHandler} colorScheme={"red"} w={"full"}>
              Logout
            </Button>
            <VStack h={"full"} w={"full"} overflowY={"auto"}>
              <Message text={"sample messages"} />
              <Message user="me" text={"sample messages"} />
            </VStack>
            <form style={{ width: "100%" }}>
              <HStack w={"full"}>
                <Input placeholder="Enter a Message" />
                <Button colorScheme={"purple"} type="submit">
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack
          bg={"white"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100vh"}
        >
          <Button onClick={loginHandler} colorScheme={"blue"}>
            SignIn with Google
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default index;
