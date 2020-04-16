<template>
	<!-- 资料填写 投资经验 -->
	<view class="index-page">

		<cus-header-progress index="2" />

		<view class="main-container">
			<view class="title">资料填写</view>

			<view class="title-sub">投资经验</view>

			<form class="form-container">

				<view class="form-row">
					<view class="form-item">
						<view class="label">香港上市证券</view>
						<picker class="right-input picker-css" @change="selectIndex = $event.detail.value" :range="selectList" :value="selectIndex">
							<view class="uni-input">{{selectList[selectIndex]}}</view>
						</picker>
					</view>
					<view class="form-item">
						<view class="label">香港上市证券</view>
						<picker class="right-input picker-css" @change="selectIndex = $event.detail.value" :range="selectList" :value="selectIndex">
							<view class="uni-input">{{selectList[selectIndex]}}</view>
						</picker>
					</view>
				</view>
				<view class="form-row">
					<view class="form-item">
						<view class="label">香港上市证券</view>
						<picker class="right-input picker-css" @change="selectIndex = $event.detail.value" :range="selectList" :value="selectIndex">
							<view class="uni-input">{{selectList[selectIndex]}}</view>
						</picker>
					</view>
					<view class="form-item">
						<view class="label">香港上市证券</view>
						<picker class="right-input picker-css" @change="selectIndex = $event.detail.value" :range="selectList" :value="selectIndex">
							<view class="uni-input">{{selectList[selectIndex]}}</view>
						</picker>
					</view>
				</view>

			</form>

			<view class="title-sub">投资知识</view>

			<form class="form-container">

				<view class="form-item" v-for="(item, index) in knowledgeRadioGroup" :key="index">
					<view class="label left">{{item.text}}</view>
					<radio-group class="right-input" @change="knowledgeRadioGroup[index].value = $event.detail.value">
						<label class="radio-label">
							<radio class="radio" color="#187747" :value="1" :checked="item.value === 1" />是</label>
						<label class="radio-label">
							<radio class="radio" color="#187747" :value="0" :checked="item.value === 0" />否</label>
					</radio-group>
				</view>
				
				<view class="form-item">
					<label class="radio-label">
						<radio class="radio" color="#187747" />本人确认已仔细阅读并完全明白风险纰漏声明或在交易所购买的衍生产品所携带的风险作出解释，本人愿意承担相关衍生品所带来的潜在风险。</label>
				</view>

			</form>

		</view>

		<view class="button-wrap flex-set">
			<cus-button @c-tap="$app.goBack()" type="back">上一步</cus-button>
			<cus-button @c-tap="$app.goPage(`/pages/infoFill/base`)">下一步</cus-button>
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
				knowledgeRadioGroup: [{
					text: '是否有相关衍生产品的经验？',
					value: 1,
				}, {
					text: '是否曾接受有关衍生产品、性质和风险的一般知识培训或修读相关课程？',
					value: 1,
				}, {
					text: '现在或过去是否从事衍生品有关的工作？',
					value: 1,
				}, {
					text: '是否在过去三年曾买卖过至少五次任何衍生产品的 交易（无论是否在交易场所买卖）？',
					value: 1,
				}, ],
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
				color: #E27325;
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

						&.left {
							text-align: left;
							width: 100%;
						}
					}

					.radio-label {
						display: flex;
						flex: 1;
						margin: 0 10upx;

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
							transform: scale(0.7);
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
