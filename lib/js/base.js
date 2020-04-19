/**
 * JS通用方法
 */
export default {

	/**
	 * 获取随机数
	 * @param {Object} min
	 * @param {Object} max
	 */
	getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},
	/**
	 * 时间格式化
	 * @param {Object} fmt 
	 * @param int date 时间戳
	 */
	dateFormat(fmt, date = Date.now()) {
		date = new Date(date)
		let ret;
		const opt = {
			"Y+": date.getFullYear().toString(), // 年
			"m+": (date.getMonth() + 1).toString(), // 月
			"d+": date.getDate().toString(), // 日
			"H+": date.getHours().toString(), // 时
			"i+": date.getMinutes().toString(), // 分
			"s+": date.getSeconds().toString() // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt)
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			}
		}
		return fmt;
	},
	/**
	 * 当前时间戳
	 */
	getTime() {
		return Math.round(new Date().getTime() / 1000)
	},
	/**
	 * 判空函数
	 * @param {Object} value
	 */
	isEmpty(value) {
		if (!value) return true
		if (typeof(value) === 'object' && !Object.keys(value).length) return true
		return false
	},
	/**
	 * 格式化时间
	 * @param int time 时间秒
	 */
	timeGethms(time) {
		var time = parseInt(time)

		var day = Math.floor(time / 3600 / 24)
		time -= day * 3600 * 24
		if (day < 10) day = '0' + day

		var hour = Math.floor(time / 3600)
		time -= hour * 3600
		if (hour < 10) hour = '0' + hour

		var min = Math.floor(time / 60)
		time -= min * 60
		if (min < 10) min = '0' + min

		var sec = time
		if (sec < 10) sec = '0' + sec

		return {
			day: parseInt(day),
			hour: parseInt(hour),
			min: parseInt(min),
			sec: parseInt(sec),
			str: hour + ':' + min + ':' + sec
		}
	},
	// 时间字符串转时间戳
	strToTime(str) {
		str = str.replace(' ', 'T')
		return Math.round((new Date(str)).getTime() / 1000)
	},
	// 时间字符串转 00:00:00
	strToHour(str) {
		return str.slice(11)
	},
	/** 数字千分号*/
	formatNumberRgx(num) {
		var parts = num.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");
	},

	/** 小数点后保留几位，不足4位保留原位数*/
	formatFloatNum(number, pos = 4) {
		if (pos == 4)
			number = String(number).replace(/^(.*\..{4}).*$/, "$1");
		else if (pos == 3)
			number = String(number).replace(/^(.*\..{3}).*$/, "$1");
		else if (pos == 2)
			number = String(number).replace(/^(.*\..{2}).*$/, "$1");
		else if (pos == 1)
			number = String(number).replace(/^(.*\..{1}).*$/, "$1");
		number = Number(number);
		return number;
	},

	getWeek() {
		const time = new Date()
		const Monday = time.getDate() - time.getDay() + 1
		const Sunday = time.setDate(time.getDate() + 6)
		return [Monday, Sunday]
	},

	/**
	 * 获取url参数
	 */
	getQueryString(name) {
		var queryStr = location.href.split('?')[1]
		if (!queryStr) return
		var vars = queryStr.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == name) {
				return decodeURIComponent(pair[1]);
			}
		}
	},

	// 生成随机字符串
	randomStr(len = 32) {
		//默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
		var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		var tempLen = chars.length,
			tempStr = '';
		for (var i = 0; i < len; ++i) {
			tempStr += chars.charAt(Math.floor(Math.random() * tempLen));
		}
		return tempStr;
	}

}
