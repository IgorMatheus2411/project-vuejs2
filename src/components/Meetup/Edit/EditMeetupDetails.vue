<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab color="accent" v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Edit Meetup</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          name="title"
          id="title"
          label="Title"
          required
          v-model="editedTitle"
          class="mb-4 mt-6" 
        ></v-text-field>

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
                editedTitle: this.meetup.title,
                editedDescription: this.meetup.description
            }
        },
        methods: {
            onSaveChanges() {
                if (this.editedTitle.trim() === ''|| this.editedDescription.trim() === ''){
                    return
                }
                this.editDialog = false
                this.$store.dispatch('updateMeetupData', {
                    id: this.meetup.id,
                    title: this.editedTitle,
                    description: this.editedDescription,
                })
            }
        }
    }
</script>