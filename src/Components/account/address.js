import React from "react";

import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomButton from "../../Components/common/custom_button";

import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

import "./address.css";

export default function Address(props) {
    var addr = props.address;
  
    const [firstLine, setFirstLine] = useState(
      addr == null ? "" : addr.firstLine
    );
    const [secondLine, setSecondLine] = useState(
      addr == null ? "" : addr.secondLine
    );
    const [townCity, setTownCity] = useState(addr == null ? "" : addr.townCity);
    const [county, setCounty] = useState(addr == null ? "" : addr.county);
    const [postcode, setPostcode] = useState(addr == null ? "" : addr.postcode);
    const [isBilling, setIsBilling] = useState(
      addr == null ? "" : addr.isBilling
    );
    const [isDelivery, setIsDelivery] = useState(
      addr == null ? "" : addr.isDelivery
    );
  
    function saveChanges() {
      if (addr == null) {
        props.onCreation({
          firstLine: firstLine,
          secondLine: secondLine,
          townCity: townCity,
          county: county,
          postcode: postcode,
          isBilling: isBilling,
          isDelivery: isDelivery
        });
      } else {
        props.onSave({
          _id: addr._id,
          firstLine: firstLine,
          secondLine: secondLine,
          townCity: townCity,
          county: county,
          postcode: postcode,
          isBilling: isBilling,
          isDelivery: isDelivery
        });
      }
    }
  
    function deleteAddress() {
      props.onDelete(addr);
    }
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={props.onDiscard}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {addr != null ? "Edit Address" : "Add Address"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            className="account-address-textfield"
            id="standard-basic"
            label="First Line"
            defaultValue={firstLine}
            onChange={e => setFirstLine(e.target.value)}
          />
  
          <TextField
            className="account-address-textfield"
            id="standard-basic"
            label="Second Line"
            defaultValue={secondLine}
            onChange={e => setSecondLine(e.target.value)}
          />
  
          <TextField
            className="account-address-textfield"
            id="standard-basic"
            label="townCity"
            defaultValue={townCity}
            onChange={e => setTownCity(e.target.value)}
          />
  
          <br />
  
          <TextField
            className="account-address-textfield"
            id="standard-basic"
            label="County"
            defaultValue={county}
            onChange={e => setCounty(e.target.value)}
          />
  
          <TextField
            className="account-address-textfield"
            id="standard-basic"
            label="Postcode"
            defaultValue={postcode}
            onChange={e => setPostcode(e.target.value)}
          />
  
          <br />
          <div className="account-address-textfield">
            <FormControlLabel
              control={
                <Checkbox
                  checked={isBilling}
                  onChange={e => setIsBilling(e.target.checked)}
                />
              }
              label="Billing"
            />
  
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDelivery}
                  onChange={e => setIsDelivery(e.target.checked)}
                />
              }
              label="Delivery"
            />
          </div>
  
          <br />
  
          {addr != null && (
            <div className="account-address-textfield">
              <CustomButton
                script={deleteAddress}
                bgColor="#ff7675"
                textColor="#d63031"
                text="Delete"
                icon={<DeleteIcon />}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <CustomButton
            script={props.onDiscard}
            bgColor="#EAEFD3"
            textColor="#A72D2D"
            text="Discard"
            icon={<CloseIcon />}
          />
  
          <CustomButton
            script={saveChanges}
            bgColor="#A72D2D"
            textColor="#EAEFD3"
            text="Save"
            icon={<SaveIcon />}
          />
        </Modal.Footer>
      </Modal>
    );
  }
