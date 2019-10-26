import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Profile from "./Profile";


export default function ProfileRoute({component, ...rest}) {
	return (
		<Route {...rest} render={props => {
			const currentUser = '';
			if (!currentUser) {
				// not logged in so redirect to login page with the return url
				return <Redirect to={{pathname: '/sign-in', state: {from: props.location}}}/>
			}

			return (
				<Profile {...props}/>
			);
		}}/>);
}

