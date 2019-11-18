import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

class Map extends React.Component {
	componentDidMount() {
		const bounds = new mapboxgl.LngLatBounds();
		this.map = new mapboxgl.Map({container: this.mapDiv, style: "mapbox://styles/mapbox/light-v9"});
		this.markers = this.props.events.map(event => {
			const {lat, lng} = event;
			bounds.extend([lng, lat]);
			const markerElement = document.createElement("DIV");
			markerElement.className = "custom-marker";
			return new mapboxgl.Marker(markerElement).setLngLat({lat: lat, lng: lng}).addTo(this.map);
		});

		if (this.props.type !== "event") {
			this.map.fitBounds(bounds, {padding: 50});
		} else {
			const {lat, lng} = this.props.events[0];
			this.map.flyTo({
				center: {
					lat: lat,
					lng: lng
				},
				zoom: 15
			});
		}
		this.generatePopups();
	}

	generatePopups() {
		if (!this.props.userLocation)
			return false;
		this.popupsGenerated = true;
	}
	render() {
		return (<div>
			<div className='map' ref={mapDiv => this.mapDiv = mapDiv}></div>
		</div>);
	}
}

export default Map;
