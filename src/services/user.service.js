import firebase from '../firebase.js';

export const userService = {
    signIn,
    signOut,
    register,
    postMessage,
    onListen
};

function signIn(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(response){

      if ( !response ) {
        console.debug('Not a valid user!');
      }

    })
    .then(function(error) {
      console.debug(error)
    });
}

function signOut() {
  return firebase.auth().signOut().then(function() {
    localStorage.removeItem('firebase:authUser:YOUR-API-KEY:[DEFAULT]');
  }).then(function(error) {
    console.debug(error)
  });
}

function register(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(response){
      console.debug('Successfully created user!');
      // Add this user to a db
      // If already exsist, db will just replace data
      // firebase.database().ref('users/' + getUserId()).set({
      //   email: email,
      //   displayName: email,
      //   photoUrl: null
      // });
      firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          let name = email.substring(0, email.indexOf('@'));

          user.updateProfile({
            displayName: name,
            photoURL: 'https://robohash.org/' + name + '.png?set=set4&size=48x48'
          })
        }
      })
    })
    .then(function(error) {
      console.debug(error);
    });
}

function postMessage(message) {
  return firebase.database().ref('messages').push({
    message: message,
    timestamp: Date.now(),
    userId: getUserId(),
    displayName: getUserDisplayName(),
    photoURL: getUserPhotoUrl()
  });
}

function onListen(callback) {
  // return firebase.database().ref('messages').on('value', function(snapshot) {
  //   snapshot.val();
  // });

  firebase.database().ref('messages').on('value', function(snapshot) {
    //console.log(snapshotToArray(snapshot))
    callback(snapshotToArray(snapshot));
  });
}

// HELPER FUNCTIONS ======================
const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

const getUserId = () => {
  let firebaseObj = JSON.parse(localStorage.getItem('firebase:authUser:YOUR-API-KEY:[DEFAULT]'));
  return firebaseObj.uid;
};

const getUserDisplayName = () => {
  let firebaseObj = JSON.parse(localStorage.getItem('firebase:authUser:YOUR-API-KEY:[DEFAULT]'));
  return firebaseObj.displayName;
};

const getUserPhotoUrl = () => {
  let firebaseObj = JSON.parse(localStorage.getItem('firebase:authUser:YOUR-API-KEY:[DEFAULT]'));
  return firebaseObj.photoURL;
};

// Returns currentUser token
// firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
//   localStorage.setItem('token', idToken);
// }).catch(function(error) {
//   console.debug('Cant find a token!')
// });
