import React from 'react'
import {Paper, Typography} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

export default function RoomCard(props) {

	return (
		<Card>
			<CardHeader title={props.address} subheader={props.city}  />
			<CardContent>
			</CardContent>
			<CardActions>
				<Button href={`/rooms/${props.id}`}  size="small" color="primary">
					View
				</Button>
			</CardActions>
		</Card>
	)
}

// Guests amount
// StartDate, EndDate, Date
