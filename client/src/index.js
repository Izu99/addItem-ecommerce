import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

const firebaseConfig = {
  apiKey: "AIzaSyDp_3snUH6scy4e0bzJHrgEhPFp_djL47M",
  authDomain: "parabiz-store.firebaseapp.com",
  projectId: "parabiz-store",
  storageBucket: "parabiz-store.appspot.com",
  messagingSenderId: "451395026600",
  appId: "1:451395026600:web:3171da0218b2a52a1f4c9d",
  measurementId: "G-3RH1QR0ZXL"
};


firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
