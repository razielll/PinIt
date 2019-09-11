export function saveToLocalStorage(obj) {
	let currList = localStorage.getItem('list-items');
	if (!currList) currList = [];
	const itemToSave = {
		id: new Date().getTime(),
		icon: '',
		...obj,
	};

	console.log('itemToSave', itemToSave);
	console.log('cyrrList', currList);
	const newItems = [...currList, itemToSave];
	try {
		localStorage.setItem('list-items', JSON.stringify(newItems));
		console.log('%cSUCCESS SIR', 'color:red');
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
