import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    width: '100%'
  },
  bot: {
    alignSelf: 'flex-end',
    fontSize: 16,
    marginBottom: 10,
    width: '90%'
  },
  bottomBuffer: {
    height: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#d23bc0',
    borderRadius: 10,
    justifyContent: 'center',
    height: 60,
    width: '18%'
  },
  buttonText: {
    color: '#60cbdd',
    fontSize: 25,
    fontWeight: 'bold'
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#e3c7f1',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  copyrightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  copyrightText: {
    fontSize: 10,
    textAlign: 'center'
  },
  hyperlink: {
    fontSize: 10,
    color: 'blue',
    textDecorationLine: 'underline'
  },
  inputContainer: {
    backgroundColor: '#911381',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%'
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    height: 60,
    marginBottom: 10,
    padding: 10,
    width: '80%'
  },
  messageContainer: {
    marginBottom: 10
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '90%'
  },
  speakerButton: {
    alignSelf: 'center',
    paddingBottom: 5
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 70
  }
})
