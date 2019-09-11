import React, { PureComponent } from 'react';

class AddressInput extends PureComponent {
	render() {
		return (
			<div className='input-container'>
				<input
					className='address-input'
					name='address'
					value={this.props.adress}
					onKeyPress={this.props.onKeyPress}
					placeholder='Type an address'
				/>
			</div>
		);
	}
}

export default AddressInput;
