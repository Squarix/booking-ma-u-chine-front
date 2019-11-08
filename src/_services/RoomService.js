import {apiUrl} from './config';
import AuthService from './AuthService';

const authService = new AuthService();

export default class RoomService {
	constructor(props) {
		this.countries = [];
	}

	getCountries() {
		const url = apiUrl + '/countries';
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};

		return fetch(url).then(countries => {
			return Promise.resolve(countries);
		})
	}

	getRoom(id) {
		const url = apiUrl + '/rooms/' + id;
		return authService.fetch(url).then(res => {
			return Promise.resolve(res);
		})
	}

	createRoom(roomParams, filters) {
		const url = apiUrl + '/rooms';
		return authService.fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				roomParams, filters
			})
		}).then(res => {
			return Promise.resolve(res)
		})
	}


	getRooms(limit, currentPage) {
		const offset = limit * (currentPage - 1);
		const url = `${apiUrl}/rooms?limit=${limit}&offset=${offset}&order=none`
		return authService.fetch(url).then(res => {
			return Promise.resolve(res)
		})
	}

	getCategories() {
		const url = apiUrl + '/rooms/categories';
		return fetch(url).then(categories => {
			return Promise.resolve(categories);
		})
	}

	bookRoom(params) {
		const url = apiUrl + '/bookings/';
		return authService.fetch(url, {
			method: 'POST',
			body: JSON.stringify({ ...params })
		}).then(res => {
			return Promise.resolve(res)
		})
	}

	getCities(country, startsWith) {
		const api = `http://api.geonames.org/searchJSON?username=ksuhiyp&country=${country}&maxRows=1000&style=SHORT&name_startsWith=${startsWith}`
	}
}
