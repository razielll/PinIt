import Geocode from 'react-geocode';
import { ADDRESS_STORAGE_KEY } from './constants';

// saves the new address object to local storage
export function saveAddress(newAddress) {
	let currentAddressList = [];

	if (checkInStorage(ADDRESS_STORAGE_KEY)) {
		currentAddressList = fetchFromStorage(ADDRESS_STORAGE_KEY)
	}

	const address = {
		id: new Date().getTime(),
		icon: '',
		...newAddress,
	};

	const newAddressList = [...currentAddressList, address];

	try {

		localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(newAddressList));
		return true;
	} catch (e) {
		return false;
	}
}

export function fetchFromStorage(key) {
	return JSON.parse(localStorage.getItem(key));
}

export function checkInStorage(key) {
	return !!JSON.parse(localStorage.getItem(key));
}

export async function translateAndSave(address) {
	return Geocode.fromAddress(address).then(
		({ results }) => {
			const { formatted_address } = results[0];
			const [street, city, country] = formatted_address.split(',').map(item => item.trim());
			const { lat, lng } = results[0].geometry.location;

			const item = {
				address: formatted_address,
				street,
				city,
				country,
				coords: { lat, lng },
			};

			const isSaved = saveAddress(item);

			return { success: isSaved };
		},
		error => {
			console.error(error);
			return { success: false };

		}
	);
}