const template = require('../config/styles.json');

const getMyStyle = () => ({
	hint: {
		fontSize: template.sizes.contentFont,
		fontWeight: 'bold',
		color: template.colors.black,
		alignSelf: 'center',
		textAlign: 'left',
		marginBottom: '30px',
	},
});

export { getMyStyle };
