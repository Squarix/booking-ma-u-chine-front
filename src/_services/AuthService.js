import Cookie from 'js-cookie';
import decode from 'jwt-decode';
import { apiUrl } from './config';

export default class AuthService {
	constructor(domain) {
		this.domain = domain || apiUrl
		this.fetch = this.fetch.bind(this)
		this.login = this.login.bind(this)
		this.getProfile = this.getProfile.bind(this)
	}

	register(email, password) {
		return this.fetch(`${this.domain}/auth/register`, {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		}).then(res => {
			this.setToken(res.token);
			return Promise.resolve(res);
		})
	}

	login(email, password) {
		return this.fetch(`${this.domain}/auth/authenticate`, {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		}).then(res => {
			this.setToken(res.token)
			return Promise.resolve(res)
		})
	}

	moderatorIn() {
		const token = this.getToken()
		return !!token && this.isUserModerator(token)
	}

	loggedIn() {
		const token = this.getToken()
		return !!token && !this.isTokenExpired(token)
	}

	isUserModerator(token) {
		try {
			const decoded = decode(token);
			console.log(decoded);
			if (decoded.exp > Date.now() / 1000 && decoded.type === 'moderator') {
				return true
			}
			else
				return false
		}
		catch (err) {
			return false
		}
	}

	isTokenExpired(token) {
		try {
			const decoded = decode(token);
			if (decoded.exp < Date.now() / 1000) {
				return true
			}
			else
				return false
		}
		catch (err) {
			return false
		}
	}


	setToken(idToken) {
		// Saves user token to localStorage
		Cookie.set('id_token', idToken)
	}

	getToken() {
		return Cookie.get('id_token')
	}

	logout() {
		Cookie.remove('id_token')
	}

	getProfile() {
		return decode(this.getToken())
	}


	fetch(url, options) {
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};

		if (this.loggedIn()) {
			headers['Authorization'] = this.getToken()
		}

		return fetch(url, {
			headers,
			...options
		})
			.then(this._checkStatus)
			.then(response => response.json())
	}

	_checkStatus(response) {
		// raises an error in case response status is not a success
		if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
			return response
		} else {
			const error = new Error(response.statusText)
			error.response = response
			throw error
		}
	}
}
