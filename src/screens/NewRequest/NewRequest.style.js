import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
	body: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    fontFamily: 'SofiaPro',
    backgroundColor: 'white'
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
  formContainer: {
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
  formQuestionText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold'
  },
  purposeOptionContainer: {
    marginTop: 14,
    marginRight: 5,
  },
  optionItem: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#757575',
    borderRadius: 5,
    paddingLeft: 14,
    paddingRight: 16,
    paddingVertical: 10,
    marginBottom: 8,
  },
  optionCircle: {
    fontSize: 14,
    color: '#757575'
  },
  optionText: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#757575',
    fontSize: 14,
  },
  optionCircleActive: {
    color: 'white',
  },
  optionTextActive: {
    color: 'white'
  },

  optionItemGreen: {
    borderColor: '#43A047',
  },
  optionCircleGreen: {
    color: '#43A047',
  },
  optionTextGreen: {
    color: '#43A047'
  },
  optionItemGreenActive: {
    backgroundColor: '#43A047',
  },

  optionItemBlue: {
    borderColor: '#1E88E5'
  },
  optionCircleBlue: {
    color: '#1E88E5',
  },
  optionTextBlue: {
    color: '#1E88E5'
  },
  optionItemBlueActive: {
    backgroundColor: '#1E88E5',
  },
  optionItemGrayActive: {
    backgroundColor: '#757575',
  },

  questionContainer: {
    marginTop: 20,
  },
  timeOptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
  },
  timeOptionItem: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    paddingLeft: 14,
    paddingRight: 14,
    paddingVertical: 6,
    marginRight: 10,
    marginBottom: 8,
  },
  timeOptionItemActive: {
    backgroundColor: 'black'
  },
  timeOptionText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 14,
  },
  timeOptionTextActive: {
    color: 'white',
    marginLeft: 7,
  },
  timeOptionCircle: {
    display: 'none',
  },
  locationInput: {
    borderWidth: 2,
    borderColor: '#333',
    color: 'black',
    marginTop: 12,
    borderRadius: 5,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 6,
    marginRight: 5,
    fontSize: 16,
  },
  noteInput: {
    height: 'auto',
    minHeight: 50,
    paddingTop: Platform.select({ios: 16}),
    paddingBottom: Platform.select({ios: 16}),
  },
  requestButton: {
    backgroundColor: '#304FFE',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 21,
    paddingVertical: Platform.select({ios: 22, android: 18}),
  },
  requestBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  requestBtnIcon: {
    fontSize: 20,
    marginRight: 12,
    color: 'white'
  },
  btnPlaceholder: {
    height: 15,
    width: 150,
    backgroundColor: '#bdbdbd'
  }
})