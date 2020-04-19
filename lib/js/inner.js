// 基础方法
export default {
	/**
	 * 基础跳转
	 * @param String url 
	 */
	goPage(url) {
		// #ifdef H5
		if (~url.indexOf('http')) {
			location.href = url.slice(url.indexOf('http'))
			return
		}
		// #endif
		uni.navigateTo({
			url,
			fail() {
				uni.redirectTo({
					url,
					fail() {
						uni.switchTab({
							url,
							fail() {
								uni.reLaunch({
									url,
								})
							}
						})
					}
				})
			}
		})
	},

	goBack() {
		uni.navigateBack()
	},

	toast(content, icon = 'none', duration = 1500) {
		uni.showToast({
			title: content,
			icon,
			duration
		})
	},
	modal(content, callBack = false, confirmText = '确定', cancelText = '取消') {
		uni.showModal({
			title: '提示',
			content,
			confirmText,
			cancelText,
			showCancel: Boolean(callBack),
			success: res => {
				res.confirm && callBack && callBack()
			},
		});
	},
	// 复制
	copy(data) {
		uni.setClipboardData({
			data: data.toString(),
			success: () => this.toast('复制成功', 'success')
		});
	},
	/**获取元素节点信息 */
	getEle(dom, callBack) {
		//创建节点选择器
		var query = uni.createSelectorQuery();
		//选择id
		query.select(dom).boundingClientRect()
		query.exec(callBack)
	},
	// 预览图片
	preImg(img) {
		let imgPath = img
		if (typeof(img) == 'string') {
			imgPath = [img]
		}
		uni.previewImage({
			urls: imgPath
		});
	},
	// 设置全局变量
	setData(key, value) {
		this[key] = value

		uni.setStorage({
			key,
			data: value
		})
	},
	// 获取全局变量
	getData(key) {
		let value = this[key]

		if (value === undefined) {
			value = uni.getStorageSync(key)
			this[key] = value
		}

		return value
	},

	setVal(key, value) {
		this[key] = value
	},
	getVal(key) {
		return this[key]
	},

	/**
	 * 当前页面实例对象
	 */
	getPage() {
		return getCurrentPages()[getCurrentPages().length - 1] && getCurrentPages()[getCurrentPages().length - 1].$vm || null
	},

	/**
	 * 文件上传
	 * @param Array file 文件路径
	 */
	upload(file, callBack) {
		uni.showLoading({
			title: '上传中...'
		})
		if (typeof file == 'string') {
			file = [file]
		}
		let realFile = []
		for (let i = 0; i < file.length; i++) {
			if (!file[i]) {
				file.splice(i, 1)
			} else {
				uni.uploadFile({
					url: this.HTTP_URL + 'upload',
					filePath: file[i],
					name: 'file',
					success: res => {
						res = JSON.parse(res.data)
						if (res.code) this.toast(res.msg, 'none')
						else {
							realFile[i] = res.data.url
							if (realFile.length == file.length) {
								// 全部上传完成 返回数组
								uni.hideLoading()
								callBack && callBack(realFile)
							}
						}
					}
				});
			}
		}

	},
	// 打开视频广告
	openVideoAd(success, kindness = 1) {
		const page = this.getPage()
		let adUnitId
		if (this.platform == 'MP-WEIXIN') {
			adUnitId = this.adUnitId
		} else if (this.platform == 'MP-QQ') {
			adUnitId = this.qq_adUnitId
		} else {
			this.toast('没有广告')
			return
		}
		// 创建视频广告
		if (!page.videoAd) {
			uni.showLoading({
				title: "请稍等..."
			})
			if (wx.createRewardedVideoAd) {
				page.videoAd = wx.createRewardedVideoAd({
					adUnitId
				})
			} else {
				this.modal('程序版本过低')
			}

			page.videoAd.onClose(status => {
				if (status && status.isEnded || status === undefined) {
					// 可领奖励
					success && success()
				} else {
					this.toast('观看完视频才有奖励哦')
				}
			})

			page.videoAd.onError(err => {
				this.toast("抱歉，暂无合适的广告")
				kindness == 1 && success && success()
			})
			uni.hideLoading()
		}
		// 打开
		page.videoAd.show().catch(err => {
			// 失败重试
			page.videoAd.load().then(() => {
				page.videoAd.show().catch(err => {
					this.toast('视频广告创建失败')
				})
			})
		})
	},

	/**插屏广告*/
	openInterstitialAd() {
		const page = this.getPage()
		if (!page.interstitialAd) {
			page.interstitialAd = wx.createInterstitialAd({
				adUnitId: this.interstitialAd_adUnitId
			})
		}

		if (page.interstitialAd) {
			page.interstitialAd.show().catch(err => {
				console.log(err)
			})
		} else {
			console.error('插屏广告创建失败')
		}

	},
	
	/**
	 * 提取 $emit传递的参数
	 * @param {Object} data $emit 参数
	 */
	extraParam(data) {
		return data.detail && data.detail.__args__ && data.detail.__args__[0] || data
	},
}
