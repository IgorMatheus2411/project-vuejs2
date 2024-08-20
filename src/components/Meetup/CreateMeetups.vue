<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3 mt-5 mb-5>
                <h2 class="secondary--text">Create a new Meetup</h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeeetup">
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
                            <p> {{ date }}</p>
                        </v-flex>
                    </v-row> 
                    <v-row class="mb-10">
                        <v-flex xs12 sm6 offset-sm3 >
                            <v-time-picker v-model="time"></v-time-picker>
                            <p> {{ time }}</p>
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
                date: new Date(),
                time: new Date()
            }
        },
        computed: {
            formIsValid () {
                return this.title !== '' && 
                this.location !== '' && 
                this.imageUrl !== '' && 
                this.description !== '' 
            }
        },
        methods: {
            onCreateMeeetup() {
                 //validação de formulario
                if (!this.formIsValid) {
                    return 
                }
                //armazena todos os dados de  DATA()
                const meetupData = {
                    title: this.title,
                    location: this.location,
                    imageUrl: this.imageUrl,
                    description: this.description,
                    date: new Date
                }
                this.$store.dispatch('createMeetup', meetupData)
                this.$router.push('/meetup')
            }
        }
    }
</script>