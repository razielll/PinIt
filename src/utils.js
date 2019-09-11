export function saveToLocalStorage(obj) {
	const currList = localStorage.getItem('list-items')
		? JSON.parse(localStorage.getItem('list-items'))
		: [];

	const itemToSave = {
		id: new Date().getTime(),
		icon: '',
		...obj,
	};

	const newItems = [...currList, itemToSave];
	console.log('newItems ->', newItems);

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

export function isItems() {
	return !!JSON.parse(localStorage.getItem('list-items'));
}

export function generateRandomID() {
	return Math.floor((Math.random() * 9999999) | 0);
}
