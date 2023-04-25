import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Linking,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native'
import * as Speech from 'expo-speech'
import { styles } from './styles'
import { API_KEY } from './config'
import { generateImage, handleSend } from './api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'

// function to download dall-e image to folder on device
const saveImageToGallery = async (imageUri) => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission to access camera roll is required to save images.')
      return
    }

    const tmpFile = await FileSystem.downloadAsync(
      imageUri,
      FileSystem.cacheDirectory + 'tmp_image.png'
    )

    const asset = await MediaLibrary.createAssetAsync(tmpFile.uri)

    const albums = await MediaLibrary.getAlbumsAsync()
    let joulebotAlbum = albums.find(album => album.title === 'Joulebot')
    if (!joulebotAlbum) {
      joulebotAlbum = await MediaLibrary.createAlbumAsync('Joulebot', asset, false)
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], joulebotAlbum, false)
    }

    alert('Image saved to Joulebot ablum.')
  } catch (error) {
    console.error('Error saving image: ', error)
  }
}

const Joulebot = ({ route }) => {
  // Constants
  const apiKey = API_KEY
  const headerImage = './joulebot.png'
  const botName = 'Joulebot'
  // Define state variables and their corresponding setter functions
  const [userName, setUserName] = useState('Hyperjoule')
  const [data, setData] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
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

  const _handleSend = async () => {
    try {
      setIsDisabled(true)
      setLoading(true)
      setData((prevData) => [{ type: 'user', text: textInput }, ...prevData])
      const isDrawRequest = textInput.toLowerCase().startsWith('draw a') || textInput.toLowerCase().startsWith('draw me a')
      if (isDrawRequest) {
        const imageUrl = await generateImage(textInput)
        if (imageUrl) {
          setData((prevData) => [{ type: 'bot', text: '', image: imageUrl }, ...prevData])
        } else {
          setData((prevData) => [{ type: 'bot', text: 'Error generating image.' }, ...prevData])
        }
      } else {
        const response = await handleSend(textInput, personalityIdx, apiKey)
        setData((prevData) => [{ type: 'bot', text: response }, ...prevData])
        if (ttsEnabled) {
          Speech.speak(response, { rate: 0.9 })
        } else {
          if (Speech.isSpeakingAsync()) {
            Speech.stop()
          }
        }
      }
      setTextInput('')
      setIsDisabled(false)
      setLoading(false)
    } catch (error) {
      console.error(error)
      if (error.response) {
        console.error(error.response.data)
      }
      setIsDisabled(false)
      setLoading(false)
    }
  }

  return (
    <View behavior='padding' style={styles.container}>
      <Image
        source={require(headerImage)}
        style={styles.headerImage}
        resizeMode='contain'
        resizeMethod='scale'
      />
      <View style={{ flex: 1, width: '100%' }}>
        <FlatList
          data={data}
          inverted={true}
          ref={flatListRef}
          keyExtractor={(item, index) => index.toString()}
          style={styles.body}
          renderItem={({ item, index }) => (
            <View style={styles.messageContainer}>
              <View style={styles.row}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: item.type === 'user' ? '#586095' : '#911381'
                  }}
                >
                  {item.type === 'user' ? userName : botName}
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.centerRow}>
                {item.image
                  ? (
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            'Save image',
                            'Save image to Joulebot album?',
                            [
                              {
                                text: 'No',
                                style: 'cancel'
                              },
                              {
                                text: 'Yes',
                                onPress: () => saveImageToGallery(item.image)
                              }
                            ],
                            { cancelable: false }
                          )
                        }
                      >
                        <Image source={{ uri: item.image }} style={styles.image} />
                      </TouchableOpacity>
                    )
                  : (
                    <TextInput
                      value={item.text}
                      style={item.type === 'user' ? styles.user : styles.bot}
                      multiline={true}
                      editable={false}
                      textAlignVertical="center"
                    />
                    )}
              </View>
              {loading && item.type === 'user' && index === 0 && (
                <View style={styles.centerAlign}>
                  <ActivityIndicator size='large' color='purple' />
                </View>
              )}
              <View style={styles.bottomBuffer} />
            </View>
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
          placeholder='Ask Joulebot a Question'
          editable={!isDisabled}
          autoFocus={true}
        />
        <TouchableOpacity
          style={[styles.button, isDisabled ? { opacity: 0.5 } : { opacity: 1 }]}
          onPress={() => {
            if (!isDisabled) {
              _handleSend()
            }
          }}
        >
          <Text style={styles.buttonText}>Ask!</Text>
        </TouchableOpacity>
      </View>
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

Joulebot.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      ttsEnabled: PropTypes.bool,
      personalityIdx: PropTypes.number
    })
  })
}

export default Joulebot
