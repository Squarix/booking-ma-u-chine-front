import AuthService from "./AuthService";
import {apiUrl} from "./config";

const authService = new AuthService();

export default class AdminService {
	constructor(props) {
	}

	getHome() {
		const url = apiUrl + '/admin/';
		return authService.fetch(url).then(res => {
			return Promise.resolve(res);
		})
	}
}
