import React, { Component } from 'react';
import './App.scss';
import { AddressInput, Map } from './component/index';
import { saveToLocalStorage, loadFromLocalStorage } from './utils';

class App extends Component {
	state = {
		items: [],
	};

	handleKeyPress = e => {
		const {
			target: { value },
		} = e;
		if (e.key === 'Enter') {
			// this.setState({ [name]: value });
			// console.log('Enter', value);
			// this.saveAddressToList();
		}
	};

	saveAddressToList = value => {};

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
			</div>
		);
	}
}

export default App;
