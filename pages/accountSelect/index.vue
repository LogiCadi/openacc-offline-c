<template>
	<!-- 账户选择 -->
	<view class="index-page">

		<cus-header :index="1" />

		<view class="main-container flex-set">
			<view class="center-title">请选择您的账户</view>
			<block v-if="!selection">
				<cus-button class="button" @c-tap="selection = true">个人账户</cus-button>
				<cus-button class="button" type="back" @c-tap="nextStep(2, 0)">联名账户</cus-button>
			</block>
			<block v-else>
				<cus-button class="button" @c-tap="nextStep(1, 1)">香港证券保证金账户</cus-button>
				<cus-button class="button" @c-tap="nextStep(1, 2)">香港证券现金账户</cus-button>
			</block>
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
				selection: false, // 个人账户选择展开
			}
		},
		onLoad(option) {

		},
		methods: {
			async nextStep(accType, stockAccType) {
				// 选择账户提交
				const res = await this.$app.http('account/openAccount/offline/accountSubmit', {
					applyId: this.$app.getData('applyId'),
					accType,
					stockAccType
				})
				// 保存地区选择
				this.$app.setData('accType', accType)
				this.$app.setData('stockAccType', stockAccType)
				
				if (this.$app.getData('residentsType') === 4) {
					// 其他地区
					this.$app.goPage(`/pages/auth/passport`)
				} else {
					this.$app.goPage(`/pages/auth/identityCard`)
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-page {

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
