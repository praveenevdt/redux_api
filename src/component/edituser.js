import React, { useEffect, useState } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { useNavigate, useParams } from 'react-router-dom';
 import { updateUser } from '../app/user/userSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function Edituser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required('Email is Required!'),
    first_name: yup.string().required('First Name is Required!'),
    last_name: yup.string().required('Last Name is Required!'),
    avatar: yup.string().url().required('Image URL is Required!'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [updateData, setUpdateData] = useState();
  const { users } = useSelector((state) => state.app);

  useEffect(() => {
     if (id) {
         const singleUser = users.filter((item) => item.id === id);
         setUpdateData(singleUser[0]);
     }
  }, []); 

  const newData = (e) => {
     setUpdateData({...updateData, [e.target.name] : e.target.value});
  };

  console.log("updated data", updateData);

  const handleUpdate = (e) => {
    e.preventDefault();
    // console.log(updateData);
     dispatch(updateUser(updateData));
       navigate('/userlist');
   };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <h3 className='mt-3'>Edit User</h3>
          <form onSubmit={handleSubmit(handleUpdate)}>
          <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'>Email:</label>
                     <div className='col-md-8'>
                        <input type='text' className='form-control' name='email' value={updateData && updateData.email} onChange={newData} placeholder='Enter Email' {...register("email")} />
                        <p>{errors.email?.message}</p>
                     </div>
                   </div>
                  <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'>First Name:</label>
                     <div className='col-md-8'>
                     <input className='form-control' name='first_name' value={updateData && updateData.first_name} onChange={newData} placeholder='Enter first name' {...register("first_name")} />
                      <p>{errors.first_name?.message}</p>
                     </div>
                   </div>
                  <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'>Last Name:</label>
                     <div className='col-md-8'>
                     <input className='form-control' name='last_name' value={updateData && updateData.last_name} onChange={newData} placeholder='Enter last name' {...register("last_name")} />
                     <p>{errors.last_name?.message}</p>
                     </div>
                   </div>
                  <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'>Avatar:</label>
                     <div className='col-md-8'>
                     <input className='form-control' name='avatar' value={updateData && updateData.avatar} onChange={newData} placeholder='Paste URL' {...register("avatar")} />
                     <p>{errors.avatar?.message}</p>
                     </div>
                   </div>
                  <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'></label>
                     <div className='col-md-1'>
                     <button type='submit' className='btn btn-info btn-lg'>Update</button>
                     </div>
                   </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edituser;