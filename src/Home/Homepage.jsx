import React from 'react';
import {Container} from "@material-ui/core";
import Menu from "../Layouts/Menu";
import Footer from "../Layouts/Footer";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import useStyles from "./styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';


const sections = [
	{
		title: 'Search',
		link: '/search'
	},
	{
		title: 'Rooms',
		link: '/rooms'
	},
	{
		title: 'Profile',
		link: '/profile'
	},
	{
		title: 'Sign In',
		link: '/sign-in'
	},
	{
		title: 'Sign Up',
		link: '/sign-up'
	}
];

const tileData = [
	// {
	// 	img: '/fast_parrot.gif',
	// 	title: 'Fast parrot',
	// 	author: 'Senior Node.js developer',
	// },
	// {
	// 	img: '/database.gif',
	// 	title: 'Serious dude',
	// 	author: 'Middle frontend developer',
	// },
	// {
	// 	img: '/sqldev.gif',
	// 	title: 'dwayne SQL johnson',
	// 	author: 'Junior sql developer',
	// },
	// {
	// 	img: '/TechLead.gif',
	// 	title: 'Mister Typer',
	// 	author: 'Tech Lead',
	// },
];

export default function Homepage() {
	const classes = useStyles()

	return (
		<React.Fragment>
			<Menu/>
			<CssBaseline/>
			<Container maxWidth="lg">
				<Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
					{sections.map(section => (
						<Link
							color="inherit"
							noWrap
							key={section.title}
							variant="body2"
							href={section.link}
							className={classes.toolbarLink}
						>
							{section.title}
						</Link>
					))}
				</Toolbar>
			</Container>
			<div className={classes.homeContainer} fixed>
				<Grid container>
					<Grid item xs={12}>
						<Paper className={classes.mainFeaturedPost}>
							<div className={classes.overlay}/>
							<Grid container>
								<Grid item md={6}>
									<div className={classes.mainFeaturedPostContent}>
										<Typography component="h1" variant="h3" color="inherit" gutterBottom>
											BOOKING
										</Typography>
										<Typography variant="h5" color="inherit" paragraph>
											Hello there. We are specific hotel complex.
											Our complex consists of a huge amount of apartments all over the world.
											Become a part of our network and Book&Rent apartments or share your apartments with others
											You are welcome
										</Typography>
										<Link variant="subtitle1" href="#">
										</Link>
									</div>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</div>
			{/*{/<Footer/>*/}
		</React.Fragment>
	);
}

