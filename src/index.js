import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, TextInput, TouchableOpacity, Text, Image } from 'react-native'
import { styles } from './styles'
import { API_KEY } from './config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { saveImageToGallery } from './utils/saveImageToGallery'
import MessageItem from './components/MessageItem'
import { useSendMessage } from './hooks/useSendMessage'

const Joulebot = ({ route }) => {
  // Constants
  const apiKey = API_KEY
  const headerImage = '../assets/joulebot.png'
  const botName = 'Joulebot'

  // Define state variables and their corresponding setter functions
  const [userName, setUserName] = useState('Hyperjoule')
  const [textInput, setTextInput] = useState('')
  const ttsEnabled = route.params?.ttsEnabled ?? false
  const personalityIdx = route.params?.personalityIdx ?? 0

  // Used to for scrolling/keep current answer at top
  const flatListRef = useRef(null)

  // Load values from AsyncStorage when the component is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadSettings = async () => {
        const storedUserName = await AsyncStorage.getItem('userName')
        if (storedUserName) {
          setUserName(storedUserName)
        }
      }
      loadSettings()
    }, [])
  )

  const { data, isDisabled, loading, handleSend } = useSendMessage(apiKey, ttsEnabled, personalityIdx)

  const handleSendMessage = async () => {
    await handleSend(textInput)
    setTextInput('')
  }

  return (
    <View behavior="padding" style={styles.container}>
      <Image
        source={require(headerImage)}
        style={styles.headerImage}
        resizeMode="contain"
        resizeMethod="scale"
      />
      <View style={{ flex: 1, width: '100%' }}>
        <FlatList
          data={data}
          inverted={true}
          ref={flatListRef}
          keyExtractor={(item, index) => index.toString()}
          style={styles.body}
          renderItem={({ item, index }) => (
            <MessageItem
              item={item}
              index={index}
              userName={userName}
              botName={botName}
              loading={loading && item.type === 'user' && index === 0}
              saveImageToGallery={saveImageToGallery}
            />
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
          placeholder="Ask Joulebot a Question"
          editable={!isDisabled}
          autoFocus={true}
        />
        <TouchableOpacity
          style={[
            styles.button,
            isDisabled ? { opacity: 0.5 } : { opacity: 1 }
          ]}
          onPress={() => {
            if (!isDisabled) {
              handleSendMessage(textInput)
            }
          }}
        >
          <Text style={styles.buttonText}>Ask!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

Joulebot.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      ttsEnabled: PropTypes.bool,
      personalityIdx: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  })
}

export default Joulebot
