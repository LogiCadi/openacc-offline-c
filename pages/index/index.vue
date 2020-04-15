<template>
	<view class="index-page">
		<cus-header></cus-header>
		
		<view class="main-container flex-set">
			<view class="button" @tap="$app.goPage(`/pages/bussiness/index`)">业务办理</view>
		</view>
	</view>
</template>

<script>
	import cusHeader from '@/components/cus-header.vue'
	export default {
		components: {
			cusHeader
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.index-page {
		
		.main-container {
			min-height: 500upx;
			flex-direction: column;
		
			.button {
				padding: 20upx 40upx;
				margin: 40upx;
				border-radius: 10upx;
				color: #fff;
				background: $text-color-1;
			}
		}
	}
</style>
