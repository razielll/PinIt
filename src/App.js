import React, { Component } from 'react';
import Geocode from 'react-geocode';
import './App.scss';
import { AddressInput, Map, ListItems } from './component/index';
import { saveToLocalStorage, loadFromLocalStorage, isItems } from './utils';

Geocode.setApiKey('AIzaSyCKgE8gvERM__LG9dDbOLpAgWoHEqYtZGI');

class App extends Component {
	state = {
		items: isItems() ? loadFromLocalStorage() : [],
		markers: [],
	};

	handleKeyPress = e => {
		const {
			target: { value: addressStr },
		} = e;
		if (e.key === 'Enter') {
			this.handleSaveItem(addressStr);
		}
	};

	handleSaveItem = value => {
		Geocode.fromAddress(value).then(
			response => {
				console.log('GeoCode response ->', response);
				const result = response.results[0];
				const { formatted_address } = result;
				const [street, city, country] = formatted_address.split(', ');
				const { lat, lng } = result.geometry.location;

				const item = {
					address: formatted_address,
					street,
					city,
					country,
					coords: { lat, lng },
				};
				const isSuccessSave = saveToLocalStorage(item);
				if (isSuccessSave) {
					console.log('%cSUCCESS SIR', 'color:red');
					this.setState({
						items: JSON.parse(localStorage.getItem('list-items')),
					});
				}
			},
			error => {
				console.error(error);
			}
		);
	};

	render() {
		return (
			<React.Fragment>
				<AddressInput
					address={this.state.address}
					onKeyPress={this.handleKeyPress}
				/>
				<div className='site-content-wrapper'>
					<ListItems items={this.state.items} />
					<Map
						googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBe2G6Moqh0Zft5OUifEqwKb3TtRkvboxA&v=3.exp&libraries=geometry,places'
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div className='map-container' />}
						mapElement={<div style={{ height: `100%` }} />}
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
