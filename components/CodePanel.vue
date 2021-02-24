<template>
	<view class="box">
		<view class="codepanel">联系客服</view>
		<img class="code" src="~@/static/images/code.png" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.box {
	cursor: pointer;
	&:hover {
		.codepanel {
			animation: hide .3s linear forwards;
		}
		.code {
			animation: show .3s linear forwards;
		}
	}
}
.codepanel {
	background: rgba(255,255,255,.6);
	position: fixed;
	font-size: 16px;
	padding: 5px;
	width: 25px;
	text-align: center;
	border-radius: 3px;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	transition: all .5s linear;
	&:active {
		animation: hide .2s linear forwards;
	}
}
.code {
	width: 150px;
	height: 150px;
	position: fixed;
	left: 0;
	top: 50%;
	transform: translateX(-100%) translateY(-50%);
	background: red;
	transition: all .5s linear;
	&:active {
		animation: show .5s linear forwards;
	}
}
@keyframes show {
	to { transform: translateX(0) translateY(-50%); }
}
@keyframes hide {
	to { transform: translateX(-100%) translateY(-50%); }
}
</style>
