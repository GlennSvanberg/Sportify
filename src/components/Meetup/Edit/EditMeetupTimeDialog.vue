<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <!--Button shows outside modal slot to Activator -->
        <v-btn class="" slot="activator">Ändra tid</v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title class="display-1 primary--text">Ändra tid</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout>
                    <v-flex xs12>
                        <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
                            <template slot-scope='{save, cancel}'>
                                <v-btn 
                                class="error" 
                                @click="editDialog = false">Ångra</v-btn>
                                <v-btn 
                                class="accent"
                                @click="onSaveChanges">Spara</v-btn>
                            </template>
                        </v-time-picker>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editableTime: null
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const hours = this.editableTime.match(/^(\d+)/)[1];
      const minutes = this.editableTime.match(/:(\d+)/)[1];
      newDate.setHours(hours);
      newDate.setMinutes(minutes);

      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      });
      this.editDialog = false;
    }
  },
  created() {
    let date = new Date(this.meetup.date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    this.editableTime = hours + ":" + minutes;
  }
};
</script>