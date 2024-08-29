<template>
    <v-dialog width="350px" persistent v-model="registerDialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn  color="accent" v-bind="attrs" v-on="on">
          {{ userIsRegistered ? 'Unregister' : 'Register' }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
        <v-card-title v-else>Register for Meetup?</v-card-title>
        <v-divider></v-divider>
        <v-card-text>You can always change your decision later on.</v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn text class="red--text" darken-1 @click="registerDialog = false">Cancel</v-btn>
            <v-btn text class="green--text" darken-1 @click="onAgree">Confirm</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: ['meetupId'],
    data() {
        return {
            registerDialog: false
        }
    },
    computed: {
        userIsRegistered() {
            return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                return meetupId === this.meetupId
            }) >= 0
        }
    },
    methods: {
        onAgree() {
            if(this.userIsRegistered) {
                this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
            } else {
                this.$store.dispatch('registerUserForMeetup', this.meetupId)
            }
        }
    }
  }
  </script>
  