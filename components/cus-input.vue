<template>
	<view class="component-container">
		<input placeholder-class="placeholder-css" type="text" :value="value" @input="$emit('input', $event.detail.value)"
		 :class="{focus: focus, error: error}" @focus="focus = true;error = false" @blur="blur" class="input-css"
		 :placeholder="placeholder" />
		<view class="tips" v-show="error">{{errorMsg}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: {
				default: '请填写'
			},
			value: {
				default: ''
			},
			require: {
				default: false
			},
		},
		data() {
			return {
				focus: false,
				error: false,
				errorMsg: '该项为必填项'
			};
		},
		methods: {
			blur() {
				this.focus = false
				if (this.require && !this.value.trim()) {
					// 必填
					this.error = true
				} else {
					this.error = false
				}
			}
		}
	}
</script>

<style lang="scss">
	.component-container {
		position: relative;
		flex: 1;

		.input-css {
			width: 100%;
			transition: .3s;
			padding: 10rpx 20rpx;
			font-size: $font-m;
			border-bottom: 1px solid #E4E7EC;

			&.focus {
				border-bottom: 1px solid $text-color-1;
			}

			&.error {
				border-bottom: 1px solid #f00;
			}
		}

		.placeholder-css {
			font-size: $font-m;
			color: #999999;
		}

		.tips {
			position: absolute;
			bottom: -32upx;
			font-size: $font-xs;
			color: #f00;
			padding: 0rpx 20rpx;
			white-space: nowrap;
		}

	}
</style>
