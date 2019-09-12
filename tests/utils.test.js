const { checkInStorage, saveAddress } = require('../src/utils')
const { ADDRESS_STORAGE_KEY } = require('../src/constants')
require('jest-localstorage-mock');

localStorage.clear()

test('check if storage is empty', () => {
    const isInStorage = checkInStorage(ADDRESS_STORAGE_KEY)

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(isInStorage).toBeFalsy();
});

test('check if item was added to the storage', () => {
    const newAddress = {
        address: 'Stella maris 26, Tel aviv, Israel',
        street: 'Stella maris 26',
        city: 'Tel aviv',
        country: 'Israel',
        coords: {
            lat: 34.453443,
            lng: 33.242343
        },
    }

    saveAddress(newAddress)

    const savedAddress = JSON.parse(localStorage.__STORE__[ADDRESS_STORAGE_KEY])[0]

    expect(localStorage.getItem).toHaveBeenCalledTimes(3);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(savedAddress.address).toBe(newAddress.address)

})