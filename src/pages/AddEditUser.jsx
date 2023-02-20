import React, { useState } from 'react';
import {
  MDBBtn,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
};

function AddEditUser() {
  const [formValue, setFormValue] = useState(initialState);
  const navigate = useNavigate();
  const {
    address, name, email, phone,
  } = formValue;

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  // This is how we can write a universal onChange handler
  // instead of writing 4 separate handlers for every input
  const handleInputChange = (evt) => {
    const { name: inputName, value } = evt.target;
    setFormValue({ ...formValue, [inputName]: value });
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: '100px' }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">Add Edit User</p>
      <div
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
      >
        <MDBValidationItem feedback="Please provide a name." invalid>
          <MDBInput
            value={name}
            name="name"
            type="text"
            onChange={handleInputChange}
            required
            label="Name"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please provide an email." invalid>
          <MDBInput
            value={email}
            name="email"
            type="email"
            onChange={handleInputChange}
            required
            label="Email"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please provide a phone number." invalid>
          <MDBInput
            value={phone}
            name="phone"
            type="tel"
            onChange={handleInputChange}
            required
            label="Phone"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please provide an address." invalid>
          <MDBInput
            value={address}
            name="address"
            type="text"
            onChange={handleInputChange}
            required
            label="Address"
          />
        </MDBValidationItem>
        <br />
        <div className="col-12">
          <MDBBtn style={{ marginRight: '10px' }} type="submit">
            Add
          </MDBBtn>
          <MDBBtn
            style={{ marginRight: '10px' }}
            color="danger"
            type="button"
            onClick={() => navigate('/')}
          >
            Go back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
}

export default AddEditUser;
