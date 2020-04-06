import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
	body: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    fontFamily: 'SofiaPro',
    backgroundColor: 'white'
  },
  scrollView: {
    backgroundColor: '#fafafa',
  },
  contentView: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  lighterSection: {
    flex: 1,
  },
  wizardContainer: {
    borderWidth: 2, 
    borderColor: '#304FFE',
    marginTop: 25,
    marginLeft: 21,
    marginRight: 21,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  requestButton: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Platform.select({ios: 20, android: 18}),
    paddingHorizontal: 20,
    backgroundColor: '#304FFE',
    marginVertical: 16,
    marginLeft: 21,
    marginRight: 21,
    borderRadius: 5,
  },
  requestButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 12,
    textTransform: 'uppercase',
  },
  requestBtnIcon: {
    fontSize: 20,
    marginTop: 1,
    color: 'white',
  },
  loginModal: {
    display: 'flex',
    flex: 1,
  },
  loginModalEmptySpace: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderTopWidth: 2,
    borderTopColor: '#000',
    backgroundColor: 'white',
    paddingHorizontal: 21,
    paddingVertical: 21,
  },
  loginModalText: {
    color: 'black',
    width: 200,
    fontSize: 16,
    marginRight: 32,
    marginLeft: 6,
    fontWeight: 'bold'
  },
  googleSignInBtn: {
    marginLeft: 0,
    marginTop: 12,
    height: 55,
  },

  logContainer: {
    borderWidth: 2,
    borderBottomWidth: 4,
    marginHorizontal: 21,
    marginTop: 12,
    marginBottom: 16,
    paddingBottom: 14,
    borderRadius: 8,
    backgroundColor: 'white',
    borderColor: 'rgb(255,145,0)',
  },
  logContainerGreen: {
    borderColor: 'rgb(0,200,83)',
  },
  logContainerRed: {
    borderColor: 'rgb(221,44,0)',
  },
  upcomingLabel: {
    paddingHorizontal: 15,
    marginTop: 10,
    color: '#757575',
    fontSize: 11,
    marginLeft: 2,
  },
  upcomingDateText: {
    paddingHorizontal: 15,
    fontWeight: 'bold',
    fontSize: 21,
    marginLeft: 2,
    marginTop: 2,
    color: 'rgb(255,145,0)',
  },
  upcomingDateTextGreen: {
    color: 'rgb(0,200,83)',
  },
  upcomingDateTextRed: {
    color: 'rgb(221,44,0)',
  },

  statusTextContainer: {
    flexDirection: 'row',
		paddingHorizontal: 15,
		alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: 'rgb(255,145,0)',
		backgroundColor: 'rgba(255,145,0, 0.08)',
	},
	statusIcon: {
		fontSize: 12,
		color: 'rgb(255,145,0)',
	},
	statusIconGreen: {
		color: 'rgb(0,200,83)'
	},
	statusIconRed: {
		color: 'rgb(221,44,0)'
	},
  statusText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 12,
		color: 'rgb(255,145,0)',
		marginLeft: 4,
	},
	statusTextGreen: {
		color: 'rgb(0,200,83)'
	},
	statusTextRed: {
		color: 'rgb(221,44,0)'
	},
  statusTextContainerGreen: {
    borderColor: 'rgb(0,200,83)',
    backgroundColor: 'rgba(0,200,83, 0.08)',
  },
  statusTextContainerRed: {
    borderColor: 'rgb(221,44,0)',
    backgroundColor: 'rgba(221,44,0, 0.08)',
  },
})