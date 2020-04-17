<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("/lib/css/base.scss");
	@import url("/lib/css/standard.scss");
	@import url("/lib/css/iconfont/iconfont.css");

	page {
		background-color: #FFF;
		color: $text-color-2;
		font-size: $font-m;
		position: relative;
		height: 100%;
		line-height: 1.5;
	}

	.placeholder-css {
		opacity: .92;
	}
</style>
