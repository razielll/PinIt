import React from 'react';

const MARIO_SOUND =
	'http://www.orangefreesounds.com/wp-content/uploads/2014/10/Mario-jump-sound.mp3?_=1';

const Footer = () => {
	let pos = Math.random() > 0.5;
	let marioSoundEl = null;

	return (
		<div className='footer'>
			<span>{pos ? 'anton' : 'mario'}</span>
			<audio
				src={MARIO_SOUND}
				ref={ref => {
					marioSoundEl = ref;
				}}
				volume='0.1'
				style={{ display: 'hidden' }}
			/>
			<img
				onMouseOver={() => marioSoundEl.play()}
				src='http://www.pngall.com/wp-content/uploads/2/Mario-PNG-File-Download-Free.png'
				alt='mario'
				height='100'
			/>
			<span>{pos ? 'mario' : 'anton'}</span>
		</div>
	);
};

export default Footer;
