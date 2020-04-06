import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
	body: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		fontFamily: 'SofiaPro',
		backgroundColor: '#fafafa'
	},
	backNavContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 21,
		paddingTop: 21,
		paddingBottom: 16,
	},
	backNavIcon: {
		color: 'black',
		fontSize: 16,
	},
	backNavText: {
		color: 'black',
		fontSize: 16,
		marginLeft: 6,
		fontWeight: 'bold',
	},
	recentVisitsTitle: {
		color: '#757575',
		fontWeight: 'bold',
		fontSize: 12,
		marginHorizontal: 20,
		marginBottom: 12,
		textTransform: 'uppercase',
	},
	recentVisitItemContainer: {
		flexDirection: 'column',
		marginHorizontal: 14,
	}
})