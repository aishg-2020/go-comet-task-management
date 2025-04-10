import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "@/types/task";

type State = {
  data: Task[];
  total: number;
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    status: string;
    assignee: string;
    priority: string;
    sort: string;
  };
};

const initialState: State = {
  data: [],
  total: 0,
  loading: false,
  error: null,
  filters: {
    search: "",
    status: "",
    assignee: "",
    priority: "",
    sort: "",
  },
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (
    { skip = 0, limit = 20 }: { skip?: number; limit?: number },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as { tasks: State };
    const { search, status, assignee, priority, sort } = state.tasks.filters;

    const params = new URLSearchParams({
      skip: skip.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(status && { status }),
      ...(assignee && { assignee }),
      ...(priority && { priority }),
      ...(sort && { sort }),
    });

    const res = await fetch(`/api/tasks?${params.toString()}`);

    if (!res.ok) {
      const error = await res.json();
      // Use rejectWithValue to pass a custom error message to the rejected action
      return rejectWithValue(error.message || "Failed to fetch tasks");
    }

    return await res.json();
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetTasks(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload.data];
        state.total = action.payload.total;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (typeof action.payload === "string" && action.payload) ||
          action.error.message ||
          "Error fetching tasks";
      });
  },
});

export const { setFilters, resetTasks } = taskSlice.actions;
export default taskSlice.reducer;
