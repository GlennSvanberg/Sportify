import * as firebase from "firebase";
import { resolve } from "path";

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForMeetup(state, payload) {
      const id = payload.id;
      if (
        state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0
      ) {
        return;
      }
      state.user.registeredMeetups.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },
    unRegisterUserFromMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups;
      registeredMeetups.splice(
        registeredMeetups.findIndex(meetup => meetup.id === payload),
        1
      );
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },
    setUser(state, payload) {
      state.user = payload;
      console.log("name: " + payload.name);
    }
  },
  actions: {
    registerUserForMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      firebase
        .database()
        .ref("/users/" + user.id)
        .child("/registrations/")
        .push(payload)
        .then(data => {
          commit("setLoading", false);
          commit("registerUserForMeetup", { id: payload, fbKey: data.key });
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    unRegisterUserFromMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      if (!user.fbKeys) {
        console.log("HERE");
        return;
      }
      const fbKey = user.fbKeys[payload];
      firebase
        .database()
        .ref("/users/" + user.id + "/registrations/")
        .child(fbKey)
        .remove()
        .then(() => {
          commit("setLoading", false);
          commit("unRegisterUserFromMeetup", payload);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error.message);
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error.message);
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", {
        id: payload.uid,
        registeredMeetups: [],
        fbKeys: {},
        name: payload.displayName,
        email: payload.email,
        photoURL: payload.photoURL
      });
    },
    fetchUserData({ commit, getters }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("/users/" + getters.user.id + "/registrations/")
        .once("value")
        .then(data => {
          const dataPairs = data.val();
          let registeredMeetups = [];
          let swappedPairs = {};
          for (let key in dataPairs) {
            registeredMeetups.push(dataPairs[key]);
            swappedPairs[dataPairs[key]] = key;
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs,
            name: getters.user.name,
            email: getters.user.email,
            photoURL: getters.user.photoURL
          };
          commit("setLoading", false);
          commit("setUser", updatedUser);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
      //redirect
    },
    signInWithFacebook({ commit }) {
      commit("setLoading", true);
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(data => {
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {},
            name: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL
          };
          commit("setUser", newUser);

          commit("setLoading", false);
          console.log("user" + data.user.displayName);
        })
        .catch(error => {
          commit("setLoading", false);
          console.log(error);
        });
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  }
};
