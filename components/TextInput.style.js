const template = require('../config/styles.json');

const getMyStyle = ({ focused, fixedWidth }) => ({
	input: {
		width: fixedWidth,
		height: '32.5px',
		border: '1px solid ' + (focused ? template.colors.red : template.colors.black),
		paddingLeft: '5px',
		paddingRight: '5px',
		outline: 'none',
	},
});

export { getMyStyle };
