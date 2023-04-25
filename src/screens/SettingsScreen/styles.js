import { StyleSheet } from 'react-native'

export const settingsStyles = StyleSheet.create({
  container: {
    backgroundColor: '#E3C7F1',
    flex: 1,
    padding: 16
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
  hyperlink: {
    fontSize: 10,
    color: 'blue',
    textDecorationLine: 'underline',
    width: '100%'
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
  separator: {
    alignSelf: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '95%'
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
