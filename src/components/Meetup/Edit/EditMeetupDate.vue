<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="accent" v-bind="attrs" v-on="on">
        Edit Date
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Edit Meetup Date</v-card-title>
      <v-divider></v-divider>
      <v-date-picker 
      v-model="editableDate" 
      style="display: flex;
      margin-top: 5px;"
      format="YYYY-MM-DD"
      >
      </v-date-picker>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn text class="gray--text" darken-1 @click="editDialog = false">Close</v-btn>
          <v-btn text class="green--text" darken-1 @click="onSaveChanges">Save</v-btn>
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
      editableDate: this.formatDate(new Date(this.meetup.date))
    }
  },
  methods: {
  formatDate(date) {
    // Formata a data no formato YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  adjustDate(dateString) {
      // Convert the string of data to the  object Date preserving original hour
      const [year, month, day] = dateString.split('-').map(Number);
  
      const originalDate = new Date(this.meetup.date); // GET the hour original
      
      return new Date(year, month - 1, day, originalDate.getHours(), originalDate.getMinutes(), originalDate.getSeconds());
    },
  onSaveChanges() {
    const newDate = this.adjustDate(this.editableDate);
    this.$store.dispatch('updateMeetupData', {
      id: this.meetup.id,
      date: newDate.toISOString()  // Converte a data para o formato ISO
    });
    this.editDialog = false; // Close the diálogo after save
  }
}

}
</script>
