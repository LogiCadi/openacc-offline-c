<template>
	<!-- 资料填写 基本信息 -->
	<view class="index-page">

		<cus-header-progress index="2" />

		<view class="main-container">
			<view class="title">资料填写</view>

			<view class="title-sub">个人信息</view>

			<form class="form-container">
				<view class="form-item">
					<view class="label">称谓</view>
					<radio-group class="right-input" @change="formData.appellation = parseInt($event.detail.value)">
						<label class="radio-label" v-for="(item, index) in callRadio" :key="index">
							<radio class="radio" color="#187747" :value="index+1+''" :checked="index+1 === formData.appellation" />{{item}}</label>
					</radio-group>
				</view>
				<view class="form-row">
					<view class="form-item">
						<view class="label">姓氏</view>
						<cus-input class="right-input" :value="formData.firstName" @input="$set(formData, 'firstName', $event)" />
					</view>
					<view class="form-item">
						<view class="label">名字</view>
						<cus-input class="right-input" :value="formData.lastName" @input="$set(formData, 'lastName', $event)" />
					</view>
					<view class="form-item">
						<view class="label">中间名</view>
						<cus-input class="right-input" :value="formData.middleName" @input="$set(formData, 'middleName', $event)" />
					</view>
				</view>
				<view class="form-row">
					<view class="form-item">
						<view class="label">国籍</view>
						<cus-input class="right-input" :value="formData.nationality" @input="$set(formData, 'nationality', $event)" />
					</view>
					<view class="form-item">
						<view class="label">证件签发地</view>
						<cus-input class="right-input" :value="formData.issuingCountry" @input="$set(formData, 'issuingCountry', $event)" />
					</view>
				</view>
				<view class="form-row">
					<view class="form-item">
						<view class="label">联系方式</view>
						<cus-input class="right-input" :value="formData.mobileNo" @input="$set(formData, 'mobileNo', $event)" />
					</view>
					<view class="form-item">
						<view class="label">电子邮箱</view>
						<cus-input class="right-input" :value="formData.email" @input="$set(formData, 'email', $event)" />
					</view>
				</view>
			</form>

			<view class="title-sub">个人信息</view>
			<form class="form-container">
				<view class="form-item">
					<view class="label">职业状态</view>
					<picker class="right-input picker-css" @change="formData.jobStatus = $event.detail.value + 1" :range="selectList"
					 :value="formData.jobStatus - 1">
						<view class="uni-input">{{selectList[formData.jobStatus-1] || '请选择'}}</view>
					</picker>
				</view>
				<view class="form-row">
					<view class="form-item">
						<view class="label">职位</view>
						<cus-input class="right-input" :value="formData.jobInfo.position" @input="formData.jobInfo.position = $event" />
					</view>
					<view class="form-item">
						<view class="label">服务年限</view>
						<cus-input class="right-input" :value="formData.jobInfo.workYear" @input="$set(formData, 'firstName', $event)" />
					</view>
				</view>
				<view class="form-item">
					<view class="label">公司名称</view>
					<cus-input class="right-input" :value="formData.jobInfo.companyName" @input="$set(formData, 'firstName', $event)" />
				</view>
				<view class="form-item">
					<view class="label">公司地址</view>
					<cus-input class="right-input" :value="formData.jobInfo.companyAddr" @input="$set(formData, 'firstName', $event)" />
				</view>
				<view class="form-item">
					<view class="label">上市公司</view>
					<view class="right-input">
						<radio-group class="right-input" @change="">
							<label class="radio-label" v-for="(item, index) in ['否', '是']" :key="index">
								<radio class="radio" color="#187747" :value="index" :checked="index === formData.jobInfo.listedStatus" />{{item}}</label>
						</radio-group>
					</view>
				</view>


			</form>
		</view>

		<view class="button-wrap flex-set">
			<cus-button @c-tap="$app.goBack()" type="back">上一步</cus-button>
			<cus-button @c-tap="$app.goPage(`/pages/infoFill/finance`)">下一步</cus-button>
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
				callRadio: ['先生', '女士', '太太', '小姐'],
				selectList: ['受雇', '自雇', '退休', '其他'],

				formData: {}
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			async loadData() {
				const res = await this.$app.http('account/openAccount/offline/basicInfoInit', {
					applyId: this.$app.getData('applyId')
				})

				this.formData = res
			},
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

				.form-row {
					display: flex;
				}

				.form-item {
					padding: 20rpx 0;
					display: flex;
					align-items: center;

					.label {
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
