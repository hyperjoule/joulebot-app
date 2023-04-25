/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { settingsStyles } from './styles'
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons } from '@expo/vector-icons'

const SettingsScreen = ({ navigation, route }) => {
  // Define state variables and their corresponding setter functions
  const [userName, setUserName] = useState('Hyperjoule')
  const [ttsEnabled, setTtsEnabled] = useState(false)

  // Load values from AsyncStorage when the component mounts
  useEffect(() => {
    const loadSettings = async () => {
      const storedUserName = await AsyncStorage.getItem('userName')
      if (storedUserName) {
        setUserName(storedUserName)
      }
      const storedTtsEnabled = await AsyncStorage.getItem('ttsEnabled')
      if (storedTtsEnabled) {
        setTtsEnabled(storedTtsEnabled === 'true')
      }
    }
    loadSettings()
  }, [])

  const saveSettings = async () => {
    try {
      // Save the updated settings to AsyncStorage
      await AsyncStorage.setItem('userName', userName)
      await AsyncStorage.setItem('ttsEnabled', String(ttsEnabled))
      // Pass the updated settings back to the ChatGPT screen
      navigation.navigate('Joulebot', { userName, ttsEnabled })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={settingsStyles.container}>
      <View style={settingsStyles.userNameContainer}>
        <MaterialIcons name="person" size={24} color="black" style={settingsStyles.icon} />
        <Text style={settingsStyles.label}>User Name:</Text>
      </View>
      <TextInput
        value={userName}
        onChangeText={setUserName}
        style={settingsStyles.input}
      />
      <View style={settingsStyles.ttsToggleContainer}>
        <MaterialIcons name="volume-up" size={24} color="black" style={settingsStyles.icon} />
        <Text style={settingsStyles.label}>Toggle Joulebot TTS:</Text>
        <View style={settingsStyles.switchContainer}>
          <Switch value={ttsEnabled} onValueChange={setTtsEnabled} />
        </View>
      </View>
      <TouchableOpacity style={settingsStyles.saveButton} onPress={saveSettings}>
        <Text style={settingsStyles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingsScreen
