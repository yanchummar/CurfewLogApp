import React, { Component } from 'react'
import { SafeAreaView, View, Text, StatusBar, TouchableOpacity, TextInput, ScrollView, PermissionsAndroid, Platform, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './NewRequest.style'
import Geolocation from '@react-native-community/geolocation'
import Shimmer from 'react-native-shimmer'
import { API_URL } from '../../constants/urls'

import { OptionItem } from '../../components'

export default class Home extends Component {

	constructor(props) {
		super(props)
		this.state = {
			pGrocerySelected: false,
			pMedicalSelected: false,
			pOtherSelected: false,
			selectedDay: [false, false],
			placeInputText: undefined,
			noteInputText: undefined,
			userEmail: this.props.route.params.userEmail,
			isRequesting: false,
		}
	}

	// input change functions
	handlePlaceInputChange = (text) => {
		this.setState({placeInputText: text})
	}
	handleNoteInputChange = (text) => {
		this.setState({noteInputText: text})
	}

	navigateBack = () => {
		this.props.navigation.navigate('Home')
	}

	// getting location and locality name
	createNewRequest = () => {
		const { pGrocerySelected, pMedicalSelected, pOtherSelected, 
			selectedDay, placeInputText, noteInputText, userEmail } = this.state
		// getting current location
		Geolocation.getCurrentPosition((position) => {
			let latlong = [position.coords.latitude, position.coords.longitude]
			console.log(latlong)

			// send API request
			let visit_day = 'tomorrow'
			if (selectedDay[0]) {
				visit_day = 'today'
			}
			let noteText = noteInputText
			if (noteInputText === undefined) {
				noteText = '---'
			}

			fetch((API_URL + '/new-request'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache'
				},
				body: JSON.stringify({
					email: userEmail,
					visit_day: visit_day,
					visit_place: placeInputText,
					purpose: {
						grocery: pGrocerySelected,
						medical: pMedicalSelected,
						other: pOtherSelected
					},
					coordinates: latlong,
					note: noteText
				}),
			})
			.then((response) => response.json())
			.then((json) => {
				console.log(json)
				if (json.status === "success") {
					// getting pending requests
					this.setState({isRequesting: false})
					this.props.navigation.navigate('Home', {isHardRefresh: true})
				} else {
					this.setState({isRequesting: false})
				}
			})
			.catch((error) => {
				console.log(error)
				this.setState({isRequesting: false})
			});
		})
	}

	// requesting location permission and navigating to request creation
	requestPermissionAndCreateRequest = async () => {
		const { pGrocerySelected, pMedicalSelected, pOtherSelected, 
			selectedDay, placeInputText } = this.state

		if ((pGrocerySelected || pMedicalSelected || pOtherSelected) && (selectedDay[0] || selectedDay[1])
			&& placeInputText !== undefined) {

			// requestion location
			this.setState({isRequesting: true})
			if (Platform.OS === 'android') {
				try {
					const granted = await PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
						{
							title: "Curfew Log Location Permission",
							message:
								"Curfew Log needs to access your location " +
								"to send the request to the correct people",
							buttonNegative: "Cancel",
							buttonPositive: "OK"
						}
					);
					if (granted === PermissionsAndroid.RESULTS.GRANTED) {
						// getting current location
						this.createNewRequest()
					} else {
						console.log("Location permission denied")
						ToastAndroid.show("Please enable location permissions to continue", ToastAndroid.LONG)
						this.setState({isRequesting: false})
					}
				} catch (err) {
					console.warn(err);
					this.setState({isRequesting: false})
				}
			} else if (Platform.OS === 'ios') {
				// getting current location
				Geolocation.requestAuthorization()
				this.createNewRequest()
			}
		} else {
			console.log('empty fields')
		}
	}

	render() {
		const { pGrocerySelected, pMedicalSelected, pOtherSelected, 
			selectedDay, userEmail, isRequesting, placeInputText, noteInputText } = this.state

		// for purpose option one
		let pGroceryItemStyles = [styles.optionItem, styles.optionItemGreen]
		let pGroceryCircleStyles = [styles.optionCircle, styles.optionCircleGreen]
		let pGroceryTextStyles = [styles.optionText, styles.optionTextGreen]
		// for purpose option two
		let pMedicalItemStyles = [styles.optionItem, styles.optionItemBlue]
		let pMedicalCircleStyles = [styles.optionCircle, styles.optionCircleBlue]
		let pMedicalTextStyles = [styles.optionText, styles.optionTextBlue]
		// for purpose option three
		let pOtherItemStyles = [styles.optionItem]
		let pOtherCircleStyles = [styles.optionCircle]
		let pOtherTextStyles = [styles.optionText]
		// active general styles
		let activeCircleStyles = [styles.optionCircle, styles.optionCircleActive]
		let activeTextStyles = [styles.optionText, styles.optionTextActive]
		// for active states
		if (pGrocerySelected) {
			pGroceryItemStyles.push(styles.optionItemGreenActive)
			pGroceryCircleStyles = activeCircleStyles
			pGroceryTextStyles = activeTextStyles
		}
		if (pMedicalSelected) {
			pMedicalItemStyles.push(styles.optionItemBlueActive)
			pMedicalCircleStyles = activeCircleStyles
			pMedicalTextStyles = activeTextStyles
		}
		if (pOtherSelected) {
			pOtherItemStyles.push(styles.optionItemGrayActive)
			pOtherCircleStyles = activeCircleStyles
			pOtherTextStyles = activeTextStyles
		}

		console.log(userEmail)

		return (
			<>
				<StatusBar />
				<SafeAreaView style={styles.body}>

					<ScrollView>

						<TouchableOpacity style={styles.backNavContainer} onPress={this.navigateBack.bind(this)}>
							<Icon name="arrow-back" style={styles.backNavIcon} />
							<Text style={styles.backNavText}>Back</Text>
						</TouchableOpacity>

						<View style={styles.formContainer}>
							<View>
								<Text style={styles.formQuestionText}>What is the purpose of the visit?</Text>

								<View style={styles.purposeOptionContainer}>
									<OptionItem 
										itemStyle={pGroceryItemStyles} 
										circleStyle={pGroceryCircleStyles} 
										textStyle={pGroceryTextStyles}
										text={"For purchasing required house supplies"}
										iconName={ pGrocerySelected ? "check-circle" : "lens" }
										onPress={() => this.setState({pGrocerySelected: !pGrocerySelected})} />
									<OptionItem 
										itemStyle={pMedicalItemStyles} 
										circleStyle={pMedicalCircleStyles} 
										textStyle={pMedicalTextStyles}
										text={"For medical emergencies/purchases"}
										iconName={ pMedicalSelected ? "check-circle" : "lens" }
										onPress={() => this.setState({pMedicalSelected: !this.state.pMedicalSelected})} />
									<OptionItem 
										itemStyle={pOtherItemStyles} 
										circleStyle={pOtherCircleStyles} 
										textStyle={pOtherTextStyles}
										text={"Other emergent purposes"}
										iconName={ pOtherSelected ? "check-circle" : "lens" }
										onPress={() => this.setState({pOtherSelected: !this.state.pOtherSelected})} />
								</View>
							</View>

							<View style={styles.questionContainer}>
								<Text style={styles.formQuestionText}>When are you planning to go out?</Text>
								<View style={styles.timeOptionContainer}>
									<OptionItem
										itemStyle={ selectedDay[0] ? [styles.timeOptionItem, styles.timeOptionItemActive] : styles.timeOptionItem }
										circleStyle={ selectedDay[0] ? styles.optionCircleActive : styles.timeOptionCircle }
										textStyle={ selectedDay[0] ? [styles.timeOptionText, styles.timeOptionTextActive] : styles.timeOptionText }
										text={"Today"}
										iconName={"check-circle"}
										onPress={() => this.setState({ selectedDay: [true, false] })} />
									<OptionItem
										itemStyle={ selectedDay[1] ? [styles.timeOptionItem, styles.timeOptionItemActive] : styles.timeOptionItem }
										circleStyle={ selectedDay[1] ? styles.optionCircleActive : styles.timeOptionCircle }
										textStyle={ selectedDay[1] ? [styles.timeOptionText, styles.timeOptionTextActive] : styles.timeOptionText }
										text={"Tomorrow"}
										iconName={"check-circle"}
										onPress={() => this.setState({ selectedDay: [false, true] })} />
								</View>
							</View>

							<View style={styles.questionContainer}>
								<Text style={styles.formQuestionText}>Where are you going to?</Text>
								<TextInput 
									style={styles.locationInput}
									autoCapitalize='sentences'
									placeholder={"Eg. ABC Supermarket"}
									value={placeInputText}
									onChangeText={this.handlePlaceInputChange.bind(this)} />
							</View>

							<View style={styles.questionContainer}>
								<Text style={styles.formQuestionText}>Describe the urgency of your visit</Text>
								<Text style={{fontSize: 12, color: '#818181'}}>Optional</Text>
								<TextInput 
									style={[styles.locationInput, styles.noteInput]}
									autoCapitalize='sentences'
									multiline={true}
									placeholder={"Eg. Ran out of essential food ingredients or emergency medications"}
									value={noteInputText}
									onChangeText={this.handleNoteInputChange.bind(this)} />
							</View>

						</View>

					</ScrollView>

					<TouchableOpacity style={styles.requestButton} onPress={this.requestPermissionAndCreateRequest.bind(this)}>
						{
							isRequesting ? (
								<Shimmer style={{marginVertical: 3}}>
									<View style={styles.btnPlaceholder} />
								</Shimmer>
							): (
								<View style={{flexDirection:'row'}}>
									<Icon name="check" style={styles.requestBtnIcon} />
									<Text style={styles.requestBtnText}>Send Request</Text>
								</View>
							)
						}
					</TouchableOpacity>

				</SafeAreaView>
			</>
		)
	}
}
