import * as types from './types'
export const mutations = {
    clickHandle(state) {
        state.count++
    },
    [types.LOGIN]: (state, data) => {
        // this.commit('login')
        // localStorage.token = data;
        // state.token = data;
    },
    [types.HOME_CARDS_LIST]: (state, data) => {
        this.commit('getHomeCardList')
    },
}