import React from 'react';
import {Container} from "@material-ui/core";
import Menu from "../Layouts/Menu";
import Footer from "../Layouts/Footer";
import Typography from "@material-ui/core/Typography";


export default function Homepage() {
	return (
		<React.Fragment>
			<Menu />
			<Container fixed>
				<Typography></Typography>
			</Container>
			<Footer/>
		</React.Fragment>
	);
}

