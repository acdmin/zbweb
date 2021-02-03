export const state = {
    api_token: uni.getStorageSync('api_token') || null,
    count: 12,
    homeCardList: 0,
    userInfo: null,
    question: [],
    reversecards: [],
    chosed_three_card: [],
    detail: null,
	wxPayInfo: null, //微信订单详情
	autoJumpTimer: null,
	autoJumpTimeCount: 30,
	payWays: [], //支付方式列表
	bindPhoneShow: false, // 绑定手机视图显示
    keepMenuAlive: true,
	wxScanParams: null
}