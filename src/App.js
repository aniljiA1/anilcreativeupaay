import React from "react";
import { Box, Container, Heading, Flex } from "@chakra-ui/react";
import Board from "./components/Board";
import FilterBar from "./components/FilterBar";

export default function App() {
  return (
    <Container maxW="1200px" py={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Creative Upaay - Dashboard</Heading>
      </Flex>

      <FilterBar />

      <Box mt={4}>
        <Board />
      </Box>
    </Container>
  );
}