const template = require('../config/styles.json');

const getMyStyle = ({ isHovered }) => ({
	button: {
		fontSize: template.sizes.buttonFont,
		color: template.colors.white,
		backgroundColor: template.colors.black,
		paddingLeft: '20px',
		paddingRight: '20px',
		paddingTop: '5px',
		paddingBottom: '5px',
		alignSelf: 'center',
		cursor: 'pointer',
		border: isHovered ? '1px solid ' + template.colors.red : '1px solid ' + template.colors.white,
		borderRadius: '10px',
		minWidth: '160px',
		minHeight: '40px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export { getMyStyle };
