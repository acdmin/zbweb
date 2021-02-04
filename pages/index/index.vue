<template>
	<view>
		<view class="float-view"></view>
		<view class="house"></view>
		<view class="light"></view>
		<view class="dot-lights"></view>
		<view class="cloud"></view>
		<view class="moon"></view>
		<view class="person"></view>
		<view class="sprite"></view>
		<view class="content">
			<view class="chose-tips-title"></view>
			<view class="items">
				<view class="item" :class="{'active': id == 1}" @click="choseItem(1)">
					<view class="bg"></view>
					<img src="~@/static/images/problem_1_n.png" alt="">
					<img src="~@/static/images/problem_1_p.png" alt="">
				</view>
				<view class="item" :class="{'active': id == 2}" @click="choseItem(2)">
					<view class="bg"></view>
					<img src="~@/static/images/problem_2_n.png" alt="">
					<img src="~@/static/images/problem_2_p.png" alt="">
				</view>
				<view class="item" :class="{'active': id == 3}" @click="choseItem(3)">
					<view class="bg"></view>
					<img src="~@/static/images/problem_3_n.png" alt="">
					<img src="~@/static/images/problem_3_p.png" alt="">
				</view>
			</view>
			<view class="btns">
				<view class="btn ext" @click="choseRandom"><text></text></view>
				<view class="btn sure" @click="onSelect"><text></text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				id: -1
			}
		},
		onLoad() {
			if( !this.userInfo && !this.$store.state.api_token ){
				this.$store.dispatch('touristLogin', {redirectPath: this.redirectPath})
			}
			this.$store.dispatch('getQuestion')
		},
		onShow(){
			this.id = -1
			this.$store.state.detail = null
			clearInterval(this.$store.state.autoJumpTimer)
			this.$store.state.autoJumpTimer = null
			this.$store.state.autoJumpTimeCount = 30
			this.$store.state.chosed_three_card = []
		},
		methods: {
			choseItem(index){
				this.id = index
			},
			choseRandom(){
				this.id = Math.floor(Math.random()*3+1)
				uni.navigateTo({
					url: '/pages/divine/divine?id=' + this.id
				})
			},
			onSelect(index){
				if(this.id == -1){
					this.choseRandom()
				}else{
					uni.navigateTo({
						url: '/pages/divine/divine?id=' + this.id
					})
				}
			},
		},
		computed: {
			...mapGetters({
				userInfo: 'userInfo',
				question: 'getQuestion'
			})
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: url(~@/static/images/bg.jpg) no-repeat right bottom;
		background-size: cover;
		position: relative;
	}
	.dot-lights {
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: url(~@/static/images/light.png) no-repeat right top;
		background-size: contain;
	}
	.house {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 473px;
		height: 301px;
		background: url(~@/static/images/house.png) no-repeat;
		background-size: contain;
	}
	.light {
		position: absolute;
		right: 0;
		top: 0;
		width: 783px;
		height: 401px;
		background: url(~@/static/images/dots-light.png) no-repeat;
		background-size: contain;
	}
	.cloud {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 1147px;
		height: 418px;
		background: url(~@/static/images/cloud.png) no-repeat;
		background-size: contain;
		transform: translate(-100%, 100%);
		animation: person_enter 2s linear forwards;
	}
	.sprite {
		position: absolute;
		right: 0;
		top: 200px;
		width: 289px;
		height: 322px;
		background: url(~@/static/images/sprite.png) no-repeat;
		background-size: contain;
		animation: shakeUpDown 1.2s ease-in-out infinite alternate;
	}
	.moon {
		position: absolute;
		left: 290px;
		top: 0px;
		width: 484px;
		height: 482px;
		background: url(~@/static/images/moon.png) no-repeat;
		background-size: contain;
		animation: opacity 1.5s linear infinite alternate;
	}
	.person {
		position: absolute;
		left: 0;
		bottom: -174px;
		width: 960px;
		height: 1044px;
		background: url(~@/static/images/person.png) no-repeat;
		background-size: contain;
		transform: translate(-100%, 100%);
		animation: person_enter 2s linear forwards;
	}
	.content {
		width: 890px;
		position: absolute;
		right: 220px;
		top: 220px;
		.chose-tips-title {
			width: 716px;
			height: 100px;
			background: url(~@/static/images/chose-tips-title.png) no-repeat;
			background-size: contain;
			margin: 0 auto;
			transform-origin: center center;
			animation: shake 5s linear infinite alternate;
		}
		.items {
			display: flex;
			width: 100%;
			justify-content: space-around;
			.item {
				margin-top: 50px;
				width: 264px;
				height: 264px;
				position: relative;
				cursor: pointer;
				.bg {
					width: 100%;
					height: 100%;
					background: url(~@/static/images/problem-bg.png) no-repeat;
				}
				img {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					opacity: 0;
					&:first-of-type {
						opacity: 1;
					}
				}
				&.active {
					.bg {
						animation: roll 12s linear infinite;
					}
					img {
						&:last-of-type {
							opacity: 1;
						}
					}
				}
				&:hover {
					.bg {
						animation: roll 12s linear infinite;
					}
					img {
						&:last-of-type {
							opacity: 1;
						}
					}
				}
			}
		}
		.btns {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 520px;
			margin: 0 auto;
			margin-top: 100px;
			.btn {
				width: 229px;
				height: 80px;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				text {
					display: inline-block;
					width: 143px;
					height: 38px;
				}
			}
			.btn.ext {
				background: url(~@/static/images/ext-n.png) no-repeat;
				background-size: contain;
				text {
					display: inline-block;
					width: 143px;
					height: 38px;
					background: url(~@/static/images/btn-text-suiji.png) no-repeat;
					background-size: contain;
				}
				&:hover {
					background: url(~@/static/images/ext-p.png) no-repeat;
					background-size: contain;
				}
			}
			.btn.sure {
				background: url(~@/static/images/sure-n.png) no-repeat;
				background-size: contain;
				text {
					width: 73px;
					height: 38px;
					background: url(~@/static/images/btn-text-sure.png) no-repeat;
					background-size: contain;
				}
				&:hover {
					background: url(~@/static/images/sure-p.png) no-repeat;
					background-size: contain;
				}
			}
		}
		@keyframes roll {
			to { transform: rotate(360deg); }
		}
		@keyframes shakeUpDown {
			from { transform: translateY(0); }
			to { transform: translateY(20px); }
		}
		@keyframes person_enter {
			from {transform: translate(-100%, 100%);}
			to {transform: translate(0, 0);}
		}
		@keyframes shake {
			0% { transform: rotate(0deg); }
			50% { transform: rotate(3deg); }
			90% { transform: rotate(-3deg); }
			100% { transform: rotate(0deg); }
		}
		@keyframes opacity {
			from { opacity: .8; }
			to { opacity: 1; }
		}
	}
</style>
