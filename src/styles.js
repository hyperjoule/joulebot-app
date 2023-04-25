import { StyleSheet } from 'react-native'

export const settingsStyles = StyleSheet.create({
  container: {
    backgroundColor: '#E3C7F1',
    flex: 1,
    padding: 16
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginLeft: 10,
    marginRight: 10
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'justify'
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  personalityContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  picker: {
    height: 50,
    width: '80%'
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#D23BC0',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 150,
    padding: 10,
    width: '100%'
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  switchContainer: {
    alignItems: 'flex-end',
    flex: 1
  },
  userNameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 20
  },
  ttsToggleContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})

export const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    width: '100%'
  },
  bot: {
    alignSelf: 'flex-end',
    fontSize: 20,
    marginBottom: 5,
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
  centerAlign: {
    alignItems: 'center',
    padding: 10
  },
  centerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
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
  headerImage: {
    height: '30%'
  },
  hyperlink: {
    fontSize: 10,
    color: 'blue',
    textDecorationLine: 'underline',
    width: '100%'
  },
  image: {
    height: 200,
    width: 200
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
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  radioButtonLabel: {
    fontSize: 16,
    marginLeft: 5
  },
  row: {
    flexDirection: 'row',
    padding: 10
  },
  separator: {
    alignSelf: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '90%'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 70
  },
  user: {
    alignSelf: 'flex-end',
    fontSize: 20,
    marginBottom: 5,
    width: '90%'
  }
})
