<template>
    <v-app-bar
        color="white"
        elevate-on-scroll
        app
    >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>查分系统Pro</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn text v-if="isLogged" @click="refreshScores">
                <div>
                    <!--
                    <span class="login-btn-user-info">{{ username }}</span><br/>
                    <small class="login-btn-user-info">{{ uid }}</small>
                    -->
                    <span class="login-btn-user-info">野兽先辈</span><br/>
                    <small class="login-btn-user-info">1145141919</small>
                </div>
            </v-btn>
            <v-btn text @click="openLoginDialog" v-else>
                登录
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "TopBar",
    computed: {
        drawer: {
            get () {
                return this.$store.state.login.drawer
            },
            set (value) {
                this.$store.commit("updateNavigationState", value)
            }
        },
        ...mapState({
            isLogged: state => state.login.logged,
            username: state => state.login.username,
            uid: state => state.login.uid,
            token: state => state.login.token,
            isLoginDialogOpening: state => state.login.loginDialogOpening
        }),
    },
    methods: {
        openLoginDialog: function () {
            this.$store.commit("updateLoginDialogState", true)
        },
        refreshScores: function () {
            this.$store.dispatch("getScores", this.token)
        }
    }
}
</script>

<style>
.login-btn-user-info {
    text-align: left;
}
</style>