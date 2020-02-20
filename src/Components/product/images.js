
import React from 'react';

import ImageGallery from 'react-image-gallery';

import './images.css';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css'

const Images = (props) => (
	<ImageGallery
		showFullscreenButton={false}
		showPlayButton={false}
		showNav={false}
		items={props.data}
	/>
)

export default Images;