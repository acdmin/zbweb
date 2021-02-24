import * as types from './types'
export const getters = {
    userInfo(state){
        return state.userInfo
    },
    getCount(state){
        return state.count
    },
    getHomeCardList(state){
        return state.homeCardList
    },
    getQuestion(state){
        return state.question
    },
    getReversecards(state){
        return state.reversecards
    },
    getChosed_three_card(state){
        return state.chosed_three_card
    },
	getDetail(state){
		return state.detail
	},
    token(state){
        return state.api_token
    },
	isValidUser(state){
		return !!state.userInfo&&state.userInfo.phone
	},
	getWxScanParams(state){
		return state.wxScanParams
	},
	getPayWays(state){
		return state.payWays
	},
	getWxPayInfo(state){
		return state.wxPayInfo
	},
	getAutoJumpTimeCount(state){
		return state.autoJumpTimeCount
	},
	getAutoJumpTimer(state){
		return state.autoJumpTimer
	}
}