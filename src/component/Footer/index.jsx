import React from 'react';

const Footer = () => {
	let pos = Math.random() > 0.5;
	return (
		<div className='footer'>
			<span>{pos ? 'anton' : 'mario'}</span>
			<img
				src='http://www.pngall.com/wp-content/uploads/2/Mario-PNG-File-Download-Free.png'
				alt='mario'
				height='100'
			/>
			<span>{pos ? 'mario' : 'anton'}</span>
		</div>
	);
};

export default Footer;
