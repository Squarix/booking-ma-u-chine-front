import React from "react";
import AuthService from "./_services/AuthService";
import {Redirect, Route} from "react-router-dom";

const authService = new AuthService();

export default function ModeratorRoute({component: Component, ...rest}) {
	return (
		<Route {...rest} render={props => {
			return authService.moderatorIn() ?
				<Component {...props} /> :
				<Redirect to={{pathname: '/sign-in', state: {from: props.location}}}/>
		}}/>
	);
};
