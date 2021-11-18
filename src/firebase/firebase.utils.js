import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCi7OF6HEdfoOMLcdjjw0bvV5PzwBtPI5g",
    authDomain: "crwn-db-3b278.firebaseapp.com",
    projectId: "crwn-db-3b278",
    storageBucket: "crwn-db-3b278.appspot.com",
    messagingSenderId: "869589355870",
    appId: "1:869589355870:web:013aa2a0a76d16246293cf",
    measurementId: "G-D3WWRS2RXS"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if (!userAuth) return;
      
      const userRef = firestore.doc(`users/${userAuth.uid}`)

      const snapShot = await userRef.get()


      if(!snapShot.exists) {
          const { displayName, email} = userAuth;
          const createdAt = new Date();

          try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
          } catch (error) {
            console.log('error creating user', error.message);

          }
      }

      return userRef;

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;