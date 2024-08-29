<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <!-- Slot for dialog activator button -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab color="accent" v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Edit Meetup</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <!-- Input field for editing the title of the meetup -->
        <v-text-field
          name="title"
          id="title"
          label="Title"
          required
          v-model="editedTitle"
          class="mb-4 mt-6"
        ></v-text-field>

        <!-- Input field for editing the description of the meetup -->
        <v-text-field
          name="description"
          id="description"
          label="Description"
          textarea
          required
          v-model="editedDescription"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-space-between">
        <!-- Button to close the dialog without saving changes -->
        <v-btn text class="gray--text" darken-1 @click="editDialog = false">Close</v-btn>
        <!-- Button to save changes -->
        <v-btn text class="green--text" darken-1 @click="onSaveChanges">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    export default {
        props: ['meetup'], // Receive the meetup object as a prop
        data() {
            return {
                editDialog: false, // Controls the visibility of the dialog
                editedTitle: this.meetup.title, // Bind the title to the meetup title
                editedDescription: this.meetup.description // Bind the description to the meetup description
            }
        },
        methods: {
            // Method to save changes and update the meetup data
            onSaveChanges() {
                // Check if title or description is empty
                if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
                    return // Do nothing if fields are empty
                }
                this.editDialog = false // Close the dialog
                // Dispatch the updateMeetupData action to update the meetup information in the store
                this.$store.dispatch('updateMeetupData', {
                    id: this.meetup.id,
                    title: this.editedTitle,
                    description: this.editedDescription,
                })
            }
        }
    }
</script>
