<template>
  <v-dialog width="450px" persistent v-model="registerDialog">
    <!--Button shows outside modal slot to Activator -->
    <v-btn
      class="accent"
      accent
      slot="activator"
    >{{ userIsRegistered ? 'Avregistrera' : 'Registrera'}}</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Avregistrera från evenemang?</v-card-title>
            <v-card-title v-else>Registrera på evenemang</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-text>Du kan alltid ändra dig senare</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="red--text darken-1" flat @click="registerDialog = false">Avbryt</v-btn>
              <v-btn class="green--text darken-1" flat @click="onAgree">Bekräfta</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      registerDialog: false
    };
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.usersRegisteredMeetups.findIndex(meetup => {
          return meetup.id === this.meetupId;
        }) >= 0
      );
    }
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch("unRegisterFromMeetup", this.meetupId);
        this.$store.dispatch("loadMeetups");

        this.registerDialog = false;
      } else {
        this.$store.dispatch("registerForMeetup", this.meetupId);
        this.$store.dispatch("usersRegisteredMeetups");
        this.$store.dispatch("loadMeetups");
        this.registerDialog = false;
      }
    }
  }
};
</script>