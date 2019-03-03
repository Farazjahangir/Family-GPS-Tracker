import * as firebase from 'firebase'
require('firebase/firestore')
var config = {
    apiKey: "AIzaSyAwr5GN69JtyEQ-6Do_3cKOduLAHdb0ZPY",
    authDomain: "family-gps-tracker-8600f.firebaseapp.com",
    databaseURL: "https://family-gps-tracker-8600f.firebaseio.com",
    projectId: "family-gps-tracker-8600f",
    storageBucket: "family-gps-tracker-8600f.appspot.com",
    messagingSenderId: "740846463027"
  };
  firebase.initializeApp(config);

const db = firebase.firestore()
const storageRef = firebase.storage().ref()

// Facebook login function
const loginWithFacebook = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '2280183305529239',
      { permissions: ['public_profile'] }
    );
  
    // If permission successful
    if (type === 'success') {
      const credential = await firebase.auth.FacebookAuthProvider.credential(token)
      const user = await firebase.auth().signInAndRetrieveDataWithCredential(credential)
        const userObj = {
          userName: user.user.displayName,
          userUid: user.user.uid,
          profilePicUrl: user.user.photoURL + '?type=large'
        }
        return userObj
    }
    else{
      throw 'Login error'
    }
  }

  const SavingUserData = async (userObj) =>{
    const uid = userObj.userUid
  
  // If Profile Pic Url Is Blob
    if(typeof userObj.profilePicUrl === 'object'){
      let name = `${Date.now()} - ${uid}`
      let message = userObj.profilePicUrl
      await storageRef.child(name).put(message)
      const url = await storageRef.child(name).getDownloadURL();
      userObj.profilePicUrl = url
    }
  
       db.collection('users').doc(uid).set({
          userName : userObj.userName,
          profilePicUrl : userObj.profilePicUrl,
          contactNum : userObj.contactNum,
          userUid : userObj.userUid,
          lat : userObj.lat,
          long : userObj.long
        })  
        return userObj
  }
  

  export {
    loginWithFacebook,
    SavingUserData
  }