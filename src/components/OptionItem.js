import React  from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Option(props) {
	return (
		<>
			<TouchableOpacity style={props.itemStyle} onPress={props.onPress}>
				<Icon name={props.iconName} style={props.circleStyle} />
				<Text style={props.textStyle}>{props.text}</Text>
			</TouchableOpacity>
		</>
	)
}