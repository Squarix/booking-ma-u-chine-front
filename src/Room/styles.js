const styles = theme => ({
	header: {
		fontWeight: 'bold',
		fontSize: '36px',
	},

	content: {
		paddingLeft: '80px',
		display: 'flex',
		justifyContent: 'left',
		flexDirection: 'column',
		paddingTop: '31px',
		height: '100vh'
	},

	sidebars: {
		paddingTop: '31px',
		display: 'flex',
		justifyContent: 'left',
	},

	label: {
		fontWeight: 500,
		fontSize: '22px',
		color: '#e91e63',
	},

	datePicker: {
		borderRadius: '15px',
		padding: '10px 15px',
		border: '2px solid #e91e63',
	},

	parameters: {
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: '24px',
		color: '#EA2340',
	}

});

export default styles;
