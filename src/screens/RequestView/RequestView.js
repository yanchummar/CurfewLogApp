import React, { Component } from 'react'
import { SafeAreaView, View, Text, StatusBar, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './RequestView.style'

import { MainRequestView, VisitRequestItem, PlaceholderVisitItem } from '../../components'
import { REQUEST_APPROVED_TEXT, REQUEST_PENDING_TEXT, REQUEST_REJECTED_TEXT } from '../../constants/RequestStrings'

const recentVisits = [
	{status: 'approved', purpose: [true, true, true], place: 'ABC Supermarket', daysAgo: 2}, 
	{status: 'rejected', purpose: [true, true, false], place: 'XYZ Pharmacy', daysAgo: 5}, 
	{status: 'approved', purpose: [true, false, false], place: 'Store C', daysAgo: 10}
]

export default class RequestView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			mainVisit: this.props.route.params.activeVisit,
			recentVisits: this.props.route.params.recentVisits,
			isLoading: false,
		}
	}

	navigateBack = () => {
		this.props.navigation.navigate('Home')
	}

	render() {
		const { mainVisit, recentVisits, isLoading } = this.state

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

		// getting loading view if necessary
		let request_view_element = (
			<View>
				<PlaceholderVisitItem /><PlaceholderVisitItem /><PlaceholderVisitItem />
			</View>
		)

		if (!isLoading) {
			request_view_element = (
				<View>
					{
						(mainVisit !== undefined) ? (
							<View>
								<Text style={[styles.recentVisitsTitle, {marginTop: 10}]}>Active Visit</Text>
								<MainRequestView mainVisit={mainVisit} />
							</View>
						) : false
					}
					{
						(recentVisits.length > 0) ? (
							<View>
								<View>
									<Text style={[styles.recentVisitsTitle, {marginTop: 28}]}>Recent Visits</Text>
	
									<View style={{paddingBottom: 35}}>
										{
											recentVisits.map((visit, index) => {
												return (
													<VisitRequestItem visit={visit} index={index} listLength={recentVisits.length}/>
												)
											})
										}
									</View>
								</View>
							</View>
						) : false
					}
				</View>
			)
		}

		return (
			<>
				<StatusBar />
				<SafeAreaView style={styles.body}>

					<TouchableOpacity style={styles.backNavContainer} onPress={this.navigateBack.bind(this)}>
						<Icon name="arrow-back" style={styles.backNavIcon} />
						<Text style={styles.backNavText}>Back</Text>
					</TouchableOpacity>

					<ScrollView>

						{ request_view_element }

					</ScrollView>

				</SafeAreaView>
			</>
		)
	}
}