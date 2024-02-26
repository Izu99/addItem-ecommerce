// FirebaseConfig.js
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDp_3snUH6scy4e0bzJHrgEhPFp_djL47M",
	authDomain: "parabiz-store.firebaseapp.com",
	projectId: "parabiz-store",
	storageBucket: "parabiz-store.appspot.com",
	messagingSenderId: "451395026600",
	appId: "1:451395026600:web:3171da0218b2a52a1f4c9d",
	measurementId: "G-3RH1QR0ZXL",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
