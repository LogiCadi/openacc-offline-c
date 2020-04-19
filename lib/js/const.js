// 基础常量
// const HOST = 'xx.com';
const HOST = '47.113.109.80:3000';
// const HOST = '47.113.109.80:8021';
const VERSION = 'v1';

export default {
	HOST,
	VERSION,
	BASE_URL: 'http://' + HOST,
	// HTTP_URL: 'https://' + HOST + '/api/' + VERSION + '/',
	HTTP_URL: 'http://' + HOST + '/mock/16/',
	// HTTP_URL: 'http://' + HOST + '/',
	WSS_URL: 'wss://' + HOST + '/wss',
	
	LANGUAGE: 'zh_Hans',// 默认简体中文
	// LANGUAGE: 'zh_Hant',// 繁体中文
	// LANGUAGE: 'en_US',// 英文

	APP_NAME: '',

	QRCODE: 'https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER7ticIBeMDqR2pXCv8JWMWN1JvTBURJyzAo6icibiaTP570BMZYRuOMLJ9Q/0',
	AVATAR: 'https://mmbiz.qpic.cn/mmbiz_jpg/w5pLFvdua9GT2o2aCDJf7rjLOUlbtTER5kzPPpRZsIZTVGkic76VvZBcN0MzuCb4QUCab8x5M4lHoVQicHeAze4Q/0',
	NICKNAME: '神秘粉丝',

	GZH_APPID: '', // 关联公众号APPID
}
