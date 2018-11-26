<template>
  <v-container>
    <v-layout>
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
    <v-layout row wrap v-if="!loading">
      <v-flex xs-12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            @click="onLoadMeetup(meetup.id)"
          >
            <div class="title">{{meetup.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large to="/meetups" class="accent">Visa Evenemang</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large to="/meetups/new" class="accent">Skapa Evenemang</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetups/" + id);
    }
  }
};
</script>
<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 30px;
}
</style>