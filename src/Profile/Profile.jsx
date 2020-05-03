import React from 'react';
import {Container} from "@material-ui/core";
import Footer from "../Layouts/Footer";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import styles from "./styles";
import EditIcon from '@material-ui/icons/Edit';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import IconButton from "@material-ui/core/IconButton";

import ProfileService from "../_services/ProfileService";
import Button from "@material-ui/core/Button";

const profileService = new ProfileService();

class Profile extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		id: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		editable: ''
	}

	componentDidMount() {
		profileService.getProfile(this.props.match.params.id).then(user => {
			console.log(user)
			this.setState({
				firstName: user.first_name,
				lastName: user.last_name,
				phoneNumber: user.phoneNumber,
				email: user.email,
				id: user.id
			})
		})
	}

	handleSave = () => {
		profileService.updateProfile(this.state.id, {
			first_name: this.state.firstName,
			last_name: this.state.lastName,
			phoneNumber: this.state.phoneNumber
		}).then(res => {console.log(res)})
	}

	handleChangeEditable(key){
		this.setState({editable: key})
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const {classes} = this.props
		const editables = [
			{key: 'Last name',    value: this.state.lastName,    state: 'lastName'},
			{key: 'First name',   value: this.state.firstName,   state: 'firstName'},
			{key: 'Phone number', value: this.state.phoneNumber, state: 'phoneNumber'},
		]
		return (
			<React.Fragment>
				<Container fixed>
					<Grid container className={classes.main} spacing={4}>
						{ editables.map(editable =>
							<Grid xs={4} item className={classes.profileEntry}>
								<label>{editable.key}</label>
								<div className={classes.editable}>
									{editable.state !== this.state.editable ?
										<React.Fragment>
											<Typography key={editable.key} variant={"h5"}>{editable.value || 'Not set'}</Typography>
											<IconButton key={editable.state} aria-label="Edit" className={classes.margin} onClick={() => this.handleChangeEditable(editable.state)}>
												<EditIcon fontSize="small"/>
											</IconButton>
										</React.Fragment>
										:
										<React.Fragment>
											<TextField  key={editable.key}
												id="standard-search"
												name={editable.state}
												label={editable.key}
												value={editable.value || ''}
												onChange={this.handleInputChange}
												type="text"
												className={classes.textField}
												margin="normal"
											/>
											<IconButton key={editable.state} aria-label="Save" className={classes.margin} onClick={() => this.handleChangeEditable('')}>
												<SaveIcon fontSize="small"/>
											</IconButton>
										</React.Fragment>
									}
								</div>
							</Grid>
						)}
						<Grid xs={4} item>
							<Button
								variant="contained"
								color="primary"
								size="large"
								className={classes.button}
								startIcon={<SaveIcon />}
								onClick={this.handleSave}
							>
								Save
							</Button>
						</Grid>
						<Grid xs={12} item>
							<Button href={'/profile/bookings'}>Bookings</Button>
							<Button href={'/profile/rents'}>Rents</Button>
						</Grid>
					</Grid>
				</Container>
			</React.Fragment>
		);
	}
}

export default withStyles(styles, {withTheme: true})(Profile);
