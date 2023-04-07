import firebase from 'firebase';

import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCDNfyllgmtakzf33_uoqEKSlL-zOvU5gE",
    authDomain: "flabbychat.firebaseapp.com",
    databaseURL: "https://flabbychat-default-rtdb.firebaseio.com/",
    projectId: "flabbychat",
    storageBucket: "flabbychat.appspot.com",
    messagingSenderId: "1054510316169",
    appId: "1:1054510316169:web:bc2a6eca74612aae8da458",
    measurementId: "G-8BRE2CGVPE"
};

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;