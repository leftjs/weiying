/**
 * Created by jason on 2017/2/27.
 */
import firebase from 'firebase'
import Vue from 'vue'
const config = {
  apiKey: "AIzaSyBHngQA02M_I24i0-ZnkQwxUDSjKgaICIA",
  authDomain: "weiying-10278.firebaseapp.com",
  databaseURL: "https://weiying-10278.firebaseio.com",
  storageBucket: "weiying-10278.appspot.com",
  messagingSenderId: "509899453173"
};
let app
if (process.__FIREBASE__) {
  app = process.__FIREBASE__
}else {
  app = process.__FIREBASE__ = firebase.initializeApp(config)
}

app.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user)
    Vue.prototype.$nuxt.$store.commit('setUser', user)

  } else {
    // No user is signed in.
    Vue.prototype.$nuxt && Vue.prototype.$nuxt.$store.commit('setUser', null)
  }
});
Vue.prototype.$firebase = app
export default app
