<template>
    <v-container >
      <!-- Layout to display meetups -->
      <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
        
        <!-- Flex container for each meetup card -->
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2 mt-5>
          <v-card class="info">
            <v-container fluid>
              <v-layout row pa-5>
                
                <!-- Meetup image -->
                <v-flex xs5 sm4 md4>
                  <v-img height="130px" :src="meetup.imageUrl"></v-img>
                </v-flex>
  
                <!-- Meetup title and date -->
                <v-flex xs7 sm8 md9>
                  <v-card-title primary-title>
                    <div>
                      <h5 class="white--text mb-0">{{ meetup.title }}</h5>
                      <div>{{ meetup.date | date }}</div>
                    </div> 
                  </v-card-title>
  
                  <!-- Card actions -->
                  <v-card-actions>
                    <v-btn :to="'/meetup/' + meetup.id">
                      <v-icon left>mdi-arrow-right</v-icon>
                      View Meetup
                    </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex> 
        
      </v-layout>
     
      <!-- Loading indicator -->
      <v-flex xs12 class="text-center" v-if="loading" mt-15 align="center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
        ></v-progress-circular>
      </v-flex>
    </v-container> 
  </template>
  
  <script>
  export default {
    computed: {
      // Gets the loaded meetups from the Vuex store
      meetups() {
        return this.$store.getters.loadedMeetups;
      },
      
      // Checks if data is loading
      loading() {
        return this.$store.getters.loading;
      }
    }
  }
  </script>
  