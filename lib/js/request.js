// 网络请求相关
import md5 from './utils/md5.js'

export default {
	/**
	 * 基础HTTP请求
	 * @param String url 访问地址
	 * @param Object data
	 * @param String method
	 * @param Boolean block 是否节流
	 */
	http(url, data = {}, method = 'POST', block = false) {
		return new Promise((resolve, reject) => {
			// 节流
			if (block) {
				if (this.isBlock) {
					this.toast("请稍后再试")
					return
				}
				this.isBlock = true
			}
			// data.token = this.token || '' // 带上token
			uni.request({
				url: ~url.indexOf('http') ? url : this.HTTP_URL + url + '/' + this.VERSION,
				method,
				data,
				header: this.getHttpHeader(data),
				success: res => {
					console.log('HTTP请求', url, data, res)
					this.isBlock = false
					if (res.statusCode !== 200) {
						// 请求报错
						this.toast('服务器正忙，请稍后再试')
					}
					// else if (res.data.code == 200 || res.data.code == 201) {
					// 	// 需要登录
					// 	this.login(() => {
					// 		this.request(url, data, success, method, block)
					// 	})
					// }
					else if (res.data.code != 0) {
						// 操作失败
						this.toast(res.data.msg)
					} else {
						// 操作成功
						resolve(res.data.result)
					}
				},
				fail: res => {
					console.error('请求失败！' + JSON.stringify(res))
				}
			});
		})
	},
	/**
	 * 拼凑请求头
	 * @param {Object} data body参数
	 */
	getHttpHeader(data) {
		const getHeaderEncode = () => {
			// md5( body + commonFixedSecret + algSecret)
			data = JSON.stringify(data)
			const commonFixedSecret = '66yue$q%a1)&*324(@-k820#17a'
			const algSecret = 'hw==u+(di^&w98@)~ji'
			return md5(data + commonFixedSecret + algSecret)
		}

		return {
			// 语言
			'Content-Language': this.LANGUAGE,

			// 平台类型ID
			// #ifdef H5
			'App-Id': 30,
			// #endif
			// #ifdef APP-PLUS
			'App-Id': 10,
			// #endif
			// #ifdef MP
			'App-Id': 32,
			// #endif

			// 应用版本
			'App-Version': 'v1.0.0',

			// 请求签名
			'Content-MD5': getHeaderEncode(),

			// 会话token
			/*'Authorization': 'TODO',*/
			/* 'Authorization': func.getData('authorization'), */
			'Authorization': getCookie('authorization'),

			'Content-Type': 'application/json'
		}
	},

	/**
	 * 文件上传到OSS云存储
	 * @param String file 文件路径(TODO:暂时只能单个上传)
	 * @param mixed bucketType oss bucket 的类型   1 - 私有 (一般开户、交易使用)， 2 - 公共 （一般是行情、用户系统使用）
	 * @param String resourceKey 资源key  需要加上易识别的前缀 比如上传一用户头像 user/avatar/${userId}.png  注：同一个key会导致直接覆盖
	 */
	async uploadOSS(file, bucketType, resourceKey) {
		if (!file) return
		resourceKey += this.dateFormat('YYmmddHHiiss') + this.getRandom(10000, 99999)
		// 获取policy
		let result = await this.http('user/oss/postPolicy', {
			bucketType,
			resourceKey,
		})
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: result.host,
				filePath: file,
				name: 'file',
				formData: {
					'key': resourceKey,
					'OSSAccessKeyId': result.accessKeyId,
					'policy': result.policy,
					'signature': result.signature,
					'success_action_status': "200",
				},
				success: () => {
					resolve(result.host + '/' + resourceKey)
					// if (bucketType === 1) {
					// 	// 私有 获取url
					// 	this.http('user/oss/privateResourceUrl', {
					// 		"bucketType": bucketType, //是否是私有bucket
					// 		"resourceKey": resourceKey
					// 	}).then(res => {
					// 		resolve(res.privateUrl)
					// 	})
					// } else if (bucketType === 2) {
					// 	// 公共
					// 	resolve(result.host + '/' + resourceKey)
					// }
				}
			});
		})
	}
}
