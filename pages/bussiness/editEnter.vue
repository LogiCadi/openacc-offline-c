<template>
	<!-- 继续开户/资料修改 -->
	<view class="page-container">

		<cus-header></cus-header>

		<view class="main-container">
			<view class="title">请根据证件号码查询完成继续开户/资料修改</view>
			<form class="form-container">
				<view class="form-item">
					<view class="label">证件类型</view>
					<picker class="right-input picker-css" @change="selectIndex = $event.detail.value" :range="selectList" :value="selectIndex">
						<view class="uni-input">{{selectList[selectIndex]}}</view>
					</picker>
				</view>
				<view class="form-item">
					<view class="label">证件类型</view>
					<cus-input />
				</view>
			</form>
		</view>
		<view class="button-wrap flex-set">
			<cus-button>查询</cus-button>
		</view>

	</view>
</template>

<script>
	import cusHeader from '@/components/cus-header.vue'
	import cusInput from '@/components/cus-input.vue'
	import cusButton from '@/components/cus-button.vue'
	export default {
		components: {
			cusHeader,
			cusInput,
			cusButton
		},
		data() {
			return {
				selectList: ['第二代居民身份证', '香港居民身份证', '澳门居民身份证', '护照'],
				selectIndex: 0,
			}
		},
		onLoad() {

		},
		methods: {
			select(e) {
				this.selectIndex = e.detail.value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-container {

		.main-container {
			padding: 0 60rpx;

			.title {
				padding: 0 20rpx;
				margin: 60rpx -20rpx 30rpx;
				line-height: 1;
				font-size: $font-l;
				border-left: 8rpx solid $text-color-1;
			}

			.form-container {

				.form-item {
					padding: 20rpx 0;
					display: flex;
					align-items: center;

					.label {
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
