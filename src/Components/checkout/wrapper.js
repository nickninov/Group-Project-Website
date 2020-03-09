import React from "react";

import "./wrapper.css";

export const Wrapper = props => (
  <div className="checkout-wrapper">
    <div className="content-steps">
      {props.steps}
    </div>

    <div className="content-wrapper">
      {props.section}
      <div className="content-navigator">
        <div
          style={{
            display: props.index == 0 ? "none" : "block"
          }}
          className="content-navigator-backwards"
        >
          {props.backwardButton}
        </div>
        <div className="content-navigator-forwards">
          {props.forwardButton}
        </div>
      </div>
    </div>
  </div>
);

export default Wrapper;