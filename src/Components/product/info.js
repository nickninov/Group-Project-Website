import React from "react";

import * as FeatherIcon from "react-feather";
import Price from "../common/price";

import "./info.css";

const Info = (props) => {

	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
	  setOpen(true);
	};
  
	const handleClose = (event, reason) => {
	  if (reason === 'clickaway') {
		return;
	  }
  
	  setOpen(false);
	};

  function share() {
    const port = window.location.port;
    navigator.clipboard.writeText(
      window.location.hostname +
        (port != null && ":" + port) +
        "/product/" +
        props.id
	);
	document.getElementById("vis").style.display = "inline";
  }

  // const productCategories = props.categories.map((cat) => (
  //   <span className="chip">{cat.name.toUpperCase()}</span>
  // ));

  return (
    <div>
      {/* <div className="chip-wrapper">{productCategories}</div> */}

      <h1>{props.name}</h1>
      <p className="product-desc">{props.description}</p>
      <div onClick={share} className="product-share">
        <FeatherIcon.Share color="black" size="20" /><span id="vis" style={{
			marginLeft: 10,
			marginTop: 15,
			display: "none"
		}}>Link copied!</span>
      </div>

      <Price
        oneLine={true}
        price={props.currentPrice}
        discount={props.discountPrice}
      />
    </div>
  );
};

export default Info;
