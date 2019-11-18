import React from "react";
import Carousel from "nuka-carousel";

class ImageCarousel extends React.Component {
	render() {
		return (
			<Carousel autoplay={true} wrapAround={true} withoutControls={true} heightMode={"first"}>
				<img src="" />
				<img src="" />
				<img src="" />
			</Carousel>
		);
	}
}

export default ImageCarousel;
