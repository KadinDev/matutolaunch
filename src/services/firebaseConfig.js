import AsyncStorage from '@react-native-async-storage/async-storage';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBk5NAJD5cNeQ_sqMZ9meigiZ7K68P80ZI",
    authDomain: "matutolaunch.firebaseapp.com",
    projectId: "matutolaunch",
    storageBucket: "matutolaunch.appspot.com",
    messagingSenderId: "973685963864",
    appId: "1:973685963864:web:2e4cdecb543b570bb09e2d",
    measurementId: "G-QS5TTX8SND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const auth = getAuth(app);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const firestore = getFirestore(app);