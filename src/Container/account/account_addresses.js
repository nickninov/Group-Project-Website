import React from "react";

// components
import Address from "../../Components/account/address";
import { AddressBox } from "../../Components/common/address_box";
import CustomButton from "../../Components/common/custom_button";

// utility
import errorCheck from "../../Utility/checkError";

// packages
import EditIcon from "@material-ui/icons/Edit";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

// api
import { updateUserAccount } from "../../API/api";

export default class AccountAddresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null, // used by modal as validation error data
      modalShow: false, // visibility of modal
      modalData: null, // modal data
    };
  }

  // toggle visibility of modal
  showModal(modalData) {
    this.setState({
      errors: null,
      modalShow: true,
      modalData,
    });
  }
  hideModal() {
    this.setState({
      modalShow: false,
    });
  }

  onSave = async (address, id) => {
    // copy of account data
    let acc = JSON.parse(JSON.stringify(this.props.account));

    // on save of new address, enforce one billing and delivery address
    address.isBilling && acc.addresses.forEach((e) => (e.isBilling = false));
    address.isDelivery && acc.addresses.forEach((e) => (e.isDelivery = false));

    if (id != null ? true : false) {
      // existing address
      let indexToChange = 0;
      let index = 0;
      acc.addresses.forEach((e) => {
        e._id === id ? (indexToChange = index) : index++;
      });
      // replace the correct address by index
      acc.addresses[indexToChange] = address;
    } else {
      // new address
      acc.addresses.push(address);
    }

    // send updated account to server
    let res = await updateUserAccount(acc, this.props.token);

    if (res.status == 200) {
      // on success, reload page
      window.location.reload();
    } else if (res.status == 400) {
      let rawErrors = res.body.addresses;

      // format validation errors in line to how address modal expects them
      const errors = {
        firstLine: errorCheck(rawErrors, "firstLine"),
        secondLine: errorCheck(rawErrors, "secondLine"),
        townCity: errorCheck(rawErrors, "townCity"),
        county: errorCheck(rawErrors, "county"),
        postcode: errorCheck(rawErrors, "postcode"),
      };

      // update error data in state (to display in modal)
      this.setState({
        errors,
      });
    } else {
      alert("Something went wrong.");
    }
  };

  onDelete = async (id) => {
    // copy of account data
    let acc = JSON.parse(JSON.stringify(this.props.account));

    // get index of address to delete
    let indexToDelete = 0;
    let index = 0;
    acc.addresses.forEach((e) =>
      e._id === id ? (indexToDelete = index) : index++
    );

    // cut relevant address from list
    acc.addresses.splice(indexToDelete, indexToDelete + 1);

    // send updated account
    let res = await updateUserAccount(acc, this.props.token);

    if (res.status == 200) {
      // on success, reload page
      window.location.reload();
    } else {
      alert("Something went wrong.");
      window.location.reload();
    }
  };

  components() {
    // render each address as jsx component
    let addresses = this.props.account.addresses.map((e) => {
      const eTitle =
        e.isDelivery && e.isBilling
          ? "DELIVERY + BILLING"
          : e.isDelivery
          ? "DELIVERY"
          : e.isBilling
          ? "BILLING"
          : null;

      return (
        <div className="details-address-wrapper">
          <AddressBox title={eTitle} address={e} fullHeight={true}>
            <CustomButton
              script={() => this.showModal(e)}
              text="Edit"
              bgColor="#95afc0"
              textColor="#535c68"
              icon={<EditIcon />}
            />
          </AddressBox>
        </div>
      );
    });

    // ability to add new address through jsx element
    addresses.push(
      <div className="details-box-add">
        <CustomButton
          text="Add"
          bgColor="#535c68"
          textColor="#95afc0"
          script={() => this.showModal(null)}
          icon={<PlaylistAddIcon />}
        />
      </div>
    );

    return (
      <div>
        <div className="details-content">{addresses}</div>
        {
          // show address modal when adding or editing an address
          this.state.modalShow && (
            <Address
              show={this.state.modalShow}
              address={this.state.modalData}
              errors={this.state.errors}
              onHide={() => this.hideModal()}
              onDelete={this.onDelete}
              onSave={this.onSave}
            />
          )
        }
      </div>
    );
  }

  render() {
    return this.components();
  }
}
