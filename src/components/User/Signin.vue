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
                            <form @submit.prevent="onSignin"> 
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                        dark
                                        name="email"
                                        label="Mail"
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        required></v-text-field>
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
                                        required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                    <v-layout row>
                                         <v-flex xs12>
                                                     <v-btn class="accent" type="submit" :disabled="loading" :loading="loading">Logga in
                                                    <span slot="loader" class="custom-loader">
                                                    <v-icon light>cached</v-icon>
                                                </span>
                                            </v-btn>
                                            <v-btn class="primary" @click="facebookLogin"  :disabled="loading" :loading="loading">fortsätt med Facebook
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
      password: ""
    };
  },
  computed: {
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
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
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
  },
  onDismissed() {
    this.$store.dispatch("clearError");
  }
};
</script>