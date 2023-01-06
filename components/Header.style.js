const template = require('../config/styles.json');

const getMyStyle = () => ({
	container: {
		backgroundColor: template.colors.lightgray,
		paddingTop: '20px',
		paddingBottom: '20px',
		width: '100vw',
		maxWidth: '100%',
		display: 'flex',
		height: 'min-content',
		top: '0',
		left: '0',
		zIndex: '1',
		flex: '0',
		cursor: 'pointer',
	},
	logo: {
		marginLeft: '5%',
		marginRight: '5%',
		width: '90%',
		height: '100%',
	},
});

export { getMyStyle };
