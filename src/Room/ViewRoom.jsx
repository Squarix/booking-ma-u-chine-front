import 'date-fns';
import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Container, Typography} from "@material-ui/core";
import RoomService from '../_services/RoomService';
import styles from './styles';
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

import GroupIcon from '@material-ui/icons/Group';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import "react-datepicker/dist/react-datepicker.css";
import {apiUrl} from "./../_services/config";


import DatePicker from "react-datepicker";
import Button from "@material-ui/core/Button";
import Redirect from "react-router-dom/es/Redirect";
import InfoDialog from "../Layouts/InfoDialog";
import Footer from "../Layouts/Footer";
import Menu from "../Layouts/Menu";

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
      images: [],
      guestsAmount: 0,
      size: 0,
      todayPrice: 0,
      user: '',
      startDate: null,
      endDate: null,
      totalPrice: null,
      redirectCabinet: false,

      message: '',
      dialogOpen: false,
      title: 'Booking Info'
    }
  }

  onStartDateChange = (date) => {
    this.handleDateChanged(date, null);
  };

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    })
  };

  handleDateChanged = (newStartDate, newEndDate) => {
    const { endDate, startDate, todayPrice } = this.state;
    const start = newStartDate ? newStartDate : startDate;
    const end = newEndDate ? newEndDate : endDate;
    const price = todayPrice;
    let days = 0;

    if (end && start) {
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
    roomService.getRoomBookings(roomId).then(bookings => {
      console.log(bookings)
      this.setState({
        bookedDates: bookings
      })
    });
    roomService.getRoom(roomId).then(room => {
      this.setState(room);
    });
  }

  handleBooking = () => {
    console.log('booking in proccess');
    const roomId = this.props.match.params.id;
    const params = {
      roomId: roomId,
      arriveDate: this.state.startDate,
      endDate: this.state.endDate
    };

    let message;
    roomService.bookRoom(params)
        .then(res => {
          message = res.message;
        })
        .catch(e => {
          e.response.json()
              .then(data => {
                this.setState({
                  message: data.message
                });
              })
        })
        .finally(() => {
          this.setState({
            message: message,
            dialogOpen: true
          })
        })
  }

  render() {
    const {classes} = this.props;

    return (
        <React.Fragment>
          <Menu/>
          <Container fixed>
            <Grid container className={classes.bodyContainer}>
              <Grid md={9} xs={12} className={classes.content} item>
                <Typography variant={'h1'} className={classes.header}>{this.state.address}</Typography>
                <Carousel className={classes.carousel}>
                  {this.state.images.map(image =>
                      <div className={classes.roomImageDiv}>
                        <img src={`${apiUrl}/${image.imagePath}`} className={classes.roomImage}/>
                      </div>
                  )}
                </Carousel>
                <div className={classes.descriptionBlock}>
                  <Typography variant={'h4'}>Description</Typography>
                  <p className={classes.description}>
                    {this.state.description}
                  </p>
                </div>
              </Grid>
              <InfoDialog
                  open={this.state.dialogOpen}
                  message={this.state.message}
                  title={this.state.title}
                  handleClose={this.handleDialogClose}
              />
              <Grid xs={12} md={3} className={classes.sidebars} item>
                <List>
                  <ListItem className={classes.label}>
                    <GroupIcon/>
                    <span>{'max '}{this.state.guestsAmount} guests</span>
                  </ListItem>
                  <ListItem className={classes.label}>
                    <AttachMoneyIcon/>
                    <span>{' ~'}{this.state.todayPrice} per day</span>
                  </ListItem>
                  <ListItem className={classes.label}>
                    <LocationOnIcon/>
                    <span>{this.state.city.name}</span>
                  </ListItem>
                  <ListItem className={classes.label}>
                    <PermIdentityIcon/>
                    <span>{this.state.user.email}</span>
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
                  {!!this.state.totalPrice && (
                      <>
                        <ListItem className={classes.label}>
                          <span>Total: {this.state.totalPrice} $</span>
                        </ListItem>
                        <ListItem className={classes.label}>
                          <Button onClick={this.handleBooking} variant="contained" color="primary"
                                  className={classes.button}>
                            Book
                          </Button>
                        </ListItem>
                      </>
                  )
                  }
                </List>
              </Grid>
              {
                this.state.redirectCabinet ?
                    <Redirect to={'/profile/bookings'}/> : ''
              }
            </Grid>

          </Container>
          <Footer/>
        </React.Fragment>
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

  return (checkDate(bookedDates, date) && (date > minDate) && (date < maxDate))
}

function checkDate(dates, searchDate) {
  for (const date of dates) {
    if (new Date(date.arriveDate) <= searchDate && searchDate <= new Date(date.endDate))
      return false
  }

  return true;
}

function getDifferenceInDays(startDate, endDate) {
  return (endDate - startDate) / (24 * 60 * 60 * 1000)
}

export default withStyles(styles, {withTheme: true})(ViewRoom);
