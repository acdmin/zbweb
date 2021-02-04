<template>
	<view class="content" id="content">
		<view class="ani-box" id="ani-box">
			<view class="item" v-for="(card, i) in 36" :key="i" @click.stop="choseCard(i)">
				<view class="fade">
					<view class="inner">
						<img class="img" ref="img" src="~@/static/images/card-back-ani2.png" />
						<view class="shadow"></view>
					</view>
				</view>
			</view>
			<view class="fz" :class="{'active': choseAble}"></view>
			<view class="mask" v-if="!choseAble"></view>
		</view>
		<view class="right-content">
			<view style="height: 100px;">
				<img v-if="chosed_three_card.length == 0" src="../../static/images/divine-title-0.png" alt="">
				<img v-if="chosed_three_card.length == 1" src="../../static/images/divine-title-1.png" alt="">
				<img v-if="chosed_three_card.length == 2" src="../../static/images/divine-title-2.png" alt="">
				<img v-if="chosed_three_card.length == 3" src="../../static/images/divine-title-3.png" alt="">
			</view>
			<view class="items">
				<view class="box" :class="{'active': !!chosed_three_card[0]}" @longtap="save">
					<view class="box-inner">
						<view class="img front">
							<img src="~@/static/images/card-back-end.png" />
						</view>
						<view class="img back">
							<img :class="{'inversion': (chosed_three_card[0].is_reverse*1)==1}" v-if="!!chosed_three_card[0]" :src="chosed_three_card[0].picture" />
							<view class="back-img" :style="{'background': chosed_three_card[0]&&chosed_three_card[0].id >= 22 ? 'url(../../static/images/22-77.png) no-repeat' : 'url(../../static/images/0-21.png) no-repeat'}"></view>
						</view>
					</view>
				</view>
				<view class="box" :class="{'active': !!chosed_three_card[1]}">
					<view class="box-inner">
						<view class="img front">
							<img src="~@/static/images/card-back-end.png" />
						</view>
						<view class="img back">
							<img :class="{'inversion': (chosed_three_card[1].is_reverse*1)==1}" v-if="!!chosed_three_card[1]" :src="chosed_three_card[1].picture" />
							<view class="back-img" :style="{'background': chosed_three_card[1]&&chosed_three_card[1].id >= 22 ? 'url(../../static/images/22-77.png) no-repeat' : 'url(../../static/images/0-21.png) no-repeat'}"></view>
						</view>
					</view>
				</view>
				<view class="box" :class="{'active': !!chosed_three_card[2]}">
					<view class="box-inner">
						<view class="img front">
							<img src="~@/static/images/card-back-end.png" />
						</view>
						<view class="img back">
							<img :class="{'inversion': (chosed_three_card[2].is_reverse*1)==1}" v-if="!!chosed_three_card[2]" :src="chosed_three_card[2].picture" />
							<view class="back-img" :style="{'background': chosed_three_card[2]&&chosed_three_card[2].id >= 22 ? 'url(../../static/images/22-77.png) no-repeat' : 'url(../../static/images/0-21.png) no-repeat'}"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<goHome />
		<timeUpdate v-if="$store.state.autoJumpTimer&&autoJumpTimeCount>=0" />
		<img class="star star1" src="~@/static/images/star1.png" alt="">
		<img class="star star2" src="~@/static/images/star2.png" alt="">
		<img class="fs" src="~@/static/images/fs.png" alt="">
		<img class="rb-light" src="~@/static/images/rb-light.png" alt="">
		<img class="float-light1" id="float-light1" src="~@/static/images/float-light1.png" alt="">
		<img class="float-light2" id="float-light2" src="~@/static/images/float-light2.png" alt="">
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import goHome from '@/components/goHome'
	import timeUpdate from '@/components/timeUpdate'
	export default {
		name: "divine",
		components: {
			goHome,
			timeUpdate
		},
		data() {
			return {
				step: 1,
				date: '',
				dir: '',
				flip: false,
				shadowIndex: 0,
				shadowTimer: null,
				flipIndex: -1,
				lockSave: false, // 避免重复创建订单
				ww: 0,
				hh: 0,
				aniAble: true, // 跑马灯效果
				
				imgs: [],
				w: 0,
				h: 0,
				imgW: 0,
				imgH: 0,
				choseAble: false,
				choseCardPos: [],
				slideImg: null,
				is_show: true, // 牌组显示隐藏
				timer: null,
				problem_id: -1,
				
				gifTextShow: false,
				gifImgIndex: 0,
				timerA: null,
				timerB: null,
				timerC: null
			}
		},
		onLoad(){
			if( !this.userInfo && !this.$store.state.api_token ){
				uni.redirectTo({
					url: '/pages/index/index'
				})
			}
			this.problem_id = this.$route.query.id
			this.ww = document.body.clientWidth
			this.hh = document.body.clientHeight
			this.$store.dispatch('getReversecards')
			this.w = document.clientWidth
			this.h = document.body.clientHeight
			this.freshStart()
			document.body.addEventListener('click', this.screenHandle)
		},
		mounted(){
			let f1 = document.getElementById('float-light1')
			let f2 = document.getElementById('float-light2')
			f1.addEventListener('webkitAnimationEnd', () => {
				let w = 200 + document.body.clientWidth-100;
				let x = Math.floor(Math.random()*w)
				f1.style.left = x + 'px'
				f1.style.display = 'none'
				setTimeout(() => {
					f1.style.display = 'block'
				}, 1000)
			})
			f2.addEventListener('webkitAnimationEnd', () => {
				let w = 200 + document.body.clientWidth-100;
				let x = Math.floor(Math.random()*w)
				f2.style.left = x + 'px'
				f2.style.display = 'none'
				setTimeout(() => {
					f2.style.display = 'block'
				}, 1000)
			})
		},
		methods: {
			onFlip(index){},
			screenHandle(){
				if(this.detail){
					document.body.removeEventListener('click', this.screenHandle)
					this.$store.state.autoJumpTimer = null
					clearInterval(this.$store.state.autoJumpTimer)
					uni.redirectTo({
						url: '/pages/detail/detail?id=' + this.detail.id
					})
				}
			},
			choseCard(index){
				let fade = this.imgs[index].querySelector('.fade');
				if(!this.reversecards.length){
					uni.showToast({
						title: '数据异常，请重试',
						icon: 'none'
					})
					return
				}
				if( this.chosed_three_card.length < 3 ){
					fade.className = 'fade fadeout'
					setTimeout(() => {
						this.imgs[index].style.display = 'none'
					}, 1000)
					
					let _index = this.getRandomCard()
					let card = this.$store.state.reversecards[_index]
					this.$store.state.chosed_three_card.push(card)
					this.$store.state.reversecards.splice(_index, 1)
				}else{
					console.log('每次最多占卜3张')
				}
				if(!this.$store.state.autoJumpTimer&&this.$store.state.chosed_three_card.length==3)this.save()
			},
			getRandomCard(){
				return Math.floor(Math.random()*this.reversecards.length+1)
			},
			freshStart(){
				this.timerA = setTimeout(() => {
					this.imgs = document.querySelectorAll('.ani-box .item')
					this.w = document.getElementById('ani-box').clientWidth
					this.imgW = this.imgs[0].clientWidth
					this.imgH = this.imgs[0].clientHeight
					
					let s = 0, h = 0, scale = 0.15;
					for(let i = 0; i < this.imgs.length; i++){
						let img = this.imgs[i]
						img.style.transition = `all .25s ${0.05*i}s linear`
						img.style.mozTransition = `all .25s ${0.05*i}s linear`
						img.style.msTransition = `all .25s ${0.05*i}s linear`
						img.style.oTransition = `all .25s ${0.05*i}s linear`
						img.style.webkitTransition = `all .25s ${0.05*i}s linear`
						
						if( i != 0 && i % 12 == 0 ){
							s = 0
							h++
						}else{
							s++
						}
						if( h == 3 ){
							scale = 0.15
						}else if (h == 2){
							scale = 0.35
						}else if (h == 1){
							scale = 0.65
						}else{
							scale = 1
						}
						if( i >= h*12 && i < (h+1)*12 ){
							img.style.width = 178*0.2 + 'px';
							img.style.height = 254*0.2 + 'px';
							img.style.transformOrigin = `center ${this.w/2 - h*5}px`
							img.style.mozTransformOrigin = `center ${this.w/2 - h*5}px`
							img.style.msTransformOrigin = `center ${this.w/2 - h*5}px`
							img.style.oTransformOrigin = `center ${this.w/2 - h*5}px`
							img.style.webkitTransformOrigin = `center ${this.w/2 - h*5}px`
							
							img.style.transform = `translate(-50%, -${this.w/2 - h*5}px) rotate(${30*s}deg) scale(${scale})`
							img.style.mozTransform = `translate(-50%, -${this.w/2 - h*5}px) rotate(${30*s}deg) scale(${scale})`
							img.style.msTransform = `translate(-50%, -${this.w/2 - h*5}px) rotate(${30*s}deg) scale(${scale})`
							img.style.oTransform = `translate(-50%, -${this.w/2 - h*5}px) rotate(${30*s}deg) scale(${scale})`
							img.style.webkitTransform = `translate(-50%, -${this.w/2 - h*5}px) rotate(${30*s}deg) scale(${scale})`
						}
					}
					
					this.slideImg = document.getElementById('chose_card')
					let pp = document.querySelector('.items'),
						p = document.querySelectorAll('.items .box'),
						ww = p[0].clientWidth,
						hh = p[0].clientHeight;
					for(let i = 0; i < p.length; i++){
						this.choseCardPos.push({
							w: ww,
							h: hh,
							x: p[i].offsetLeft,
							y: p[i].offsetTop + pp.offsetTop
						})
					}
					this.timerB = setTimeout(() => {//总时间2.4s
						this.fresh()
						this.timerC = setTimeout(() => {
							// 重置可选牌
							this.choseAble = true
							this.gifTextShow = true
							this.setShadow(20);
							this.setMouseEvent()
						}, 400+50*20)
					}, 2800)
				}, 200)
			},
			fresh(){
				for(let i = 0, len = this.imgs.length; i < len; i++){
					let img = this.imgs[i]
					if( i < 20 ){
						img.style.width = 139 + 'px';
						img.style.height = 215 + 'px';
						img.style.transition = `all .25s ${0.05*i}s linear`
						img.style.zIndex = i
						img.style.transformOrigin = `center ${139*2.45}px`
						img.style.mozTransformOrigin = `center ${139*2.45}px`
						img.style.msTransformOrigin = `center ${139*2.45}px`
						img.style.oTransformOrigin = `center ${139*2.45}px`
						img.style.webkitTransformOrigin = `center ${139*2.45}px`
						
						img.style.transform = `translate(-50%, -${this.w*0.447}px) rotate(-${180+(i+1)*18}deg) scale(1)`
						img.style.mozTransform = `translate(-50%, -${this.w*0.447}px) rotate(-${180+(i+1)*18}deg) scale(1)`
						img.style.msTransform = `translate(-50%, -${this.w*0.447}px) rotate(-${180+(i+1)*18}deg) scale(1)`
						img.style.oTransform = `translate(-50%, -${this.w*0.447}px) rotate(-${180+(i+1)*18}deg) scale(1)`
						img.style.webkitTransform = `translate(-50%, -${this.w*0.447}px) rotate(-${180+(i+1)*18}deg) scale(1)`
					}else{
						img.style.display = 'none'
						// img.remove()
					}
				}
			},
			save(){
				if(this.lockSave)return
				this.lockSave = true
				this.$store.dispatch('createRecord', {
					questionid: this.problem_id,
					pic1info: `${this.chosed_three_card[0].id}, ${this.chosed_three_card[0].is_reverse}`,
					pic2info: `${this.chosed_three_card[1].id}, ${this.chosed_three_card[1].is_reverse}`,
					pic3info: `${this.chosed_three_card[2].id}, ${this.chosed_three_card[2].is_reverse}`,
				})
			},
			setMouseEvent(){
				for(let i = 0; i < 20; i++){
					let c = this.imgs[i].querySelector('.inner');
					c.addEventListener('mouseenter', () => {
						this.aniAble = false
						this.removeShadow()
						c.className = 'inner active'
					})
					c.addEventListener('mouseleave', () => {
						c.className = 'inner'
					})
				}
			},
			setShadow(index){
				if(!this.aniAble)return
				for(let i = 0; i < 20; i++){
					let c = this.imgs[i].querySelector('.inner');
					if( i == index ){
						c.className = 'inner active';
					}else{
						c.className = 'inner';
					}
				}
				index--
				if( index < 0 )index = 20
				setTimeout(() => {
					this.setShadow(index)
				}, 400)
				// this.shadowIndex = this.imgs.length - (++this.shadowIndex % this.imgs.length);
			},
			removeShadow(){
				for(let i = 0; i < 20; i++){
					let c = this.imgs[i].querySelector('.inner');
					c.className = 'inner';
				}
			}
		},
		computed: {
			...mapGetters({
				userInfo: 'userInfo',
				count: 'getCount',
				question: 'getQuestion',
				reversecards: 'getReversecards',
				chosed_three_card: 'getChosed_three_card',
				detail: 'getDetail',
				role_type: 'getRoleType',
				autoJumpTimeCount: 'getAutoJumpTimeCount'
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
	
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.star1 {
		position: absolute;
		right: 10%;
		top: 39%;
		z-index: 30;
		animation: star 1.2s 1s linear infinite alternate;
	}
	.star2 {
		position: absolute;
		left: 40%;
		bottom: 15%;
		z-index: 30;
		animation: star 1.2s 2s linear infinite alternate;
	}
	.fs {
		position: absolute;
		left: 50%;
		top: 17%;
		transform: translate(-72px, -73px);
	}
	.rb-light {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.float-light1 {
		position: absolute;
		left: 35%;
		top: -140px;
		opacity: .6;
		animation: float_light1 1s 3s linear;
	}
	.float-light2 {
		position: absolute;
		left: 75%;
		top: -180px;
		opacity: .6;
		animation: float_light2 1.2s 5s linear;
	}
	.ani-box {
		width: 760px;
		height: 760px;
		position: relative;
		.fz {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 0;
			opacity: 0;
			background: url(../../static/images/bgi-fz.png) no-repeat center center;
			background-size: 760px 760px;
			transition: all .5s linear;
			&.active {
				opacity: 1;
				animation: roll 70s linear infinite;
			}
		}
		.mask {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 1000;
		}
		.item {
			// width: 159px;
			// height: 235px;
			cursor: pointer;
			-webkit-transition: all .35s linear;
			-moz-transition: all .35s linear;
			-ms-transition: all .35s linear;
			-o-transition: all .35s linear;
			transition: all .35s linear;
			-webkit-transform-origin: center center;
			-moz-transform-origin: center center;
			-ms-transform-origin: center center;
			-o-transform-origin: center center;
			transform-origin: center center;
			position: absolute;
			left: 50%;
			top: 50%;
			-webkit-transform: translate(-50%, -50%) scale(0);
			-moz-transform: translate(-50%, -50%) scale(0);
			-ms-transform: translate(-50%, -50%) scale(0);
			-o-transform: translate(-50%, -50%) scale(0);
			transform: translate(-50%, -50%) scale(0);
			.fade {
				transition: all .35s linear;
				&.fadeout {
					transform: translateY(-150px);
					opacity: 0;
				}
			}
			.inner {
				width: 178px;
				height: 254px;
				box-sizing: border-box;
				position: relative;
				-webkit-transition: all .35s linear;
				-moz-transition: all .35s linear;
				-ms-transition: all .35s linear;
				-o-transition: all .35s linear;
				transition: all .35s linear;
				padding: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				.img {
					width: 139;
					height: 215px;
					position: relative;
					-webkit-transition: all .25s linear;
					-moz-transition: all .25s linear;
					-ms-transition: all .25s linear;
					-o-transition: all .25s linear;
					transition: all .25s linear;
					&.shadow {
						animation: shadow 1.8s infinite linear;
					}
				}
				.shadow {
					display: none;
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					background: url(../../static/images/shadow.png) no-repeat;
					background-size: cover;
					z-index: 2;
				}
				&.active {
					.shadow {
						display: block;
					}
				}
				&:hover {
					-webkit-transform: translateY(-30px);
					-moz-transform: translateY(-30px);
					-ms-transform: translateY(-30px);
					-o-transform: translateY(-30px);
					transform: translateY(-30px);
				}
			}
			&.hide {
				display: none;
			}
		}
	}
	.right-content {
		margin-left: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 730px;
		.items {
			margin-top: 70px;
			display: flex;
			justify-content: space-around;
			width: 700px;
			.box {
				width: 197px;
				height: 325px;
				perspective:1000;
				transform-style:preserve-3d;
				.box-inner {
					width: 100%;
					height: 100%;
					-webkit-transition: all .5s linear;
					-moz-transition: all .5s linear;
					-ms-transition: all .5s linear;
					-o-transition: all .5s linear;
					transition: all .5s linear;
					transform-style:preserve-3d;
					-webkit-transform-style: preserve-3d;
					-moz-transform-style: preserve-3d;
					-ms-transform-style: preserve-3d;
					transform-style: preserve-3d;
					position: relative;
					.img {
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						backface-visibility:hidden;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.back {
						z-index: 1;
						-webkit-transform: rotateY(-180deg);
						-moz-transform: rotateY(-180deg);
						-ms-transform: rotateY(-180deg);
						-o-transform: rotateY(-180deg);
						transform: rotateY(-180deg);
						.back-img {
							width: 197px;
							height: 325px;
							background: url(../../static/images/0-21.png) no-repeat;
							position: absolute;
							z-index: 2;
							left: 0;
							top: 0;
						}
						img {
							width: 150px;
							height: 278px;
							&.inversion {
								-webkit-transform: rotateX(180deg);
								-moz-transform: rotateX(180deg);
								-ms-transform: rotateX(180deg);
								-o-transform: rotateX(180deg);
								transform: rotateX(180deg);
							}
						}
					}
					.front {
						z-index: 2;
					}
				}
				&.active {
					.back {
						backface-visibility: visible;
						z-index: 22;
					}
					.box-inner {
						-webkit-transform: rotateY(180deg);
						-moz-transform: rotateY(180deg);
						-ms-transform: rotateY(180deg);
						-o-transform: rotateY(180deg);
						transform: rotateY(180deg);
					}
				}
			}
		}
	}
	@keyframes shadow {
		from { box-shadow: 0 0 30px rgba(255,255,0,0); }
		to { box-shadow: 0 0 30px rgba(255,255,0,1); }
	}
	@keyframes star {
		from { opacity: 1; }
		to { opacity: .2; }
	}
	@keyframes roll {
		to { transform: rotate(-1turn); }
	}
	@keyframes float_light1 {
		0% { transform: translate(0, 0); }
		100% { transform: translate(-1600px, 1600px); }
	}
	@keyframes float_light2 {
		0% { transform: translate(0, 0); }
		100% { transform: translate(-1600px, 1600px); }
	}
</style>
