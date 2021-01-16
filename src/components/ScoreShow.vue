<template>
    <v-expansion-panels>
        <v-expansion-panel
            v-for="(v,k,i) in selectedExam"
            :key="i"
        >
            <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                    <v-row no-gutters v-if="k != 'special'">
                        <v-col cols="4">
                            {{ k }}
                        </v-col>
                        <v-col cols="8">
                            <v-fade-transition leave-absolute>
                                <span v-if="!open"> 分数: {{ v.score }} </span>
                            </v-fade-transition>
                        </v-col>
                    </v-row>
                    <v-row no-gutters v-else>
                        special
                    </v-row>
                </template>
            </v-expansion-panel-header>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "ScoreShow",

    computed: {
        ...mapState({
            selectedExam: state => state.exams.datas["2"]["scores"]
        })
    }
}
</script>