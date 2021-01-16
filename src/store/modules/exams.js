import axios from 'axios'

const state = () => ({
    datas: undefined
})

const actions = {
    getScores ({ commit }, payload) {
        axios({
            method: 'GET',
            url:'http://127.0.0.1:44444/api/getScore?token=' + payload,
        })
        .then(res => {
            if (res.status == 200) {
                var result = res.data
                if (result.code == 0) {
                    commit("updateDatas", result["exams"])
                } else {
                    alert(result.msg)
                    if (result.code == 10) {
                        commit("updateUserInfo", {ChangeCookies: true, logged: false})
                    }
                }
            } else {
                alert("在连接到服务器时发生错误, code= + res.status")
            }
        })
        .catch(e => {
            alert("在连接到服务器时发生错误" + e)
        })
    },
}

const mutations = {
    updateDatas (state, payload) {
        state.datas = payload
    }
}

export default {
    state,
    actions,
    mutations
}