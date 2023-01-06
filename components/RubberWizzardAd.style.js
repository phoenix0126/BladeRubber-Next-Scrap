const template = require('../config/styles.json');

const getMyStyle = () => ({
	hint: {
		fontSize: template.sizes.contentFont,
		fontWeight: 'bold',
		color: template.colors.black,
		display: 'flex',
		alignSelf: 'center',
		justifyContent: 'center',
		marginBottom: '30px',
	},
});

export { getMyStyle };
