import React from "react";

import "./centred_text.css";

const CentredText = (props) => (
  <div>
    <h5
      className="centred-text"
      style={{ fontStyle: props.italic ? "italic" : "inherit" }}
    >
      {props.text}
    </h5>
  </div>
);

export default CentredText;
