<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
                <v-expansion-panel popout>
                    <v-expansion-panel-content ripple class = "green lighten-3">
                        <template v-slot:header>
                            <div class="white--text title">Menu</div>
                        </template>
                        <v-toolbar flat color = 'white'>
                            <v-spacer></v-spacer>
                            <v-btn class= "white--text" color = "black" ripple small @click="add_row">New Entry</v-btn>
                            <v-btn class = "white--text" color = "black" ripple small @click="delete_row">Delete Entry</v-btn>
                        </v-toolbar>
                        <v-data-table
                            v-model="selected"
                            :headers= "headers"
                            :items= "rows"
                            item-key= "id"
                            select-all
                        >
                            <template v-slot:items= 'props'>
                                <td>
                                    <v-checkbox v-model = "props.selected" color = "green lighten-3" hide-details></v-checkbox>
                                </td>
                                <td><v-select :items="days" :value="props.item.day" color = "green lighten-3"></v-select></td>
                                <td>
                                    <v-edit-dialog :return-value.sync = "props.item.appetizer"
                                    lazy @save ="save" @cancel="cancel" @open = "open" @close= "close">
                                        {{props.item.appetizer}}
                                        <template v-slot:input>
                                            <v-text-field
                                                v-model = "props.item.appetizer"
                                                label = "Edit"
                                                single-line
                                                counter
                                                :rules="[rules]"
                                            >
                                            </v-text-field>
                                        </template>
                                    </v-edit-dialog>
                                </td>
                                <td>
                                    <v-edit-dialog lazy :return-value.sync = "props.item.protein"
                                    @save= "save" @cancel="cancel" @open="open" @close="close">
                                        {{props.item.protein}}
                                        <template v-slot:input>
                                            <v-text-field v-model= "props.item.protein"
                                            label = "Edit"
                                            single-line
                                            counter
                                            :rules="[rules]">
                                            </v-text-field>
                                        </template>
                                    </v-edit-dialog>
                                </td>
                                <td>
                                    <v-edit-dialog :return-value.sync = "props.carb"
                                    lazy @save = "save" @close="close" @open= "open" @cancel ="cancel">
                                        {{props.item.carb}}
                                        <template v-slot:input>
                                            <v-text-field v-model = "props.item.carb" :rules = "[rules]" single-line counter>
                                            </v-text-field>
                                        </template>
                                    </v-edit-dialog>
                                </td>
                                <td>
                                    <v-edit-dialog :return-value.sync = "props.vegetable"
                                    lazy @save="save" @close="close" @open="open" @cancel="close">
                                        {{props.item.vegetable}}
                                        <template v-slot:input>
                                            <v-text-field v-model="props.item.vegetable" :rules = "[rules]" single-line counter>
                                            </v-text-field>
                                        </template>
                                    </v-edit-dialog>
                                </td>
                                <td>
                                    <v-edit-dialog :return-value.sync = "props.item.sides"
                                    lazy @save="save" @close="close" @open="open" @cancel="cancel">
                                        {{props.item.sides}}
                                        <template v-slot:input>
                                            <v-text-field v-model="props.item.sides" :rules="[rules]" single-line counter>
                                            </v-text-field>
                                        </template>
                                    </v-edit-dialog>
                                </td>
                            </template>

                        </v-data-table>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
            <v-flex>
                <v-expansion-panel popout>
                    <v-expansion-panel-content class = "green lighten-3" ripple>
                        <template v-slot:header>
                            <div class = "white--text title">Orders</div>
                        </template>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
/*eslint-disable indent, spaced-comment*/
export default {
    data () {
        return {
            name: 'Menu',
            rules: v => RegExp('^[^,-/@&]+$').test(v) || 'Incorrect format',
            selected: [],
            id: 1,
            headers: [
                {
                    text: 'Day',
                    align: 'center',
                    sortable: true,
                    value: 'day'
                },
                {
                    text: 'Appetizer',
                    sortable: false,
                    value: 'appetizer'
                },
                {
                    text: 'Protein',
                    sortable: false,
                    value: 'protein'
                },
                {
                    text: 'Carb',
                    sortable: false,
                    value: 'carb'
                },
                {
                    text: 'Vegetable',
                    sortable: false,
                    value: 'vegetable'
                },
                {
                    text: 'Sides',
                    sortable: false,
                    value: 'sides'
                }
            ],
            rows: [
                {
                    id: this.id || 1,
                    day: 'Monday',
                    appetizer: 'Red peas soup',
                    protein: 'Fry Fish',
                    carb: 'White Rice',
                    vegetable: 'Okra',
                    sides: 'None'
                }
            ],
            order_headers: [
                {
                    text: 'Order #',
                    value: 'id',
                    sortable: true,
                    align: 'center'
                },
                {
                    text: 'Name',
                    value: 'name',
                    sortable: false
                }
            ],
            orders: [{
                day: 'Monday',
                appetizer: 'Red peas soup',
                protein: 'Fry Fish',
                carb: 'White Rice',
                vegetable: 'Okra',
                sides: 'None'
            }],
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        }
    },
    methods: {
        save: function () {
            console.log('saved')
        },
        cancel: function () {
            console.log('cancelled')
        },
        open: function () {
            console.log('opened')
        },
        close: function () {
            console.log('closed')
        },
        add_row: function () {
            console.log('row added')
            this.rows.push({
                id: ++this.id,
                day: 'Monday',
                appetizer: 'None',
                protein: 'None',
                carb: 'None',
                vegetable: 'None',
                sides: 'None'
            })
        },
        delete_row: function () {
            if (this.selected.length > 0 && confirm('This action will delete the selected row(s)')) {
                let index = []
                let i = 0

                for (i = 0; i < this.selected.length; i++) {
                    index.push(this.rows.indexOf(this.selected[i]))
                }

                index.sort(function (a, b) {
                    return b - a
                })

                for (i = 0; i < index.length; i++) {
                    this.rows.splice(index[i], 1)
                }

                console.log('selected = ' + index)
                this.selected = []
                index = []
            }
        }
    }
}
</script>
