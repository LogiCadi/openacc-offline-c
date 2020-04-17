<template>
	<!-- 首页 -->
	<view class="page-container">
		<cus-header :index="0" />

		<view class="main-container">
			<image class="bg-img position-set" src="/static/image/首页背景.png" mode="aspectFill"></image>

			<view class="main-block">
				<view class="title">
					<view class="text">华夏常青</view>
					<view class="title-bottom">
						<view class="left"></view>
						<view class="right"></view>
					</view>
				</view>
				
				<image class="vi-img" src="/static/image/vi.png" mode="aspectFill"></image>
				<view class="content">华夏常青从成立伊始，朝着“成为一家伟大的金融公司”的集团发展目标发力，打造科技事业部、资管事业部、证券事业部三大模块并驾齐驱，互辅互成，打造国际集团化综合性科技金融公司。</view>
				
				<view class="button flex-set" @tap="$app.goPage(`/pages/bussiness/index`)">业务办理</view>
			</view>
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
	.page-container {
		height: 100%;
		display: flex;
		flex-direction: column;

		.main-container {
			flex: 1;
			position: relative;

			.main-block {
				z-index: 1;
				position: relative;
				margin: 150upx 40upx;
				display: flex;
				flex-direction: column;
				align-items: flex-start;

				.title {
					font-size: $font-xxl;
					color: $text-color-1;

					.title-bottom {
						margin: 10upx 0;
						display: flex;
						height: 4upx;

						.left {
							background-color: $text-color-1;
							flex: 3;
						}

						.right {
							background-color: $text-color-3;
							flex: 1;
						}
					}
				}
				
				.vi-img {
					margin-top: 20upx;
					width: 205upx;
					height: 26upx;
				}
				
				.content {
					margin-top: 10upx;
					width: 540upx;
				}
				
				
				.button {
					background-color: $text-color-1;
					color: #fff;
					padding: 10upx 60upx;
					font-size: $font-xl;
					margin-top: 50upx;
					background: #197D3B url('/static/image/round.png') no-repeat right/contain;
					
					&::before {
						font-family: "iconfont" !important;
						content: "\e68f";
						display: inline-block;
						transform: rotate(-90deg);
						font-size: $font-s;
						margin-right: 10upx;
					}
				}

			}
		}
	}
</style>
