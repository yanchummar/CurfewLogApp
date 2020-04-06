import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { API_URL } from '../constants/urls'

const CaseCard = (props) => {
	return (
		<View style={props.itemStyle}>
			<Text style={props.countStyle}>{props.count}</Text>
			<Text style={props.labelStyle}>{props.label}</Text>
		</View>
	)
}

export default class SummarySection extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			date: {day:'-', month:'-', year:'-', weekday:'-'},
			covid_cases: {active:'---', recovered: '---', deceased: '---'}
		}
	}

	render() {
		const { date, covid_cases } = this.props

		return (
			<>
				<View style={styles.topSection}>
					<Text style={styles.dateText}>CurfewLog</Text>
					<View style={{flexDirection: 'row'}}>
						<Text style={styles.subDateText}>{date.weekday + ", " + date.day + " " + date.month + " " + date.year}</Text>
					</View>

					<View style={styles.covidHeadingRow}>
						<Text style={styles.covidHeading}>COVID-19 cases in India</Text>
					</View>
					<View style={styles.casesCards}>
						<CaseCard 
							itemStyle={[styles.casesCardItem, styles.caseColorRed]}
							countStyle={[styles.caseTextRed, styles.caseNumberText]}
							labelStyle={[styles.caseTextRed, styles.caseStatusText]}
							count={covid_cases.active}
							label={"Active"} />
						<CaseCard 
							itemStyle={[styles.casesCardItem, styles.caseColorBlue]}
							countStyle={[styles.caseTextBlue, styles.caseNumberText]}
							labelStyle={[styles.caseTextBlue, styles.caseStatusText]}
							count={covid_cases.recovered}
							label={"Recovered"} />
						<CaseCard 
							itemStyle={[styles.casesCardItem, styles.caseColorGray]}
							countStyle={[styles.caseTextGray, styles.caseNumberText]}
							labelStyle={[styles.caseTextGray, styles.caseStatusText]}
							count={covid_cases.deceased}
							label={"Deceased"} />
					</View>
				</View>
			</>
		)
	}
}

const styles = StyleSheet.create({
	topSection: {
		backgroundColor: 'white',
		paddingTop: 21,
		paddingLeft: 21,
		paddingRight: 21,
		paddingBottom: 25,
		borderBottomWidth: 1, 
		borderBottomColor: '#757575',
	},
	dateText: {
		fontSize: 21,
		color: 'black',
		fontWeight: 'bold'
	},
	subDateText: {
		fontSize: 13,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: '#1976D2',
		borderBottomWidth: 1,
		borderBottomColor: '#eee'
	},
	covidHeading: {
		fontWeight: 'bold',
		fontSize: 12,
		color: '#818181',
		marginLeft: 2,
		textTransform: 'uppercase',
	},
	covidHeadingRow: {
		marginTop: 18,
		flexDirection: 'row',
	},
	casesCards: {
		flexDirection: 'row',
		marginTop: 10,
	},
	casesCardItem: {
		flexGrow: 1,
		borderWidth: 2,
		borderRadius: 5,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	caseColorRed: {
		borderColor: '#d50000',
		backgroundColor: 'rgba(213,0,0,0.04)',
		marginRight: 5,
	},
	caseTextRed: {
		color: '#d50000',
	},
	caseColorBlue: {
		borderColor: '#2962FF',
		backgroundColor: 'rgba(41,98,255, 0.04)',
		marginLeft: 5,
		marginRight: 5,
	},
	caseTextBlue: {
		color: '#2962FF',
	},
	caseColorGray: {
		borderColor: '#616161',
		backgroundColor: 'rgba(97,97,97, 0.04)',
		marginLeft: 5,
	},
	caseTextGray: {
		color: '#616161',
	},
	caseNumberText: {
		fontWeight: 'bold',
		fontSize: 25,
	},
	caseStatusText: {
		fontSize: 12,
		fontWeight: 'bold',
	}
})