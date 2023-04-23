import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
} from "react-native";

import { styles } from "./styles";
import { handleSend } from "./api";
import { API_KEY } from "./config";

const ChatGPT = () => {
  const [data, setData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  const flatListRef = useRef(null);
  const apiKey = API_KEY;
  // Set these to your name and your bot name
  const userName = "Hyperjoule";
  const botName = "Joulebot";

  const _handleSend = async () => {
    try {
      await handleSend(
        textInput,
        data,
        apiKey,
        setData,
        setTextInput,
        setLoading,
        setIsDisabled
      );
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.data);
      }
      setIsDisabled(false);
    }
  }; 

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image
        source={require("./joulebot.png")}
        style={{ height: "25%" }}
        resizeMode="contain"
        resizeMethod="scale"
      />
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
                    color: item.type === "user" ? "navy" : "purple",
                  }}
                >
                  {item.type === "user" ? userName : botName}
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={{ flexDirection: "row", padding: 10 }}>
                {item.type === "bot" && item.text === "loading" ? (
                  <ActivityIndicator size="small" color="purple" />
                ) : (
                  <Text style={styles.bot}>{item.text}</Text>
                )}
              </View>
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
    </KeyboardAvoidingView>
  );
};

export default ChatGPT;
