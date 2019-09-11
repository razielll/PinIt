export function saveToLocalStorage(address) {
	const items = JSON.parse(localStorage.getItem('list-items'));
	const item = {
		address,
		id: new Date().getTime(),
		coords: { lat: '', lng: '' },
		// size: '',
		// sizeUnit: '',
		icon: '',
		distance: '',
		price: '',
	};

	const newItems = [...items, item];
	try {
		localStorage.setItem('list-items', JSON.stringify(newItems));
		return true;
	} catch (e) {
		return false;
	}
}

export function loadFromLocalStorage() {
	return JSON.parse(localStorage.getItem('list-items'));
}

export function generateRandomID() {
	// wtf what the actual fuck why use random when you have a package for this shit
	return Math.floor((Math.random() * 9999999) | 0);
}
