<template>
	<!-- 地区选择 -->
	<view class="page-container">

		<cus-header :index="1" />



		<view class="main-container">
			<view class="center-title">请选择您所属地区</view>
			<cus-button class="button" type="back" @c-tap="nextStep(1)">大陆地区</cus-button>
			<cus-button class="button" type="back" @c-tap="nextStep(2)">香港地区</cus-button>
			<cus-button class="button" type="back" @c-tap="nextStep(3)">澳门地区</cus-button>
			<cus-button class="button" type="back" @c-tap="nextStep(4)">其他地区</cus-button>
		</view>

	</view>
</template>

<script>
	import cusHeader from '@/components/cus-header.vue'
	import cusButton from '@/components/cus-button.vue'
	export default {
		components: {
			cusHeader,
			cusButton,
		},
		data() {
			return {

			}
		},
		onLoad() {
			if (!this.$app.getData('applyId')) {
				// 申请applyId
				this.getApplyId()
			}
		},
		methods: {
			async getApplyId() {
				// 开户获取申请id => applyId
				const res = await this.$app.http('account/openAccount/offline/residentsTypeInit', {
					reqId: this.$app.randomStr()
				})

				this.$app.setData('applyId', res.applyId)
			},
			async nextStep(residentsType) {
				// 选择居民所在地区提交
				const res = await this.$app.http('account/openAccount/offline/residentsTypeSubmit', {
					applyId: this.$app.getData('applyId'),
					residentsType
				})
				// 保存地区选择
				this.$app.setData('residentsType', residentsType)
				this.$app.goPage(`/pages/accountSelect/index`)

			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-container {
		height: 100%;
		display: flex;
		flex-direction: column;

		.main-container {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 150upx 0;

			.center-title {
				font-size: $font-xl;
			}

			.button {
				padding: 20rpx 40rpx;
				width: 300upx;
				margin-top: 40rpx;

				.region-img {
					width: 30upx;
					height: 30upx;
				}
			}
		}
	}
</style>
