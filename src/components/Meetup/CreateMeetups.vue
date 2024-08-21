<template>
    <v-container>
        <v-row justify="center" class="mb-5">
            <v-col cols="12" sm="8" md="6">
                <h2 class="secondary--text text-center">Create a new Meetup</h2>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <form @submit.prevent="onCreateMeetup">
                    <v-text-field
                        name="title"
                        id="title"
                        label="Title"
                        v-model="title"
                        required
                        class="mb-4"
                    ></v-text-field>

                    <v-text-field
                        name="location"
                        id="location"
                        v-model="location"
                        label="Location"
                        required
                        class="mb-4"
                    ></v-text-field>

                    <v-text-field
                        name="imageUrl"
                        id="image-Url"
                        v-model="imageUrl"
                        label="Image URL"
                        required
                        class="mb-4"
                    ></v-text-field>

                    <v-img :src="imageUrl" height="150" class="mb-4" v-if="imageUrl"></v-img>

                    <v-text-field
                        name="description"
                        id="description"
                        v-model="description"
                        label="Description"
                        multi-line
                        required
                        class="mb-4"
                    ></v-text-field>

                    <v-row class="mb-5" align="center">
                        <v-col cols="12">
                            <h4 class="text-center">Choose a Date & Time</h4>
                        </v-col>
                    </v-row>

                    <v-row class="mb-5" justify="center">
                        <v-col cols="12" sm="8" md="6">
                            <v-date-picker v-model="date"></v-date-picker>
                        </v-col>
                    </v-row>

                    <v-row class="mb-10" justify="center">
                        <v-col cols="12" sm="8" md="6">
                            <v-time-picker ampm-in-title v-model="time" format="24hr"></v-time-picker>
                        </v-col>
                    </v-row>

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