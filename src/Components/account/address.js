import React from "react";

// components
import CustomButton from "../../Components/common/custom_button";

// packages
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

// styles
import "./address.css";

export default function Address(props) {
  // get prop data
  const show = props.show;
  const errors = props.errors;
  const errEx = errors != null ? true : false;
  const addr = props.address;
  const edit = addr == null ? false : true;

  // setup variable and setters for each variables using hooks
  const [firstLine, setFirstLine] = useState(edit ? addr.firstLine : "");
  const [secondLine, setSecondLine] = useState(edit ? addr.secondLine : "");
  const [townCity, setTownCity] = useState(edit ? addr.townCity : "");
  const [county, setCounty] = useState(edit ? addr.county : "");
  const [postcode, setPostcode] = useState(edit ? addr.postcode : "");
  const [isBilling, setIsBilling] = useState(edit ? addr.isBilling : false);
  const [isDelivery, setIsDelivery] = useState(edit ? addr.isDelivery : false);

  // callbacks
  function onHide() {
    props.onHide();
  }
  function onDelete() {
    props.onDelete();
  }
  function onSave() {
    props.onSave(
      {
        firstLine,
        secondLine,
        townCity,
        county,
        postcode,
        isBilling,
        isDelivery,
      },
      edit ? addr._id : null
    );
  }

  // validation formatting helpers for input fields
  function errCheckBool(attribute) {
    return errEx && errors[attribute] != "" ? true : false;
  }
  function errCheckText(attribute) {
    return errEx ? errors[attribute] : "";
  }

  return (
    <Modal show={show} size="lg" onHide={onHide} centered>
      <Modal.Header closeButton>
        {/* title */}
        <Modal.Title id="containe›d-modal-title-vcenter">
          {edit ? "Edit Address" : "Add Address"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* body */}
        <TextField
          className="account-address-textfield"
          id="standard-basic"
          label="First Line"
          defaultValue={firstLine}
          onChange={(e) => setFirstLine(e.target.value)}
          error={errCheckBool("firstLine")}
          helperText={errCheckText("firstLine")}
        />
        <TextField
          className="account-address-textfield"
          id="standard-basic"
          label="Second Line"
          defaultValue={secondLine}
          onChange={(e) => setSecondLine(e.target.value)}
          error={errCheckBool("secondLine")}
          helperText={errCheckText("secondLine")}
        />
        <TextField
          className="account-address-textfield"
          id="standard-basic"
          label="Town / City"
          defaultValue={townCity}
          onChange={(e) => setTownCity(e.target.value)}
          error={errCheckBool("townCity")}
          helperText={errCheckText("townCity")}
        />
        <br />
        <TextField
          className="account-address-textfield"
          id="standard-basic"
          label="County"
          defaultValue={county}
          onChange={(e) => setCounty(e.target.value)}
          error={errCheckBool("county")}
          helperText={errCheckText("county")}
        />
        <TextField
          className="account-address-textfield"
          id="standard-basic"
          label="Postcode"
          defaultValue={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          error={errCheckBool("postcode")}
          helperText={errCheckText("postcode")}
        />
        <br />
        {/* billing and delivery checkboxes */}
        <div className="account-address-textfield">
          <FormControlLabel
            label="Billing"
            control={
              <Checkbox
                checked={isBilling}
                onChange={(e) => setIsBilling(e.target.checked)}
              />
            }
          />
          <FormControlLabel
            label="Delivery"
            control={
              <Checkbox
                checked={isDelivery}
                onChange={(e) => setIsDelivery(e.target.checked)}
              />
            }
          />
        </div>
        <br />
        {edit && (
          <div className="account-address-textfield">
            <CustomButton
              script={onDelete}
              bgColor="#ff7675"
              textColor="#d63031"
              text="Delete"
              icon={<DeleteIcon />}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* footer */}
        <CustomButton
          script={onHide}
          bgColor="#EAEFD3"
          textColor="#A72D2D"
          text="Discard"
          icon={<CloseIcon />}
        />
        <CustomButton
          script={onSave}
          bgColor="#A72D2D"
          textColor="#EAEFD3"
          text="Save"
          icon={<SaveIcon />}
        />
      </Modal.Footer>
    </Modal>
  );
}
