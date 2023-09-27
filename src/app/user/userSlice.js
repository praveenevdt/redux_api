import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch users
export const fetchUsers= createAsyncThunk("user/fetchUsers", async()=>{
  return axios.get("https://reqres.in/api/users")
  .then((res) => res.data);
});

// Add user
export const addUser= createAsyncThunk("user/addUser", async(values)=>{
  return fetch("https://reqres.in/api/users", { method:"POST",
  headers:{Accept:"application/json", "Content-Type":"application/json"} ,
  body: JSON.stringify({
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      avatar: values.avatar
  }),

  }).then((res)=> res.json());

});

const userSlice = createSlice({
    name:"user",
      initialState:{
         loading:false,
         user:[],
         error:'',
         isSuccess:'',
      },

    //   reducer call here 
    extraReducers: (builder) =>{
        builder.addCase(fetchUsers.pending, state=>{
          state.loading=true;
        });

        builder.addCase(fetchUsers.fulfilled, (state, action)=>{
          state.loading=false;
          state.user=action.payload;
          state.error='';
        });
        builder.addCase(fetchUsers.rejected, (state, action)=>{
          state.loading=false;
          state.user=[];
          state.error= action.error.message;
        });

        // add user 
        builder.addCase(addUser.pending, (state) =>{
            state.loading= true;
            state.error= '';
        })
        builder.addCase(addUser.fulfilled, (state, action)=>{
            state.loading= false;
            // state.user=[]
            state.isSuccess=action.payload;    
        })
        builder.addCase(addUser.rejected, (state, action)=>{
            state.loading= false; 
            // state.user=[]
            state.error=action.message;    
        });
    },
});


export default userSlice.reducer;