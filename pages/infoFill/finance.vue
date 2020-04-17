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
					<radio-group class="right-input" @change="radioChange($event, 'liveRadio')">
						<label class="radio-label" v-for="(item, index) in liveRadio" :key="index">
							<radio class="radio" color="#187747" :value="item.value" :checked="item.checked" />{{item.value}}</label>
					</radio-group>
				</view>
				<view class="form-row">
					<view class="form-item">
						<view class="label">总资产净值</view>
						<picker class="right-input picker-css" @change="selectIndex = $event.detail.value" :range="selectList" :value="selectIndex">
							<view class="uni-input">{{selectList[selectIndex]}}</view>
						</picker>
					</view>
					<view class="form-item">
						<view class="label">总资产净值</view>
						<picker class="right-input picker-css" @change="selectIndex = $event.detail.value" :range="selectList" :value="selectIndex">
							<view class="uni-input">{{selectList[selectIndex]}}</view>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<view class="label">年收入</view>
					<picker class="right-input picker-css" @change="selectIndex = $event.detail.value" :range="selectList" :value="selectIndex">
						<view class="uni-input">{{selectList[selectIndex]}}</view>
					</picker>
				</view>

				<view class="form-item">
					<view class="label">总资产净值(可多选)</view>
				</view>

				<checkbox-group class="form-row">
					<label class="radio-label" style="width: 33%;" v-for="(item, index) in financeCheck" :key="index">
						<checkbox :value="item.value" class="radio" color="#187747" :checked="item.checked" />{{item.value}}</label>
					<cus-input />
				</checkbox-group>

				<view class="form-item">
					<view class="label">投资目的(可多选)</view>
				</view>

				<checkbox-group class="form-row">
					<label class="radio-label" style="width: 25%;" v-for="(item, index) in purposeCheck" :key="index">
						<checkbox :value="item.value" class="radio" color="#187747" :checked="item.checked" />{{item.value}}</label>
				</checkbox-group>
				
				<view class="form-item">
					<view class="label">可承受风险</view>
					<picker class="right-input picker-css" @change="riskIndex = $event.detail.value" :range="riskPick" :value="riskIndex">
						<view class="uni-input">{{riskPick[riskIndex]}}</view>
					</picker>
				</view>
				
				<view class="tips">注：证券保证金购买账户属于“中等风险”或“高风险”类别</view>


			</form>

		</view>

		<view class="button-wrap flex-set">
			<cus-button @c-tap="$app.goBack()" type="back">上一步</cus-button>
			<cus-button @c-tap="$app.goPage(`/pages/infoFill/experience`)">下一步</cus-button>
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
				liveRadio: [{
						value: '自住',
						checked: true
					},
					{
						value: '租住',
						checked: false
					},
				],

				selectList: ['受雇', '自雇', '退休', '其他'],
				selectIndex: 0,

				financeCheck: [{
					value: '工作收入',
					checked: true
				}, {
					value: '投资收益',
					checked: false
				}, {
					value: '馈赠',
					checked: false
				}, {
					value: '商业买卖收益',
					checked: false
				}, {
					value: '遗产继承',
					checked: false
				}, {
					value: '诉讼收益',
					checked: false
				}, {
					value: '退休金',
					checked: false
				}, {
					value: '配偶/父母',
					checked: false
				}, {
					value: '赌博',
					checked: false
				}, {
					value: '保险收益',
					checked: false
				}, {
					value: '其他（请注明）',
					checked: false
				}, ],

				purposeCheck: [{
					value: '收入',
					checked: false
				}, {
					value: '对冲',
					checked: false
				}, {
					value: '资本增值',
					checked: false
				}, {
					value: '投机',
					checked: false
				}],
				
				riskPick: ['中风险', '较高风险'],
				riskIndex: 0,
			}
		},
		onLoad() {

		},
		methods: {
			// radio切换
			radioChange(e, arrName) {
				const value = e.detail.value
				for (let key in this[arrName]) {
					if (this[arrName][key].value === value) {
						this[arrName][key].checked = true
					}
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
