import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Shimmer from 'react-native-shimmer'

export default function PlaceholderVisitItem(props) {

	return (
		<>  
			<Shimmer style={styles.shimmer}>
				<View style={styles.cardContainer}>
					<View style={[styles.placeholderItem, {width: 160}]} />
					<View style={{flexDirection: 'row', marginTop: 14}}>
						<View style={[styles.placeholderItem, {width: 50}]} />
						<View style={[styles.placeholderItem, {width: 80, marginLeft: 8}]} />
					</View>
					<View style={[styles.placeholderItem, {width: 250, marginTop: 12}]} />
					<View style={[styles.placeholderItem, {width: 100, marginTop: 10, height: 10}]} />
				</View>
			</Shimmer>
		</>
	)
}

const styles = StyleSheet.create({
	shimmer: {
		marginHorizontal: 21,
		marginTop: 14,
		marginBottom: 2,
	},
	cardContainer: {
		borderWidth: 2,
		borderColor: '#cecece',
		backgroundColor: 'white',
		paddingHorizontal: 16,
		paddingVertical: 16,
		borderRadius: 6,
	},
	placeholderItem: {
		height: 10,
		backgroundColor: '#cecece',
	},
})