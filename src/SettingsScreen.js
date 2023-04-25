import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Picker } from '@react-native-picker/picker'
import { styles, settingsStyles } from './styles'
import { View, Text, TextInput, TouchableOpacity, Linking, Switch } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons } from '@expo/vector-icons'

const SettingsScreen = ({ navigation, route }) => {
  // Define state variables and their corresponding setter functions
  const [userName, setUserName] = useState('Hyperjoule')
  const [ttsEnabled, setTtsEnabled] = useState(false)
  const [personalityIdx, setPersonalityIdx] = useState('0')

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
      const storedPersonalityIdx = await AsyncStorage.getItem('personalityIdx')
      if (storedPersonalityIdx) {
        setPersonalityIdx(storedPersonalityIdx)
      }
    }
    loadSettings()
  }, [])

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('userName', userName)
      await AsyncStorage.setItem('ttsEnabled', String(ttsEnabled))
      await AsyncStorage.setItem('personalityIdx', String(personalityIdx))
      navigation.navigate('Joulebot', { userName, ttsEnabled, personalityIdx })
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
      <View style={settingsStyles.personalityContainer}>
        <Picker
          selectedValue={personalityIdx}
          style={settingsStyles.picker}
          onValueChange={(itemValue) => setPersonalityIdx(itemValue)}
        >
          <Picker.Item label="😇 Playful" value={'0'} />
          <Picker.Item label="😈 Mischevious" value={'1'} />
          <Picker.Item label="🧠 Super Genius" value={'2'} />
          <Picker.Item label="☠️ Apocalyptic Pessimist" value={'3'} />
          <Picker.Item label="🤪 Nonsensical Haiku Bot" value={'4'} />
          <Picker.Item label="🌞 'Yes' Bot" value={'5'} />
          <Picker.Item label="🔮 Mystical Fortune Teller" value={'6'} />
          <Picker.Item label="🤖 Companion" value={'7'} />
        </Picker>
      </View>
      <TouchableOpacity style={settingsStyles.saveButton} onPress={saveSettings}>
        <Text style={settingsStyles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <View style={styles.copyrightContainer}>
      <Text style={styles.copyrightText}>
        ©2023 hyperjoule. This work is licensed under a{' '}
        <Text
          style={styles.hyperlink}
          onPress={() => Linking.openURL('https://creativecommons.org/licenses/by/4.0/')}
        >
          CC BY 4.0
        </Text>{' '}
        license.
      </Text>
    </View>
    </View>
  )
}

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({})
  }).isRequired
}

export default SettingsScreen
