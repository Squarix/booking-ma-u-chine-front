import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Profile from "./Profile";
import PrivateRoute from "../PrivateRoute";
import Bookings from "./Bookings";


export default function ProfileRoute(props) {
	return (
		<React.Fragment>
			<PrivateRoute path={`${props.match.path}/bookings`} component={Bookings} />
			<PrivateRoute path={`${props.match.path}/`} component={Profile} />
		</React.Fragment>
		);
}

