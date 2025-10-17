import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk('adminUser/fetchUsers', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });

  return response.data;
});

// Create a new user
export const addUser = createAsyncThunk(
  'adminUser/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.message);
    }
  },
);

// Update user Info
export const updateUser = createAsyncThunk(
  'adminUser/updateUser',
  async ({ id, email, name, role }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
      { email, name, role },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      },
    );

    return response.data;
  },
);

// Delete a User
export const deleteUser = createAsyncThunk('adminUser/deleteUser', async (id) => {
  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });

  return id;
});

const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.user;
        const userIndex = state.users.findIndex((user) => user._id === updatedUser._id);

        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default adminUserSlice.reducer;
