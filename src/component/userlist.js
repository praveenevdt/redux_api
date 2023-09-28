import React from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../app/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../app/user/userSlice";

function Userlist() {
  const dispatch = useDispatch();
  const users = useSelector((state) => {
    return state.user;
  });


  // Function to handle user deletion
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-mid-12">
            <h3 className="mt-3">Userlist</h3>

            {users && users.loading && (
              <div className="spineer-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            <div className="d-grid justify-content-start">
              <Link to="/adduser" className="btn btn-info btn-lg mb-3">
                Add User
              </Link>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Email</th>
                  <th>First_Name</th>
                  <th>Last_Name</th>
                  <th>Avatar</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.user?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>
                      <img
                        src={item.avatar}
                        alt="Avatar"
                        width="50"
                        height="50"
                      />
                    </td>
                    <td>
                      <Link
                        to={`/edituser/${item.id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>{" "}
                      |
                      <button
                        onClick={() => {
                          handleDeleteUser(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Userlist;
