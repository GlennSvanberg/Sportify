<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm8 offset-sm2>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2>
        <v-card class="info">
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignUp">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      dark
                      name="name"
                      label="Namn"
                      id="name"
                      v-model="name"
                      type="text"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      dark
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-textarea
                      dark
                      name="description"
                      label="Beskrivning"
                      id="description"
                      v-model="description"
                      type="text"
                      required
                    ></v-textarea>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12>
                    <v-text-field
                      dark
                      name="password"
                      label="Lösenord"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      dark
                      name="confirmPassword"
                      label="Bekräfta lösenord"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      required
                      :rules="[comparePasswords]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn class="accent" type="submit" :disabled="!formIsValid">
                      Registrera
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                    <v-btn
                      color="blue darken-3"
                      @click="facebookLogin"
                      :disabled="loading"
                      :loading="loading"
                    >
                      logga in med Facebook
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
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
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      description: ""
    };
  },
  computed: {
    formIsValid() {
      return (
        this.email !== "" &&
        this.password !== "" &&
        this.description !== "" &&
        this.name !== ""
      );
    },
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : true;
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignUp() {
      //Vuex
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password,
        name: this.name,
        description: this.description
      });
    },
    onDismissed() {
      console.log("dismissed Alert!");
      this.$store.dispatch("clearError");
    },
    facebookLogin() {
      this.$store
        .dispatch("signInWithFacebook")
        .then(() => {
          //location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>