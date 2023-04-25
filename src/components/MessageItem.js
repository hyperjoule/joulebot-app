import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Platform
} from 'react-native'
import { styles } from '../screens/Joulebot/styles'

const MessageItem = ({
  item,
  index,
  userName,
  botName,
  loading,
  saveImageToGallery
}) => {
  const isWeb = Platform.OS === 'web'

  const saveImageWeb = (imageUri) => {
    const link = document.createElement('a')
    link.href = imageUri
    link.download = 'joulebot_image.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <View style={styles.messageContainer}>
      <View style={styles.row}>
        <Text
          style={
            item.type === 'user' ? styles.userNameStyle : styles.botNameStyle
          }
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
              isWeb
                ? saveImageWeb(item.image)
                : Alert.alert(
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
          <Text
            style={[
              item.type === 'user' ? styles.user : styles.bot,
              styles.messageContainer
            ]}
          >
            {item.text}
          </Text>
            )}
      </View>
      {loading && item.type === 'user' && index === 0 && (
        <View style={styles.centerAlign}>
          <ActivityIndicator size="large" color="purple" />
        </View>
      )}
      <View style={styles.bottomBuffer} />
    </View>
  )
}

MessageItem.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string
  }),
  index: PropTypes.number,
  userName: PropTypes.string,
  botName: PropTypes.string,
  loading: PropTypes.bool,
  saveImageToGallery: PropTypes.func
}

export default React.memo(MessageItem)
