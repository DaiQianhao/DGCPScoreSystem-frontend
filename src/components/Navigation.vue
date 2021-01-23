<template>
    <v-navigation-drawer app v-model="drawer">
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        考试场次
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item-group mandatory>
                <v-list-item
                v-for="(id,name,i) in exams"
                :key="i"
                @click="changeSelectedExam(id)">
                    <v-list-item-title>
                        {{ name }}
                    </v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'Navigation',

    computed: {
        selectedItem: {
            get () {
                return this.$store.state.exams.selectedExam
            },
            set (value) {
                this.$store.commit("changeSelectedExam", value)
            }
        },
        drawer: {
            get () {
                return this.$store.state.login.drawer
            },
            set (value) {
                this.$store.commit("updateNavigationState", value)
            }
        },
        ...mapState({
            exams: state => {
                var result = {}
                if (state.exams.datas != undefined) {
                    Object.keys(state.exams.datas).reverse().forEach(id => {
                        result[state.exams.datas[id]["examinfo"]["name"]] = id
                    });
                }
                return result
            }
        })
    },

    methods: {
        changeSelectedExam: function (id) {
            this.$store.commit("changeSelectedExam", id)
        }
    }
}
</script>