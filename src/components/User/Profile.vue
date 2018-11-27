<template>
  <v-container fill-height>
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

    <v-layout row wrap class="info" grid-list-md>
      <v-flex md10-and-up class="px-5">
        <v-layout row>
          <v-flex xs4>
            <v-layout row>
              <v-avatar size="100px">
                <v-img
                  v-if="user.photoURL"
                  :src="user.photoURL"
                  height="100px"
                  contain
                  class="ml-4 mt-5"
                ></v-img>
              </v-avatar>
            </v-layout>
            <v-layout row>
              <v-flex mt-4 ml-1>
                <v-icon class="yellow--text">star</v-icon>
                <v-icon class="yellow--text">star</v-icon>
                <v-icon class="yellow--text">star</v-icon>
                <v-icon class="yellow--text">star_half</v-icon>
                <v-icon class="yellow--text">star_border</v-icon>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-list class="info white--text" dense>
                <div class="mt-4 headline">Intressen:</div>
                <v-list-tile v-for="(intrest, index) in intrests" :key="index">{{ intrest }}</v-list-tile>
              </v-list>
            </v-layout>
          </v-flex>
          <v-flex xs8>
            <v-card flat class="mx-4 my-4 info" max-width="400px">
              <v-card-text class="white--text">
                <div v-if="user">
                  <div class="headline mb-4">{{ user.name}}</div>
                  <div class="mb-4">Epost: {{ user.email}}</div>
                  <div class>{{ user.description }}</div>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex md2-and-up class="mx-4 my-5">
        <v-layout row>
          <v-flex shrink>
            <v-toolbar color="accent" dark>
              <v-toolbar-title>Skapade Evenemang</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-list two-line subheader class="primary white--text mb-4" dark>
              <v-list-tile
                v-for="(meetup) in createdMeetups"
                :key="meetup.title"
                avatar
                :to="/meetups/ + meetup.id"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{meetup.category}} - {{meetup.title}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ meetup.date | date}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">info</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

            <v-toolbar color="accent" dark>
              <v-toolbar-title>Registrerade Evenemang</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-list two-line subheader class="primary white--text" dark>
              <v-list-tile
                v-for="(meetup) in registeredMeetups"
                :key="meetup.title"
                avatar
                :to="/meetups/ + meetup.id"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{meetup.category}} - {{meetup.title}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ meetup.date | date}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon color="grey lighten-1">info</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
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
    return {
      description: "",
      intrests: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.userById(this.id);
    },
    createdMeetups() {
      return this.$store.getters.usersCreatedMeetups;
    },
    registeredMeetups() {
      return this.$store.getters.usersRegisteredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {},
  created() {
    this.$store.dispatch("usersCreatedMeetups");
    this.$store.dispatch("usersRegisteredMeetups");
    this.description =
      "Fotbollspelare som precis avslutat karriären som proffs, söker i liknande situationer Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus officiis nemo at inventore quia, voluptatibus eaque dolor optio commodi reiciendis totam praesentium dolore reprehenderit cumque rem es";
    this.intrests.push("Fotboll", "Klättring", "Löpning");
  }
};
</script>
