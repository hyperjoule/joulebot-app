import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1E0FF',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginTop: 70,
    },
    body: {
      flex: 1,
      backgroundColor: '#fff',
      width: '100%',
      padding: 10,
    },
    bot: {
      fontSize: 16,
      width: '90%',
      marginBottom: 10,
      alignSelf: 'flex-end',
    },
    inputContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#FFC0CB',
    },
    input: {
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: 'black',
      width: '80%',
      height: 60,
      padding: 10,
      marginBottom: 10,
      borderRadius: 10,
    },
    button: {
      backgroundColor: '#F1E0FF',
      width: '18%',
      height: 60,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'purple',
    },
    messageContainer: {
      marginBottom: 10,
    },
    separator: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      width: '90%',
    },
    bottomBuffer: {
      height: 10,
    },
});