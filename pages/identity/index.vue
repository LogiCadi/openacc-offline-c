<template>
	<!-- 资料填写 身份声明 -->
	<view class="index-page">

		<cus-header-progress index="3" />

		<view class="main-container">
			<view class="title">身份声明</view>

			<view class="title-sub">投资知识</view>

			<form class="form-container">

				<view class="form-item" style="padding: 10rpx 0;">
					<checkbox-group @change="checkboxChange">
						<label class="radio-label" style="margin: 10rpx 0;" v-for="(item, index) in riskList" :key="index">
							<checkbox class="radio" color="#1B7E3B" :value="index+''" :checked="formData.idStatement&&formData.idStatement.includes(index+1)" />{{item}}</label>
					</checkbox-group>
				</view>

				<view class="title-sub">投资经验</view>

				<view class="tax-group" v-for="(item, index) in formData.taxInfo" :key="index">
					<view class="form-item">
						<view class="label">国家/地区</view>
						<cus-input class="right-input" :value="item.taxRegion" @input="formData.taxInfo[index].taxRegion = $event" />
					</view>

					<view class="form-item">
						<view class="label">税务编号</view>
						<cus-input class="right-input" :value="item.taxNo" @input="formData.taxInfo[index].taxNo = $event" />
					</view>
				</view>

				<view class="tips" @tap="addTaxInfo">+添加其他税务信息</view>
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
					"idStatement": [1, 2, 3, 4], // 身份声明  多选

					"taxInfo": [{ // 税务相关信息 支持多个
							"taxRegion": 1, // 税务国家/地区
							"taxRegionDesc": "",
							"taxNo": "444089", // 税务号
						},
						{ // 税务相关信息 支持多个
							"taxRegion": 1, // 税务国家/地区
							"taxRegionDesc": "",
							"taxNo": "444089", // 税务号
						},
					],
				},
				riskList: [
					'本人是此账户的最终受益人。',


					'本人个人或与配偶无共同控制任何华夏常青证券的公司客户35%或以上的投票权。',


					'本人、配偶、父母、及/或子女不是华夏常青证券公司账户的董事及/或股东。',


					'本人的配偶、父母，及/或子女不是华夏常青证券的客户。',


					'本人与华夏常青证券任何员工无亲属关系。',


					'本人不是香港证监会持牌人或注册人的员工。',


					`本人、本人的配偶、伴侣、子女或父母，或本人子女的配偶或伴侣，或与本人关
							系密切的人没有担任或曾担任重要公职，包括国家元首、政府首长、资深从政者、
							高级政府、司法或军事官员、国有企业高级行政人员及重要政党干事。`,


					'本人没有在本人旗下公司开立保证金融资账户。',


					'本人的配偶没有持有本公司任何相关保证金融资账户。',

				],

				taxRow: 1,
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			addTaxInfo() {
				this.formData.taxInfo.push({ // 税务相关信息 支持多个
					"taxRegion": 1, // 税务国家/地区
					"taxRegionDesc": "",
					"taxNo": "444089", // 税务号
				})
			},
			checkboxChange(e) {
				this.formData.idStatement = e.detail.value.map(e => parseInt(e) + 1)
			},

			async loadData() {
				const res = await this.$app.http('account/openAccount/offline/idStatementInit', {
					applyId: this.$app.getData('applyId')
				})

				for (let key in res) {
					if (res[key]) this.$set(this.formData, key, res[key])
				}
			},
			async nextStep() {
				const res = await this.$app.http('account/openAccount/offline/idStatementSubmit', {
					applyId: this.$app.getData('applyId'),
					...this.formData,
				})

				this.$app.goPage(`/pages/success/success`)
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
						text-align: right;
						padding: 0 20rpx;

						&.left {
							text-align: left;
							width: 100%;
						}
					}

					.radio-label {
						display: flex;
						align-items: center;
						flex: 1;
						margin: 0 10rpx;

						.radio {
							transform: scale(0.7);
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
							transform: scale(0.7);
						}
					}
				}

				.tax-group {
					padding: 10upx 0;

					.label {
						width: 150upx;
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
