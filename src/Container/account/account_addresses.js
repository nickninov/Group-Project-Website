import React from "react";

// components
import Address from "../../Components/account/address";

// common
import { AddressBox } from "../../Components/common/address_box";
import CustomButton from "../../Components/common/custom_button";

// utility
import errorCheck from "../../Utility/checkError";

// api
import { updateUserAccount } from "../../API/api";

// external 
import EditIcon from "@material-ui/icons/Edit";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

export default class AccountAddresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      modalShow: false,
      modalData: null,
    };
  }

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

  onDelete = async (id) => {
    let acc = JSON.parse(JSON.stringify(this.props.account));

    let indexToDelete = 0;
    let index = 0;
    acc.addresses.forEach((e) =>
      e._id === id ? (indexToDelete = index) : index++
    );
    acc.addresses.splice(indexToDelete, indexToDelete + 1);

    let res = await updateUserAccount(acc, this.props.token);

    if (res.status == 200) {
      window.location.reload();
    } else {
      alert("Something went wrong.");
      window.location.reload();
    }
  };

  onSave = async (address, id) => {
    let acc = JSON.parse(JSON.stringify(this.props.account));

    address.isBilling && acc.addresses.forEach((e) => (e.isBilling = false));
    address.isDelivery && acc.addresses.forEach((e) => (e.isDelivery = false));

    if (id != null ? true : false) {
      let indexToChange = 0;
      let index = 0;
      acc.addresses.forEach((e) => {
        e._id === id ? (indexToChange = index) : index++;
      });
      acc.addresses[indexToChange] = address;
    } else {
      acc.addresses.push(address);
    }

    let res = await updateUserAccount(acc, this.props.token);

    if (res.status == 200) {
      window.location.reload();
    } else if (res.status == 400) {
      let rawErrors = res.body.addresses;

      const errors = {
        firstLine: errorCheck(rawErrors, "firstLine"),
        secondLine: errorCheck(rawErrors, "secondLine"),
        townCity: errorCheck(rawErrors, "townCity"),
        county: errorCheck(rawErrors, "county"),
        postcode: errorCheck(rawErrors, "postcode"),
      };

      this.setState({
        errors,
      });
    } else {
      alert("Something went wrong.");
    }
  };

  components() {
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
        {this.state.modalShow && (
          <Address
            show={this.state.modalShow}
            address={this.state.modalData}
            errors={this.state.errors}
            onHide={() => this.hideModal()}
            onDelete={this.onDelete}
            onSave={this.onSave}
          />
        )}
      </div>
    );
  }

  render() {
    return this.components();
  }
}
