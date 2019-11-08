import 'date-fns';
import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import RoomService from '../_services/RoomService';
import styles from './styles';
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";


import GroupIcon from '@material-ui/icons/Group';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import Button from "@material-ui/core/Button";
import Redirect from "react-router-dom/es/Redirect";

const roomService = new RoomService();

class ViewRoom extends React.Component {
	constructor(props) {
		super(props);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		this.state = {
			address: '',
			bookedDates: [today.toDateString()],
			city: '',
			description: '',
			filters: [],
			guestsamount: 0,
			size: 0,
			todayprice: 0,
			useremail: '',
			startDate: null,
			endDate: null,
			totalPrice: null,
			redirectCabinet: false
		}
	}

	onStartDateChange = (date) => {
		this.handleDateChanged(date, null);
	};

	handleDateChanged = (newStartDate, newEndDate) => {
		const start = newStartDate ? newStartDate : this.state.startDate;
		const end = newEndDate ? newEndDate : this.state.endDate;
		const price = this.state.todayprice;
		let days = 0;

		if (end & start) {
			days = getDifferenceInDays(start, end);
			console.log(days);
		}

		this.setState({
			totalPrice: days * price,
			startDate: start,
			endDate: end
		})
	}

	onEndDateChange = (date) => {
		this.handleDateChanged(null, date);
	}

	componentDidMount() {
		const roomId = this.props.match.params.id;
		roomService.getRoom(roomId).then(room => {
			console.log(room);
			this.setState(room);
		});
	}

	handleBooking = () => {
		console.log('booking in proccess');
		const roomId = this.props.match.params.id;
		const params = {
			roomId: roomId,
			startDate: this.state.startDate,
			endDate: this.state.endDate
		};
		roomService.bookRoom(params)
			.then(res => {
				console.log(res)
			})
			.catch(e =>{
				e.response.json().then(data => {
					console.log(data.message);
				})
			})
	}

	render() {
		const {classes} = this.props;

		return (
			<Grid container>
				<Grid xs={9} className={classes.content} item>
					<Typography variant={'h1'} className={classes.header}>{this.state.address}</Typography>
					<p>{this.state.description}</p>
				</Grid>
				<Grid xs={3} className={classes.sidebars} item>
					<List>
						<ListItem className={classes.label}>
							<GroupIcon/>
							<span>{'max '}{this.state.guestsamount} guests</span>
						</ListItem>
						<ListItem className={classes.label}>
							<AttachMoneyIcon/>
							<span>{' ~'}{this.state.todayprice} per day</span>
						</ListItem>
						<ListItem className={classes.label}>
							<LocationOnIcon/>
							<span>{this.state.city}</span>
						</ListItem>
						<ListItem className={classes.label}>
							<PermIdentityIcon/>
							<span>{this.state.useremail}</span>
						</ListItem>
						<ListItem className={classes.label}>
							<DatePicker
								name={'startDate'}
								selected={this.state.startDate}
								className={classes.datePicker}
								onChange={this.onStartDateChange}
								placeholderText='Select start date'
								dateFormat={'d MMMM yyyy'}
								filterDate={(date) => isValidDate(this.state.bookedDates, date, null, this.state.endDate)}
							/>
						</ListItem>
						<ListItem className={classes.label}>
							<DatePicker
								name={'endDate'}
								className={classes.datePicker}
								selected={this.state.endDate}
								onChange={this.onEndDateChange}
								placeholderText='Select end date'
								dateFormat={'d MMMM yyyy'}
								filterDate={(date) => isValidDate(this.state.bookedDates, date, this.state.startDate, null)}
							/>
						</ListItem>
						{this.state.totalPrice ?
							<React.Fragment>
								<ListItem className={classes.label}>
									<span>Total: {this.state.totalPrice} $</span>
								</ListItem>
								<ListItem className={classes.label}>
									<Button onClick={this.handleBooking} variant="contained" color="primary" className={classes.button}>
										Book
									</Button>
								</ListItem>
							</React.Fragment> : ''
						}
					</List>
				</Grid>
				{
					this.state.redirectCabinet?
					<Redirect to={'/profile/bookings'} /> : ''
				}
			</Grid>
		)
	}
}

function isValidDate(bookedDates, date, startDate, endDate) {
	let minDate = new Date();
	minDate.setHours(0, 0, 0, 0);

	let maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	minDate = startDate ? startDate : minDate;
	maxDate = endDate ? endDate : maxDate;

	return (bookedDates.indexOf(date.toDateString()) === -1) && (date > minDate) && (date < maxDate)
}

function getDifferenceInDays(startDate, endDate) {
	return (endDate - startDate) / (24 * 60 * 60 * 1000)
}

export default withStyles(styles, {withTheme: true})(ViewRoom);
