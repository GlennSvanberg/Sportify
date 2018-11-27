<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12 class="info px-5 py-4">
        <v-layout row wrap>
          <v-flex md4 class>
            <h1 class="white--text">{{meetup.category}} - {{meetup.title}}</h1>
            <h3 class="white--text mb-3">{{meetup.date | date}} - {{meetup.location}}</h3>

            <div>
              <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-date-dialog>
              <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-time-dialog>
            </div>
            <div class="white--text mb-4">Beskrivning: {{meetup.description}}</div>
            <v-layout row>
              <router-link tag="v-flex" :to="/profile/ + creator.id" :style="{ cursor: 'pointer'}">
                <div class="white--text inline">Arrangeras av:</div>
                <v-avatar class="ml-5 mb-4">
                  <v-img :src="creator.photoURL"></v-img>
                  <v-flex>
                    <div class="white--text">{{creator.name}}</div>
                  </v-flex>
                </v-avatar>
              </router-link>
              <v-spacer></v-spacer>
              <app-meetup-register-dialog
                v-if="userIsAuthenticated && !userIsCreator"
                :meetupId="meetup.id"
              ></app-meetup-register-dialog>
            </v-layout>

            <v-flex shrink>
              <v-toolbar color="accent" dark>
                <v-toolbar-title>Anmälda Deltagare - Antal: {{users.length }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list subheader class="primary white--text mb-4" dark>
                <v-list-tile
                  v-for="(user, index) in users"
                  :key="user+index"
                  avatar
                  :to="/profile/ + index"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>{{user.name}}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <v-icon color="grey lighten-1">info</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-flex>
          <v-flex md8>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog
                :meetup="meetup"
                style="float:right"
                class="mr-5 my-3"
              ></app-edit-meetup-details-dialog>
            </template>
            <v-img :src="meetup.imageUrl" height="500px" contain></v-img>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {};
  },
  computed: {
    users() {
      var users = [];
      console.log("users" + users);
      for (var userId in this.meetup.registeredUsers) {
        console.log("usersUpdated" + userId);
        var user = this.$store.getters.userById(userId);
        users.push(user);
      }
      return users;
    },
    creator() {
      return this.$store.getters.userById(this.meetup.creatorId);
    },
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    loading() {
      return this.$store.getters.loading;
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    }
  }
};
</script>
