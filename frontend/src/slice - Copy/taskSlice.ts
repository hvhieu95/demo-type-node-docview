// src/slice/taskSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';
interface Task {
    id: string;
    title: string;
    endDate: string; 
    assigner: string; 
    status: string;
    priority: string;
  }
  interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
  };
  

export const fetchTasks = createAsyncThunk<Task[]>(
    'tasks/fetchTasks',
    async () => {
      const response = await axios.get<Task[]>(' http://127.0.0.1:8000/api/tasks/');
      console.log('Fetched Tasks:', response.data); 
      return response.data;
    }
  );

  export const createTask = createAsyncThunk<Task, Partial<Task>>(
    'tasks/createTask',
    async (taskData: Partial<Task>) => {
      const response = await axios.post<Task>(' http://127.0.0.1:8000/api/tasks/', taskData);
      console.log('Response from server:', response.data);
      return response.data;
    }
  );

  const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      // Định nghĩa các reducers thông thường ở đây nếu có
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchTasks.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
            state.loading = false;
            state.tasks = action.payload;
          })
          // Sửa đổi cách xử lý ở đây
          .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            // Sử dụng error.message nếu có, nếu không thì null
            state.error = action.error.message || null;
          })
          .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
          });
      },
      
  });
  

export default taskSlice.reducer;
