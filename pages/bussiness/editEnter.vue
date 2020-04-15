<template>
	<!-- 业务办理 -->
	<view class="page-container">

		<cus-header></cus-header>

		<view class="main-container">
			<view class="title">请根据证件号码查询完成继续开户/资料修改</view>
			<form class="form-container">
				<view class="form-item">
					<view class="label">证件类型</view>
					<picker class="picker-css" :range="selectList" :value="selectIndex">
						<view class="uni-input">{{selectList[selectIndex]}}</view>
					</picker>
				</view>
			</form>

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
				selectList: ['第二代居民身份证', '香港居民身份证', '澳门居民身份证', '护照'],
				selectIndex: 0,
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

		.main-container {
			padding: 40upx;

			.title {
				padding: 0 20upx;
				margin: 20upx 0;
				line-height: 1;
				font-size: $font-l;
				border-left: 8upx solid $text-color-1;
			}

			.form-container {

				.form-item {
					padding: 20upx;
					display: flex;
					align-items: center;

					.label {
						width: 200upx;
						margin-right: 20upx;
					}

					.picker-css {
						flex: 1;
						color: #999999;
						border: 1px solid #E4E7EC;
						border-radius: 6upx;
						padding: 10upx 20upx;

						&::after {
							font-family: "iconfont" !important;
							content: "\e68f";
							display: inline-block;
						}
					}

				}
			}

		}
	}
</style>
