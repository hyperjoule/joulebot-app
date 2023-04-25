import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Joulebot from './src/screens/Joulebot'
import SettingsScreen from './src/screens/SettingsScreen'

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
            name="Joulebot"
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
