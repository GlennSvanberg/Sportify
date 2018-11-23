<template>
 

    
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm12 md2>
                <v-card class="accent fixed" justify-content>
                    <v-card-title>
                        <h1 class="white--text">Filter</h1>
                    </v-card-title>
                    <v-card-text>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quaerat architecto iure distinctio. Est illum blanditiis alias ipsa non itaque eveniet, sint sed modi consectetur praesentium molestias minus quo dolor ipsam animi ipsum a voluptas, recusandae distinctio nobis odio in corrupti? Laudantium, cupiditate quibusdam odit architecto quos hic nihil quae!</p>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 md10>
                <v-layout row wrap > 
            <v-flex xs12 sm6 md6 lg4 xl3 v-for="meetup in meetups" :key="meetup.id" class="mb-2">
                <v-card class="info" raised>
                    <v-img
                                :src="meetup.imageUrl"
                                aspect-ratio="2.75"
                                ></v-img>
                                <v-card-title primary-title>
                                    <div>
                                        <h3 mb0 class="white--text">{{meetup.title}}</h3>
                                        <div class="secondary--text">{{meetup.date | date}}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn class="accent" :to="'/meetups/' + meetup.id">
                                        <v-icon left light>arrow_forward</v-icon>
                                        Visa Evenemang
                                    </v-btn>
                                </v-card-actions>
                    <v-container fluid grid-list-md>
                        <v-layout row>
                            <v-flex xs12>
                                
                                
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

<style scoped>
.fixed {
  flex: 0 0 150px;
}
</style>

