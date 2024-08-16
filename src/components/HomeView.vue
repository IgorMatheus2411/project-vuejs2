<template>
    <v-container >
        <v-layout row wrap>
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn large   to="/meetup" class="info ma-2 ">  Explore Meetups  </v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn large   to="/meetups/new" class="primary ma-2">Organize Meetups</v-btn>
            </v-flex>
        </v-layout>

        <v-layout row wrap class="justify"> 
            <v-flex xs12  >
                <v-carousel style="cursor: pointer;" >
                    <v-carousel-item
                    v-for="meetup in meetups"
                    :key="meetup.id"
                    :src="meetup.src" 
                    @click="onLoadMeetup(meetup.id)"
                    >
                    <div class="title">
                        {{ meetup.title }}
                    </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>

        <v-layout row wrap class="justify"> 
            <v-flex xs12  >
              <p>Join our awesome meetups</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                meetups: [
                    { src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', id:'01', title:'esquilo'},
                    { src:'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', id:'02', title:'Lago' },
                    { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtSaiD7aywdj40H5cHgH1foGHUdwnmM-FZA&s', id: '03', title: 'Imagem progama' },
            ]
            }
        },
        methods: {
            onLoadMeetup(id) {
                this.$router.push('/meetup/' + id);
            }
        }
    }
</script>

<style scoped>

    .title {
        position: absolute;
        
        bottom: 50px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 2em;
        padding: 20px;
    }
</style>



