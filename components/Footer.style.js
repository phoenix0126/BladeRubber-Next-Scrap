const getMyStyle = () => ({
	container: {
		paddingTop: '20px',
		background: 'black',
		width: '100%',
		alignSelf: 'flex-end',
	},
	leftBar: {
		float: 'left',
		display: 'flex',
		color: 'white',
		marginLeft: '30px',
		marginBottom: '20px',
	},
	rightBar: {
		float: 'right',
		color: 'white',
		marginRight: '50px',
	},
	link: {
		color: 'white',
		fontFamily: 'Verdana',
		fontSize: '20px',
		marginLeft: '22px',
		cursor: 'pointer',
	},
	icon: {
		width: '30px',
		marginRight: '20px',
	},
});

module.exports = {
	getMyStyle,
};
