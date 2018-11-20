<template>
    
<v-layout row>
           <v-flex xs12>
            <v-card color="purple" class="white--text">
              <v-layout row wrap>
                <v-flex sm5-and-up>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                    height="125px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex sm7-and-up>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{ firstName }} {{ lastName}}</div>
                      <div>Ålder: {{ age }}</div>
                      <div>Mina intressen</div>
                      <div>{{ description }}</div>
                    </div>
                  </v-card-title>
                </v-flex>
                
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                Rate this album
                <v-spacer></v-spacer>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
              </v-card-actions>
            </v-card>
          </v-flex>

        </v-layout>


<v-flex  md3-and-up  class="accent mx-4">
                    <p>trst</p>
                </v-flex>
                <v-flex  md9-and-up >
                    <v-card class="mx-4 by-4 secondary">
                        <p class="display-1">{{ firstName }} {{ lastName }}</p>
                        <p class="">Ålder: {{ age }} år</p>
                        <p class="">Beskrivning: {{ description }}</p>
                        <p class="">Ålder: {{ age }} år</p>
                        <ul>
                            <li v-for="(intrest, index) in intrests" :key="index">{{ intrest }}</li>
                        </ul>
                    </v-card>
                   
                </v-flex>
</template>