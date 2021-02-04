<template>
	<view class="main">
		<view class="mask"></view>
		<view class="content">
			<view class="close" @click="hide"></view>
			<view class="top">填写资料</view>
			<view class="tips">感谢您购买本服务，请您在下方填写您的微信联系方式，占卜师将在24小时内联系您。（本服务处于测试阶段，请慎重填写您的联系方式）</view>
			<view class="item">
				<view class="name">性别</view>
				<view class="right">
					<view class="radios">
						<view class="radio" :class="{'active': sex==1}" @click="sexSelect(1)">男</view>
						<view class="radio" :class="{'active': sex==0}" @click="sexSelect(0)">女</view>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="name">手机号码</view>
				<view class="right">
					<input class="input" type="text" placeholder-class="placeholder" value="phone" v-model="phone" :focus="phone_focus" placeholder="请输入您的手机号码" />
				</view>
			</view>
			<view class="item">
				<view class="name">微信号码</view>
				<view class="right">
					<input class="input" type="text" placeholder-class="placeholder" value="wechat" v-model="wechat" :focus="wechat_focus" placeholder="请输入您的微信号码" />
				</view>
			</view>
			<view class="item">
				<view class="name">您的问题</view>
				<view class="right">
					<textarea class="input remark" placeholder-class="placeholder" v-model="remark" :focus="remark_focus" placeholder="请输入您选择的问题" />
				</view>
			</view>
			<view class="save" @click="save"><img src="../static/images/feedback/save-text.png" alt=""></view>
		</view>
	</view>
</template>

<script>
	import {reg} from '../static/js/utils'
	export default {
		props: ['id'],
		data() {
			return {
				sex: 1, //0女 1男
				phone: '',
				wechat: '',
				remark: '',
				phone_focus: false,
				wechat_focus: false,
				remark_focus: false
			};
		},
		created(){},
		methods: {
			sexSelect(index){
				this.sex = index
			},
			hide(){
				uni.$emit('close_feedback')
			},
			save(){
				this.phone_focus = false
				this.wechat_focus = false
				this.remark_focus = false
				if( this.phone == '' ){
					uni.showToast({
						title: '手机号码不能为空',
						icon: 'none'
					})
					setTimeout(() => {
						this.phone_focus = true
					}, 60)
					return
				}
				if(!reg.isPhone(this.phone)){
					uni.showToast({
						title: '手机号码格式错误',
						icon: 'none'
					})
					setTimeout(() => {
						this.phone_focus = true
					}, 60)
					return
				}
				if( this.wechat == '' ){
					uni.showToast({
						title: '微信号码不能为空',
						icon: 'none'
					})
					setTimeout(() => {
						this.wechat_focus = true
					}, 60)
					return
				}
				if( this.wechat.length < 5 ){
					uni.showToast({
						title: '微信号码最少5位',
						icon: 'none'
					})
					setTimeout(() => {
						this.wechat_focus = true
					}, 60)
					return
				}
				if( this.remark == '' ){
					uni.showToast({
						title: '问题描述不能为空',
						icon: 'none'
					})
					setTimeout(() => {
						this.remark_focus = true
					}, 60)
					return
				}
				this.$store.dispatch('feedback', {id: this.id, sex: this.sex, phone: this.phone, wechat: this.wechat, remark: this.remark, callback: () => {
					this.hide()
				}})
			}
		}
	}
</script>

<style lang="scss">
.mask {
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0,0,0,.5);
}
.main {
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 10;
}
.content {
	width: 1090px;
	height: 759px;
	background: url(../static/images/feedback/bg.png) no-repeat;
	background-size: contain;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	.close {
		width: 58px;
		height: 58px;
		position: absolute;
		right: -14px;
		top: -2px;
		cursor: pointer;
		background: url(../static/images/feedback/close-n.png) no-repeat;
		background-size: contain;
		&:hover {
			background: url(../static/images/feedback/close-p.png) no-repeat;
			background-size: contain;
		}
	}
	.top {
		height: 50px;
		line-height: 46px;
		text-align: center;
		font-size: 20px;
		color: #ffed27;
		font-weight: 600;
		text-shadow: 0 0 2px #a93d09;
	}
	.tips {
		font-size: 18px;
		color: #ecc6ff;
		width: 800px;
		margin: 40px auto 0;
		line-height: 30px;
	}
	.item {
		width: 800px;
		margin: 0 auto;
		display: flex;
		padding: 12px 0;
		.name {
			flex: 0 0 140px;
			height: 50px;
			line-height: 50px;
			font-size: 22px;
			color: #ca91e8;
		}
		.right {
			flex-grow: 1;
			display: flex;
			align-items: center;
		}
		.radios {
			display: flex;
			display: flex;
			align-items: center;
			padding-left: 5px;
			.radio {
				flex: 0 0 60px;
				margin-right: 50px;
				padding-left: 34px;
				background: url(../static/images/feedback/radio-n.png) no-repeat left center;
				background-size: 24px 24px;
				box-sizing: border-box;
				font-size: 22px;
				color: #ecc6ff;
				cursor: pointer;
				&.active {
					background: url(../static/images/feedback/radio-p.png) no-repeat left center;
					background-size: 24px 24px;
				}
			}
		}
		.input {
			width: 300px;
			height: 50px;
			background: #3f075c;
			border-radius: 4px;
			box-shadow: 0 2px 4px #300845;
			border: 1px solid #8b44af;
			font-size: 22px;
			color: #ecc6ff;
			padding-left: 20px;
			&.remark {
				width: 100%;
				height: 210px;
				padding:10px;
				padding-left: 20px;
			}
		}
		.placeholder {
			color: #6f10a1;
		}
	}
	.save {
		width: 216px;
		height: 70px;
		margin: 30px auto 0;
		position: relative;
		cursor: pointer;
		background: url(../static/images/feedback/save-n.png) no-repeat;
		background-size: contain;
		img {
			margin-top: -2px;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		&:hover {
			background: url(../static/images/feedback/save-p.png) no-repeat;
			background-size: contain;
		}
	}
}
</style>
