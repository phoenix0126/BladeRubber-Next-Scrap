const template = require('../config/styles.json');

const getMyStyle = ({ isHovered }) => ({
	button: {
		fontSize: template.sizes.buttonFont,
		color: template.colors.white,
		backgroundColor: template.colors.red,
		paddingLeft: '20px',
		paddingRight: '20px',
		paddingTop: '10px',
		paddingBottom: '10px',
		alignSelf: 'center',
		cursor: 'pointer',
		border: isHovered ? '1px solid ' + template.colors.white : '1px solid ' + template.colors.black,
	},
});

export { getMyStyle };
