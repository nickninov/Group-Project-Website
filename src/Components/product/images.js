import React from "react";

// packages
import ImageGallery from "react-image-gallery";

// styles
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

const Images = (props) => (
  <ImageGallery
    showFullscreenButton={false}
    showPlayButton={false}
    showNav={false}
    items={props.data}
  />
);

export default Images;
