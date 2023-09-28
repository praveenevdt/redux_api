import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const res = await fetch("https://reqres.in/api/users");
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

// Add user
export const addUser = createAsyncThunk("user/addUser", async (values) => {
  try {
    // console.log(values);
    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        avatar: values.avatar,
      }),
    });

    // console.log(response);
    if (!response.ok) {
      console.log("Failed");
      throw new Error("Failed to add user");
    }

    const data = await response.json();
    // console.log(data);
    return data; 
  } catch (error) {
    console.log(error);
    throw error; 
  }
});

// Edit user
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    const response = await fetch(
       `https://reqres.in/api/users/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
       return rejectWithValue(error);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  try {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    return id;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    loading: false,
    user: [],
    error: null,
    isSuccess: "",
  },

  //   reducer call here
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action, "hello===");
      state.user = action.payload.data;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    });

    // add user
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log(state.user, "0--0", action.payload.first_name);
      state.user.push(action.payload);
      state.isSuccess = action.payload;
    });

    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;

      // console.log(action.payload, "--==");
      state.error = action.message;
    });

    // Edit User 
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = state.user.map((item) =>
         item.id === action.payload.id ? action.payload : item
         );
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    
    
    // Delete User 
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      const deletedUserId = action.payload;
      state.user = state.user.filter((user) => user.id !== deletedUserId);
      state.isSuccess = `User with ID ${deletedUserId} deleted successfully.`;
    });
  },
});

export default userSlice.reducer;