<template>
    <v-card class="overflow-hidden">
        <v-app-bar
          absolute
          color="white"
          elevate-on-scroll
        >
            <v-toolbar-title>查分系统Pro</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn text v-if="isLogged" @click="refreshScores">
                    <div>
                        <p class="login-btn-user-info">{{ username }}</p>
                        <small class="login-btn-user-info">{{ uid }}</small>
                    </div>
                </v-btn>
                <v-btn text @click="openLoginDialog" v-else>
                    登录
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "TopBar",
    computed: {
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