import React from 'react';
import { MDBTypography } from 'mdb-react-ui-kit';

function About() {
  return (
    <div style={{ marginTop: '100px' }}>
      <MDBTypography note noteColor="primary">
        This is a React + Redux application. CRUD operations are implemented via
        Redux Saga.
      </MDBTypography>
    </div>
  );
}

export default About;
