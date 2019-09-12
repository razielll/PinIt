/* eslint-disable no-unused-vars */
import React from 'react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';

function handleMarkerClick(e) {
	console.log('marker click', e);
}

const defaultMapOptions = {
	zoomControl: true,
	mapTypeControl: false,
	scaleControl: true,
	streetViewControl: false,
	rotateControl: false,
	fullscreenControl: false,
};

const Map = withScriptjs(
	withGoogleMap(props => (
		<GoogleMap ref={props.mapRef} options={defaultMapOptions} defaultZoom={8}>
			{props.markers.map((mark, i) => (
				<Marker
					key={i}
					onClick={handleMarkerClick}
					position={{ lat: mark.lat, lng: mark.lng }}
				/>
			))}
		</GoogleMap>
	))
);

export default Map;
