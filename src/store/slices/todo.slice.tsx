import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Status = "TODO" | "INCOMPLETE" | "COMPLETED";
type Category = "WORK" | "PERSONAL";
type TaskActivity = {
  createdAt: Date;
  updateAt: Date;
  fileUpdateAt: Date;
};

export interface TodoStore {
  id: string;
  title: string;
  due_on: Date;
  status: Status;
  category: Category;
  activity: TaskActivity;
}

// Load from localStorage (convert stored dates back to Date objects)
const storedTasks = localStorage.getItem("todos");

const INITIAL_STATE: TodoStore[] = storedTasks
  ? JSON.parse(storedTasks).map((task: TodoStore) => ({
      ...task,
      due_on: new Date(task.due_on),
      activity: {
        ...task.activity,
        createdAt: new Date(task.activity.createdAt),
        updateAt: new Date(task.activity.updateAt),
        fileUpdateAt: new Date(task.activity.fileUpdateAt),
      },
    }))
  : [];
  
const todoSlice = createSlice({
  name: "todoReducer",
  initialState: INITIAL_STATE,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoStore>) => {
      state.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const updatedState = state.filter((task) => task.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(updatedState));
      return updatedState;
    },
    updateTodo: (state, action: PayloadAction<{ id: string; updatedTodo: Partial<TodoStore> }>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload.updatedTodo,
          activity: {
            ...state[index].activity,
            updateAt: new Date(), 
          },
        };
        localStorage.setItem("todos", JSON.stringify(state));
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
