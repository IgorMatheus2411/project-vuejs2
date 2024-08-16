<template>
    <v-container>
    <v-layout row wrap>
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2 mt-5>
            <v-card class="info" >
                <v-container fluid>
                    <v-layout row pa-5>
                        <v-flex xs5 sm4 md4 >
                            <v-img
                            height="130px"
                            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                            ></v-img>
                        </v-flex>

                        <v-flex xs7 sm8 md9>
                            <v-card-title primary-title>
 
                                <div>
                                    <h5 class="white--text mb-0">My Meetup</h5>
                                    <div>16 Agosto</div>
                                </div>
                            </v-card-title>
                        

                        <v-card-actions>
                            <v-btn flat to="/meetup/">
                                <v-icon left>mdi-arrow-right</v-icon>
                                View Meetup
                            </v-btn>
                        </v-card-actions>
                    </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex> 
    </v-layout>
  </v-container>
</template>