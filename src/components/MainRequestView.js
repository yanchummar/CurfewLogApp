import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import OptionItem from './OptionItem'
import { REQUEST_APPROVED_TEXT, REQUEST_PENDING_TEXT, REQUEST_REJECTED_TEXT } from '../constants/RequestStrings'

export default function MainRequestView(props) {

  const mainVisit = props.mainVisit
  // styles for status view
  let statusTextContainerStyles = [styles.statusTextContainer]
  let statusTextStyles = [styles.statusText]
  let statusIconStyles = [styles.statusIcon]
  let statusText = REQUEST_PENDING_TEXT
  let statusIcon = "hourglass-empty"
  if (mainVisit.status === "approved") {
    statusTextContainerStyles.push(styles.statusTextContainerGreen)
    statusTextStyles.push(styles.statusTextGreen)
    statusIconStyles.push(styles.statusIconGreen)
    statusText = REQUEST_APPROVED_TEXT
    statusIcon = "check"
  } else if (mainVisit.status === "rejected") {
    statusTextContainerStyles.push(styles.statusTextContainerRed)
    statusTextStyles.push(styles.statusTextRed)
    statusIconStyles.push(styles.statusIconRed)
    statusText = REQUEST_REJECTED_TEXT
    statusIcon = "report"
  }

  return(
    <>
      <View style={styles.mainVisitContainer}>
        <View style={statusTextContainerStyles}><Icon name={statusIcon} style={statusIconStyles}/><Text style={statusTextStyles}>{statusText}</Text></View>

        <View style={styles.mainVisitInfoContainer}> 
          <Text style={styles.formQuestionText}>Purpose of Visit</Text>
          
          <View style={styles.purposeOptionContainer}>
						{
							mainVisit.purpose.grocery ? (
								<OptionItem 
									itemStyle={[styles.optionItem]} 
									circleStyle={[styles.optionCircle, styles.optionCircleGreen]} 
									textStyle={[styles.optionText, styles.optionTextGreen]}
									text={"For purchasing required house supplies"}
									iconName={ "check-circle" } />
							): false
						}
						{
							mainVisit.purpose.medical ? (
								<OptionItem 
									itemStyle={[styles.optionItem]} 
									circleStyle={[styles.optionCircle, styles.optionCircleBlue]} 
									textStyle={[styles.optionText, styles.optionTextBlue]}
									text={"For medical emergencies/purchases"}
									iconName={ "check-circle" } />
							) : false
						}
						{
							mainVisit.purpose.other ? (
								<OptionItem 
									itemStyle={[styles.optionItem]} 
									circleStyle={[styles.optionCircle]} 
									textStyle={[styles.optionText]}
									text={"Other emergent purposes"}
									iconName={ "check-circle" } />
							) : false
						}
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.formQuestionText}>Day of visit</Text>
            <Text style={styles.dateText}>
							{mainVisit.visit_date.weekday + ", " + mainVisit.visit_date.day + " " + mainVisit.visit_date.month}
						</Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.formQuestionText}>Going to</Text>
            <Text style={styles.placeText}>{mainVisit.visit_place}</Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.formQuestionText}>Additional note</Text>
            <Text style={styles.noteText}>{mainVisit.note}</Text>
          </View>
        </View>

      </View>
    </>
  )

}

const styles = StyleSheet.create({
	mainVisitContainer: {
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderBottomWidth: 2,
		paddingBottom: 18,
		borderTopColor: '#eee',
		borderBottomColor: '#e0e0e0'
	},
	mainVisitInfoContainer: {
		paddingHorizontal: 25,
		paddingTop: 16,
		backgroundColor: 'white',
	},
	formQuestionText: {
		fontSize: 13,
		color: '#757575',
		fontWeight: 'bold'
	},
	purposeOptionContainer: {
		marginTop: 10,
		marginRight: 15,
	},
	optionItem: {
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 5,
		marginBottom: 4,
	},
	optionCircle: {
		fontSize: 14,
		color: '#757575'
	},
	optionText: {
		marginLeft: 6,
		fontWeight: 'bold',
		color: '#757575',
		fontSize: 14,
	},

	optionCircleGreen: {
		color: '#43A047',
	},
	optionTextGreen: {
		color: '#43A047'
	},

	optionCircleBlue: {
		color: '#1E88E5',
	},
	optionTextBlue: {
		color: '#1E88E5'
	},

	questionContainer: {
		marginTop: 16,
	},
	dateText: {
		marginTop: 2,
		color: 'black',
		fontWeight: 'bold',
		fontSize: 20,
	},
	placeText: {
		marginTop: 2,
		color: 'black',
		fontWeight: 'bold',
		fontSize: 16,
	},
	noteText: {
		marginTop: 2,
		color: '#757575',
		fontSize: 15,
	},

  statusTextContainer: {
    flexDirection: 'row',
		paddingHorizontal: 25,
		alignItems: 'center',
		paddingVertical: 8,
		backgroundColor: 'rgba(255,145,0, 0.08)',
	},
	statusIcon: {
		fontSize: 14,
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
		marginLeft: 6,
	},
	statusTextGreen: {
		color: 'rgb(0,200,83)'
	},
	statusTextRed: {
		color: 'rgb(221,44,0)'
	},
  statusTextContainerGreen: {
    backgroundColor: 'rgba(0,200,83, 0.08)',
  },
  statusTextContainerRed: {
    backgroundColor: 'rgba(221,44,0, 0.08)',
  },
})