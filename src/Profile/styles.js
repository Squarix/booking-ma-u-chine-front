const styles = theme => ({
	approved: {
		color: '#00e676'
	},

	approving: {
		color: '#f9a825'
	},

	fab: {
		margin: theme.spacing(1),
	},

	declined: {
		color: '#dd2c00'
	},
	profileEntry: {
		display: 'flex',
		flexDirection: 'column'
	},
	main: {
		textAlign: 'left',
		margin: '50px 0',
		display: 'flex',
		justifyContent: 'right'
	},

	textField: {
		marginTop: '5px'
	},

	editable: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},

	tableContainer: {
		overflow: 'hidden',
		overflowX: 'scroll',
	}
});

export default styles;
