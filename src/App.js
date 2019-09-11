import React, { Component } from 'react';
import Geocode from 'react-geocode';
import './App.scss';
import { AddressInput, Map, ListItems } from './component/index';
import { saveToLocalStorage, loadFromLocalStorage } from './utils';

Geocode.setApiKey('AIzaSyCKgE8gvERM__LG9dDbOLpAgWoHEqYtZGI');

class App extends Component {
	state = {
		items: [],
	};

	handleKeyPress = e => {
		const {
			target: { value },
		} = e;
		if (e.key === 'Enter') {
			Geocode.fromAddress(value).then(
				response => {
					console.log('GeoCode response ->', response);
					const result = response.results[0];
					const { formatted_address } = result;
					const [street, city, country] = formatted_address.split(', ');
					const { lat, lng } = result.geometry.location;
					console.log(`street: ${street}, city: ${city} country ${country}`);
					console.log(`lat: ${lat}, lng: ${lng}`);
					const addressItemTosave = {
						address: formatted_address,
						street,
						city,
						country,
						coords: { lat, lng },
					};
					saveToLocalStorage(addressItemTosave);
				},
				error => {
					console.error(error);
				}
			);
		}
	};

	render() {
		return (
			<div className='App'>
				<AddressInput
					address={this.state.address}
					onKeyPress={this.handleKeyPress}
				/>
				<Map
					googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBe2G6Moqh0Zft5OUifEqwKb3TtRkvboxA&v=3.exp&libraries=geometry,places'
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div className='map-container' />}
					mapElement={<div style={{ height: `100%` }} />}
				/>
				<ListItems items={this.state.items} />
			</div>
		);
	}
}

export default App;
