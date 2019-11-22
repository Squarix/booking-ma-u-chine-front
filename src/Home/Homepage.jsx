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
	{
		img: '/background.jpg',
		title: 'Uladzislau Bogdanovskiy',
		author: 'Senior Node.js developer',
	},
	{
		img: '/background.jpg',
		title: 'Vladislav Bogdanovskiy',
		author: 'Middle frontend developer',
	},
	{
		img: '/background.jpg',
		title: 'Uladzislau Bahdanouski',
		author: 'Junior sql developer',
	},
	{
		img: '/background.jpg',
		title: 'Vladislav Bahdanouski',
		author: 'Tech Lead',
	},
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
			<Container fixed>
				<Grid container>
					<Grid item xs={12}>
						<Paper className={classes.mainFeaturedPost}>
							{/* Increase the priority of the hero background image */}
							{
								<img
									style={{display: 'none'}}
									src="/background.jpeg"
									alt="background"
								/>
							}
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
				<div className={classes.root}>
					<GridList cellHeight={360} className={classes.gridList}>
						<GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
							<ListSubheader component="h2">Our team</ListSubheader>
						</GridListTile>
						{tileData.map(tile => (
							<GridListTile key={tile.img}>
								<img src={tile.img} alt={tile.title}/>
								<GridListTileBar
									title={tile.title}
									subtitle={<span>{tile.author}</span>}
									actionIcon={
										<IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
											<InfoIcon/>
										</IconButton>
									}
								/>
							</GridListTile>
						))}
					</GridList>
				</div>
			</Container>
			<Footer/>
		</React.Fragment>
	);
}

