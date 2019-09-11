import React, { PureComponent } from 'react';

class AddressInput extends PureComponent {
	render() {
		return (
			<div className='input-container'>
				<input
					className='address-input'
					name='address'
					// value={this.props.adress}
					defaultValue='10 habastiliya, haifa'
					onKeyPress={this.props.onKeyPress}
					placeholder='# Street, City'
				/>
			</div>
		);
	}
}

export default AddressInput;
