import React, { useMemo, useState } from "react";
import { Box, VStack, Button, Text } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import { Droppable } from "react-beautiful-dnd";

function applyFilter(tasks = [], filter) {
  return tasks.filter(t => {
    if (!t) return false;
    if (filter.priority !== "all" && t.priority !== filter.priority) return false;
    if (filter.text) {
      const q = filter.text.toLowerCase();
      if (!t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

export default function Column({ column, tasks, filter }) {
  const [open, setOpen] = useState(false);

  const visibleTasks = useMemo(() => applyFilter(tasks, filter), [tasks, filter]);

  return (
    <Box bg="white" p={3} borderRadius="md" minH="400px" boxShadow="sm">
      <Button size="sm" mb={3} onClick={()=>setOpen(true)}>+ Add Task</Button>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <VStack ref={provided.innerRef} {...provided.droppableProps} spacing={3} align="stretch" minH="300px">
            {visibleTasks.length === 0 && <Text color="gray.500">No tasks</Text>}
            {visibleTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>

      <AddTaskModal isOpen={open} onClose={()=>setOpen(false)} defaultColumn={column.id} />
    </Box>
  );
}