import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import PrivateRoute from "../PrivateRoute";
import NewRoom from "./NewRoom";
import ViewRoom from "./ViewRoom";
import Menu from "../Layouts/Menu";
import {Container} from "@material-ui/core";
import Footer from "../Layouts/Footer";
import ListRooms from "./ListRooms";


export default function RoomRoutes(props) {
	return (
		<React.Fragment>
			<Menu/>
			<Container fixed>
				<Switch>
					<PrivateRoute path={`${props.match.path}/create`} component={NewRoom}/>
					<Route path={`${props.match.path}/:id`} component={ViewRoom} />
					<Route path={`${props.match.path}/`} component={ListRooms} />
				</Switch>
			</Container>
			<Footer/>
		</React.Fragment>
	);
}

