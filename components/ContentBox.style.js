const template = require('../config/styles.json');

const getMyStyle = () => ({
	outsideContainer: {
		marginBottom: '60px',
		alignSelf: 'center',
		backgroundColor: 'rgba(178,178,178,0.8)',
		paddingLeft: '20px',
		paddingRight: '20px',
		width: '80%',
		maxWidth: '800px',
		height: 'min-content',
		display: 'flex',
		flexDirection: 'column',
		border: '1px solid ' + template.colors.black,
		borderRadius: '20px',
	},
	headline: {
		fontSize: template.sizes.innerHeadlineFont,
		color: template.colors.red,
		width: '100%',
		paddingBottom: '10px',
		borderBottom: '1px solid ' + template.colors.red,
	},
});

export { getMyStyle };
