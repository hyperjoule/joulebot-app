import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import { styles } from '../styles'

const MessageItem = ({ item, index, userName, botName, loading, saveImageToGallery }) => {
  return (
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
