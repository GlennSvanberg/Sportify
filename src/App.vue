<template>
  <v-app class="primary">
    <v-navigation-drawer class="accent" dark temporary fixed v-model="sideNav">
      <v-list>
        <v-list-tile 
        v-for="item in menuItems" 
        :key="item.title" 
        :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated"
        @click="onLogout">
          <v-list-tile-action>
             <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logga ut</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="accent">
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Sportify</router-link>
        </v-toolbar-title>
      <v-toolbar-side-icon 
      @click="sideNav = !sideNav" 
      class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
          </v-btn>
          <v-btn flat
          v-if="userIsAuthenticated"
          @click="onLogout">
            <v-icon left>exit_to_app</v-icon>
            Logga ut
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Registrera", link: "/signup" },
        { icon: "lock_open", title: "Logga in", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "supervisor_account",
            title: "Visa Evenemang",
            link: "/meetups"
          },
          { icon: "room", title: "Skapa Evenemang", link: "/meetups/new" },
          { icon: "person", title: "Min Profil", link: "/profile" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  name: "App"
};
</script>
