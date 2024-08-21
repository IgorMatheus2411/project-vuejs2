<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3 mt-5 mb-5>
                <h2 class="secondary--text">Create a new Meetup</h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                                <v-text-field
                                    name="title"
                                    id="title"
                                    label="Title"
                                    v-model="title"
                                    required
                                ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                                <v-text-field
                                    name="location"
                                    id="location"
                                    v-model="location"
                                    label="Location"
                                    required
                                ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                                <v-text-field
                                    name="imageUrl"
                                    id="image-Url"
                                    v-model="imageUrl"
                                    label="Image URL"
                                    required
                                ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                               <img :src="imageUrl" height="150">
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                                <v-text-field
                                    name="description"
                                    id="description"
                                    v-model="description"
                                    label="Description"
                                    multi-line
                                    required
                                ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-row>
                        <v-flex xs12 sm6 offset-sm3>
                            <h4>Choose a Data & Time</h4>
                        </v-flex>
                    </v-row>
                    <v-row class="mb-5">
                        <v-flex xs12 sm6 offset-sm3 >
                            <v-date-picker v-model="date"></v-date-picker>
                        </v-flex>
                    </v-row> 
                    <v-row class="mb-10">
                        <v-flex xs12 sm6 offset-sm3 >
                            <v-time-picker ampm-in-title v-model="time" format="24hr"></v-time-picker>
                        </v-flex>
                    </v-row>


                    <v-layout row class="justify-end" >
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn 
                                class="primary" 
                                :disabled="!formIsValid"
                                type="submit"
                            >
                            Create Meetup</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                title: '',
                location: '',
                imageUrl: '',
                description: '',
                date: new Date().toISOString().substr(0, 10), // Converte para 'YYYY-MM-DD'
                time: new Date()
            }
        },
        computed: {
            formIsValid () {
                return this.title !== '' && 
                this.location !== '' && 
                this.imageUrl !== '' && 
                this.description !== '' 
            },
            submittableDateTime () {
                const date = new Date (this.date)
                if (typeof this.time === 'string') {
                    const hours = this.time.match(/^(\d+)/) [1]
                    const minutes = this.time.match(/:(\d+)/) [1]
                    date.setHours(hours)
                    date.setMinutes(minutes)
                } else {
                date.setHours(this.time.getHours())
                date.setMinutes(this.time.getMinutes())
                }
                return date
            }
        },
        // Methods você define funções dentro de um componente. 
        methods: {
            onCreateMeetup() {
            if (!this.formIsValid) {
                return;
            }

            const meetupData = {
                title: this.title,
                location: this.location,
                imageUrl: this.imageUrl,
                description: this.description,
                date: this.submittableDateTime
            };

            this.$store.dispatch('createMeetup', meetupData);
            this.$router.push('/meetup');
            }
        }
    }
</script>