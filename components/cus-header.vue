<template>
	<view class="cus-header-container">
		<image @tap="$app.goPage(`/pages/index/index`)" class="logo-img" src="http://h5.evergreen.group/img/logo.077823e4.png"
		 mode="aspectFill"></image>
		<view class="right-wrap">
			<view class="link" @tap="$app.goPage(`/pages/index/index`)">首页</view>
			<view class="link" @tap="$app.goPage(`/pages/bussiness/index`)">开户申请</view>
			<view class="link" @tap="$app.toast(`关于我们`)">关于我们</view>
		</view>
	</view>
</template>

<script>
	export default {
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
				font-size: $font-s;
				margin-left: 40rpx;
			}
		}
	}
</style>
