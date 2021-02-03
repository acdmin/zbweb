// import {createStore} from "vuex";
import Vue from "vue";
import Vuex from "vuex";
import {state} from './state'
import {mutations} from './mutations'
import {getters} from './getters'
import {actions} from './actions'
Vue.use(Vuex)
// export default createStore({
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: {}
});