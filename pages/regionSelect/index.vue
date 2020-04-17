<template>
	<!-- 地区选择 -->
	<view class="page-container">

		<cus-header :index="1" />
		
		<view class="main-container">
			<view class="center-title">请选择您所属地区</view>
		</view>
		
		<view class="button-group">
			<view class="button">
				<image src="/static/image/region/zg.png" mode=""></image>
				大陆地区：使用第二代居民身份证
			</view>
			<view class="row">
				<view class="button">
					<image src="/static/image/region/zg.png" mode=""></image>
					大陆地区
				</view>
				<view class="button">
					<image src="/static/image/region/zg.png" mode=""></image>
					大陆地区
				</view>
			</view>
			<view class="button">
				<image src="/static/image/region/zg.png" mode=""></image>
				大陆地区
			</view>
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
	.page-container {
		height: 100%;
		display: flex;
		flex-direction: column;
	
		.main-container {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 200upx 0;
	
			.center-title {
				font-size: $font-xl;
				margin: 200upx 0;
			}
		}
	}
</style>
