import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import PrivateRoute from "../PrivateRoute";
import NewRoom from "./NewRoom";
import ViewRoom from "./ViewRoom";
import Menu from "../Layouts/Menu";
import {Container} from "@material-ui/core";
import Footer from "../Layouts/Footer";
import ListRooms from "./ListRooms";
import NotFound from "../Layouts/NotFound";


export default function RoomRoutes(props) {
	return (
		<React.Fragment>
				<Switch>
					<PrivateRoute path={`${props.match.path}/create`} component={NewRoom}/>
					<Route path={`${props.match.path}/:id(\\d+)`} component={ViewRoom} />
					<Route path={`${props.match.path}/`} exact={true} component={ListRooms} />
					<Route path='*' exact={true} component={NotFound} />
				</Switch>
		</React.Fragment>
	);
}

