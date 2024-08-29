<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="accent" v-bind="attrs" v-on="on">
        Edit Time
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Edit Meetup Time</v-card-title>
      <v-divider></v-divider>
      <v-time-picker 
      v-model="editableTime" 
      format="24hr"
      style="display: flex;
      margin-top: 5px;"
      >
      </v-time-picker>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn text class="gray--text" darken-1 @click="editDialog = false">Close</v-btn>
          <v-btn text class="green lighten-1" darken-1 @click="onSaveChanges">Save</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  
  data() {
    return {
      editDialog: false,
      editableTime: this.meetup.date ? new Date(this.meetup.date).toISOString().substr(11, 5) : '00:00'
    }
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const [hours, minutes] = this.editableTime.split(':');
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate.toISOString()
      });
      this.editDialog = false; // Fechar o diálogo após salvar
    }
  },
  created() {
    this.editableTime = this.meetup.date ? new Date(this.meetup.date).toTimeString().substr(0, 5) : '00:00';
  }
}
</script>
