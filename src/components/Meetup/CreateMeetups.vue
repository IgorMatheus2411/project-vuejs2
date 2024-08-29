<template>
    <v-container>
        <!-- Container for the form -->
        <v-row justify="center" class="mb-5">
            <v-col cols="12" sm="8" md="6">
                <!-- Header for the form -->
                <h2 class="secondary--text text-center">Create a new Meetup</h2>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <!-- Form for creating a new meetup -->
                <form @submit.prevent="onCreateMeetup">
                    <!-- Input field for the meetup title -->
                    <v-text-field
                        name="title"
                        id="title"
                        label="Title"
                        v-model="title"
                        required
                        class="mb-4"
                    ></v-text-field>

                    <!-- Input field for the meetup location -->
                    <v-text-field
                        name="location"
                        id="location"
                        v-model="location"
                        label="Location"
                        required
                        class="mb-4"
                    ></v-text-field>

                    <!-- Button to trigger image file upload -->
                    <v-btn raised class="accent" @click="onPickFile">Upload Image</v-btn>
                    <input 
                        type="file" 
                        style="display: none" 
                        ref="fileInput" 
                        accept="image/*"
                        @change="onFilePicked"
                    >

                    <!-- Preview of the uploaded image -->
                    <v-img :src="imageUrl" height="150" class="mb-4 mt-4" v-if="imageUrl"></v-img>

                    <!-- Input field for the meetup description -->
                    <v-text-field
                        name="description"
                        id="description"
                        v-model="description"
                        label="Description"
                        textarea
                        required
                        class="mb-4"
                    ></v-text-field>

                    <!-- Section for choosing a date and time -->
                    <v-row class="mb-5" align="center">
                        <v-col cols="12">
                            <h4 class="text-center">Choose a Date & Time</h4>
                        </v-col>
                    </v-row>

                    <!-- Date picker component -->
                    <v-row class="mb-5" justify="center">
                        <v-col cols="12" sm="8" md="6">
                            <v-date-picker v-model="date"></v-date-picker>
                        </v-col>
                    </v-row>

                    <!-- Time picker component -->
                    <v-row class="mb-10" justify="center">
                        <v-col cols="12" sm="8" md="6">
                            <v-time-picker ampm-in-title v-model="time" format="24hr"></v-time-picker>
                        </v-col>
                    </v-row>

                    <!-- Submit button for the form -->
                    <v-row class="justify-end">
                        <v-col cols="12" sm="auto">
                            <v-btn 
                                class="primary" 
                                :disabled="!formIsValid"
                                type="submit"
                            >
                                Create Meetup
                            </v-btn>
                        </v-col>
                    </v-row>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            title: '',           // Stores the title of the meetup
            location: '',        // Stores the location of the meetup
            imageUrl: '',        // Stores the URL of the uploaded image
            description: '',     // Stores the description of the meetup
            date: new Date().toISOString().substr(0, 10), // Initializes date to today's date in 'YYYY-MM-DD' format
            time: new Date(),    // Initializes time to the current time
            image: null          // Stores the selected image file
        }
    },
    computed: {
        // Returns true if all required fields are filled, otherwise false
        formIsValid () {
            return this.title !== '' && 
                   this.location !== '' && 
                   this.imageUrl !== '' && 
                   this.description !== '' 
        },
        // Combines date and time into a single Date object
        submittableDateTime () {
            const date = new Date(this.date);
            if (typeof this.time === 'string') {
                // Extract hours and minutes from the time string
                const hours = this.time.match(/^(\d+)/)[1];
                const minutes = this.time.match(/:(\d+)/)[1];
                date.setHours(hours);
                date.setMinutes(minutes);
            } else {
                // Extract hours and minutes from the Date object
                date.setHours(this.time.getHours());
                date.setMinutes(this.time.getMinutes());
            }
            return date; // Returns the combined Date object
        }
    },
    methods: {
        // Handles form submission
        onCreateMeetup() {
            if (!this.formIsValid) {
                return; // Do not submit if the form is not valid
            }
            if (!this.image) {
                return; // Do not submit if no image is selected
            }
            const meetupData = {
                title: this.title,
                location: this.location,
                imageUrl: this.imageUrl,
                description: this.description,
                date: this.submittableDateTime, // Includes the combined date and time
                image: this.image
            };
            // Dispatches 'createMeetup' action to the Vuex store and navigates to the meetup page
            this.$store.dispatch('createMeetup', meetupData);
            this.$router.push('/meetup');
        },
        // Opens file input dialog
        onPickFile () {
            this.$refs.fileInput.click();
        },
        // Handles the file selected by the user
        onFilePicked (event) {
            const files = event.target.files;
            if (files.length === 0) {
                return alert('Please select a valid file!');
            }
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result; // Sets the image preview
            });
            fileReader.readAsDataURL(files[0]); // Reads the file as a Data URL
            this.image = files[0]; // Stores the selected file
        }
    }
}
</script>
