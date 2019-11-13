import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

import SearchService from '../_services/SearchService';
import Grid from '@material-ui/core/Grid';
import Menu from '../Layouts/Menu';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const searchService = new SearchService();

const AirbnbSlider = withStyles({
	root: {
		color: '#3a8589',
		height: 3,
		padding: '13px 0',
	},
	thumb: {
		height: 27,
		width: 27,
		backgroundColor: '#fff',
		border: '1px solid currentColor',
		marginTop: -12,
		marginLeft: -13,
		boxShadow: '#ebebeb 0px 2px 2px',
		'&:focus,&:hover,&$active': {
			boxShadow: '#ccc 0px 2px 3px 1px',
		},
		'& .bar': {
			// display: inline-block !important;
			height: 9,
			width: 1,
			backgroundColor: 'currentColor',
			marginLeft: 1,
			marginRight: 1,
		},
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 4px)',
	},
	track: {
		height: 3,
	},
	rail: {
		color: '#d8d8d8',
		opacity: 1,
		height: 3,
	},
})(Slider);

function AirbnbThumbComponent(props) {
	return (
		<span {...props}>
      <span className='bar' />
      <span className='bar' />
      <span className='bar' />
    </span>
	);
}


class Search extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		priceMax: 1000,
		priceMin: 0,
		priceValues: [0, 1000],
		guestsAmount: '',
		roomsAmount: '',
		address: '',
		description: ''
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	handleSliderChange = (e, val) => {
		this.setState({
			priceValues: val
		})
	}

	componentDidMount() {
		searchService.doSearch({description: 'qwerty'}).then(res => console.log(res))
	}

	render() {
		const {classes} = this.props;

		return (
			<React.Fragment>
				<Menu/>
				<Container>
					<Grid container>
						<Grid item xs={3}>
							<div className={classes.margin} />
							<Typography variant={'h5'}>Search params</Typography>
							<div className={classes.margin} />
							<TextField
								id='outlined-error`'
								label='Guests Amount'
								placeholder='Guest amount'
								name='guestsAmount'
								value={this.state.guestsAmount}
								onChange={this.handleInputChange}
								className={classes.textField}
								margin='normal'
								variant='outlined'
							/>
							<TextField
								id='outlined-error'
								label='Rooms amount'
								name='roomsAmount'
								placeholder='Rooms  '
								value={this.state.roomsAmount}
								onChange={this.handleInputChange}
								className={classes.textField}
								margin='normal'
								variant='outlined'
							/>
							<TextField
								id='outlined-error'
								label='Address'
								name='address'
								value={this.state.address}
								onChange={this.handleInputChange}
								placeholder='enter your address'
								className={classes.textField}
								margin='normal'
								variant='outlined'
							/>
							<TextField
								id='outlined-error'
								label='Description'
								name='description'
								placeholder='description'
								value={this.state.description}
								onChange={this.handleInputChange}
								className={classes.textField}
								margin='normal'
								variant='outlined'
							/>
							<div className={classes.margin} />
							<Typography gutterBottom>Price</Typography>
							<AirbnbSlider
								ThumbComponent={AirbnbThumbComponent}
								onChange={this.handleSliderChange}
								value={this.state.priceValues}
								getAriaLabel={index => (index === 0 ? 'Minimum price' : 'Maximum price')}
								min={this.state.priceMin}
								max={this.state.priceMax}
								valueLabelDisplay='on'
								className={classes.textField}
							/>
							<div className={classes.margin} />
							<Button variant='outlined' color='primary' className={classes.button}>
								Search
							</Button>
						</Grid>
						<Grid item xs={9}>
							qwerty
						</Grid>
					</Grid>
				</Container>
			</React.Fragment>
		)
	}
}


export default withStyles(styles, {withTheme: true})(Search);
