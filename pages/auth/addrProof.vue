<template>
	<!-- 上传住址证明 -->
	<view class="index-page">

		<cus-header-progress index="1" />

		<view class="main-container">
			<view class="title">住址证明(2/3)</view>
			<view class="tips">请保持拍摄时光线良好，避免证件反光</view>
			<view class="imgs-wrap">
				<image class="img" v-for="n in imgsBlock" :key="n" :src="imgs[n-1] || '/static/image/住址证明.png'" mode="aspectFill"
				 @tap="upload(n-1)"></image>
			</view>
			<view class="tips flex-set" @tap="imgsBlock++">+ 如有其他证明，请点击添加</view>
		</view>

		<view class="button-wrap flex-set">
			<cus-button @c-tap="$app.goBack()" type="back">上一步</cus-button>
			<cus-button @c-tap="nextStep">确认无误，下一步</cus-button>
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
				imgsBlock: 1,
				imgs: [],
				formData: {}
			}
		},
		onLoad() {},
		methods: {
			upload(side) {
				uni.chooseImage({
					success: async res => {
						const path = res.tempFilePaths[0]
						const {
							resourceKey,
							url
						} = await this.$app.uploadOSS(path, 1, `openacc/${this.$app.getData('applyId') || 0}/addrproof`)
						// 显示已上传成功的图片
						this.$set(this.imgs, side, url)
					}
				})
			},
			async nextStep() {
				const res = await this.$app.http('account/openAccount/offline/addrProofSubmit', {
					applyId: this.$app.getData('applyId'),
					addrProofUrl: this.imgs.filter(a => a),
				})

				this.$app.goPage(`/pages/auth/bankCard`)

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
				color: $text-color-3;
			}

			.imgs-wrap {
				margin: 30rpx 0;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.img {
					width: 292rpx;
					height: 184rpx;
					margin-bottom: 20upx;
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
						display: flex;
						flex: 1;
					}

					.radio-label {
						flex: 1;

						.radio {
							transform: scale(0.8);
						}
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
