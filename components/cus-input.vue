<template>
	<input placeholder-class="placeholder-css" type="text" value="" :class="{focus: focus}" @focus="focus=true" @blur="focus=false"
	 class="input-css" :placeholder="placeholder" />
</template>

<script>
	export default {
		props: {
			placeholder: {
				default: '请填写'
			}
		},
		data() {
			return {
				focus: false,
			};
		}
	}
</script>

<style lang="scss">
	.input-css {
		flex: 1;
		transition: .3s;
		padding: 10rpx 20rpx;
		font-size: $font-m;
		border-bottom: 1px solid #E4E7EC;

		&.focus {
			border-bottom: 1px solid $text-color-1;
		}
	}

	.placeholder-css {
		font-size: $font-m;
		color: #999999;
	}
</style>
