import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks/tasksSlice";

const loadState = () => {
  try {
    const serialized = localStorage.getItem("creative_upaay_state");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) {
    console.warn("Could not load state", e);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("creative_upaay_state", serialized);
  } catch (e) {
    console.warn("Could not save state", e);
  }
};

const preloaded = loadState();

const store = configureStore({
  reducer: { tasks: tasksReducer },
  preloadedState: preloaded,
});

store.subscribe(() => {
  saveState({ tasks: store.getState().tasks });
});

export default store;