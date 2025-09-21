import React, { useState } from "react";
import { Box, Input, Select, HStack, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/tasks/tasksSlice";

export default function FilterBar(){
  const dispatch = useDispatch();
  const filter = useSelector(s => s.tasks.filter);
  const [text, setText] = useState(filter.text || "");
  const [priority, setPriority] = useState(filter.priority || "all");

  const apply = () => {
    dispatch(setFilter({ text, priority }));
  };

  const clear = () => {
    setText("");
    setPriority("all");
    dispatch(setFilter({ text: "", priority: "all" }));
  };

  return (
    <Box bg="gray.50" p={4} borderRadius="md">
      <HStack spacing={3}>
        <Input placeholder="Search tasks by title or description" value={text} onChange={(e)=>setText(e.target.value)} />
        <Select value={priority} onChange={(e)=>setPriority(e.target.value)} width="160px">
          <option value="all">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        <Button onClick={apply} colorScheme="blue">Filter</Button>
        <Button onClick={clear}>Clear</Button>
      </HStack>
    </Box>
  );
}