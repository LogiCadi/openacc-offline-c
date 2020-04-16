<template>
	<view class="button" :class="[type, size]" @tap="$emit('c-tap')" hover-class="hover" hover-start-time="25"
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
		background: $text-color-1;
		position: relative;
		transition: .1s;

		&.hover {
			background-color: rbga($text-color-1, .9);
		}

		&.m {
			padding: 20rpx 60rpx;
			margin: 10upx 30upx;
			font-size: $font-m;
		}

		&.back {
			color: #E27325;
			border: 1px solid #E27325;
			background-color: transparent;
		}
	}
</style>
