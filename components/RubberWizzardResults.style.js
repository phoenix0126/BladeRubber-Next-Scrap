const template = require('../config/styles.json');

const getMyStyle = () => ({
	hintContainer: {
		width: '100%',
		height: 'min-content',
		fontSize: template.sizes.dataFont,
		marginBottom: '32px',
	},
	resultContainer: {
		width: '100%',
		height: 'min-content',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: '20px',
	},
	nameContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		cursor: 'pointer',
		maxWidth: '40%',
	},
	image: {
		width: '50px',
		height: '50px',
		marginRight: '16px',
	},
	name: {
		fontSize: template.sizes.contentFont,
	},
	ratingContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export { getMyStyle };
