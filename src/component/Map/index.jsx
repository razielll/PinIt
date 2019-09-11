/* eslint-disable no-unused-vars */
import React from 'react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';

const Map = withScriptjs(
	withGoogleMap(props => (
		<GoogleMap defaultZoom={8} defaultCenter={{ lat: -30.397, lng: 30.644 }}>
			{props.markers.map((mark, i) => {
				console.log('%cMarker ->', 'padding:8px 4px; color:steelblue;', mark);
				return <Marker key={i} position={{ lat: mark.lat, lng: mark.lng }} />;
			})}
		</GoogleMap>
	))
);

export default Map;
