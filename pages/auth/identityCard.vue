<template>
	<!-- 上传身份证 -->
	<view class="index-page">

		<cus-header-progress index="1" />

		<view class="main-container">
			<view class="title">身份证(1/3)</view>
			<view class="tips">请保持拍摄时光线良好，避免证件反光</view>
			<view class="imgs-wrap">
				<image class="img" :src="imgs[0] || '/static/image/身份证正面.png'" mode="aspectFill" @tap="upload(0)"></image>
				<image class="img" :src="imgs[1] || '/static/image/身份证反面.png'" mode="aspectFill" @tap="upload(1)"></image>
			</view>
			<block v-if="imgs[0]">
				<view class="title">请核对身份信息是否与证件上一致，如有误请修改</view>
				<form class="form-container">
					<view class="form-item">
						<view class="label">姓名</view>
						<cus-input class="right-input" :value="formData.name" @input="$set(formData, 'name', $event)" require />
					</view>
					<view class="form-item" v-if="region === 2 || region === 3">
						<view class="label">英文姓名</view>
						<cus-input class="right-input" :value="formData.nameEn" @input="$set(formData, 'nameEn', $event)" require />
					</view>
					<view class="form-item">
						<view class="label">性别</view>
						<radio-group class="right-input" @change="$set(formData, 'gender', parseInt($event.detail.value))">
							<label class="radio-label">
								<radio class="radio" color="#187747" value="1" :checked="formData.gender === 1" />男</label>
							<label class="radio-label">
								<radio class="radio" color="#187747" value="2" :checked="formData.gender === 2" />女</label>
						</radio-group>
					</view>
					<view class="form-item">
						<view class="label">身份证号</view>
						<cus-input class="right-input" :value="formData.idNo" @input="$set(formData, 'idNo', $event)" require />
					</view>
					<view class="form-item">
						<view class="label">出生日期</view>

						<picker class="right-input picker-css" mode="date" @change="$set(formData, 'birthDate', $event.detail.value)"
						 :value="formData.birthDate">
							<view>{{formData.birthDate || '请选择'}}</view>
						</picker>
					</view>
					<view class="form-item" v-if="region === 1">
						<view class="label">住址</view>
						<cus-input class="right-input" :value="formData.idAddr" @input="$set(formData, 'idAddr', $event)" />
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
				region: this.$app.getData('residentsType'),
				imgs: [],
				formData: {}
			}
		},
		onLoad() {
			// this.loadData()
		},
		methods: {
			async loadData() {
				const res = await this.$app.http('account/openAccount/offline/idCardInit', {
					applyId: this.$app.getData('applyId')
				})
				
			},
			upload(side) {
				// side 0 正面 1 反面
				uni.chooseImage({
					success: async res => {
						const path = res.tempFilePaths[0]
						const {
							resourceKey,
							url
						} = await this.$app.uploadOSS(path, 1, `openacc/${this.$app.getData('applyId') || 0}/idcard/${side}`)
						// 显示已上传成功的图片
						this.$set(this.imgs, side, url)
						// ocr识别
						this.ocr(resourceKey, side)
					}
				})
			},
			async ocr(resourceKey, side) {
				const res = await this.$app.http('account/openAccount/common/idCardOcr', {
					resourceKey,
					side: side === 0 ? 'face' : 'back',
					idType: this.region, // 1： 中国大陆身份证 2： 中国香港身份证 3： 护照或者其他
				})

				for (let key in res) {
					if (res[key]) this.$set(this.formData, key, res[key])
				}
			},
			async nextStep() {
				// 选择账户提交
				const res = await this.$app.http('account/openAccount/offline/idCardSubmit', {
					applyId: this.$app.getData('applyId'),
					...this.formData,
					"idFrontUrl": this.imgs[0], //证件正面照图片地址
					"idBackUrl": this.imgs[1], //证件反面照图片地址
				})
				if (this.region === 1) {
					// 
					this.$app.goPage(`/pages/auth/hmTraffic`)
				} else if (this.region === 2) {
					// 住址证明
					this.$app.goPage(`/pages/auth/addrProof`)
				} else if (this.region === 3) {
					// 过关证明
					this.$app.goPage(`/pages/auth/passProof`)
				}

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
