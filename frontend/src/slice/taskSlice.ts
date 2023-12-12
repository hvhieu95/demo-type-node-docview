// src/slice/taskSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
interface Task {
  id: string;
  title: string;
  endDate: string;
  assigner: string;
  status: string;
  priority: string;
  fileUrl?: string;
}
interface TaskState {
  tasks: Task[];
  currentFileUrl?: string;
}

const initialState: TaskState = {
  tasks: [],
  currentFileUrl: "",
};

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    const response = await axios.get<Task[]>(
      " http://127.0.0.1:8000/api/tasks/"
    );
    console.log("Fetched Tasks:", response.data);
    return response.data;
  }
);

export const createTask = createAsyncThunk<Task, Partial<Task>>(
  "tasks/createTask",
  async (taskData: Partial<Task>) => {
    const response = await axios.post<Task>(
      " http://127.0.0.1:8000/api/tasks/",
      taskData
    );
    console.log("Response from server:", response.data);
    return response.data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setCurrentFileUrl: (state, action: PayloadAction<string>) => {
      state.currentFileUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      });
  },
});
export const { setCurrentFileUrl } = taskSlice.actions;
export default taskSlice.reducer;
