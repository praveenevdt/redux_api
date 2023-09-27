import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../app/user/userSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function Edituser() {

  const { id } = useParams();
  const users = useSelector((state) => state.user.data);
  const userToEdit = users?.find((user) => user.id === Number(id));

  const schema = yup.object().shape({
    email: yup.string().email().required('Email is Required!'),
    first_name: yup.string().required('First Name is Required!'),
    last_name: yup.string().required('Last Name is Required!'),
    avatar: yup.string().url().required('Image URL is Required!'),
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userToEdit) {
      setValue('email', userToEdit.email);
      setValue('first_name', userToEdit.first_name);
      setValue('last_name', userToEdit.last_name);
      setValue('avatar', userToEdit.avatar);
    }
  }, [userToEdit, setValue]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(updateUser({ id: userToEdit?.id, ...data }));

    setTimeout(() => {
      navigate('/userlist');
    }, 2000);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <h3 className='mt-3'>Edit User</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'>Email:</label>
                     <div className='col-md-8'>
                        <input type='text' className='form-control' name='email'  placeholder='Enter Email' {...register("email")} />
                        <p>{errors.email?.message}</p>
                     </div>
                   </div>
                  <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'>First Name:</label>
                     <div className='col-md-8'>
                     <input className='form-control' name='first_name'  placeholder='Enter first name' {...register("first_name")} />
                      <p>{errors.first_name?.message}</p>
                     </div>
                   </div>
                  <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'>Last Name:</label>
                     <div className='col-md-8'>
                     <input className='form-control' name='last_name' placeholder='Enter last name' {...register("last_name")} />
                     <p>{errors.last_name?.message}</p>
                     </div>
                   </div>
                  <div className='row mb-3'>
                     <label className='col-sm-3 col-form-label'>Avatar:</label>
                     <div className='col-md-8'>
                     <input className='form-control' name='avatar' placeholder='Paste URL' {...register("avatar")} />
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
