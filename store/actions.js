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
			let detail_data = {endtime: data.data.endtime}
			localStorage.setItem('detail_data', JSON.stringify(detail_data));
			content.state.detail = data.data
			content.state.autoJumpTimer = setInterval(() => {
				if( content.state.autoJumpTimeCount == 0 ){
					clearInterval(content.state.autoJumpTimer)
					content.state.autoJumpTimer = null
					content.state.autoJumpTimeCount = 30
					uni.redirectTo({
						url: '/pages/detail/detail?id=' + data.data.id
					})
				}else{
					content.state.autoJumpTimeCount--;
				}
			}, 1000)
		}else{
			uni.showToast({title: data.message, icon: "none"})
		}
    },
	// 订单支付完成弹窗
	async feedback(content, payload){
		let {data} = await $http({
			url: '/feedback',
			method: 'POST',
			showToast: true,
			header: {
				'Authorization': `Bearer ${this.state.api_token}`
			},
			data: {did: payload.id,phone: payload.phone,wechat: payload.wechat,remark: payload.remark,sex: payload.sex}
		})
		if( data.status_code == 200 ){
			uni.showToast({title: data.message, icon: "none"})
			payload.callback&&payload.callback()
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
			let detail_data = {endtime: data.data.endtime}
			localStorage.setItem('detail_data', JSON.stringify(detail_data));
			content.state.detail = data.data
			content.state.autoJumpTimeCount = 30
			content.state.autoJumpTimer = null
			clearInterval(content.state.autoJumpTimer)
			content.state.autoJumpTimer = setInterval(() => {
				content.state.autoJumpTimeCount--;
				if( content.state.autoJumpTimeCount == 0 ){
					content.state.autoJumpTimer = null
					clearInterval(content.state.autoJumpTimer)
				}
			}, 1000)
			
			content.state.detail = {
				list: data.data.list,
				popupwindow: data.data.popupwindow,
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