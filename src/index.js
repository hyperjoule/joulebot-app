import React, { useState, useRef } from "react";
import {
  Linking,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { styles } from "./styles";
import { handleSend } from "./api";
import { API_KEY } from "./config";
import { generateImage } from "./api";

const ChatGPT = () => {
  // State variables
  const [speakerStatus, setSpeakerStatus] = useState(true);
  const [data, setData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  // Used to for scrolling/keep current answer at top
  const flatListRef = useRef(null);
  const apiKey = API_KEY;
  // Set these to your name and your bot name and bot picture
  const userName = "Hyperjoule";
  const botName = "Joulebot";
  const headerImage = "./joulebot.png";

  const toggleSpeaker = async () => {
    const newSpeakerStatus = !speakerStatus;
    setSpeakerStatus(newSpeakerStatus);
  };

  const _handleSend = async () => {
    try {
      setIsDisabled(true);
      setLoading(true); // Set loading to true before making the API call
      setData((prevData) => [{ type: "user", text: textInput }, ...prevData]); // Add user's text to data
  
      const isDrawRequest = textInput.toLowerCase().startsWith("draw a") || textInput.toLowerCase().startsWith("draw me a");
  
      if (isDrawRequest) {
        const imageUrl = await generateImage(textInput);
        if (imageUrl) {
          setData((prevData) => [{ type: "bot", text: "", image: imageUrl }, ...prevData]);
        } else {
          setData((prevData) => [{ type: "bot", text: "Error generating image." }, ...prevData]);
        }
      } else {
        const response = await handleSend(textInput, apiKey);
        setData((prevData) => [{ type: "bot", text: response }, ...prevData]); // Update data with Joulebot's response
  
        if (speakerStatus) {
          Speech.speak(response, { rate: 0.9 });
        } else {
          if (Speech.isSpeakingAsync()) {
            Speech.stop();
          }
        }
      }
      setTextInput("");
      setIsDisabled(false);
      setLoading(false); // Set loading to false after receiving the response
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.data);
      }
      setIsDisabled(false);
      setLoading(false); // Set loading to false in case of an error
    }
  };
      
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image
        source={require(headerImage)}
        style={{ height: "25%" }}
        resizeMode="contain"
        resizeMethod="scale"
      />
      <TouchableOpacity
        style={styles.speakerButton}
        onPress={() => {
          toggleSpeaker();
        }}
      >
        <Ionicons
          name={speakerStatus ? "volume-high" : "volume-mute"}
          size={24}
          color={speakerStatus ? "purple" : "gray"}
        />
      </TouchableOpacity>
      <View style={{ flex: 1, width: "100%" }}>
        <FlatList
          data={data}
          inverted={true}
          ref={flatListRef}
          keyExtractor={(item, index) => index.toString()}
          style={styles.body}
          renderItem={({ item, index }) => (
            <View style={styles.messageContainer}>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: item.type === "user" ? "#586095" : "#911381",
                  }}
                >
                  {item.type === "user" ? userName : botName}
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={{ flexDirection: "row", padding: 10, justifyContent: 'center' }}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />
                ) : (
                  <Text style={styles.bot}>{item.text}</Text>
                )}
              </View>
              {loading && item.type === "user" && index === 0 && (
                <View style={{ alignItems: 'center', padding: 10 }}>
                  <ActivityIndicator size="large" color="purple" />
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
          placeholder="Ask Joulebot a Question"
          editable={!isDisabled}
          autoFocus={true}
        />
        <TouchableOpacity
          style={[styles.button, isDisabled ? { opacity: 0.5 } : { opacity: 1 }]}
          onPress={() => {
            if (!isDisabled) {
              _handleSend();
            }
          }}
        >
          <Text style={styles.buttonText}>Ask!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.copyrightContainer}>
      <Text style={styles.copyrightText}>
        ©2023 hyperjoule. This work is licensed under a{" "}
        <Text
          style={styles.hyperlink}
          onPress={() => Linking.openURL("https://creativecommons.org/licenses/by/4.0/")}
        >
          CC BY 4.0
        </Text>{" "}
        license.
      </Text>
    </View>
    </KeyboardAvoidingView>
  );
};

export default ChatGPT;
