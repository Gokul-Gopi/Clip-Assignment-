import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCaImtVkJNG9QV-Yi9aF0cXBlqqlbk0Ih0",
    authDomain: "clip-assets.firebaseapp.com",
    projectId: "clip-assets",
    storageBucket: "clip-assets.appspot.com",
    messagingSenderId: "1041755601443",
    appId: "1:1041755601443:web:2a58b60cbc172eb7268f96",
    measurementId: "G-F22NV8L69Q"
};

initializeApp(firebaseConfig)
const storage = getStorage();

export { storage }