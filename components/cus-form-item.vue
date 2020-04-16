<template>
	<view class="form-item">
		<view class="label">证件类型</view>
		<input placeholder-class="placeholder-css" type="text" value="" class="right-input input-css" placeholder="请填写证件号码" />
	</view>
</template>

<script>
	export default {
		props: {
			labelText: {
				default: 'label'
			},
			inputType: {
				default: 'input'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
