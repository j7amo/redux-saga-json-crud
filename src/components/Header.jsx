import React, { useState } from 'react';
import {
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchUserStart } from '../store/action-creators';

function Header() {
  const dispatch = useDispatch();
  const [showBasic, setShowBasic] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(searchUserStart(searchValue));
    setSearchValue('');
  };

  return (
    <MDBNavbar expand="lg" light bgColor="primary">
      <MDBContainer fluid>
        <MDBNavbarBrand className="text-white">
          <span style={{ marginRight: '10px' }}>
            <MDBIcon fas icon="book-open" />
          </span>
          Contact
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="text-white"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon fas icon="bars" />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink className="nav-link">
                <NavLink to="/" className="text-white">
                  Home
                </NavLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className="nav-link">
                <NavLink to="/addUser" className="text-white">
                  Add User
                </NavLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className="nav-link">
                <NavLink to="/about" className="text-white">
                  About
                </NavLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search user..."
              value={searchValue}
              onChange={(evt) => setSearchValue(evt.target.value)}
            />
            <MDBBtn color="dark" type="submit">
              Search
            </MDBBtn>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;
