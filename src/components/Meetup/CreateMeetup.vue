<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h2 class="white--text">Skapa Evenemang</h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs-12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex xs12 md6 offset-sm3>
                            <v-text-field
                            dark
                            name="title"
                            label="Titel"
                            id="title"
                            v-model="title"
                            required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 md6 offset-sm3>
                            <v-text-field
                            dark
                            name="location"
                            label="Plats"
                            id="location"
                            v-model="location"
                            required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 md6 offset-sm3>
                            <v-btn raised class="accent" @click="onPickFile">Ladda upp bild</v-btn>
                            <input 
                            dark
                            type="file" 
                            style="display: none;" 
                            ref="fileInput" 
                            accept="image/*"
                            @change="onFilePicked">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 md6 offset-sm3>
                            <v-textarea
                            dark
                            name="description"
                            label="Beskrivning"
                            id="description"
                            v-model="description"
                            required></v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs-12 md6 offset-sm3>
                            <h4 class="display-1 white--text mb-3">Välj datum och tid</h4>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs-12 md6 offset-sm3 class="mb-2">
                            <v-date-picker 
                                :first-day-of-week="1"
                                v-model="date"
                                locale="sv-se"
                                landscape 
                                color="info"
                                full-width
                            ></v-date-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs-12 md6 offset-sm3>
                            <v-time-picker 
                            format="24hr" 
                            full-width 
                            landscape 
                            color="info" 
                            v-model="time "
                            ></v-time-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 md6 offset-sm3>
                            <v-btn 
                            class="accent" 
                            :disabled="!formIsValid"
                            type="submit">Skapa Evenemang</v-btn>
                        </v-flex>
                    </v-layout>
                       <v-layout row>
                        <v-flex xs12 md6 offset-sm3>
                            <img :src="imageUrl" height="150px">
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
      picker: new Date().toISOString().substr(0, 10)
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
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
        date: this.submittableDateTime
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
