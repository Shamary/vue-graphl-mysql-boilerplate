<template>
    <v-container grid-list-xs align-center>
        <v-layout row wrap>
            <v-flex>
                <v-card class = "mt-2" style ="width: 50%; margin-left: 22%">
                    <v-card-title primary titel><h1 class = "blue--text" style = "margin-left: 42%">Login</h1></v-card-title>
                    <v-form>
                        <!--<v-text-field label="label" v-model="username"></v-text-field>-->
                        <v-select label = "User" class = "mb-5" v-model="username" :items="users" item-text = "name" style = "width: 50%; margin-left: 22%"
                        color = "blue" v-validate = "'required'" :error-messages = "errors.collect('user')" data-vv-name = "user">
                        </v-select>

                        <v-btn class = "yellow darken-3 mb-5" style = "margin-left: 42%" @click="next">
                            Login
                        </v-btn>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import router from '../router'
import { USER_QUERY } from '../constants/graphql'
/*eslint-disable indent, spaced-comment*/
export default {
    data () {
        return {
            username: '',
            test: '',
            users: []
        }
    },
    methods: {
        next: function () {
            this.$validator.validateAll().then(valid => {
                if (valid) {
                    this.$axios.create({ withCredentials: true }).post('http://localhost:8081/', { username: this.username }).then(data => {
                        //console.log('data = ' + JSON.stringify(data))
                        localStorage.setItem('token', data.data.token)
                        this.$apollo.provider.defaultClient.resetStore()
                        router.push('menu')
                    }).catch(function (err) {
                        console.log(err)
                        router.push('/')
                    })
                }
            })
            //router.push('menu')
        }
    },
    apollo: {
        users: {
            query: USER_QUERY,
            update: (data) => {
                return data.getUsers
            }
        }
    }
}
</script>
