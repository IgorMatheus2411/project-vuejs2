<template>
    <v-container>
        <v-layout c row wrap>
            <v-flex class="mt-5">
                <v-card class="pa-1">
                    <v-card-title>
                       <h6 class="primary--text">{{meetup.title}}</h6>
                    </v-card-title>
                    <v-img
                        height="400px"
                        :src="meetup.src"
                    ></v-img>
                    <v-card-text>
                        <div class="primary--text">{{ meetup.date}}</div>
                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente expedita recusandae neque repellendus nobis excepturi,
                             eligendi error ducimus. Dolore ratione quaerat inventore totam. Hic ut quibusdam architecto debitis quod temporibus!</div>
                    </v-card-text>
                    <v-card-action class="d-flex justify-end">
                        <v-btn right class="primary">Register</v-btn>
                    </v-card-action>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: ['id'],
        computed: {
            meetup() {
                return this.$store.getters.loadedMeetup(this.id)
            }
        }
    }
</script>