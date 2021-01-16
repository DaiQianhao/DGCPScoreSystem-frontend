<template>
    <v-container>
        <v-row>
            <v-col
                v-for="(v,k,i) in selectedExam"
                :key="i"
                cols="12"
                sm="4"
                md="3"
                lg="2"
            >
                <v-card>
                    <v-card-title>{{ k }}</v-card-title>
                    <v-card-text>
                        分数: {{ v.score }}
                        <br/>
                        级排: {{ v.rank }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "ScoreShow",

    computed: {
        ...mapState({
            selectedExam: state => {
                if (state.exams.selectedExam == "-1") {
                    return {}
                } else {
                    return state.exams.datas[state.exams.selectedExam]["scores"]
                }
            }
        })
    },
}
</script>