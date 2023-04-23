import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    width: '100%',
  },
  bot: {
    alignSelf: 'flex-end',
    fontSize: 16,
    marginBottom: 10,
    width: '90%',
  },
  bottomBuffer: {
    height: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F1E0FF',
    borderRadius: 10,
    justifyContent: 'center',
    height: 60,
    width: '18%',
  },
  buttonText: {
    color: 'purple',
    fontSize: 25,
    fontWeight: 'bold',
  },  
  container: {
    alignItems: 'center',
    backgroundColor: '#F1E0FF',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  inputContainer: {
    backgroundColor: '#FFC0CB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: 'black',
    borderRadius: 10,    
    borderWidth: 1,
    height: 60,
    marginBottom: 10,
    padding: 10,
    width: '80%',
  },
  messageContainer: {
    marginBottom: 10,
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '90%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 70,
  }
});