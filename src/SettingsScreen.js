/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { settingsStyles } from './styles'
import { View, Text, TextInput, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SettingsScreen = ({ navigation, route }) => {
  // Define state variables and their corresponding setter functions
  const [userName, setUserName] = useState('Hyperjoule')
  const [botName, setBotName] = useState('Joulebot')

  // Load values from AsyncStorage when the component mounts
  useEffect(() => {
    const loadSettings = async () => {
      const storedUserName = await AsyncStorage.getItem('userName')
      const storedBotName = await AsyncStorage.getItem('botName')
      if (storedUserName) {
        setUserName(storedUserName)
      }
      if (storedBotName) {
        setBotName(storedBotName)
      }
    }
    loadSettings()
  }, [])

  const saveSettings = async () => {
    try {
      // Save the updated settings to AsyncStorage
      await AsyncStorage.setItem('userName', userName)
      await AsyncStorage.setItem('botName', botName)
      // Pass the updated settings back to the ChatGPT screen
      navigation.navigate('Joulebot v1.1', { userName, botName })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={settingsStyles.container}>
      <Text>User Name:</Text>
      <TextInput value={userName} onChangeText={setUserName} style={settingsStyles.input} />
      <Text>Bot Name:</Text>
      <TextInput value={botName} onChangeText={setBotName} style={settingsStyles.input} />
      <Button title="Save" onPress={saveSettings} />
    </View>
  )
}

export default SettingsScreen
