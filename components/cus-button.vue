<template>
	<view class="button" :class="[type, size]" @tap="$emit('c-tap')" hover-class="placeholder-css" hover-start-time="25"
	 hover-stay-time="200">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			// 按钮背景类型
			type: {
				default: ''
			},
			size: {
				default: 'm'
			}
		},
		methods: {

		}

	}
</script>

<style lang="scss" scoped>
	.button {
		border-radius: 10rpx;
		color: #fff;
		background: linear-gradient(207deg, #21985c 0%, #1a7e3b 100%);
		position: relative;
		display: flex;
		justify-content: center;

		&.m {
			padding: 20rpx 60rpx;
			margin: 10upx 30upx;
			font-size: $font-m;
		}

		&.back {
			color: $text-color-3;
			border: 1px solid $text-color-3;
			background: transparent;
		}
	}
</style>
