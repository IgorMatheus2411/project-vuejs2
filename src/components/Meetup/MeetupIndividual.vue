<template>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 class="text-center" mt-15 align="center" v-if="loading">
          <v-progress-circular
            indeterminate
            class="primary--text"
            :width="7"
            :size="70"
          ></v-progress-circular>
        </v-flex>
        <v-flex xs12 class="mt-5" v-else>
          <v-card class="pa-1">
            <v-card-title>
              <h6 class="primary--text">{{ meetup.title }}</h6>
              <template v-if="userIsCreator">
                <v-spacer></v-spacer>
                <app-edit-meetup-details :meetup="meetup"></app-edit-meetup-details>
              </template>
            </v-card-title>
            <v-img height="400px" :src="meetup.imageUrl"></v-img>
            <v-card-text>
              <div class="primary--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
            
                <v-spacer></v-spacer>
                <app-edit-meetup-date v-if="userIsCreator" :meetup="meetup"></app-edit-meetup-date>
                <app-edit-meetup-time v-if="userIsCreator" :meetup="meetup"></app-edit-meetup-time>
              <div>{{ meetup.description }}</div>
            </v-card-text>
            <v-card-actions class="d-flex justify-end">
              <v-btn color="primary">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </template>
  
  <script>
  export default {
    props: ['id'],
    computed: {
      meetup() {
        return this.$store.getters.loadedMeetup(this.id);
      },
      userIsAuthenticated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
      },
      userIsCreator() {
        if (!this.userIsAuthenticated) {
          return false;
        }
        return this.$store.getters.user.id === this.meetup.creatorId;
      },
      loading() {
        return this.$store.getters.loading;
      }
    }
  };
  </script>
  