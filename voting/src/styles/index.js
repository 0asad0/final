import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    tintColor: '#6854a4'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6854a4',
    marginBottom: 20
  },
  value: {
    fontSize: 20,
    textAlign: 'left',
    color: '#666',
    marginBottom: 20
  },
  label: {
    color: '#6854a4',
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#6854a4',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#666'
  },
  ScrollView: {
    padding: 25
  },
  flexContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#6854a4'
  },
  constituencyItem: {
    marginBottom: 20,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  constituencyImage: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10
  },
  userList: {
    borderWidth: 1,
    borderColor: '#6854a4',
    padding: 10,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkbox: {
    borderWidth: 2,
    width: 25,
    height: 25,
    borderColor: '#6854a4'
  },
  applicationCard: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8
  },
  user: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  constituency: {
    fontSize: 16
  },
  approvalStatus: {
    fontSize: 16,
    fontStyle: 'italic'
  },

  image: {
    width: 200,
    height: 200,
    marginTop: 10
  },
  constituencyItem: {
    marginBottom: 20,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },

  constituencyName: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    color: '#333'
  },

  dateTimeInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10
  },
  electionCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9'
  },

  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333'
  },
  loadingText: {
    fontSize: 16,
    color: '#666'
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center'
  },
  uploadButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6854a4',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '35%'
  },
  uploadText: {
    color: '#fff',
    fontSize: 16
  },
  actionBar: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingVertical: 20
  },
  optionButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  optionText: {
    fontSize: 16,
    color: '#007AFF'
  },
  cancelText: {
    color: '#FF3B30'
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#fff'
  },

  constituencyInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  constituencyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10
  },
  constituencyName: {
    fontSize: 16
  },
  candidateItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  userProfileItem: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10
  },

  signupButton: {
    marginTop: 10,
    color: 'blue'
  },
  signupText: {
    marginTop: 30,
    textAlign: 'center'
  }
})

export default styles
