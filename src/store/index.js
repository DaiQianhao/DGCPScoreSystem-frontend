import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import login from './modules/login.js'
import exams from './modules/exams.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        login: login,
        exams: exams
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})