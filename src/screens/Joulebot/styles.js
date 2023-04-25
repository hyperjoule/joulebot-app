import { StyleSheet, Platform } from 'react-native'

export const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    ...Platform.select({
      web: { overflow: 'auto' },
      default: {}
    }),
    width: '100%'
  },
  bot: {
    alignSelf: 'flex-end',
    fontSize: 20,
    width: '90%'
  },
  botNameStyle: {
    color: '#911381',
    fontWeight: 'bold'
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
  headerImage: {
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
    ...Platform.select({
      web: {
        width: '100%',
        height: '30%'
      },
      default: { height: '30%' }
    })
  },
  image: {
    ...Platform.select({
      web: {
        width: 512,
        height: 512
      },
      default: {
        width: 200,
        height: 200
      }
    })
  },
  inputContainer: {
    backgroundColor: '#911381',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 20,
    marginTop: 10,
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
    width: '95%'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 70
  },
  user: {
    alignSelf: 'flex-end',
    fontSize: 20,
    width: '90%'
  },
  userNameStyle: {
    color: '#586095',
    fontWeight: 'bold'
  }
})
