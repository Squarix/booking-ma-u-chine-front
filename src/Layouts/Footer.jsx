import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
	root: {
		width: 500,
	},

	stickToBottom: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
		zIndex: 50
	},

});

export default function Footer() {
	const classes = useStyles();
	const [value, setValue] = React.useState('recents');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<BottomNavigation value={value} onChange={handleChange} className={classes.stickToBottom}>
			<BottomNavigationAction label="Rooms" href={'/rooms'} value="rooms" icon={<LocationOnIcon/>}/>
			<BottomNavigationAction label="Bookings" href={'/profile/bookings'} value="bookings" icon={<FolderIcon/>}/>
		</BottomNavigation>
	);
}
