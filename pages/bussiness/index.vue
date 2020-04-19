<template>
	<!-- 业务办理 -->
	<view class="page-container">

		<cus-header :index="1" />

		<view class="main-container">
			<cus-button class="button" @c-tap="$app.goPage(`/pages/regionSelect/index`)">开户申请</cus-button>
			<cus-button class="button" type="back" @c-tap="$app.goPage(`/pages/bussiness/editEnter`)">继续开户/资料修改</cus-button>
		</view>
	</view>
</template>

<script>
	import cusHeader from '@/components/cus-header.vue'
	import cusButton from '@/components/cus-button.vue'
	export default {
		components: {
			cusHeader,
			cusButton,
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
	.page-container {
		height: 100%;
		display: flex;
		flex-direction: column;

		.main-container {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 200upx 0;

			.button {
				padding: 20rpx 40rpx;
				width: 300upx;
				margin: 40rpx;
			}
		}
	}
</style>
