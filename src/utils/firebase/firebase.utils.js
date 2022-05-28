import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBZpE4xkhm73EDrcErzLHn7EzgzwUTIgXQ',
  authDomain: 'crwn-clothing-db-2de6f.firebaseapp.com',
  projectId: 'crwn-clothing-db-2de6f',
  storageBucket: 'crwn-clothing-db-2de6f.appspot.com',
  messagingSenderId: '429764264882',
  appId: '1:429764264882:web:dc9c63f9a7522028d19aab',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;

  // if user data exits
  // create / set the document with the data from userAuth in my collection

  // if user data does not exist

  // return userDocRef
};
