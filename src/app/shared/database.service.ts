import { Injectable } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, onValue, ref } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDlx9ZRdO9AY48vl1-jUnLNzmrk8DieXhw',
  authDomain: 'biblioteki-12cff.firebaseapp.com',
  projectId: 'biblioteki-12cff',
  storageBucket: 'biblioteki-12cff.appspot.com',
  messagingSenderId: '747520075724',
  appId: '1:747520075724:web:57f59b38cd4b3206769f69',
  measurementId: 'G-3Q8HJ640VM',
  databaseURL:
    'https://biblioteki-12cff-default-rtdb.europe-west1.firebasedatabase.app/',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const database = getDatabase(app);

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {

  // ngOnInit() {
  //   onValue(ref(this.database), (snapshot) => console.log(snapshot.val()));
  // }
}
