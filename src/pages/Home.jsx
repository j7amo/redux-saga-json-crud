import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUserStart, loadUsersStart } from '../store/action-creators';

function Home() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete the user?')) {
      dispatch(deleteUserStart(id));
      toast('User deleted successfully');
    }
  };

  return (
    <div className="container" style={{ marginTop: '150px' }}>
      <MDBTable>
        <MDBTableHead dark>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        {users
          && users.map((user, index) => (
            <MDBTableBody key={user.email}>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <MDBBtn
                    className="m-1"
                    tag="a"
                    color="none"
                    onClick={() => handleDelete(user.id)}
                  >
                    <MDBTooltip title="Delete" tag="a">
                      <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: '#dd4b39' }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </MDBBtn>
                  <Link to={`/editUser/${user.id}`}>
                    <MDBTooltip title="Edit" tag="a">
                      <MDBIcon
                        fas
                        icon="pen"
                        style={{ color: '#55acee', marginBottom: '16px' }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </Link>
                  <Link to={`/userInfo/${user.id}`}>
                    <MDBTooltip title="View" tag="a">
                      <MDBIcon
                        fas
                        icon="eye"
                        style={{ color: '#3b5998', marginBottom: '16px' }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </Link>
                </td>
              </tr>
            </MDBTableBody>
          ))}
      </MDBTable>
    </div>
  );
}

export default Home;
