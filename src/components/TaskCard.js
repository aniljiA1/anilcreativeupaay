import React from "react";
import { Box, Text, HStack, Badge, IconButton, VStack } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/tasksSlice";

export default function TaskCard({ task = {}, index = 0 }) {
  const dispatch = useDispatch();
  const { id, title, description, priority } = task;
  if (!id) return null;

  const color = priority === "high" ? "red" : priority === "low" ? "green" : "yellow";

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            bg="gray.50"
            p={3}
            borderRadius="md"
            boxShadow={snapshot.isDragging ? "lg" : "sm"}
          >
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">{title}</Text>
                <Text fontSize="sm" color="gray.600">{description}</Text>
                <Badge mt={2} colorScheme={color}>
                  {priority}
                </Badge>
              </VStack>
              <IconButton
                aria-label="delete"
                icon={<DeleteIcon />}
                size="sm"
                onClick={() => dispatch(deleteTask({ id }))}
              />
            </HStack>
          </Box>
        </div>
      )}
    </Draggable>
  );
}
