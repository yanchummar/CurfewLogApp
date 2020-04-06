import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function VisitRequestItem(props) {

  const visit = props.visit

  // status style changes
  let cardStyles = [styles.recentVisitItemCard]
  if (visit.status === 'approved') {
    cardStyles.push(styles.recentVisitItemCardGreen)
	}
	
	// getting correct days ago text
	let daysAgoText = visit.days_ago + " days ago"
	if (visit.days_ago === 0) {
		daysAgoText = 'Today'
	} else if (visit.days_ago === 1) {
		daysAgoText = 'Yesterday'
	}

  return (
    <>  
      <View style={styles.recentVisitItemContainer}>
        <View style={cardStyles}>

					<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
						<View>
							<Text style={styles.recentDaysCountText}>{ daysAgoText }</Text>
							<Text style={styles.recentDateText}>
								{visit.visit_date.day + " " + visit.visit_date.month + " " + visit.visit_date.year}
							</Text>
						</View>
						<View style={{alignItems: 'flex-end'}}>
							<Text style={styles.smallHeading}>Visiting</Text>
							<Text style={styles.recentPlaceText}>{visit.visit_place}</Text>
						</View>
					</View>

					<View style={{flexDirection: 'column'}}>
						<Text style={styles.smallHeading}>Purpose</Text>
						<View style={styles.purposeItemContainer}>
							{
								visit.purpose.grocery ? <Text style={[styles.purposeTextItem, styles.purposeTextItemGreen]}>House Supplies</Text> : false
							}
							{
								visit.purpose.medical ? <Text style={[styles.purposeTextItem, styles.purposeTextItemBlue]}>Medical Needs</Text> : false
							}
							{
								visit.purpose.other ? <Text style={styles.purposeTextItem}>Other</Text> : false
							}
						</View>
					</View>

        </View>
        {
          (props.index !== (props.listLength-1)) ? (<View style={{flexDirection:'row', justifyContent:'center'}}><View style={styles.visitConnectorLine} /></View>) : false
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  recentVisitItemContainer: {
		flexDirection: 'column',
		marginHorizontal: 14,
	},
	recentVisitItemCard: {
		paddingHorizontal: 16,
		paddingVertical: 10,
		backgroundColor: 'white',
		borderWidth: 1,
		borderLeftColor: '#e0e0e0',
		borderRightColor: '#e0e0e0',
		borderBottomColor: '#e0e0e0',
		borderBottomWidth: 2,
		borderRadius: 2,
		borderTopWidth: 2,
		borderTopColor: 'rgb(221,44,0)'
	},
	recentVisitItemCardGreen: {
		borderTopColor: 'rgb(0,200,83)',
	},
	visitConnectorLine: {
		width: 2,
		height: 20,
		backgroundColor: '#eee',
	},
	recentDaysCountText: {
		fontSize: 17,
		color: 'black',
		fontWeight: 'bold'
	},
	recentDateText: {
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: '#9e9e9e',
		fontSize: 10,
		marginTop: 1,
	},
  purposeTextItem: {
    color: 'white',
    borderWidth: 2,
    borderColor: 'rgba(117,117,117, 0.2)',
    fontWeight: 'bold',
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: Platform.select({ios: 10, android: 6}),
    paddingTop: 3,
    paddingBottom: Platform.select({ios: 2, android: 0}),
    borderRadius: 12,
    color: '#757575',
    marginRight: 6,
  },
  purposeTextItemGreen: {
    borderColor: 'rgba(67,160,71, 0.2)',
    color: '#43A047',
  },
  purposeTextItemBlue: {
    borderColor: 'rgba(30,136,229, 0.2)',
    color: '#1E88E5',
  },
  purposeItemContainer: {
    flexDirection: 'row', 
		marginTop: 5, 
		marginBottom: 5,
		marginLeft: -2,
  },
	smallHeading: {
		fontSize: 10,
		fontWeight: 'bold',
		color: '#9e9e9e',
		marginTop: 8,
	},
	recentPlaceText: {
		fontWeight: 'bold',
		fontSize: 12,
		color: '#424242',
	}
})