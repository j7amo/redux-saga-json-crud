import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MDBBtn,
  MDBBtnGroup,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBRow,
  MDBSpinner,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  deleteUserStart,
  filterUserStart,
  loadUsersStart,
  sortUserStart,
} from '../store/action-creators';

function Home() {
  const dispatch = useDispatch();
  const {
    users, loading, error, pageLimit, currentPage, paginationMode,
  } = useSelector((state) => state.data);
  const [sortValue, setSortValue] = useState();

  const sortOptions = ['Name', 'Email', 'Phone', 'Address', 'Status'];

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    dispatch(loadUsersStart({ start: 0, end: 4, currentPageIncrement: 0 }));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete the user?')) {
      dispatch(deleteUserStart(id));
      toast('User deleted successfully');
      setTimeout(
        () => dispatch(
          loadUsersStart({ start: 0, end: 4, currentPageIncrement: 0 }),
        ),
        200,
      );
    }
  };

  const handleFilterChange = (value) => {
    dispatch(filterUserStart(value));
  };

  const handleSortChange = (evt) => {
    const { value } = evt.target;
    const sortOptionsLowerCase = sortOptions.map((option) => option.toLowerCase());

    if (sortOptionsLowerCase.includes(value)) {
      dispatch(sortUserStart(value));
    }
    setSortValue(value);
  };

  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: '150px' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  const renderPagination = () => {
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() => dispatch(
                loadUsersStart({ start: 4, end: 8, currentPageIncrement: 1 }),
              )}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }

    if (currentPage < pageLimit - 1 && users.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() => dispatch(
                loadUsersStart({
                  start: (currentPage - 1) * 4,
                  end: currentPage * 4,
                  currentPageIncrement: -1,
                }),
              )}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() => dispatch(
                loadUsersStart({
                  start: (currentPage + 1) * 4,
                  end: (currentPage + 2) * 4,
                  currentPageIncrement: 1,
                }),
              )}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }

    return (
      <MDBPagination className="mb-0">
        <MDBPaginationItem>
          <MDBBtn
            onClick={() => dispatch(
              loadUsersStart({
                start: (currentPage - 1) * 4,
                end: currentPage * 4,
                currentPageIncrement: -1,
              }),
            )}
          >
            Prev
          </MDBBtn>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    );
  };

  return (
    <MDBContainer>
      <div className="container" style={{ marginTop: '150px' }}>
        <MDBTable>
          <MDBTableHead dark>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </MDBTableHead>
          {users.length === 0 ? (
            <MDBTableBody className="align-items-center mb-0">
              <tr>
                <td colSpan={8} className="text-center mb-0">
                  No Data Found
                </td>
              </tr>
            </MDBTableBody>
          ) : (
            users.map((user, index) => (
              <MDBTableBody key={user.email}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.status}</td>
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
            ))
          )}
        </MDBTable>
        {paginationMode ? (
          <div
            style={{
              margin: 'auto',
              padding: '15px',
              maxWidth: '200px',
              alignContent: 'center',
            }}
          >
            {renderPagination()}
          </div>
        ) : null}
      </div>
      {users.length > 0 ? (
        <MDBRow>
          <MDBCol size="8">
            <h5>Sort By:</h5>
            <select
              style={{ width: '50%', borderRadius: '2px', height: '35px' }}
              value={sortValue}
              onChange={handleSortChange}
            >
              <option>Please select sort value</option>
              {sortOptions.map((item) => (
                <option
                  key={item}
                  selected={item === sortValue}
                  value={item.toLowerCase()}
                >
                  {item}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol size="4">
            <h5>Filter By Status:</h5>
            <MDBBtnGroup>
              <MDBBtn
                color="success"
                onClick={() => handleFilterChange('active')}
              >
                Active
              </MDBBtn>
              <MDBBtn
                color="danger"
                onClick={() => handleFilterChange('inactive')}
                style={{ marginLeft: '2px' }}
              >
                Inactive
              </MDBBtn>
            </MDBBtnGroup>
          </MDBCol>
        </MDBRow>
      ) : null}
    </MDBContainer>
  );
}

export default Home;
