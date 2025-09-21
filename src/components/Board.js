import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Heading } from "@chakra-ui/react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import { moveTaskBetweenColumns, moveWithinColumn } from "../features/tasks/tasksSlice";

export default function Board() {
  const dispatch = useDispatch();
  const { columns, columnOrder, tasks, filter } = useSelector(s => s.tasks);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol && source.index === destination.index) return;

    if (sourceCol === destCol) {
      dispatch(moveWithinColumn({ columnId: sourceCol, sourceIndex: source.index, destIndex: destination.index }));
    } else {
      dispatch(moveTaskBetweenColumns({
        sourceCol, destCol, sourceIndex: source.index, destIndex: destination.index, taskId: draggableId
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {columnOrder.map(colId => (
          <Box key={colId}>
            <Heading size="sm" mb={2}>{columns[colId].title}</Heading>
            <Column column={columns[colId]} tasks={columns[colId].taskIds.map(id => tasks[id])} filter={filter} />
          </Box>
        ))}
      </Grid>
    </DragDropContext>
  );
}