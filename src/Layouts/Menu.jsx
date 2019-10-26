import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from "@material-ui/core/Link";
import AuthService from '../_services/AuthService';


const auth = new AuthService();
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	signButton: {
		marginLeft: theme.spacing(2),
		marginRight: '10px',
	}
}));


export default function Menu() {
	const classes = useStyles();

	const SignLinks = (
		<div>
			<Link href={'/sign-in'} color='inherit' className={classes.signButton}>
				<Button color="inherit" variant="outlined" >Sign In</Button>
			</Link>
			<Link href={'/sign-up'} className={classes.signButton} >
				<Button color="secondary" variant="outlined" >Sign Up</Button>
			</Link>
		</div>
	);

	const Profile = (
		<div>
			HILOOOO
		</div>
	);

	return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Booking
						</Typography>
						{
							auth.loggedIn()? Profile : SignLinks
						}
					</Toolbar>
				</AppBar>
			</div>
	);
}
