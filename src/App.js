import React, { Component } from 'react';
import Geocode from 'react-geocode';
import './App.scss';
import { AddressInput, Map, ListItems, Footer } from './component/index';
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
			this.handleAddItem(addressStr);
		}
	};

	handleAddItem = addressString => {
		Geocode.fromAddress(addressString).then(
			response => {
				console.log('GeoCode response ->', response);
				const formmatedObj = this.getFormattedObject(response);
				if (saveToLocalStorage(formmatedObj)) {
					console.log('%cSUCCESS SIR', 'color:red');
					const items = loadFromLocalStorage();
					// const markers = this.getMarkers(items);
					this.setState(
						{
							items,
						},
						() => this.generateMarkers(items)
					);
				}
			},
			error => {
				console.error(error);
			}
		);
	};

	getFormattedObject = response => {
		const result = response.results[0];
		const { formatted_address } = result;
		const [street, city, country] = formatted_address.split(', ');
		const { lat, lng } = result.geometry.location;

		const formmatedItem = {
			address: formatted_address,
			street,
			city,
			country,
			coords: { lat, lng },
		};
		return formmatedItem;
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
		console.log('markers', markers);
		this.setState({ markers });
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
				<Footer />
			</React.Fragment>
		);
	}
}

export default App;
