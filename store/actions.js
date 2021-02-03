import {$http} from '../api/api.js'
import * as types from './types'
export const actions = {
	// 占卜详情
    async createRecord(content, payload){
		// uni.showToast({title: '请稍候...'}) 
        let {data} = await $http({
			url: '/divination',
			method: 'POST',
			header: {
				'Authorization': `Bearer ${this.state.api_token}`
			},
			data: {questionid: payload.questionid, pic1info: payload.pic1info, pic2info: payload.pic2info, pic3info: payload.pic3info}
		})
		// uni.hideLoading();
		if(data.status_code == 200){
			let _item = {
				id: data.data.id,
				seconds: new Date().getTime() + 1800000
			}
			localStorage.removeItem('detail_data');
			localStorage.setItem('detail_data', JSON.stringify(_item));
			content.state.detail = data.data
			content.state.autoJumpTimeCount = 30
			content.state.autoJumpTimer = null
			clearInterval(content.state.autoJumpTimer)
			content.state.autoJumpTimer = setInterval(() => {
				content.state.autoJumpTimeCount--;
				if( content.state.autoJumpTimeCount == 0 ){
					content.state.autoJumpTimer = null
					clearInterval(content.state.autoJumpTimer)
					uni.redirectTo({
						url: '/pages/detail/detail?id=' + data.data.id
					})
				}
			}, 1000)
		}else{
			uni.showToast({title: data.message, icon: "none"})
		}
    },
	// 占卜完整详情
	async getFullDetail(content, payload){
	    let {data} = await $http({
			url: '/fullresult',
			header: {
				'Authorization': `Bearer ${this.state.api_token}`
			},
			data: {did: payload.id}
		})
		uni.stopPullDownRefresh()
		if( data.status_code == 400 ){
			uni.switchTab({
				url: '/pages/index/index'
			})
		}else{
			content.state.detail = {
				price: data.data.price,
				list: data.data.list,
				project: data.data.project,
				has_pay: data.data.state*1
			}
		}
	},
	// 获取占卜问题
    async getQuestion(content, payload){
        let {data} = await $http({
			url: '/question',
			header: {
				'Authorization': `Bearer ${this.state.api_token}`
			}
		})
		content.state.question = data.data
    },
	// 获取占卜背面牌
    async getReversecards(content, payload){
        let {data} = await $http({
			url: '/reversecards',
			header: {
				'Authorization': `Bearer ${this.state.api_token}`
			}
		})
		content.state.reversecards = data.data
    },
	// 支付方式列表
	async payWays(content, payload){
	    let {data} = await $http({
			url: '/project',
			data: {},
			header: {
				'Authorization': `Bearer ${this.state.api_token}`
			}
		})
		content.state.payWays = data.data;
	},
	// 检查微信订单
	async wxSearchOrder(content, payload){
	    let {data} = await $http({
			url: '/wxsearchorder',
			data: {out_trade_no: payload.id},
			header: {
				'Authorization': `Bearer ${this.state.api_token}`
			}
		})
		content.state.wxPayInfo = data.data
	},
    // 游客登录
    async touristLogin(content, payload){
		let {data} = await $http({
			url: '/otherlogin',
			method: 'POST'
		})
		content.state.api_token = data.data.api_token
		content.state.userInfo = data.data
		uni.setStorageSync('api_token', data.data.api_token)
		if( payload.redirectPath ){
			uni.switchTab({
				url: payload.redirectPath
			})
		}else{
			uni.switchTab({
				url: '/pages/divine/divine'
			})
		}
    }
}