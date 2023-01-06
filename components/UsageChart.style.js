const template = require('../config/styles.json');

const getMyStyle = () => ({
	timefilterContainer: {
		width: 'min-content',
		display: 'flex',
		flexDirection: 'row',
		padding: '8px',
		gap: '8px',
	},
	loadButton: {
		marginLeft: '4px',
	},
});

export { getMyStyle };
