<template>
	<!-- 上传过关证明 -->
	<view class="index-page">

		<cus-header-progress index="1" />

		<view class="main-container">
			<view class="title">银行卡(3/3)</view>
			<view class="tips">请保持拍摄时光线良好，避免证件反光</view>
			<view class="imgs-wrap">
				<image class="img" :src="imgs[0] || '/static/image/银行卡.png'" mode="aspectFill" @tap="upload(0)"></image>
			</view>
			<block v-if="imgs[0]">
				<view class="title">请核对信息是否与银行卡上一致，如有误请修改</view>
				<form class="form-container">
					<view class="form-item">
						<view class="label">银行名称</view>
						<picker class="right-input picker-css" @change="bankPickChange" :range="bankList" range-key="valueDesc"
						 :value="bankIndex">
							<view class="uni-input">{{bankList[bankIndex].valueDesc}}</view>
						</picker>
					</view>
					<view class="form-item">
						<view class="label">银行卡号</view>
						<cus-input class="right-input" :value="formData.bankCardNo" @input="$set(formData, 'bankCardNo', $event)" require />
					</view>
				</form>
			</block>
		</view>

		<view class="button-wrap flex-set" v-if="imgs[0]">
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
				imgs: [],
				bankList: [], // 银行卡枚举
				formData: {}
			}
		},
		onLoad() {
			this.getBankList()
		},
		computed: {
			bankIndex() {
				for (let index in this.bankList) {
					if (this.formData.bank === this.bankList[index].value) {
						return parseInt(index)
					}
				}
				return 0
			}
		},
		methods: {
			bankPickChange(e) {
				const selectIndex = e.detail.value
				for (let index in this.bankList) {
					if (parseInt(index) === selectIndex) {
						this.$set(this.formData, 'bank', this.bankList[index].value)
						break
					}
				}
			},
			async getBankList() {
				const res = await this.$app.http('account/openAccount/common/enumInit')
				this.bankList = res.bank
			},
			upload(side) {
				// side 0 正面 1 反面
				uni.chooseImage({
					success: async res => {
						const path = res.tempFilePaths[0]
						const {
							resourceKey,
							url
						} = await this.$app.uploadOSS(path, 1, `openacc/${this.$app.getData('applyId') || 0}/bankcard/${side}`)
						// 显示已上传成功的图片
						this.$set(this.imgs, side, url)
						// ocr识别
						this.ocr(resourceKey, side)
					}
				})
			},
			async ocr(resourceKey, side) {
				const res = await this.$app.http('account/openAccount/common/banCardOcr', {
					resourceKey,
				})

				for (let key in res) {
					if (res[key]) this.$set(this.formData, key, res[key])
				}
			},
			async nextStep() {
				// 选择账户提交
				const res = await this.$app.http('account/openAccount/offline/bankCardSubmit', {
					applyId: this.$app.getData('applyId'),
					...this.formData,
					"bankCardFrontUrl": this.imgs[0], //证件正面照图片地址
				})

				this.$app.goPage(`/pages/infoFill/base`)

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
