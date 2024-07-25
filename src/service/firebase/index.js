// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// // import { getAnalytics } from 'firebase/analytics';
// import { getStorage } from 'firebase/storage';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyBZZiQX-UAUwPEDAqr5RPjJqRnuHtOeq8Q',
//   authDomain: 'poly-java-6-5ef9e.firebaseapp.com',
//   databaseURL: 'https://poly-java-6-5ef9e-default-rtdb.firebaseio.com',
//   projectId: 'paintingnft-a896e',
//   storageBucket: 'poly-java-6-5ef9e.appspot.com',
//   messagingSenderId: '1010394302350',
//   appId: '1:1010394302350:web:f512c86d758f09225246df',
//   measurementId: 'G-B7W2C43XF9',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// export const storage = getStorage(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZZiQX-UAUwPEDAqr5RPjJqRnuHtOeq8Q",
  authDomain: "paintingnft-a896e.firebaseapp.com",
  projectId: "paintingnft-a896e",
  storageBucket: "paintingnft-a896e.appspot.com",
  messagingSenderId: "826038508322",
  appId: "1:826038508322:web:fb16db2996c9070391237b",
  measurementId: "G-QTXNNZPZEX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
