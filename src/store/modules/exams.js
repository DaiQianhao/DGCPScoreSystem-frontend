import axios from 'axios'

const state = () => ({
    datas: undefined,
    selectedExam: "-1"
})

const actions = {
    getScores ({ commit }, payload) {
        axios({
            method: 'GET',
            url:'http://scoresystemapi.dogdie.cn:10124/api/getScore?token=' + payload,
        })
        .then(res => {
            if (res.status == 200) {
                var result = res.data
                if (result.code == 0) {
                    commit("updateDatas", result["exams"])
                    commit("updateNavigationState", true)
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
    },
    changeSelectedExam (state, payload) {
        state.selectedExam = payload
    }
}

export default {
    state,
    actions,
    mutations
}