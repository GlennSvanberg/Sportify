<template>
  <v-container grid-list class>
    <v-layout row>
      <v-flex xs12 class="info px-4 py-4">
        <form @submit.prevent="onCreateMeetup">
          <v-layout row wrap>
            <v-flex xs12 lg6 class="px-3">
              <h2 class="white--text">Skapa Evenemang</h2>
              <v-layout row>
                <v-flex>
                  <v-text-field
                    dark
                    name="title"
                    label="Titel"
                    id="title"
                    v-model="title"
                    required
                    box
                    color="white"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex>
                  <v-text-field
                    dark
                    name="location"
                    label="Plats"
                    id="location"
                    v-model="location"
                    required
                    color="white"
                    box
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex>
                  <v-layout row wrap>
                    <v-flex xs4 d-flex>
                      <v-btn raised class="accent" @click="onPickFile">Ladda upp bild</v-btn>
                      <input
                        dark
                        type="file"
                        style="display: none;"
                        ref="fileInput"
                        accept="image/*"
                        @change="onFilePicked"
                      >
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs6 d-flex>
                      <v-select
                        :items="categories"
                        color="white"
                        label="Kategori"
                        dark
                        v-model="category"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                  <v-flex>
                    <img :src="imageUrl" width="250px">
                  </v-flex>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex>
                  <v-textarea
                    dark
                    name="description"
                    label="Beskrivning"
                    id="description"
                    v-model="description"
                    required
                    box
                    color="white"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 lg6 class="px-3">
              <v-layout row>
                <v-flex class="mb-2">
                  <v-date-picker
                    :first-day-of-week="1"
                    v-model="date"
                    locale="sv-se"
                    landscape
                    color="accent"
                    full-width
                    max-heigh="100px"
                  ></v-date-picker>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex>
                  <v-time-picker format="24hr" full-width landscape color="accent" v-model="time "></v-time-picker>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex>
                  <v-btn
                    style="float:right"
                    class="accent createButton"
                    :disabled="!formIsValid"
                    type="submit"
                    dark
                  >Skapa Evenemang</v-btn>
                </v-flex>
              </v-layout>
              <v-layout row></v-layout>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      date: new Date().toISOString().substr(0, 10),
      time: new Date(),
      image: null,
      picker: new Date().toISOString().substr(0, 10),
      category: ""
    };
  },
  computed: {
    categories() {
      return this.$store.getters.getCategoires;
    },
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== "" &&
        this.category !== ""
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    }
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime,
        category: this.category
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert('Please add a valid file"!');
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>
<style>
</style>
