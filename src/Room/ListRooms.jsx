import React from 'react'
import Grid from "@material-ui/core/Grid";
import RoomService from "../_services/RoomService";
import CircularProgress from "@material-ui/core/CircularProgress";
import RoomCard from "./components/RoomCard";

const roomService = new RoomService();

export default class ListRooms extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			limit: 21,
			rooms: [],
			isLoading: true,
		};

	}


	componentDidMount() {
		this.getRooms()
	}

	getRooms = () => {
		this.setState({isLoading: true});
		roomService.getRooms(this.state.limit, this.state.currentPage).then(rooms => {
			console.log(rooms);
			this.setState({
				rooms: rooms,
				isLoading: false,
			})
		})
	};

	render() {
		return (
			<Grid container spacing={4}>
				{!this.state.isLoading ?
					this.state.rooms.map((room, index) =>
						<Grid key={index} item xs={4}>
							<RoomCard {...room} />
						</Grid>)
					: <CircularProgress/>
				}
			</Grid>
		)
	}
}
