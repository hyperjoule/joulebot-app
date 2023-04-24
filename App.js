import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Joulebot from './src'
import SettingsScreen from './src/SettingsScreen'

const Stack = createStackNavigator()

const App = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Joulebot v1.1"
            component={Joulebot}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Settings')}
                >
                  <Ionicons name="settings" size={24} color="black" />
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView>
  )
}

export default App
