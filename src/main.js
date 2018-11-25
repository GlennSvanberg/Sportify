import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "./assets/shared.css";
import { store } from "./store";
import DateFilter from "./filters/date";
import * as firebase from "firebase";
import AlertCmp from "./components/Shared/Alert.vue";
import EditMeetupDetailsDialog from "./components/Meetup/Edit/EditMeetupDetailsDialog.vue";
import EditMeetupDateDialog from "./components/Meetup/Edit/EditMeetupDateDialog.vue";
import EditMeetupTimeDialog from "./components/Meetup/Edit/EditMeetuptimeDialog.vue";
import RegisterDialog from "./components/Meetup/Registration/RegisterDialog.vue";

Vue.use(Vuetify, {
  theme: {
    primary: "#3A689C",
    accent: "#16963F",
    secondary: "#A3B3BD",
    info: "#3987db",
    warning: "#FFA000",
    error: "#D50000",
    success: "#66BB6A"
  }
});
Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertCmp);
Vue.component("app-edit-meetup-details-dialog", EditMeetupDetailsDialog);
Vue.component("app-edit-meetup-date-dialog", EditMeetupDateDialog);
Vue.component("app-edit-meetup-time-dialog", EditMeetupTimeDialog);
Vue.component("app-meetup-register-dialog", RegisterDialog);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBVPbj-lQktf_E78SMjqJxqoYJsFOAtanI",
      authDomain: "event-4adf8.firebaseapp.com",
      databaseURL: "https://event-4adf8.firebaseio.com",
      projectId: "event-4adf8",
      storageBucket: "event-4adf8.appspot.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
        this.$store.dispatch("fetchUserData");
        this.$store.dispatch("usersRegeisteredMeetups");
        this.$store.dispatch("usersCreatedMeetups");
      }
    });
    this.$store.dispatch("loadMeetups");
  }
});
