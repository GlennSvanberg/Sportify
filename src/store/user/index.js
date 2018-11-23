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
        .ref("/users/" + getters.user.id)
        .once("value")
        .then(data => {
          let registeredMeetups = [];
          let swappedPairs = {};

          if (data.registrations) {
            const dataPairs = data.registrations.val();
            for (let key in dataPairs) {
              registeredMeetups.push(dataPairs[key]);
              swappedPairs[dataPairs[key]] = key;
            }
          }
          const updatedUser = {
            id: data.child("id").val(),
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs,
            name: data.child("name").val(),
            email: data.child("email").val(),
            photoURL: data.child("photoURL").val()
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
    },
    signInWithFacebook({ commit }) {
      commit("setLoading", true);
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(data => {
          const newUser = {
            id: data.user.uid,
            registeredMeetups: [],
            fbKeys: {},
            name: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL
          };
          commit("setUser", newUser);

          firebase
            .database()
            .ref("/users/" + newUser.id)
            .set(newUser)
            .then(() => {})
            .catch(error => {
              console.log(error);
              commit("setLoading", false);
            });

          commit("setLoading", false);
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
