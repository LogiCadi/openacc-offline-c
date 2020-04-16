<template>
	<!-- 地区选择 -->
	<view class="index-page">

		<cus-header></cus-header>

		<view class="main-container flex-set">
			<view class="button" @tap="$app.goPage(`/pages/accountSelect/index?region=mainland`)">大陆地区</view>
			<view class="button" @tap="$app.goPage(`/pages/accountSelect/index?region=hk`)">港澳地区</view>
			<view class="button" @tap="$app.goPage(`/pages/accountSelect/index?region=other`)">其他地区</view>
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
		
		
	}
</style>
