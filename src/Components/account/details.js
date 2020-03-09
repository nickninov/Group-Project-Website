import React from "react";

import "./layout.css";

export const Details = props => {

  let user = props.data;

  return (
    <div>
      <h2>User Details</h2>
      <div class="row">
        <div class="alert alert-light">
          <p>First name: {user.firstName}</p>
          <p>Last name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Phone number: {user.phone}</p>
          <p>Address: {user.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
