import React, { Component } from 'react';
import Geocode from 'react-geocode';
import { AddressInput, Map, ListItems, Footer } from './component/index';
import './App.scss';
import {
	translateAndSave,
	fetchFromStorage,
	checkInStorage,
	deleteFromStorage,
} from './utils';
import { ADDRESS_STORAGE_KEY } from './constants';

let mapEl;

Geocode.setApiKey('AIzaSyCKgE8gvERM__LG9dDbOLpAgWoHEqYtZGI');

class App extends Component {
	state = {
		items: checkInStorage(ADDRESS_STORAGE_KEY)
			? fetchFromStorage(ADDRESS_STORAGE_KEY)
			: [],
		markers: [],
	};

	componentDidMount = () => {
		this.generateMarkers(this.state.items);
	};

	handleKeyPress = async ({ target: { value }, key }) => {
		if (key === 'Enter') {
			const response = await translateAndSave(value);

			if (response.success) {
				this.generateMarkers(fetchFromStorage(ADDRESS_STORAGE_KEY));
			}
		}
	};

	generateMarkers = (data = []) => {
		if (!data) return data;
		const markers = data.map(item => ({
			lat: item.coords.lat,
			lng: item.coords.lng,
		}));
		console.log('data', data);
		this.setState({ markers, items: data }, () => this.fitBounds());
	};

	fitBounds = () => {
		if (!window.google) {
			return setTimeout(() => this.fitBounds(), 330);
		}
		const bounds = new window.google.maps.LatLngBounds();
		this.state.markers.map(mark => {
			bounds.extend(mark);
		});
		mapEl.fitBounds(bounds);
	};

	handleDelete = async id => {
		const { result } = await deleteFromStorage(id);
		if (result) {
			const items = fetchFromStorage(ADDRESS_STORAGE_KEY);
			this.setState(
				{
					items,
				},
				() => this.generateMarkers(items)
			);
		}
	};

	render() {
		const { items } = this.state;

		return (
			<React.Fragment>
				<AddressInput onKeyPress={this.handleKeyPress} />
				<div className='site-content-wrapper'>
					<ListItems items={items} onDelete={this.handleDelete} />
					<Map
						mapRef={ref => (mapEl = ref)}
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
