import Cookies from 'js-cookie'
import axios from 'axios'
import MD5 from 'md5.js'

const state = () => ({
    logged: false,
    username: "",
    uid: "",
    loginDialogOpening: false,
    autoLogin: false,
    token: "",
    logging: false,
    errorBar: {
        show: false,
        text: ""
    },
    drawer: false
})

// getters
const getters = {
}

// actions
const actions = {
    login ({ dispatch, commit }, payload) {
        axios({
            method: 'post',
            url:'http://scoresystemapi.dogdie.cn:10124/api/login',
            data: {"uid": payload.uid, "password": new MD5().update(payload.password).digest('hex')}
        })
        .then(res => {
            if (res.status == 200) {
                var result = res.data
                console.log(result)
                if (result.code == 0) {
                    commit("updateUserInfo", {logged: true, token: result.token, uid: result.uid, username: result.username, changeCookies: payload.autoLogin})
                    commit("updateLoginDialogState", false)
                    commit("isLogging", false)
                    dispatch("getScores", result.token)
                } else {
                    commit("updateErrorBarState", {show: false, text: undefined})
                    commit("updateErrorBarState", {show: true, text: result.msg})
                    commit("isLogging", false)
                }
            } else {
                commit("updateErrorBarState", {show: false, text: undefined})
                commit("updateErrorBarState", {show: true, text: "在连接到服务器时发生错误, code=" + res.status})
                commit("isLogging", false)
            }
        })
        .catch(function (e) {
            commit("updateErrorBarState", {show: false, text: undefined})
            commit("updateErrorBarState", {show: true, text: "在连接到服务器时发生错误" + e})
            commit("isLogging", false)
        })
    }
}

// mutations
const mutations = {
    updateLoginDialogState (state, payload) {
        state.loginDialogOpening = payload
    },
    updateErrorBarState (state, payload) {
        state.errorBar.show = payload.show != undefined ? payload.show : state.errorBar.show
        state.errorBar.text = payload.text != undefined ? payload.text : state.errorBar.text
    },
    updateUserInfo (state, payload){
        state.logged = payload.logged
        if (payload.logged == true) {
            state.uid = payload.uid
            state.username = payload.username
            state.token = payload.token
            if (payload.changeCookies) {
                console.debug("set cookies token=" + payload.token + ", uid=" + payload.uid + ", username=" + payload.username)
                Cookies.set("token", payload.token, { expires: 7 })
                Cookies.set("uid", payload.uid, { expires: 7 })
                Cookies.set("username", payload.username, { expires: 7 })
            }
        } else {
            state.uid = ""
            state.username = ""
            state.token = ""
            if (payload.changeCookies) {
                Cookies.remove("token")
                Cookies.remove("uid")
                Cookies.remove("username")
            }
        }
    },
    isLogging (state, payload){
        state.logging = payload
    },
    updateNavigationState (state, payload) {
        state.drawer = payload
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}