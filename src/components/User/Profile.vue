<template>
    <v-container fill-height>
        <v-layout row wrap class="info" grid-list-md>       
                <v-flex  md2-and-up  class="mx-4">
                    <v-layout row>
                        <v-avatar size="200px" >
                            <v-img
                                :src="user.photoURL"
                                height="200px"
                                contain
                                class="mt-5"
                            ></v-img>
                        </v-avatar>
                    </v-layout>
                    <v-layout row >
                        <v-flex mt-4 ml-1>
                            <v-icon class="yellow--text" large>star</v-icon>
                            <v-icon class="yellow--text" large>star</v-icon>
                            <v-icon class="yellow--text" large>star</v-icon>
                            <v-icon class="yellow--text" large>star_half</v-icon>
                            <v-icon class="yellow--text" large>star_border</v-icon>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex shrink>
                            <v-list class="info white--text" >
                                <div class="headline px-2 accent">Senaste evenemang</div>
                                
                                <v-list-tile class="primary" v-for="(meetup, index) in meetups" :key="index">
                                    {{ meetup }}
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                        
                    </v-layout>
                    
                </v-flex>
                <v-flex  md10-and-up>
                    <v-card flat class="mx-4 my-4 info" max-width="400px">
                        <v-card-text class="white--text" >
                        <div>
                        <div class="headline mb-4">{{ user.name}}</div>
                        <div class="mb-4">Epost: {{ user.email}}</div>
                        <div class="">{{ description }}</div>
                        <div class="mt-4 headline">Mina intressen: </div>
                        <v-list class="info white--text" dense>
                            <v-list-tile v-for="(intrest, index) in intrests" :key="index">
                                {{ intrest }}
                            </v-list-tile>
               
                        </v-list>
                        </div>
                    </v-card-text>
                    </v-card>
                </v-flex>
        </v-layout>

    </v-container>
</template>
<script>
export default {
  data() {
    return {
      description: "",
      intrests: [],
      meetups: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {},
  created() {
    this.description =
      "Fotbollspelare som precis avslutat karriären som proffs, söker i liknande situationer Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus officiis nemo at inventore quia, voluptatibus eaque dolor optio commodi reiciendis totam praesentium dolore reprehenderit cumque rem es";
    this.intrests.push("Fotboll", "Klättring", "Löpning");
    this.meetups.push(
      "Löpning i parken",
      "Klättring på rimnershallen",
      "Tennis i Trollhättan"
    );
  }
};
</script>
