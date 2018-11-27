import * as firebase from "firebase";

export default {
  state: {
    loadedMeetups: [],
    usersCreatedMeetups: [],
    usersRegisteredMeetups: [],
    categories: ["Fotboll", "Tennis", "Bandy", "Golf"]
  },
  mutations: {
    setUsersCreatedMeetups(state, payload) {
      state.usersCreatedMeetups = payload;
    },
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    setUsersRegisteredMeetups(state, payload) {
      state.usersRegisteredMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    registerForMeetup(state, payload) {
      state.usersRegisteredMeetups.push(payload);
    },
    unRegisterFromMeetup(state, payload) {
      const meetups = state.usersRegisteredMeetups;
      meetups.splice(meetups.findIndex(i => i.id === payload), 1);
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    }
  },
  actions: {
    registerForMeetup({ commit, getters }, payload) {
      // Add the user ID to list of registered users in meetup node

      commit("setLoading", true);
      const userId = getters.user.id;
      firebase
        .database()
        .ref("/meetups/" + payload)
        .child("/registeredUsers/" + userId)
        .set({ id: "haha" })
        .then(data => {
          commit("registerForMeetup", payload);
          commit("setLoading", false);
        });
    },
    unRegisterFromMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const userId = getters.user.id;
      firebase
        .database()
        .ref("/meetups/" + payload + "/registeredUsers/" + userId)
        .remove();
      commit("unRegisterFromMeetup", payload);
      commit("setLoading", false);
    },
    usersRegisteredMeetups({ commit, getters }) {
      commit("setLoading", true);
      let userId = getters.user.id;
      let meetups = [];
      firebase
        .database()
        .ref("meetups")
        .once("value", data => {
          data.forEach(value => {
            if (value.val().registeredUsers != undefined) {
              var users = value.val().registeredUsers;
              for (var user in users) {
                if (user === userId) {
                  var obj = value.val();
                  meetups.push({
                    id: value.key,
                    title: obj.title,
                    description: obj.description,
                    imageUrl: obj.imageUrl,
                    date: obj.date,
                    location: obj.location,
                    creatorId: obj.creatorId,
                    registeredUsers: obj.registeredUsers,
                    category: obj.category
                  });
                }
              }
            }
          });
          commit("setUsersRegisteredMeetups", meetups);
          commit("setLoading", false);
        });
    },
    usersCreatedMeetups({ commit, getters }) {
      commit("setLoading", true);
      let meetups = [];
      let userId = getters.user.id;
      firebase
        .database()
        .ref("meetups")
        .orderByChild("creatorId")
        .equalTo(userId)
        .once("value", data => {
          data.forEach(value => {
            let obj = value.val();
            meetups.push({
              id: value.key,
              title: obj.title,
              description: obj.description,
              imageUrl: obj.imageUrl,
              date: obj.date,
              location: obj.location,
              creatorId: obj.creatorId,
              category: obj.category,
              registeredUsers: obj.registeredUsers
            });
          });
          commit("setUsersCreatedMeetups", meetups);
          commit("setLoading", false);
        });
    },
    loadMeetups({ commit, dispatch, getters }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then(data => {
          const meetups = [];
          const obj = data.val();
          const users = [];
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId,
              category: obj[key].category,
              registeredUsers: obj[key].registeredUsers
            });
            dispatch("loadUser", obj[key].creatorId);
          }
          commit("setLoadedMeetups", meetups);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", true);
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
        category: payload.category
      };
      let imageUrl;
      let key;
      firebase
        .database()
        .ref("meetups")
        .push(meetup)
        .then(data => {
          key = data.key;

          return key;
        })
        .then(key => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf("."));
          return firebase
            .storage()
            .ref("meetups/" + key + "." + ext)
            .put(payload.image);
        })
        .then(fileData => {
          let imagePath = fileData.metadata.fullPath;
          return firebase
            .storage()
            .ref()
            .child(imagePath)
            .getDownloadURL()
            .then(url => {
              imageUrl = url;
              return firebase
                .database()
                .ref("meetups")
                .child(key)
                .update({ imageUrl: imageUrl });
            });
        })
        .then(() => {
          commit("createMeetup", {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          });
        })
        .catch(error => {
          console.log(error);
        });
      //Reach out to firebase and store it
    },
    updateMeetupData({ commit }, payload) {
      commit("setLoading", true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      if (payload.category) {
        updateObj.category = payload.category;
      }

      firebase
        .database()
        .ref("meetups")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit("setLoading", false);
          commit("updateMeetup", payload);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id == meetupId;
        });
      };
    },
    usersCreatedMeetups(state) {
      return state.usersCreatedMeetups;
    },
    usersRegisteredMeetups(state) {
      return state.usersRegisteredMeetups;
    },

    getCategoires(state) {
      return state.categories;
    }
  }
};
