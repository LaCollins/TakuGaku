import firebase from 'firebase';
import 'firebase/auth';
import axios from 'axios';

axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');
  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  } return request;
}, (err) => Promise.reject(err));

const loginUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((cred) => {
    cred.user.getIdToken()
      .then((token) => sessionStorage.setItem('token', token));
  });
};

const logoutUser = () => firebase.auth().signOut();

export default { loginUser, logoutUser };
