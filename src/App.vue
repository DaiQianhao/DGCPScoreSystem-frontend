<template>
    <div>
        <top-bar></top-bar>
        <v-app>
            <login-dialog></login-dialog>
            <score-show v-if="isExamDataNotNull"></score-show>
        </v-app>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapState } from 'vuex';

import TopBar from './components/TopBar.vue';
import LoginDialog from './components/LoginDialog.vue'
import ScoreShow from './components/ScoreShow.vue'

export default {
    name: 'App',

    components: {
        TopBar,
        LoginDialog,
        ScoreShow
    },

    computed: {
        ...mapState({
            isExamDataNotNull: state => state.exams.datas != undefined,
        })
    },

    created: () => {
        var token = Cookies.get("token")
        var uid = Cookies.get("uid")
        var username = Cookies.get("username")
        if (token != undefined && uid != undefined && username != undefined) {
            console.debug("Auto Login Enable")
            this.$store.commit("updateUserInfo", {"logged": true, "token": token, "uid": uid, "username": username, ChangeCookies: true})
        } else {
            console.debug("Auto Login Disable")
        }
    }
};
</script>