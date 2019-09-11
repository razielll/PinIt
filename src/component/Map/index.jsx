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
			{props.markers.map(mark => console.log('one dya i will be marker', mark))}
			<Marker position={{ lat: -30.397, lng: 30.644 }} />
		</GoogleMap>
	))
);

export default Map;
