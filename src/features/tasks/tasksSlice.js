import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  columns: {
    todo: { id: "todo", title: "To Do", taskIds: [] },
    inprogress: { id: "inprogress", title: "In Progress", taskIds: [] },
    done: { id: "done", title: "Done", taskIds: [] },
  },
  tasks: {
    // taskId: { id, title, description, priority, category }
  },
  columnOrder: ["todo", "inprogress", "done"],
  filter: { text: "", priority: "all", category: "all" },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const { id, title, description, priority, category, columnId } = action.payload;
        state.tasks[id] = { id, title, description, priority, category };
        state.columns[columnId].taskIds.unshift(id);
      },
      prepare({ title, description, priority = "medium", category = "general", columnId = "todo" }) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            priority,
            category,
            columnId,
          },
        };
      },
    },
    moveTaskBetweenColumns(state, action) {
      const { sourceCol, destCol, sourceIndex, destIndex, taskId } = action.payload;
      // remove from source
      state.columns[sourceCol].taskIds.splice(sourceIndex, 1);
      // insert into dest
      state.columns[destCol].taskIds.splice(destIndex, 0, taskId);
    },
    moveWithinColumn(state, action) {
      const { columnId, sourceIndex, destIndex } = action.payload;
      const arr = state.columns[columnId].taskIds;
      const [moved] = arr.splice(sourceIndex, 1);
      arr.splice(destIndex, 0, moved);
    },
    setFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
    deleteTask(state, action) {
      const { id } = action.payload;
      delete state.tasks[id];
      Object.values(state.columns).forEach(col => {
        col.taskIds = col.taskIds.filter(tid => tid !== id);
      });
    },
    updateTask(state, action) {
      const { id, changes } = action.payload;
      state.tasks[id] = { ...state.tasks[id], ...changes };
    },
    resetState(state) {
      Object.assign(state, initialState);
    }
  },
});

export const {
  addTask,
  moveTaskBetweenColumns,
  moveWithinColumn,
  setFilter,
  deleteTask,
  updateTask,
  resetState,
} = tasksSlice.actions;

export default tasksSlice.reducer;