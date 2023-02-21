import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
} from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createUserStart, updateUserStart } from '../store/action-creators';

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  status: '',
};

const options = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
];

function AddEditUser() {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [statusErrorMessage, setStatusErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { users } = useSelector((state) => state.data);
  const {
    address, name, email, phone, status,
  } = formValue;

  // This useEffect is for populating user add/edit form
  // when we already have a user in the store
  useEffect(() => {
    if (id) {
      setEditMode(true);
      const user = users.find((item) => item.id === Number(id));

      if (user) {
        setFormValue(user);
      }
    } else {
      setEditMode(false);
      setFormValue(initialState);
    }
  }, [id]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!status) {
      setStatusErrorMessage('Please provide status');
    }

    if (address && name && email && phone && status) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success('User successfully created');
        setTimeout(() => navigate('/'), 1000);
      } else {
        dispatch(updateUserStart({ userId: id, userInfo: formValue }));
        setEditMode(false);
        toast.success('User successfully updated');
        setTimeout(() => navigate('/'), 1000);
      }
    }
  };

  const handleDropdownChange = (evt) => {
    setStatusErrorMessage(null);
    setFormValue({ ...formValue, status: evt.target.value });
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
      <p className="fs-2 fw-bold">
        {editMode ? 'Update User Details' : 'Add User Details'}
      </p>
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
        <select
          style={{
            width: '100%',
            borderRadius: '4px',
            height: '35px',
            borderColor: '#83ccc5',
          }}
          onChange={handleDropdownChange}
        >
          <option>Please select status</option>
          {options.map((item) => (
            <option
              key={item.value}
              selected={item.value === status}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>
        {statusErrorMessage && (
          <div style={{ color: 'red', textAlign: 'left', fontSize: '14px' }}>
            {statusErrorMessage}
          </div>
        )}
        <br />
        <br />
        <div className="col-12">
          <MDBBtn style={{ marginRight: '10px' }} type="submit">
            {editMode ? 'Update' : 'Add'}
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
