<template>
	<view class="button flex-set" :class="[type]">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			// 按钮背景类型
			type: {
				default: 's-1'
			}
		},

	}
</script>

<style lang="scss" scoped>
	.button {
		border-radius: 5upx;
	}

	.button.s-1 {
		color: #fff;
		background: $bg-color-1;
	}

	.button.s-2 {
		color: #AE8463;
		background-color: #fff;
		border: 1px solid #AE8463;
	}
</style>
