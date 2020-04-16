<template>
	<view class="cus-header-progress-container">
		<view class="progress-container">
			<view class="bar-wrap" :class="{active: index >= 1}">1.身份验证</view>
			<view class="line"></view>
			<view class="bar-wrap" :class="{active: index >= 2}">2.资料填写</view>
			<view class="line"></view>
			<view class="bar-wrap" :class="{active: index >= 3}">3.身份声明</view>
			<view class="line"></view>
			<view class="bar-wrap" :class="{active: index >= 4}">4.申请成功</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			index: {
				default: 1,
			}
		},
		data() {
			return {
				steps: ['1.身份验证', '2.资料填写', '3.身份声明', '4.申请成功']
			};
		}
	}
</script>

<style lang="scss">
	.cus-header-progress-container {
		.progress-container {
			padding: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #eee;

			.bar-wrap {
				color: #999999;
				font-size: $font-s;
				border-radius: 30rpx;
				padding: 8rpx 16rpx;
				border: 1px solid #D0D7DD;

				&.active {
					color: #fff;
					border: none;
					background: linear-gradient(207deg, rgba(33, 152, 92, 1) 0%, rgba(24, 119, 71, 1) 100%);
				}
			}

			.line {
				background-color: #D0D7DD;
				flex: 1;
				height: 1px;
				margin: 0;
			}
		}
	}
</style>
