import React, { Component } from 'react';
import Geocode from 'react-geocode';
import { AddressInput, Map, ListItems, Footer } from './component/index';
import './App.scss';
import { translateAndSave, fetchFromStorage, checkInStorage } from './utils';
import { ADDRESS_STORAGE_KEY } from './constants';

Geocode.setApiKey('AIzaSyCKgE8gvERM__LG9dDbOLpAgWoHEqYtZGI');

class App extends Component {
	state = {
		items: checkInStorage(ADDRESS_STORAGE_KEY)
			? fetchFromStorage(ADDRESS_STORAGE_KEY)
			: [],
		markers: [],
	};

	handleKeyPress = async ({ target: { value }, key }) => {
		if (key === 'Enter') {
			const response = await translateAndSave(value);

			if (response.success) {
				this.generateMarkers(fetchFromStorage(ADDRESS_STORAGE_KEY));
			}
		}
	};

	componentDidMount() {
		this.generateMarkers(this.state.items);
	}

	generateMarkers = (data = []) => {
		if (!data) return data;
		const markers = data.map(item => ({
			lat: item.coords.lat,
			lng: item.coords.lng,
		}));

		this.setState({ markers, items: data });
	};

	handleDelete = id => {
		console.log('%cWill delete id #', 'color:red; font-size: 12px;', id);
	};

	render() {
		const { address, items } = this.state;

		return (
			<React.Fragment>
				<AddressInput address={address} onKeyPress={this.handleKeyPress} />
				<div className='site-content-wrapper'>
					<ListItems items={items} onDelete={this.handleDelete} />
					<Map
						googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBe2G6Moqh0Zft5OUifEqwKb3TtRkvboxA&v=3.exp&libraries=geometry,places'
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div className='map-container' />}
						mapElement={<div style={{ height: `100%` }} />}
						markers={this.state.markers}
					/>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default App;
