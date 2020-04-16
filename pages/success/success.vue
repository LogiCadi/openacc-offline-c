<template>
	<!-- 资料填写 申请成功 -->
	<view class="index-page">

		<cus-header-progress index="4" />

		<view class="main-container">
			<image class="img" src="/static/image/完成.png" mode="aspectFill"></image>
			
		</view>

		<view class="button-wrap flex-set">
			<cus-button @c-tap="$app.goPage(`/pages/identity/index`)">下一步</cus-button>
		</view>
	</view>
</template>

<script>
	import cusHeaderProgress from '@/components/cus-header-progress.vue'
	import cusInput from '@/components/cus-input.vue'
	import cusButton from '@/components/cus-button.vue'
	export default {
		components: {
			cusHeaderProgress,
			cusInput,
			cusButton,
		},
		data() {
			return {

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
			margin: 80upx 50upx;
			background-color: #F8F4F4;
			box-shadow: 0upx 4upx 5upx 0upx rgba(#000, 0.11);
			height: 270upx;
		}

		.button-wrap {
			margin: 40rpx;
			justify-content: space-around;
		}
	}
</style>
