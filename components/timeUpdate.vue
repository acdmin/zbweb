<template>
	<view class="box">
		{{autoJumpTimeCount}}
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters({
				autoJumpTimeCount: 'getAutoJumpTimeCount'
			})
		}
	}
</script>

<style lang="scss">
.box {
	width: 94px;
	height: 94px;
	line-height: 86px;
	position: fixed;
	top: 50px;
	right: 110px;
	background: url(~@/static/images/clock.png) no-repeat;
	font-size: 18px;
	color: #fff;
	text-align: center;
	text-shadow: #eb5310 2px 0 0, #eb5310 0 2px 0, #eb5310 -2px 0 0, #eb5310 0 -2px 0;
}
</style>
