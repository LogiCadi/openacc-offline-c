<template>
	<!-- 上传身份证 -->
	<view class="index-page">

		<cus-header-progress index="1" />

		<view class="main-container">
			<view class="title">身份验证(1/3)</view>
			<view class="tips">请保持扫描时光线良好，避免身份证放光</view>
			<view class="imgs-wrap">
				<image class="img" src="/static/image/身份证人像面.png" mode=""></image>
				<image class="img" src="/static/image/身份证人像面.png" mode=""></image>
			</view>
			<view class="title">请核对身份信息是否与证件上一致，如有误请修改</view>
			<form class="form-container">
				<view class="form-item">
					<view class="label">姓名</view>
					<cus-input class="right-input" />
				</view>
				<view class="form-item">
					<view class="label">性别</view>
					<cus-input class="right-input" />
				</view>
				<view class="form-item">
					<view class="label">身份证号</view>
					<cus-input class="right-input" />
				</view>
				<view class="form-item">
					<view class="label">出生日期</view>
					<cus-input class="right-input" />
				</view>
				<view class="form-item">
					<view class="label">住址</view>
					<cus-input class="right-input" />
				</view>
			</form>
		</view>

		<view class="button-wrap flex-set">
			<cus-button @c-tap="$app.goBack()" type="back">上一步</cus-button>
			<cus-button @c-tap="$app.goPage(`/pages/infoFill/base`)">下一步</cus-button>
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
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			med() {
				console.log(1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-page {

		.main-container {
			padding: 0 60rpx;

			.title {
				padding: 0 20rpx;
				margin: 60rpx -20rpx 30rpx;
				line-height: 1;
				font-size: $font-l;
				border-left: 8rpx solid $text-color-1;
			}

			.tips {
				margin: 0 20upx;
				color: #E27325;
			}

			.imgs-wrap {
				margin: 40rpx 0;
				display: flex;
				justify-content: space-between;

				.img {
					width: 292rpx;
					height: 184rpx;
				}
			}

			.form-container {

				.form-item {
					padding: 20rpx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.label {
						width: 150upx;
						text-align: right;
						padding: 0 20rpx;
					}

					.right-input {
						flex: 1;
					}

					.picker-css {
						color: #999999;
						border: 1px solid #E4E7EC;
						border-radius: 6rpx;
						padding: 10rpx 20rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						&::after {
							font-family: "iconfont" !important;
							content: "\e68f";
							display: inline-block;
							color: $text-color-1;
						}
					}
				}
			}
		}

		.button-wrap {
			margin: 40rpx;
			justify-content: space-around;
		}
	}
</style>
