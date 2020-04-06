import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export default function WizardItem(props) {

  let itemStyles = [styles.wizardItem]
  if (props.isLast) {
    itemStyles.push(styles.lastWizardItem)
  }

  return (
    <>
      <View style={itemStyles}>
        <View style={styles.wizardNumberContainer}>
          <Text style={styles.wizardNumberText}>{props.number}</Text>
        </View>
        <Text style={styles.wizardStepText}>{props.text}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  wizardItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    paddingVertical: 14,
    borderBottomColor: '#304FFE',
    alignItems: 'center',
    backgroundColor: 'rgba(225,245,254, 0.3)',
  },
  lastWizardItem: {
    borderBottomWidth: 0,
  },
  wizardNumberContainer: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#304FFE',
    borderRadius: 40,
  },
  wizardNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#BBDEFB',
  },
  wizardStepText: {
    paddingLeft: 16,
    paddingRight: 40,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 14,
  },
})