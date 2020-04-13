import React from "react";

// styles
import "./wrapper.css";

export const Wrapper = (props) => (
  <div className="checkout-wrapper">
    {/* top section - breadcrumbs */}
    <div className="content-steps">{props.steps}</div>

    <div className="content-wrapper">
      {/* main section, cart, options, or checkout */}
      {props.section}
      {/* section navigation controls */}
      <div className="content-navigator">
        <div
          style={{
            display: props.index === 0 ? "none" : "block",
          }}
          className="content-navigator-backwards"
        >
          {props.backwardButton}
        </div>
        <div className="content-navigator-forwards">{props.forwardButton}</div>
      </div>
    </div>
  </div>
);

export default Wrapper;
