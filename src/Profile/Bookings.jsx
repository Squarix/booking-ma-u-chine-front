import React from 'react'
import BookingService from '../_services/BookingService';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";

import Moment from 'react-moment';

const bookingService = new BookingService();

class Bookings extends React.Component {
	constructor(props) {
		super(props);
		console.log('hi');
	}

	state = {
		bookings: [],
		isFetching: true
	}

	componentDidMount() {
		this.setState({isFetching: true})
		bookingService.getBookings()
			.then(bookings => {
				console.log(bookings);
				this.setState({
					bookings: bookings,
					isFetching: false
				})
			})
			.catch(error => {

			})
	}

	getClass(status) {
		const { classes } = this.props;
		if(status === 'approved')
			return classes.approved;
		else if (status === 'approving')
			return classes.approving;
		else
			return classes.declined;
	}

	render() {
		const { classes } = this.props;

		return (
			<React.Fragment>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Room</TableCell>
							<TableCell align="right">Address</TableCell>
							<TableCell align="right">Arrive&nbsp;date</TableCell>
							<TableCell align="right">City</TableCell>
							<TableCell align="right">End&nbsp;date</TableCell>
							<TableCell align="right">Guests amount</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="right">Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.bookings.map((booking, index) => (
							<TableRow key={booking.index}>
								<TableCell component="th" scope="row">
									<a href={`/rooms/${booking.room_id}`}>
									{booking.room_id}
									</a>
								</TableCell>
								<TableCell align="right" scope="row">
									{booking.address}
								</TableCell>
								<TableCell align="right">
									<Moment format={'MMM Do YY'}>
										{booking.arrivedate}
									</Moment>
								</TableCell>
								<TableCell align="right">{booking.city}</TableCell>
								<TableCell align="right">
									<Moment format={'MMM Do YY'}>
										{booking.enddate}
									</Moment>
								</TableCell>
								<TableCell align="right">{booking.guestsamount}</TableCell>
								<TableCell align="right">{booking.price}</TableCell>
								<TableCell align="right" className={this.getClass(booking.status)}>{booking.status}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</React.Fragment>
		)
	}
}


export default withStyles(styles, {withTheme: true})(Bookings);