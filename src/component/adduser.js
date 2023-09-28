import React, { useState } from 'react'
 import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
 import { addUser } from "../app/user/userSlice";
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

function Adduser(){
   const schema = yup.object().shape({
      email: yup.string().email().required("Email is Required!"),
      first_name: yup.string().required("First Name is Required!"),
      last_name: yup.string().required("Last Name is Required!"),
      avatar: yup.string().url().required("Image URL is Required!"),
    });

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema), 
    });
     const [users, setUsers] = useState({});
     const dispatch= useDispatch();
     const navigate= useNavigate();

     const getUserData = (e) => {
        setUsers({...users, [e.target.name]: e.target.value });
     };

      const onSubmit = (users) => {
        console.log("users...", users);
         dispatch(addUser(users));
          navigate("/userlist");
     };

  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
           <div className='col-mid-12'>
              <h3 className='mt-3'>Add New User</h3>
                
              <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'>Email:</label>
                     <div className='col-md-8'>
                        <input type='text' className='form-control' name='email' onChange={getUserData} placeholder='Enter Email' {...register("email")} />
                        <p>{errors.email?.message}</p>
                     </div>
                   </div>
                  <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'>First Name:</label>
                     <div className='col-md-8'>
                     <input className='form-control' name='first_name' onChange={getUserData} placeholder='Enter first name' {...register("first_name")} />
                      <p>{errors.first_name?.message}</p>
                     </div>
                   </div>
                  <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'>Last Name:</label>
                     <div className='col-md-8'>
                     <input className='form-control' name='last_name' onChange={getUserData} placeholder='Enter last name' {...register("last_name")} />
                     <p>{errors.last_name?.message}</p>
                     </div>
                   </div>
                  <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'>Avatar:</label>
                     <div className='col-md-8'>
                     <input className='form-control' name='avatar' onChange={getUserData} placeholder='Paste URL' {...register("avatar")} />
                     <p>{errors.avatar?.message}</p>
                     </div>
                   </div>
                  <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'></label>
                     <div className='col-md-1'>
                     <button type='submit' className='btn btn-info btn-lg'>Submit</button>
                     </div>
                   </div>
                  
              </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Adduser;