<template>
	<view class="cus-header-container">
		<image @tap="$app.goPage(`/pages/index/index`)" class="logo-img" src="http://h5.evergreen.group/img/logo.077823e4.png"
		 mode="aspectFill"></image>
		<view class="right-wrap">
			<view class="link" :class="{active: index === 0}" @tap="$app.goPage(`/pages/index/index`)">首页</view>
			<view class="link" :class="{active: index === 1}" @tap="$app.goPage(`/pages/regionSelect/index`)">开户申请</view>
			<view class="link" :class="{active: index === 2}" @tap="$app.toast(`关于我们`)">关于我们</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			index: {
				default: 0
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.cus-header-container {
		padding: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;

		.logo-img {
			width: 196rpx;
			height: 61rpx;
		}

		.right-wrap {
			display: flex;

			.link {
				color: #333;
				padding: 5upx 10upx;
				margin-left: 20upx;
				
				&.active {
					color: $text-color-1;
					border-bottom: 4upx solid $text-color-1;
				}
			}
		}
	}
</style>
