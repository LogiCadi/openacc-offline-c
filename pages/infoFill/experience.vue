<template>
	<!-- 资料填写 投资经验 -->
	<view class="index-page">

		<cus-header-progress index="2" />

		<view class="main-container">
			<view class="title">资料填写</view>

			<view class="title-sub">投资经验</view>

			<form class="form-container">

				<view class="form-item">
					<view class="label">香港上市证券</view>
					<picker class="right-input picker-css" @change="formData.hkStockExp = $event.detail.value+1" :range="experiencePick"
					 :value="formData.hkStockExp-1">
						<view class="uni-input">{{experiencePick[formData.hkStockExp-1]}}</view>
					</picker>
				</view>
				<view class="form-item">
					<view class="label">海外上市证券</view>
					<picker class="right-input picker-css" @change="formData.overseasStockExp = $event.detail.value+1" :range="experiencePick"
					 :value="formData.overseasStockExp-1">
						<view class="uni-input">{{experiencePick[formData.overseasStockExp-1]}}</view>
					</picker>
				</view>
				<view class="form-item">
					<view class="label">香港期货及期权</view>
					<picker class="right-input picker-css" @change="formData.hkFuturesExp = $event.detail.value+1" :range="experiencePick"
					 :value="formData.hkFuturesExp-1">
						<view class="uni-input">{{experiencePick[formData.hkFuturesExp-1]}}</view>
					</picker>
				</view>
				<view class="form-item">
					<view class="label">海外期货及期权</view>
					<picker class="right-input picker-css" @change="formData.overseasFuturesExp = $event.detail.value+1" :range="experiencePick"
					 :value="formData.overseasFuturesExp-1">
						<view class="uni-input">{{experiencePick[formData.overseasFuturesExp-1]}}</view>
					</picker>
				</view>

			</form>

			<view class="title-sub">投资知识</view>

			<form class="form-container">

				<view class="form-item" v-for="(item, index) in knowledgeRadioGroup" :key="index">
					<view class="label left">{{item.text}}</view>
					<radio-group class="right-input" @change="formData[item.key] = parseInt($event.detail.value);">
						<label class="radio-label">
							<radio class="radio" color="#187747" value="1" :checked="formData[item.key] === 1" />是</label>
						<label class="radio-label">
							<radio class="radio" color="#187747" value="0" :checked="formData[item.key] === 0" />否</label>
					</radio-group>
				</view>

				<view class="form-item">
					<checkbox-group @change="formData.agreeRisk = Number(!formData.agreeRisk)">
						<label class="radio-label" style="color: #1B7E3B;">
							<checkbox class="radio" color="#1B7E3B" :checked="formData.agreeRisk" />本人确认已仔细阅读并完全明白风险纰漏声明或在交易所购买的衍生产品所携带的风险作出解释，本人愿意承担相关衍生品所带来的潜在风险。</label>
					</checkbox-group>
				</view>

			</form>

		</view>

		<view class="button-wrap flex-set">
			<cus-button @c-tap="$app.goBack()" type="back">上一步</cus-button>
			<cus-button @c-tap="nextStep">下一步</cus-button>
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
				formData: {
					"overseasStockExp": 1, // 海外证券经验
					"overseasStockExpDesc": "",
					"hkStockExp": 1, // 香港证券经验
					"hkStockExpDesc": "",
					"hkFuturesExp": 2, // 香港期货及期权
					"hkFuturesExpDesc": "",
					"overseasFuturesExp": 2, // 海外期货及期权
					"overseasFuturesExpDesc": "",

					"derivativeExpStatus": 0, // 是否有相关衍生产品的经验 0 - 否， 1 - 是
					"derivativeExpStatusDesc": "",
					"derivativeCourseStatus": 0, // 是否曾接受有关衍生产品、性质和风险的一般知识培训或修读相关课程 0 - 否， 1 - 是
					"derivativeCourseStatusDesc": "",

					"derivativeWorkStatus": 0, // 现在或过去是否从事衍生品有关的工作  0 - 否， 1 - 是
					"derivativeWorkStatusDesc": "",
					"derivativeTradeStatus": 0, // 是否在过去三年曾买卖过至少五次任何衍生产品的交易 0 - 否， 1 - 是
					"derivativeTradeStatusDesc": "",

					"agreeRisk": 1, // 同意风险 1 - 选中， 0 - 未选中
					"agreeRiskDesc": ""
				},
				experiencePick: ['< 1 Year 年', '1-3 Year(s)年', '3-5 Years 年', '5-10 Years 年', '> 10 Years 年'],
				experienceIndexGroup: [0, 0, 0, 0],

				knowledgeRadioGroup: [{
					key: 'derivativeExpStatus',
					text: '是否有相关衍生产品的经验？',
				}, {
					key: 'derivativeCourseStatus',
					text: '是否曾接受有关衍生产品、性质和风险的一般知识培训或修读相关课程？',
				}, {
					key: 'derivativeWorkStatus',
					text: '现在或过去是否从事衍生品有关的工作？',
				}, {
					key: 'derivativeTradeStatus',
					text: '是否在过去三年曾买卖过至少五次任何衍生产品的 交易（无论是否在交易场所买卖）？',
				}, ],
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			async loadData() {
				const res = await this.$app.http('account/openAccount/offline/investExpInit', {
					applyId: this.$app.getData('applyId')
				})

				if (res) this.formData = res
			},
			async nextStep() {
				const res = await this.$app.http('account/openAccount/offline/investExpSubmit', {
					applyId: this.$app.getData('applyId'),
					...this.formData,
				})

				this.$app.goPage(`/pages/identity/index`)
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
				margin: 0 20rpx;
				color: $text-color-3;
			}

			.title-sub {
				font-size: $font-s;
				color: #fff;
				padding: 10rpx 20rpx;
				margin: 30rpx 0 10rpx;
				background: linear-gradient(to right, #187747, #21985C);
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
				font-size: $font-s;

				.form-item {
					flex: 1;
					padding: 20rpx 0;
					display: flex;
					align-items: center;

					.label {
						min-width: 200upx;
						text-align: right;
						padding: 0 20rpx;

						&.left {
							text-align: left;
							width: 100%;
						}
					}

					.radio-label {
						display: flex;
						flex: 1;
						margin: 0 10rpx;

						.radio {
							transform: scale(0.9);
						}
					}

					.right-input {
						display: flex;
						flex: 1;
					}

					.picker-css {
						color: #999999;
						border: 1rpx solid #E4E7EC;
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

				.form-row {
					display: flex;
					flex-wrap: wrap;
					align-items: center;

					.radio-label {
						white-space: nowrap;
						margin: 10rpx 0;

						.radio {
							transform: scale(0.9);
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
