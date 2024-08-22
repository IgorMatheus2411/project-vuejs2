
<template>
    <v-container >
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card-text>
                    <v-container >
                        <form @submit.prevent="onSignin">
                            <h1 class="text-center">LOGIN</h1>
                            <v-layout mt-11 row>
                                <v-flex>
                                    <v-text-field
                                    name="email"
                                    label="E-mail"
                                    id="email"
                                    v-model="email"
                                    type="email"
                                    required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout> 
                            <v-layout row>
                                <v-flex>
                                    <v-text-field
                                    name="password"
                                    label="Password"
                                    id="password"
                                    v-model="password"
                                    type="password"
                                    required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            
                            <v-layout row>
                                <v-flex xs12 class="d-flex justify-end">
                                    <v-btn type="submit">Sign In</v-btn>
                                </v-flex>
                            </v-layout>
                        </form>
                        
                    </v-container>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
                password: '',
            }
        },
        computed: {
            user () {
                return this.$store.getters.user
            }
        },
        // ELA VAI FICAR OBSERVANDO O COM PUTED (USER) QUE ESTA NO GETTER NA STORE, 
        // TODA VEZ Q MUDAR VAI OBTE-LA COM O VALOR
        watch: {
            user (value) {
                if (value !== null && value !== undefined) {
                    this.$router.push('/')
                }
            }
        },
        methods: {
            onSignin() {
                // Vuex
                this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
            }
        }
    }
</script>