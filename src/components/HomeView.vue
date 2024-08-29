<template>
    <v-container>
        <!-- Layout for navigation buttons -->
        <v-layout row wrap>
            <!-- Button to explore meetups, visible on small and extra small screens aligned to the right -->
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn large to="/meetup" class="info ma-2">Explore Meetups</v-btn>
            </v-flex>
            <!-- Button to organize new meetups, visible on small and extra small screens aligned to the left -->
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn large to="/meetups/new" class="primary ma-2">Organize Meetups</v-btn>
            </v-flex>
        </v-layout>

        <!-- Carousel for featured meetups -->
        <v-layout row wrap class="mt-5">
            <v-flex xs12>
                <v-carousel style="cursor: pointer;">
                    <!-- Carousel items for each meetup -->
                    <v-carousel-item
                        v-for="meetup in meetups"
                        :key="meetup.id"
                        :src="meetup.imageUrl"
                        @click="onLoadMeetup(meetup.id)"
                    >
                        <!-- Title overlay on carousel item -->
                        <div class="title">
                            {{ meetup.title }}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>

        <!-- Section for additional information or call to action -->
        <v-layout row wrap class="justify">
            <v-flex xs12>
                <p>Join our awesome meetups</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            // Get featured meetups from the Vuex store
            meetups() {
                return this.$store.getters.featuredMeetups
            },
            // Get loading state from the Vuex store
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            // Navigate to the detail page of the selected meetup
            onLoadMeetup(id) {
                this.$router.push('/meetup/' + id);
            }
        }
    }
</script>

<style scoped>
    /* Style for the title overlay in carousel items */
    .title {
        position: absolute;
        bottom: 50px; /* Position the title 50px from the bottom */
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
        color: white; /* White text color */
        font-size: 2em; /* Large font size */
        padding: 20px; /* Padding around the text */
    }
</style>
