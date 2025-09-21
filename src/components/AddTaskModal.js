import React, { useState } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Textarea, Select, useDisclosure
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/tasksSlice";

export default function AddTaskModal({ isOpen, onClose, defaultColumn = "todo" }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("general");

  const submit = () => {
    if (!title.trim()) return;
    dispatch(addTask({ title, description, priority, category, columnId: defaultColumn }));
    setTitle(""); setDescription(""); setPriority("medium"); setCategory("general");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Task title" />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Description</FormLabel>
            <Textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Task description" />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Priority</FormLabel>
            <Select value={priority} onChange={(e)=>setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Category (optional)</FormLabel>
            <Input value={category} onChange={(e)=>setCategory(e.target.value)} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>Cancel</Button>
          <Button colorScheme="blue" onClick={submit}>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}