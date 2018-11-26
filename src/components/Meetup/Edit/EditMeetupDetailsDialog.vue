<template>
  <v-dialog width="450px" persistent v-model="editDialog">
    <!--Button shows outside modal slot to Activator -->
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="display-1 primary--text">Ändra Evenemang</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex xs12>
            <v-card-text>
              <v-text-field name="title" label="Title" id="title" v-model="editedTitle" required></v-text-field>
              <v-flex xs6 d-flex>
                <v-select
                  :items="categories"
                  color="primary"
                  label="Kategori"
                  light
                  v-model="category"
                ></v-select>
              </v-flex>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="editedDescription"
                required
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="error" @click="editDialog = false">Ångra</v-btn>
              <v-btn class="accent" @click="onSaveChanges">Spara</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  computed: {
    categories() {
      return this.$store.getters.getCategoires;
    }
  },
  data() {
    return {
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      editDialog: false,
      category: this.meetup.category
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim() === ""
      ) {
        return;
      }
      this.editDialog = false;
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      });
    }
  }
};
</script>