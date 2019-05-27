<template>
    <v-container grid-list-xs justify-center pa-5>
        <v-layout column>
            <v-flex>
                <v-layout justify-end><v-btn @click="logout">Logout</v-btn></v-layout>
            </v-flex>
            <v-flex>
                <v-layout>
                    <v-tabs fixed-tabs color = "transparent" slider-color = "yellow darken-3" v-model="cur_tab" @click="changeDay">
                        <v-tab>Monday</v-tab>
                        <v-tab>Tuesday</v-tab>
                        <v-tab>Wednesday</v-tab>
                        <v-tab>Thursday</v-tab>
                        <v-tab>Firday</v-tab>
                    </v-tabs>
                </v-layout>
            </v-flex>
            <v-flex>
                <v-layout d-flex>
                    <v-card class = "mt-5" width = "100%">
                        <v-card-title primary-title> <h2 class = "blue--text">Order</h2></v-card-title>
                        <v-form title = 'Menu'>
                            <v-select class = "mt-2" label = 'Appetizer' v-model="orderSet.appetizer" :items ="menu" style = "width: 50%; margin-left: 22%" color = "blue" item-text = "appetizer"></v-select>
                            <v-select class = "mt-2" label = 'Protein' v-model="orderSet.protein" :items ="menu" style = "width: 50%; margin-left: 22%" color = "blue" item-text="protein"></v-select>
                            <v-select class = "mt-2" label = 'Carb' v-model="orderSet.carb" :items ="menu" style = "width: 50%; margin-left: 22%" color = "blue" item-text="carb"></v-select>
                            <v-select class = "mt-2" label = 'Vegetable' v-model="orderSet.vegetable" :items ="menu" style = "width: 50%; margin-left: 22%" color = "blue" item-text="vegetable"></v-select>
                            <v-select class = "mt-2 mb-5" label = 'Side' v-model="orderSet.sides" :items ="menu" style = "width: 50%; margin-left: 22%" color = "blue" item-text="sides"></v-select>
                            <v-btn class = "yellow darken-3 mb-5"  @click="whichOrder" style = "margin-left: 43%">
                                {{submit_text}}
                            </v-btn>
                        </v-form>
                    </v-card>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
/*eslint-disable indent, spaced-comment*/
import { MENU_QUERY, ORDER_MUTATION, ORDER_QUERY, UPDATE_ORDER_MUTATION } from '../constants/graphql'
import router from '../router'

export default {
    data () {
        return {
            menu: [],
            order: [],
            orderSet: { appetizer: 'None', protein: 'None', carb: 'None', vegetable: 'None', sides: 'None' },
            cur_tab: 0,
            appetizer: ['None'],
            protein: ['None', 'Ox Tail', 'Fry Chicken'],
            carb: ['None', 'Rice and Peas', 'White Rice'],
            vegetable: ['None'],
            sides: ['None', 'Mixed Vegetables', 'Pasta'],
            dayMap: { 0: 'Monday', 1: 'Tuesday', 2: 'Wednesday', 3: 'Thursday', 4: 'Friday' },
            submit_text: 'Place Order'
        }
    },
    methods: {
        isEmpty: function () {
            if (this.cur_protein.length < 1) {
                this.cur_protein = ['None']
            }

            console.log('changed ' + this.cur_protein)
        },
        Order () {
            this.$apollo.mutate({
                mutation: ORDER_MUTATION,
                variables: {
                    name: 'user1',
                    day: this.dayMap[this.cur_tab],
                    appetizer: this.orderSet.appetizer,
                    protein: this.orderSet.protein,
                    carb: this.orderSet.carb,
                    vegetable: this.orderSet.vegetable,
                    sides: this.orderSet.side
                }
            })
        },
        updateOrder () {
            this.$apollo.mutate({
                mutation: UPDATE_ORDER_MUTATION,
                variables: {
                    name: 'user1',
                    day: this.dayMap[this.cur_tab],
                    appetizer: this.orderSet.appetizer,
                    protein: this.orderSet.protein,
                    carb: this.orderSet.carb,
                    vegetable: this.orderSet.vegetable,
                    sides: this.orderSet.sides
                }
            })
        },
        whichOrder () {
            if (this.order == null || this.order.isEmpty) {
                this.Order()
            } else {
                this.updateOrder()
            }
        },
        changeDay () {
            this.submit_text = this.order == null ? 'Place Order' : 'Update Order'
        },
        logout () {
            this.$axios.post('http://localhost:8081/logout', {}).then(() => {
                localStorage.removeItem('token')
                this.$apollo.provider.defaultClient.resetStore()
                router.push('/')
            }).catch((error) => {
                console.log('Error occured ' + error)
            })
        }
    },
    apollo: {
        menu: {
            query: MENU_QUERY,
            variables () {
                return {
                    day: this.dayMap[this.cur_tab]
                }
            },
            update: (data) => {
                return data.getMenu
            }
        },
        order: {
            query: ORDER_QUERY,
            variables () {
                return {
                    name: 'user1',
                    day: this.dayMap[this.cur_tab]
                }
            },
            update: (data) => {
                return data.getOrder
            }
        }
    },
    created () {
        //setup current order
        setTimeout(() => {
            if (this.order != null) {
                this.orderSet.appetizer = this.order.appetizer
                this.orderSet.protein = this.order.protein
                this.orderSet.carb = this.order.carb
                this.orderSet.vegetable = this.order.vegetable
                this.orderSet.sides = this.order.sides
            }
        }, 1000)
    },
    updated () {
        setTimeout(() => {
            if (this.order != null) {
                this.orderSet.appetizer = this.order.appetizer
                this.orderSet.protein = this.order.protein
                this.orderSet.carb = this.order.carb
                this.orderSet.vegetable = this.order.vegetable
                this.orderSet.sides = this.order.sides
            }
            this.submit_text = this.order == null ? 'Place Order' : 'Update Order'
        }, 1000)
    }
}
</script>
