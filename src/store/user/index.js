import * as firebase from "firebase";
import {
  resolve
} from "path";

export default {
  state: {
    user: null,
    loadedUsers: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoadedUsers(state, payload) {
      const users = state.loadedUsers;
      var found = false;
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === payload.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        users.push(payload);
      }
    }
  },
  actions: {
    loadUser({
      commit,
      getters
    }, payload) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("/users/" + payload)
        .once("value")
        .then(data => {
          const updatedUser = {
            id: data.child("id").val(),
            name: data.child("name").val(),
            email: data.child("email").val(),
            photoURL: data.child("photoURL").val(),
            description: data.child("description").val()
          };
          //console.log("test" + JSON.stringify(updatedUser));
          commit("setLoading", false);
          commit("setLoadedUsers", updatedUser);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    signUserUp({
      commit
    }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          commit("setLoading", false);
          const newUser = {
            id: data.user.uid,
            name: payload.name,
            description: payload.description,
            email: payload.email
          };

          // Save to users table
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
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error.message);
          console.log(error);
        });
    },
    signUserIn({
      commit
    }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error.message);
          console.log(error);
        });
    },
    autoSignIn({
      commit
    }, payload) {
      commit("setLoading", true);
      commit("setUser", {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoURL: payload.photoURL,
        description: payload.description
      });
      commit("setLoading", false);
    },
    fetchUserData({
      commit,
      getters
    }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("/users/" + getters.user.id)
        .once("value")
        .then(data => {
          const updatedUser = {
            id: data.child("id").val(),
            name: data.child("name").val(),
            email: data.child("email").val(),
            photoURL: data.child("photoURL").val(),
            description: data.child("description").val()
          };
          commit("setLoading", false);
          commit("setUser", updatedUser);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    logout({
      commit
    }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    signInWithFacebook({
      commit
    }) {
      commit("setLoading", true);
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(data => {
          const newUser = {
            id: data.user.uid,
            name: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL,
            description: data.user.description
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
    },
    userById(state) {
      return id => {

        var user = state.loadedUsers.find(u => u.id === id);
        if (user == undefined) {

          user = state.user
        }

        return user;
      };
    }
  }
};
