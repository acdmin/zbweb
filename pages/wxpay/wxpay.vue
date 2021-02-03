<template>
	<view class="main">
		<view class="header">
			<view class="top-line">
				<view class="inner">您好，欢迎使用微信支付！</view>
			</view>
			<view class="top-content">
				<img src="../../static/images/wxpay.png" alt="">
			</view>
		</view>
		<view class="content">
			<view class="panel">
				<view class="t1">扫一扫付款（元）</view>
				<view class="total">{{info.price}}</view>
				<view class="code-box">
					<img class="code" :src="info.codepath" alt="">
					<img class="scan" src="../../static/images/wxscan.png" alt="">
				</view>
				<view class="order">订单号：{{info.sn}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		data() {
			return {}
		},
		watch: {
			'info': function(){
				if(this.info)this.getWxScanPayStatus()
			}
		},
		onLoad(){
			clearTimeout(this.$store.state.autoJumpTimer)
			this.$store.state.autoJumpTimer = null
			this.$store.dispatch('wxSearchOrder', {id: this.$route.query.out_trade_no})
		},
		methods: {
			async getWxScanPayStatus(){
				console.log('getWxScanPayStatus')
				let {data} = await this.$http({
					url: '/wxcodecheckpay',
					data: {type: 'pc', did: this.$route.query.id, dir: 'full'},
					header: {
						'Authorization': `Bearer ${this.api_token}`
					},
				});
				if( data.status_code != 200 ){
					uni.showToast({
						title: '未知错误,稍后重试!'
					})
				}else{
					if( data.data.ispay != 1 ){
						setTimeout(() => {
							this.getWxScanPayStatus()
						}, 3000)
					}else{
						uni.redirectTo({
							url: '/pages/detail/detail?id=' + this.$route.query.id
						})
					}
				}
			}
		},
		computed: {
			...mapGetters({
				info: 'getWxPayInfo',
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
}
.main {
	width: 100%;
	height: 100%;
	background: #fff;
	.header {
		border-bottom: 1px solid #d9d9d9;
		.top-line {
			background: #81868b;
			.inner {
				font-size: 12px;
				height: 26px;
				line-height: 26px;
				width: 960px;
				margin: 0 auto;
				text-align: right;
				padding-right: 96px;
				box-sizing: border-box;
				color: #fff;
			}
		}
		.top-content {
			width: 960px;
			margin: 0 auto;
			height: 60px;
			display: flex;
			align-items: center;
		}
	}
	.content {
		background: #eff0f1;
		height: 780px;
		padding-top: 34px;
		.panel {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 960px;
			height: 600px;
			border-top: 3px solid #d9d9d9;
			border-bottom: 3px solid #d9d9d9;
			background: #fff;
			margin: 0 auto;
			.t1 {
				font-size: 12px;
				color: #4d4d4d;
			}
			.total {
				margin-top: 5px;
				font-size: 24px;
				color: #ff6600;
				font-weight: 600;
			}
			.code-box {
				margin-top: 26px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding-top: 6px;
				width: 180px;
				min-height: 150px;
				box-sizing: border-box;
				border: 2px solid #d3d3d3;
				.code {
					width: 168px;
					height: 168px;
				}
				.scan {
					margin-bottom: 14px;
				}
			}
			.order {
				margin-top: 20px;
				font-size: 12px;
				color: #4d4d4d;
			}
		}
	}
}
</style>
