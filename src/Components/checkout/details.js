
import React from 'react';

import { TextField } from '@material-ui/core';

export const Details = () => {
    return (
        <div>

        <form noValidate autoComplete="off">

          <h3>Account</h3>
          <TextField
            id="standard-basic"
            label="First Name"
            defaultValue=""
          />
          <TextField
            id="standard-basic"
            label="Last Name"
            defaultValue=""
          />
          <TextField
            id="standard-basic"
            label="Phone"
            defaultValue=""
          />

          <br />

          <h3>Address</h3>
          <TextField
            id="standard-basic"
            label="Adress Line 1"
            defaultValue=""
          />
          <TextField
            id="standard-basic"
            label="Adress Line 2"
            defaultValue=""
          />
          <TextField
            id="standard-basic"
            label="City / Town"
            defaultValue=""
          />
          <TextField
            id="standard-basic"
            label="County"
            defaultValue=""
          />
          <TextField
            id="standard-basic"
            label="Postcode"
            defaultValue=""
          />

        </form>

      </div>
    )
}

export default Details;