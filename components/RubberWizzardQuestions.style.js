const template = require('../config/styles.json');

const getMyStyle = () => ({
	question: {
		fontSize: template.sizes.contentFont,
		fontWeight: 'bold',
		color: template.colors.black,
		alignSelf: 'flex-start',
		marginBottom: '40px',
		marginLeft: '22px',
	},
	answersContainer: {
		alignSelf: 'flex-start',
		height: 'min-content',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		marginBottom: '20px',
		marginLeft: '26px',
	},
	answerContainer: {
		display: 'flex',
		alignSelf: 'center',
		width: '100%',
		flexDirection: 'row',
		gap: '10px',
	},
	answerLabel: {
		fontSize: template.sizes.dataFont,
		color: template.colors.black,
		textDecoration: 'underline',
		cursor: 'pointer',
	},
	ball: {
		height: '16px',
		width: '16px',
		marginTop: '17px',
		cursor: 'pointer',
	},
});

export { getMyStyle };
