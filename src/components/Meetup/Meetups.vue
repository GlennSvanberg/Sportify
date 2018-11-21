<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm12 md2>
                <v-card class="accent">
                    <v-card-title>
                        Hej
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs12 md10>
                <v-layout row wrap > 
            <v-flex xs12 sm12 md12 lg6 v-for="meetup in meetups" :key="meetup.id" class="mb-2">
                <v-card class="info" >
                    <v-container fluid grid-list-md>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-card-media
                                :src="meetup.imageUrl"
                                height="130px"
                                contain
                                ></v-card-media>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <h3 mb0 class="white--text">{{meetup.title}}</h3>
                                        <div class="secondary--text">{{meetup.date | date}}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn class="accent" :to="'/meetups/' + meetup.id">
                                        <v-icon left light>arrow_forward</v-icon>
                                        Visa Evenemang
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
            </v-flex>
        </v-layout>
        
    </v-container>
</template>
<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    }
  }
};
</script>
