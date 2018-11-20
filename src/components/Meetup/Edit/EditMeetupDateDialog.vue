<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <!--Button shows outside modal slot to Activator -->
        <v-btn class="" slot="activator">Ändra Datum</v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title class="display-1 primary--text">Ändra datum</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout>
                    <v-flex xs12>
                        <v-date-picker v-model="editableDate" style="width: 100%" actions>
                            <template slot-scope='{save, cancel}'>
                                <v-btn 
                                class="error" 
                                @click="editDialog = false">Ångra</v-btn>
                                <v-btn 
                                class="accent" 
                                @click="onSaveChanges">Spara</v-btn>
                            </template>
                        </v-date-picker>
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
      editableDate: null
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editableDate).getUTCDate();
      const newMonth = new Date(this.editableDate).getUTCMonth();
      const newYear = new Date(this.editableDate).getUTCFullYear();
      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);

      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate
      });
      this.editDialog = false;
    }
  },
  created() {
    const pickerDate = new Date(this.meetup.date);
    this.editableDate =
      pickerDate.getUTCFullYear() +
      "-" +
      (pickerDate.getUTCMonth() + 1) +
      "-" +
      pickerDate.getUTCDate();
  }
};
</script>