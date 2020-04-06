import React, { Component } from 'react'
import { SafeAreaView, View, Text, StatusBar, TouchableOpacity, Modal, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Home.style'
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from '../../constants/urls'

import { SummarySection, WizardItem, PlaceholderVisitItem } from '../../components'
import { REQUEST_APPROVED_TEXT, REQUEST_PENDING_TEXT, REQUEST_REJECTED_TEXT } from '../../constants/RequestStrings'

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

export default class Home extends Component {

	constructor(props) {
		super(props)
		this.state = {
			loginModalVisible: false,
			isSigninInProgress: false,
			userEmail: undefined,
			activeVisit: undefined,
			recentVisits: [],
			isLoading: false,
			date: {day:'-', month:'-', year:'-', weekday:'-'},
			covid_cases: {active:'---', recovered: '---', deceased: '---'}
		}
	}

	navigateToRequestCreation = () => {
		// navigating to request creation screen
		this.props.navigation.navigate('New Request', { userEmail: this.state.userEmail })
	}

	// Somewhere in your code
	signInAndNavigate = async () => {
		try {
			await GoogleSignin.hasPlayServices()
			// set button disabled
			this.setState({ isSigninInProgress: true })

			const userInfo = await GoogleSignin.signIn()

			// adding user to db
			fetch((API_URL + '/add-user'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: userInfo.user.email,
					name: userInfo.user.name
				}),
			})
			.then((response) => response.json())
			.then((json) => {
				console.log(json)
				if (json.status === "success") {
					// navigating to request creation
					let userEmail = userInfo.user.email
					this.setState({ userEmail: userEmail, isSigninInProgress: false, loginModalVisible: false })
					// saving user email
					this.saveUserEmail(userEmail)
					this.navigateToRequestCreation()
				} else {
					this.setState({ userEmail: undefined, isSigninInProgress: false })
				}
			})
			.catch((error) => {
				console.error(error);
				this.setState({ userEmail: undefined, isSigninInProgress: false })
			});

		} catch (error) {
			console.log(error)
			this.setState({ isSigninInProgress: false })
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (e.g. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}
		}
	}
	// saving current user's email
	saveUserEmail = async (email) => {
		await AsyncStorage.setItem('@userEmail', email)
	}

	// getting currentUser
	checkForUserAndFetchVisit = async () => {
		// getting stored user email
		try {
			const userEmail = await AsyncStorage.getItem('@userEmail')
			if (userEmail !== null) {
				// fetching visit by email
				this.setState({userEmail: userEmail})

				// get active and recent visits
				fetch((API_URL + '/get-user-requests'), {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Cache-Control': 'no-cache'
					},
					body: JSON.stringify({
						email: userEmail
					}),
				})
				.then((response) => response.json())
				.then((json) => {
					console.log(json)
					if (json.status === "success") {
						// getting pending requests
						this.setState({activeVisit: json.active_request, recentVisits: json.past_requests, isLoading: false})
					} else {
						this.setState({isLoading: false, activeVisit: undefined, recentVisits: []})
					}
				})
				.catch((error) => {
					console.error(error);
					this.setState({isLoading: false, activeVisit: undefined, recentVisits: []})
				})
			} else {
				this.setState({isLoading: false, activeVisit: undefined})
			}

		} catch(e) {
			// error reading value
		}
	}

	handleNewVisitRequest = async () => {
		try {
			const userEmail = await AsyncStorage.getItem('@userEmail')
			console.log('storedEmail: ' + userEmail)
			if (userEmail !== null) {
				this.setState({ userEmail: userEmail })
				this.navigateToRequestCreation()
			} else {
				this.signInAndNavigate()
			}
		} catch(e) {
			// error reading value
		}
	}

	navigateToRequestView = () => {
		this.props.navigation.navigate('Request View', { activeVisit: this.state.activeVisit, recentVisits: this.state.recentVisits })
	}

	// sending API request everytime the component loads
	componentDidMount() {
		this.setState({ isLoading: true })
		// getting summary
		fetch((API_URL + '/get-summary'), {
			method: 'GET',
			headers: {
				'Cache-Control': 'no-cache'
			}
		})
		.then((response) => response.json())
		.then((json) => {
			console.log(json)
			this.setState({
				date: json.date,
				covid_cases: json.covid_cases
			})
		})
		.catch((error) => {
			console.log(error);
		});
		this.checkForUserAndFetchVisit()
	}

	render() {
		const { loginModalVisible, isSigninInProgress, activeVisit, isLoading, date, covid_cases } = this.state

		if (this.props.route.params !== undefined) {
			if (this.props.route.params.isHardRefresh === true) {
				this.props.route.params.isHardRefresh = false
				this.componentDidMount()
			}
		}

		// For Google SignIn
		GoogleSignin.configure({ 
			// what API you want to access on behalf of the user, default is email and profile
			webClientId: '509694330854-n34k62m11gp19hur1b6oikl1qou410sk.apps.googleusercontent.com'
		});
		
		// styles for active visit
		let logContainerStyles = [styles.logContainer]
		let upcomingDateTextStyles = [styles.upcomingDateText]
		let statusTextContainerStyles = [styles.statusTextContainer]
		let statusTextStyles = [styles.statusText]
		let statusIconStyles = [styles.statusIcon]
		let statusText = REQUEST_PENDING_TEXT
		let statusIcon = "hourglass-empty"
		if (activeVisit !== undefined) {
			if (activeVisit.status === "approved") {
				logContainerStyles.push(styles.logContainerGreen)
				upcomingDateTextStyles.push(styles.upcomingDateTextGreen)
				statusTextContainerStyles.push(styles.statusTextContainerGreen)
				statusTextStyles.push(styles.statusTextGreen)
				statusIconStyles.push(styles.statusIconGreen)
				statusText = REQUEST_APPROVED_TEXT
				statusIcon = "check"
			} else if (activeVisit.status === "rejected") {
				logContainerStyles.push(styles.logContainerRed)
				upcomingDateTextStyles.push(styles.upcomingDateTextRed)
				statusTextContainerStyles.push(styles.statusTextContainerRed)
				statusTextStyles.push(styles.statusTextRed)
				statusIconStyles.push(styles.statusIconRed)
				statusText = REQUEST_REJECTED_TEXT
				statusIcon = "report"
			}
		}

		// getting loading or active visit component
		let active_visit_element = <PlaceholderVisitItem />
		if (!isLoading) {
			active_visit_element = (
				(activeVisit != undefined) ? (
					<TouchableOpacity style={logContainerStyles} onPress={this.navigateToRequestView.bind(this)}>

						<View style={statusTextContainerStyles}>
							<Icon name={statusIcon} style={statusIconStyles}/><Text style={statusTextStyles}>{statusText}</Text>
						</View>

						<Text style={styles.upcomingLabel}>Upcoming Visit</Text>
						<Text style={upcomingDateTextStyles}>
							{activeVisit.visit_date.weekday + ", " + activeVisit.visit_date.day + " " + activeVisit.visit_date.month}
						</Text>
					</TouchableOpacity>
				) : <View />
			)
		}

		return (
			<>
				<StatusBar barStyle="dark-content"/>
				<SafeAreaView style={styles.body}>

					<Modal
						style={styles.loginModal}
						animationType="slide"
						transparent={true}
						visible={loginModalVisible}>
						<TouchableOpacity style={styles.loginModalEmptySpace} onPress={() => this.setState({loginModalVisible: false})}/>
						<View style={styles.modalContainer}>
							<Text style={styles.loginModalText}>Please login with your Google account to continue</Text>
							<GoogleSigninButton
								style={styles.googleSignInBtn}
								size={GoogleSigninButton.Size.Wide}
								color={GoogleSigninButton.Color.Dark}
								onPress={this.signInAndNavigate.bind(this)}
								disabled={isSigninInProgress} />
						</View>
					</Modal>

					<ScrollView 
						style={styles.scrollView} 
						refreshControl={
							<RefreshControl refreshing={false} onRefresh={this.componentDidMount.bind(this)} />
						} >

						<SummarySection date={date} covid_cases={covid_cases}/>

						<View style={styles.contentView}>
							<View style={styles.lighterSection}>
								<View style={styles.wizardContainer}>
									<WizardItem number={"1"} text={"Create a new visit request when you need to go out during the lockdown."} />
									<WizardItem number={"2"} text={"Fill out the request with all relevant information about your visit."} />
									<WizardItem number={"3"} text={"Send the request and wait for approval from an official."} isLast={true} />
								</View>
							</View>

							{ active_visit_element }

						</View>

					</ScrollView>

					<TouchableOpacity style={styles.requestButton} onPress={this.handleNewVisitRequest.bind(this)} >
						<Icon name={"add-circle"} style={styles.requestBtnIcon} />
						<Text style={styles.requestButtonText}>Create a Visit Request</Text>
					</TouchableOpacity>

				</SafeAreaView>
			</>
		)
	}
}
