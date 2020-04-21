<template>
	<!-- 资料填写 财务状况 -->
	<view class="index-page">

		<cus-header-progress index="2" />

		<view class="main-container">
			<view class="title">资料填写</view>

			<view class="title-sub">财务状况</view>

			<form class="form-container">
				<view class="form-item">
					<view class="label">住房</view>
					<radio-group class="right-input" @change="formData.housing = parseInt($event.detail.value) + 1">
						<label class="radio-label" v-for="(item, index) in ['自置', '租住']" :key="index">
							<radio class="radio" color="#187747" :value="index+''" :checked="index+1 === formData.housing" />{{item}}</label>
					</radio-group>
				</view>
				<view class="form-row" v-if="formData.housing === 1">
					<view class="form-item">
						<view class="label">剩余按揭</view>
						<cus-input class="right-input" :value="formData.housingInfo.remainMortgage" @input="formData.housingInfo.remainMortgage = $event" />
					</view>
					<view class="form-item" v-if="formData.housing === 2">
						<view class="label">每月房贷</view>
						<cus-input class="right-input" :value="formData.housingInfo.monthlyMortgage" @input="formData.housingInfo.monthlyMortgage = $event" />
					</view>
				</view>
				<view class="form-item">
					<view class="label">每月租金支出</view>
					<cus-input class="right-input" :value="formData.housingInfo.monthlyRent" @input="formData.housingInfo.monthlyRent = $event" />
				</view>

				<view class="form-item">
					<view class="label">总资产净值</view>
					<picker class="right-input picker-css" @change="totalNetAssetsPickChange" :range="totalNetAssets" range-key="valueDesc"
					 :value="totalNetAssetsIndex">
						<view class="uni-input">{{totalNetAssets[totalNetAssetsIndex]&&totalNetAssets[totalNetAssetsIndex].valueDesc}}</view>
					</picker>
				</view>
				<view class="form-item">
					<view class="label">流动资产值</view>
					<picker class="right-input picker-css" @change="circulatingAssetsPickChange" :range="circulatingAssets" range-key="valueDesc"
					 :value="circulatingAssetsIndex">
						<view class="uni-input">{{circulatingAssets[circulatingAssetsIndex]&&circulatingAssets[circulatingAssetsIndex].valueDesc}}</view>
					</picker>
				</view>
				<view class="form-item">
					<view class="label">年收入</view>
					<picker class="right-input picker-css" @change="annualIncomePickChange" :range="annualIncome" range-key="valueDesc"
					 :value="annualIncomeIndex">
						<view class="uni-input">{{annualIncome[annualIncomeIndex]&&annualIncome[annualIncomeIndex].valueDesc}}</view>
					</picker>
				</view>

				<view class="form-item">
					<view class="label">总资产净值(可多选)</view>
				</view>

				<checkbox-group class="form-row" @change="capitalSourceCheckboxChange">
					<label class="radio-label" style="width: 33%;" v-for="(item, index) in capitalSource" :key="index">
						<checkbox :value="item.value+''" class="radio" color="#187747" :checked="formData.capitalSource.includes(parseInt(item.value))" />{{item.valueDesc}}</label>
					<cus-input />
				</checkbox-group>

				<view class="form-item">
					<view class="label">投资目的</view>
				</view>

				<radio-group class="form-row" @change="formData.investTarget = parseInt($event.detail.value)">
					<label class="radio-label" style="flex: 1;" v-for="(item, index) in ['收入', '对冲', '资本增值', '投机']" :key="index">
						<radio class="radio" color="#187747" :value="index+1+''" :checked="index+1 === formData.investTarget" />{{item}}</label>
				</radio-group>

				<!-- <checkbox-group class="form-row" @change="investTargetCheckboxChange">
					<label class="radio-label" style="width: 25%;" v-for="(item, index) in ['收入', '对冲', '资本增值', '投机']" :key="index">
						<checkbox :value="index+1+''" class="radio" color="#187747" :checked="formData.investTarget&&formData.investTarget.includes(index+1)" />{{item}}</label>
				</checkbox-group> -->

				<view class="form-item">
					<view class="label">可承受风险</view>
					<picker class="right-input picker-css" @change="formData.riskTolerance = $event.detail.value + 1" :range="riskPick"
					 :value="formData.riskTolerance - 1">
						<view class="uni-input">{{riskPick[formData.riskTolerance - 1]}}</view>
					</picker>
				</view>

				<view class="tips">注：证券保证金购买账户属于“中等风险”或“高风险”类别</view>


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
					"housing": 1, // 1 - 自置， 2 - 租住 参考枚举
					"housingDesc": "",
					"housingInfo": {
						"remainMortgage": "", // 剩余按揭
						"monthlyMortgage": "", // 每月按揭
						"monthlyRent": "", // 每月房租
					},
					"annualIncome": 1, //全年收入 参考枚举
					"annualIncomeDesc": "",
					"totalNetAssets": 1, // 总资产净值  参考枚举
					"totalNetAssetsDesc": "",
					"circulatingAssets": 1, // 流动资产值 参考枚举
					"circulatingAssetsDesc": "",
					"capitalSource": [1, 2], // 资金来源  支持多个值 参考枚举
					"capitalSourceDesc": ["", ""], // 资金来源描述
					"investTarget": "1", // 投资目标  参考枚举
					"investTargetDesc": "",
					"riskTolerance": "1", // 风险承受能力
					"riskToleranceDesc": ""
				},

				totalNetAssets: [], // 净资产值
				circulatingAssets: [], // 流动资产值
				annualIncome: [], // 全年收入值
				capitalSource: [], // 资金来源

				riskPick: ['低风险', '中风险', '高风险'],
				riskIndex: 0,
			}
		},
		onLoad() {
			this.loadData()
			this.getEnum()
		},
		computed: {
			totalNetAssetsIndex() {
				for (let index in this.totalNetAssets) {
					if (this.formData.totalNetAssets === this.totalNetAssets[index].value) {
						return parseInt(index)
					}
				}
				return 0
			},
			circulatingAssetsIndex() {
				for (let index in this.circulatingAssets) {
					if (this.formData.circulatingAssets === this.circulatingAssets[index].value) {
						return parseInt(index)
					}
				}
				return 0
			},
			annualIncomeIndex() {
				for (let index in this.annualIncome) {
					if (this.formData.annualIncome === this.annualIncome[index].value) {
						return parseInt(index)
					}
				}
				return 0
			},
		},
		methods: {
			totalNetAssetsPickChange(e) {
				const selectIndex = e.detail.value
				for (let index in this.totalNetAssets) {
					if (parseInt(index) === selectIndex) {
						this.$set(this.formData, 'totalNetAssets', this.totalNetAssets[index].value)
						break
					}
				}
			},
			circulatingAssetsPickChange(e) {
				const selectIndex = e.detail.value
				for (let index in this.circulatingAssets) {
					if (parseInt(index) === selectIndex) {
						this.$set(this.formData, 'circulatingAssets', this.circulatingAssets[index].value)
						break
					}
				}
			},
			annualIncomePickChange(e) {
				const selectIndex = e.detail.value
				for (let index in this.annualIncome) {
					if (parseInt(index) === selectIndex) {
						this.$set(this.formData, 'annualIncome', this.annualIncome[index].value)
						break
					}
				}
			},
			capitalSourceCheckboxChange(e) {
				this.formData.capitalSource = e.detail.value.map(e => parseInt(e))
			},
			investTargetCheckboxChange(e) {
				this.formData.investTarget = e.detail.value.map(e => parseInt(e))
			},

			async getEnum() {
				const res = await this.$app.http('account/openAccount/common/enumInit')
				this.totalNetAssets = res.totalNetAssets
				this.circulatingAssets = res.circulatingAssets
				this.annualIncome = res.annualIncome
				this.capitalSource = res.capitalSource
			},
			async loadData() {
				const res = await this.$app.http('account/openAccount/offline/financeInit', {
					applyId: this.$app.getData('applyId')
				})

				if (res) this.formData = res
			},
			async nextStep() {
				const res = await this.$app.http('account/openAccount/offline/financeSubmit', {
					applyId: this.$app.getData('applyId'),
					...this.formData,
				})

				this.$app.goPage(`/pages/infoFill/experience`)
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

			.title-sub {
				font-size: $font-s;
				color: #fff;
				padding: 10rpx 20rpx;
				margin: 30upx 0 10upx;
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
						min-width: 180upx;
						text-align: right;
						padding: 0 20rpx;
					}

					.radio-label {
						display: flex;
						align-items: center;
						flex: 1;

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

				.form-row {
					display: flex;
					flex-wrap: wrap;
					align-items: center;

					.radio-label {
						white-space: nowrap;
						margin: 10upx 0;

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
