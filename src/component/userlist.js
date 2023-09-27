import React, { useEffect} from 'react'
import { Link } from 'react-router-dom';
import { fetchUsers } from '../app/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';


function Userlist() {
  
  const dispatch= useDispatch();
  const users= useSelector( (state)=>{ return state.user});

  useEffect( ()=>{
      dispatch(fetchUsers());
  }, [dispatch]);


  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
           <div className='col-mid-12'>
              <h3 className='mt-3'>Userlist</h3>  

              {
                users.loading && (<div className='spineer-border text-primary' role='status'>
                   <span className='visually-hidden'>Loading...</span> 
                </div>
              )}
              <div className="d-grid justify-content-start">
                <Link to="/adduser" className="btn btn-info btn-lg mb-3">Add User</Link>
              </div>
              <table className="table table-bordered">
              <thead>
                 <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>First_Name</th>
                    <th>Last_Name</th>
                    <th>Avatar</th>
                    <th>Action</th>
                 </tr>
              </thead>
              <tbody>
              {
                users.user.data?.map((item) =>(
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td><img src={item.avatar} alt='Avatar' width="50" height="50" /></td>
                    <td>Action</td>
                  </tr>
                ))
              }
             </tbody>
        </table>    
           </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Userlist;