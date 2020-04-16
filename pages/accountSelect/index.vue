<template>
	<!-- 地区选择 -->
	<view class="index-page">

		<cus-header></cus-header>

		<view class="main-container flex-set">
			<view class="button" @tap="$app.goPage(`/pages/accountSelect/index?region=mainland`)">个人账户</view>
			<view class="button" @tap="$app.goPage(`/pages/accountSelect/index?region=hk`)">联名账户</view>
		</view>
		
		<view class="button-wrap flex-set">
			<view class="button" @tap="$app.goPage(`/pages/auth/identityCard`)">立即申请</view>
		</view>
	</view>
</template>

<script>
	import cusHeader from '@/components/cus-header.vue'
	export default {
		components: {
			cusHeader
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.index-page {

		.main-container {
			min-height: 500rpx;
			flex-direction: column;
			
			.button {
				padding: 20rpx 40rpx;
				margin: 40rpx;
				border-radius: 10rpx;
				color: #fff;
				background: $text-color-1;
			}
		}
		
		.button-wrap {
			.button {
				padding: 20rpx 60rpx;
				margin: 60rpx;
				border-radius: 10rpx;
				color: #fff;
				background: $text-color-1;
			}
		}
	}
</style>
