<template>
  <v-app>
    <!-- GARANTE QUE ELES SEJAM TRATADOS COMO ELEMENTOS PRINCIPAIS NA PÁGINA -->
      <v-app-bar app >
        <v-app-bar-nav-icon 
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up">
        </v-app-bar-nav-icon>

        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor:pointer">DevMeetup</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">
          <v-btn 
          text v-for="item in menuItems" 
          :key="item.title" 
          :to="item.link"
          >
            <v-icon left>{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>
          <v-btn 
          v-if="userIsAuthenticated"
          flat 
          @click="onLogout"
          >
            <v-icon left>mdi-exit-to-app</v-icon>
           Logout
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>

      <v-navigation-drawer app temporary v-model="sideNav">
        <v-list>
          <v-list-item-group 
            v-for="item in menuItems" 
            :key="item.title"
            >
              <v-list-item  
              :to="item.link"
              >
              <!-- ':' is to dynamic value -->
                <v-icon left>{{item.icon}}</v-icon>
                <v-list-item-content>{{ item.title }}</v-list-item-content>
              </v-list-item>
          </v-list-item-group>

          <v-list-item-group  
          v-if="userIsAuthenticated"
          >
              <v-list-item>
              <!-- ':' is to dynamic value -->
                <v-icon left >mdi-exit-to-app</v-icon>
                <v-list-item-content>Logout</v-list-item-content>
              </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

    <v-main>
      <router-view></router-view>

    </v-main>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      sideNav: false,
    }
  },
  computed:{
    menuItems () {
      let menuItems = [
          {icon: 'mdi-face-man', title: 'Sign up', link: '/signup'},
          {icon: 'mdi-lock-open', title: 'Sign in', link: '/signin'},
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
          {icon: 'mdi-account-supervisor', title: 'View Meetups', link: '/meetup'},
          {icon: 'mdi-map-marker', title: 'Organize Meetup', link: '/meetups/new'},
          {icon: 'mdi-account', title: 'Profile', link: '/profile'},
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

