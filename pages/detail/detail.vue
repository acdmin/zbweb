<template>
	<view class="detail">
		<view class="top">
			<img src="../../static/images/detail/title-1.png" />
			<view class="sub-title"><text selectable>您抽到的每一张牌都与您的问题息息相关，接下来，我们将透过您锁选择的3张牌，告诉您问题的答案。</text></view>
		</view>
		<view class="items">
			<view class="item" v-if="payWays.length&&detail&&detail.list.length&&!detail.has_pay">
				<view class="pos-top"><text>您的订单</text></view>
				<view class="inner">
					<view class="pay-ltem" :class="{'active': payIndex==0}" v-if="!!payWays[0]" @click="setPay(0)" style="margin-top: 20px;">
						<img src="../../static/images/detail/pay-text.png" alt="">
						<view>
							<view style="font-size: 26px; color: #ffa1fc;">RMB {{payWays[0].price}}</view>
						</view>
					</view>
					<view class="pay-ltem" :class="{'active': payIndex==1}" v-if="!!payWays[1]" @click="setPay(1)">
						<view style="display: flex;justify-content: center;align-items: center;">
							<img src="../../static/images/detail/pay-text.png" alt="">
							<view style="font-size: 20px;color: #fa9df9;margin-top: -15px;">(新用户福利)</view>
						</view>
						<view style="display: flex;justify-content: center;align-items: center;">
							<img style="transform: translateY(6px);" src="../../static/images/detail/laba.png" alt="">
							<view style="font-size: 26px; color: #fff;text-shadow: 0 0 2px #4c096e;">价格 <text selectable style="color: #ffed27; font-weight: 600; margin-left: 10px;">{{payWays[1].price}}元</text></view>
						</view>
						<view class="time">
							<view class="t">{{time[0]}}</view>
							<view class="t" style="margin-left: 6px;">{{time[1]}}</view>
							<view style="transform: translateY(-3px);padding: 0 5px;">:</view>
							<view class="t">{{time[2]}}</view>
							<view class="t" style="margin-left: 6px;">{{time[3]}}</view>
						</view>
					</view>
					<view class="pay-btns">
						<view class="btn alipay" @click="onAlipay">
							<img src="../../static/images/detail/alipay-text.png" alt="">
						</view>
						<view class="btn wxpay" @click="onWxpay">
							<img src="../../static/images/detail/wxpay-text.png" alt="">
						</view>
					</view>
				</view>
			</view>
			<template v-if="detail&&detail.list.length">
				<view class="item" :class="{'hide': !detail.has_pay}" v-for="(item, i) in detail.list" :key="i">
					<view class="pos-top"><text>{{item.title}}</text></view>
					<scroll-view class="scroll-view" scroll-y="true">
						<view class="inner">
							<view class="img-box">
								<img :class="{'inversion': (item.is_reverse*1)==1}" :src="item.picpath" alt="">
								<img class="shadow" v-if="item.pic_id >= 22" src="../../static/images/22-77.png" alt="">
								<img class="shadow" v-else src="../../static/images/0-21.png" alt="">
							</view>
							<view class="p1 text-line-two">
								<text selectable>{{item.result}}</text>
							</view>
							<img class="qus" src="../../static/images/detail/qus.png" alt="">
							<view class="p2">
								<text selectable>{{item.answer}}</text>
							</view>
						</view>
					</scroll-view>
					<view class="open-btn" @click="onWxpay" v-if="!detail.has_pay">
						<view class="btn">
							<img src="../../static/images/detail/open-btn-text.png" alt="">
						</view>
					</view>
				</view>
			</template>
		</view>
		<goHome />
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import {timeCountDown, secondsToTime,fileZero} from '@/static/js/utils'
	import goHome from '@/components/goHome'
	export default {
		data() {
			return {
				id: -1,
				countNum: 1800,
				payIndex: 1,
				time: [],
				timer: null
			}
		},
		components: {
			goHome
		},
		watch: {
			'detail': function(){
				if( !!this.detail&&this.detail.has_pay == 0 ){
					clearInterval(this.timer)
					this.timer = null
					let start = JSON.parse(localStorage.getItem('detail_data')),
						now = new Date().getTime(),
						go_seconds = Math.floor((start.seconds-now)/1000);
					if(go_seconds > 0){
						this.countNum = go_seconds
						this.timer = timeCountDown(this.countNum, (num) => {
							if( num == 0 ){
								clearInterval(this.timer)
								this.timer = null
							}
							this.countNum = num
							let m = Math.floor(this.countNum/60)
							let str = '' + fileZero(m) + fileZero(this.countNum - m*60)
							this.time = str.split('')
						}, () => {})
					}else{
						this.countNum = 0
						this.time = [0,0,0,0]
					}
				}else{
					clearInterval(this.timer)
					this.timer = null
					this.countNum = 0
					this.time = [0,0,0,0]
				}
			},
		},
		onLoad(){
			this.id = this.$route.query.id
			this.$store.dispatch('payWays')
		},
		onShow(){
			this.$store.state.autoJumpTimer = null
			clearInterval(this.$store.state.autoJumpTimer)
			this.$store.dispatch('getFullDetail', {
				id: this.id
			})
		},
		methods: {
			setPay(index){
				this.payIndex = index
			},
			async onAlipay(){
				let {data} = await this.$http({
					url: '/alipay',
					data: {type: 'pc', did: this.id, pid: this.payWays[this.payIndex].id, dir: 'full'},
					header: {
						'Authorization': `Bearer ${this.api_token}`
					},
				})
				window.location.href = data.data.payurl
			},
			async onWxpay(){
				let {data} = await this.$http({
					url: '/wechatpay',
					data: {type: 'pc', did: this.id, pid: this.payWays[this.payIndex].id, dir: 'full'},
					header: {
						'Authorization': `Bearer ${this.api_token}`
					},
				});
				if( data.data.status_code != 200 ){
					uni.showToast({
						title: '未知错误,稍后重试!'
					})
					return
				}
				this.$store.state.autoJumpTimer = null
				clearInterval(this.$store.state.autoJumpTimer)
				uni.navigateTo({
					url: `/pages/wxpay/wxpay?id=${this.id}&out_trade_no=${data.data.sn}`
				})
			},
		},
		computed: {
			countStr(){
			    return secondsToTime(this.countNum)
			},
			...mapGetters({
				userInfo: 'userInfo',
				detail: 'getDetail',
				payWays: 'getPayWays',
				api_token: 'token'
			})
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: url(~@/static/images/bg-divine.png) no-repeat right bottom;
		background-size: cover;
		position: relative;
	}
	.detail {
		width: 100%;
		height: 100%;
		padding: 50px 0 20px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.top {
		text-align: center;
		img {
			display: inline-block;
		}
		.sub-title {
			margin-top: 10px;
			font-size: 26px;
			color: #fff;
		}
	}
	
	.pay-ltem {
		width: 372px;
		height: 244px;
		margin: 0 auto;
		background: url(../../static/images/detail/pay-item-bg-n.png) no-repeat;
		background-size: contain;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		&.active {
			background: url(../../static/images/detail/pay-item-bg-p.png) no-repeat;
			background-size: contain;
		}
		
		.time {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28px;
			font-weight: 600;
			color: #ee542d;
			.t {
				width: 26px;
				height: 36px;
				line-height: 36px;
				text-align: center;
				border-radius: 5px;
				background: #4e0872;
			}
		}
	}
	
	.pay-btns {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.btn {
			width: 266px;
			height: 70px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
			cursor: pointer;
			img {
				margin-top: -4px;
			}
			&.alipay {
				background: url(../../static/images/detail/alipay-btn-n.png) no-repeat;
				background-size: contain;
				&:hover {
					background: url(../../static/images/detail/alipay-btn-p.png) no-repeat;
					background-size: contain;
				}
			}
			&.wxpay {
				background: url(../../static/images/detail/wxpay-btn-n.png) no-repeat;
				background-size: contain;
				&:hover {
					background: url(../../static/images/detail/wxpay-btn-p.png) no-repeat;
					background-size: contain;
				}
			}
		}
	}
	
	
	
	.items {
		display: flex;
		justify-content: space-around;
		margin-top: 30px;
		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			flex: 0 0 440px;
			height: 759px;
			background: url(../../static/images/detail/bg.png) no-repeat;
			position: relative;
			.pos-top {
				height: 50px;
				line-height: 46px;
				text-align: center;
				font-size: 20px;
				color: #ffed27;
				font-weight: 600;
				text-shadow: 0 0 2px #a93d09;
			}
			.scroll-view {
				width: 100%;
				height: 100%;
				overflow: hidden;
				padding: 20px 0;
				box-sizing: border-box;
				::-webkit-scrollbar {  
					display: none;  
					width: 0 !important;  
					height: 0 !important;  
					-webkit-appearance: none;  
					background: transparent;  
				}
			}
			.inner {
				padding: 0 30px;
				.img-box {
					width: 171px;
					height: 271px;
					margin: 0 auto 16px;
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					img {
						width: 130px;
						height: 234px;
						&.inversion {
							transform: rotate(180deg);
						}
					}
					.shadow {
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
					}
				}
				.qus {
					display: block;
					margin: 40px auto 30px;
				}
				.p1 {
					font-size: 20px;
					color: #ecc6ff;
					line-height: 32px;
				}
				.p2 {
					font-size: 20px;
					color: #fff7a2;
					line-height: 32px;
					overflow: hidden;
				}
			}
			&.hide {
				.p1 {
					max-height: 100px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;    
					overflow: hidden;
				}
				.p2 {
					max-height: 70px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;    
					overflow: hidden;
				}
			}
			.bottom {
				position: absolute;
				left: 0;
				bottom: 30px;
				height: 110px;
				background: rgba(255,0,0,.45);
			}
			.open-btn {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 130px;
				background: url(../../static/images/detail/blur.png) no-repeat center top;
				display: flex;
				justify-content: center;
				align-items: center;
				.btn {
					width: 266px;
					height: 70px;
					cursor: pointer;
					text-align: center;
					background: url(../../static/images/detail/open-btn-n.png) no-repeat;
					background-size: contain;
					display: flex;
					justify-content: center;
					align-items: center;
					img {
						margin-top: -4px;
					}
					&:hover {
						background: url(../../static/images/detail/open-btn-p.png);
						background-size: contain;
					}
				}
			}
		}
	}
</style>
