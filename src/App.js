import React, { Component } from 'react';
import Geocode from 'react-geocode';
import './App.scss';
import { AddressInput, Map, ListItems } from './component/index';
import { translateAndSave, fetchFromStorage, checkInStorage } from './utils';
import { ADDRESS_STORAGE_KEY } from './constants';

Geocode.setApiKey('AIzaSyCKgE8gvERM__LG9dDbOLpAgWoHEqYtZGI');

class App extends Component {
	state = {
		items: checkInStorage(ADDRESS_STORAGE_KEY) ? fetchFromStorage(ADDRESS_STORAGE_KEY) : [],
		markers: [],
	};

	handleKeyPress = e => {
		const { target: { value: addressStr } } = e;
		if (e.key === 'Enter') {
			this.handleSaveItem(addressStr);
		}
	};

	handleSaveItem = async value => {
		const response = await translateAndSave(value);

		if (response.success) {
			this.setState({
				items: fetchFromStorage(ADDRESS_STORAGE_KEY)
			});
		};
	}

	render() {
		const { address, items } = this.state;

		return (
			<div>
				<AddressInput
					address={address}
					onKeyPress={this.handleKeyPress}
				/>
				<div className='site-content-wrapper'>
					<ListItems items={items} />
					<Map
						googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBe2G6Moqh0Zft5OUifEqwKb3TtRkvboxA&v=3.exp&libraries=geometry,places'
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div className='map-container' />}
						mapElement={<div style={{ height: `100%` }} />}
					/>
				</div>
			</div>
		);
	}
}

export default App;
