<template>
	<view class="btn" @click="goHome"></view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			goHome(){
				this.$store.state.detail = null
				if(this.$store.state.autoJumpTimer)clearInterval(this.$store.state.autoJumpTimer)
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/index/index'
					})
				}, 200)
			}
		}
	}
</script>

<style lang="scss">
.btn {
	width: 94px;
	height: 94px;
	position: fixed;
	left: 30px;
	top: 40px;
	z-index: 6;
	cursor: pointer;
	background: url(../static/images/go_home_n.png) no-repeat;
	background-size: contain;
	&:hover {
		background: url(../static/images/go_home_p.png) no-repeat;
		background-size: contain;
	}
}
</style>
