const template = require('../config/styles.json');

const getMyStyle = () => ({
	contentContainer: {
		width: '100%',
		height: 'min-content',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: '20px',
		padding: '8px',
	},
	infoText: {
		fontSize: template.sizes.contentFont,
		fontWeight: 'bold',
		color: template.colors.black,
		width: '100%',
		textAlign: 'center',
		marginBottom: '30px',
	},
	subscribeContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		minHeight: 'auto',
		gap: '12px',
	},
});

export { getMyStyle };
