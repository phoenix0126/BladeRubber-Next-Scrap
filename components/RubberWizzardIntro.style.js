const template = require('../config/styles.json');

const getMyStyle = ({ windowWidth }) => ({
	contentContainer: {
		width: '100%',
		height: 'min-content',
		display: 'flex',
		flexDirection: windowWidth > 800 ? 'row' : 'column',
		marginBottom: '20px',
	},
	image: {
		height: '300px',
		width: '242px',
		marginRight: '40px',
		marginTop: '-30px',
		marginBottom: '-30px',
		alignSelf: 'center',
	},
	infoContainer: {
		marginTop: windowWidth > 800 ? '30px' : '0px',
		height: 'auto',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	infoText: {
		fontSize: template.sizes.contentFont,
		fontWeight: 'bold',
		color: template.colors.black,
		width: '100%',
		textAlign: 'center',
		marginBottom: '30px',
	},
});

export { getMyStyle };
