<template>
	<view class="page" :style="!isLogin?'background-color:#F6F6F6':''">

		
		<view class="my-top bg-topic-theme"  @click="onUserInfo">
			<!-- head -->
			<!-- <button @click='settingClick()'>设置</button> -->
	
			<view class="user-info">
				<view class="portrait">
					<image :src="!isLogin?'../../static/img/noLoginAvatar.png':user.Photo"></image>
					<view v-if="isLogin" class="userLevel round shadow">
						<text class="text-yellow text-Abc text-sm">lv 1</text>
					</view>
				</view>
				<view v-if="!isLogin" class="info" @tap="hrefLogin">
					<text class="text-black text-bold text-lg">未登录，点击登录~</text>
				</view>
				<view v-if="isLogin" class="info">
					<view class="nickname">
						<text>{{user.nickname}}</text>
					</view>
					<view class="rank">
						<view class="cu-progress round ">
							<view class="bg-olive" :style="[{ width:progressWidth}]"></view>
						</view>
						<view class="grow round marginLeft">
							<text class="text-white text-xs">成长值</text>
							<text class="text-white marginLeft text-xs">{{user.grow}}</text>
							<text class="text-white marginLeft cuIcon-right text-xs"></text>
						</view>

					</view>
				</view>
				<view class="mystore">

				</view>
			</view>



			<!-- 关注区 -->

			<!-- <view v-if="isLogin" class="focus-area">
				<view class="list" @click="follow">
					<view class="num">
						<text class="text-black text-bold">{{user.follow}}</text>
					</view>
					<view class="title">
						<text class="text-black">关注</text>
					</view>
				</view>
				<view class="list" @click="fans">
					<view class="num">
						<text class="text-black text-bold">{{user.fans}}</text>
					</view>
					<view class="title">
						<text class="text-black">粉丝</text>
					</view>
				</view>
				<view class="list">
					<view class="num">
						<text class="text-black text-bold">{{user.hot}}</text>
					</view>
					<view class="title">
						<text class="text-black">热度</text>
					</view>
				</view>
			</view>
 -->
		<!-- 	<view v-if="isLogin" class="my-card" @click="showCard" :style="isShowCard?'bottom:0rpx':'-70rpx'">
			
				<view class="label-name">
					<text class="text-white">我的名片</text>
					<text class="text-white" style="margin-left: auto;">查看</text>
				</view>

			</view> -->
		</view>

		<view v-if="!isLogin" class="noLogin-img">
			<image src="../../static/empty/empty_groupon.png"></image>
		</view>
		<view v-if="!isLogin" class="noLogin-text" @tap="hrefLogin">
			<text class="text-gray text-lg">请先登陆~</text>
		</view>
		
		<!-- 钱包 -->
		<view v-if="isLogin" class="wallet-info">
			<view class="list">
				<view class="icon">
					<text class="number">{{user.integral}}</text>
				</view>
				<view class="title">
					<text>积分</text>
				</view>
			</view>
			<view class="list" @click="orderSellClick">
				<view class="icon">
					<text class=" number">{{user.OrderSelledCount}}</text>
				</view>
				<view class="title">
					<text>我卖出的</text>
				</view>
			</view>
			<view class="list" @click="orderBuyClick">
				<view class="icon">
					<text class="number">{{user.OrderBuyedCount}}</text>
				</view>
				<view class="title">
					<text>我购买的</text>
				</view>
			</view>
			<view class="list" @click="infolistClick">
				<view class="icon">
					<text class="number">{{user.PublishedInfoCount}}</text>
				</view>
				<view class="title">
					<text>我发布的</text>
				</view>
			</view>
		
		</view>
		
		
		<!-- 九宫格-begin -->
	<!-- 	<view class="myoperate" v-if="isLogin">
			<Gridme @hrefSort="hrefSort" :gridCol="gridCol" :cuIconList="cuIconList"></Gridme>
		</view> -->
		
		<!-- 九宫格-end -->
		<!-- 订单信息 -->
<!-- 		<view v-if="isLogin" class="order-info">
			<view class="desc-text">
				<text class="text-black text-bold text-lg">我有需求</text>
				<text class="text-gray text-sm">拿快递？找跑腿？闲置出售？</text>
			</view>
			<view class="issueView">
				<button class="cu-btn round lg bg-topic-theme" @tap="issue">立即发布</button>
			</view>
			 <view class="list" @click="issue">
				<view class="icon">
					<text class="cuIcon-roundaddfill"></text>
				</view>
				<view class="title">
					<text>发布</text>
				</view>
			</view> 
			
		</view> -->
	
		
		<!-- 积分，付款码 -->
		<view v-if="isLogin" class="integral-payment" >
			<view class="list" @click="walletClick">
				<view class="title">
					<text class="iconfont icon-qiandao" style="font-weight: bold;"></text>
					<text>钱包</text>
				</view>
				<!-- <view class="mess">
					<text>每日签到 领取积分</text>
				</view> -->
			</view>
			<!-- <view class="list" @click="ToCode">
				<view class="title">
					<text class="iconfont icon-fukuanma"></text>
					<text>收款码/联系方式</text>
				</view>
				<view class="mess">
					<text>一键推送 快捷收款</text>
				</view>
			</view> -->
		</view>
		
		<!-- 我的服务 -->
		<view v-if="isLogin" class="my-service">
			<view class="title">
				<text>我的服务</text>
			</view>
			<view class="service-list">
				<!-- <view class="list" @click="onServer('serve')">
					<view class="thumb">
						<text class="cuIcon-commandfill"></text>
					</view>
					<view class="name">
						<text>关于我们</text>
					</view>
				</view> -->
				
				<view class="list" @click="onServer('serve')">
					<view class="thumb">
						<text class="cuIcon-commandfill"></text>
					</view>
					<view class="name">
						<text>客服咨询</text>
					</view>
				</view>
				
				<view class="list" @click="feedbackClick">
					<view class="thumb">
						<text class="cuIcon-writefill"></text>
					</view>
					<view class="name">
						<text>意见反馈</text>
					</view>
				</view>
				

			</view>
		</view>

		<!-- 客服热线 -->
		<view class="serve-hotline" @click="isHotline = false">
			<view class="cu-modal bottom-modal" :class="{'show':isHotline}">
				<view class="cu-dialog">
					<view class="contact-list">
						<view class="list">
							<text>微信</text>
						</view>
						<view class="list">
							<text style="color: #959595;">18953671207</text>
						</view>
						<view class="list">
							<text>取消</text>
						</view>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import c from '../../modules/common.js'
	import b from '../../modules/bll.js'
	
	import Gridme from "@/components/gridme.vue"
	import {
		mapMutations
	} from "vuex"
	export default {
		components: {
			Gridme
		},
		data() {
			return {
				scrollTop: 0,
				isHotline: false,
				progressWidth: "0%",
				isShowCard: false,
				isLogin: false,
				user: {},
				gridCol: 4,
				cuIconList: [{
						cuIcon: 'shopfill',
						color: 'orange',
						badge: '',
						name: '我的店铺'
					},
					{
						cuIcon: 'deliver_fill',
						color: 'orange',
						badge: 2,
						name: '待送达'
					},
					{
						cuIcon: 'roundcheckfill',
						color: 'orange',
						badge: 3,
						name: '已完成'
					},
					{
						cuIcon: 'writefill',
						color: 'orange',
						badge: 5,
						name: '待评价'
					}
				]
			}
	},
	onShow: function() {
			//每次显示本界面时都会更新最新数据（不访问数据库）
			// try {
				
				this.reload();
				// const Auth = uni.getStorageSync('Auth');
				// if (Auth.isLogin) {
				// 	this.isLogin = true
				// 	this.user = this.$store.state.user.user
				// 	this.progressWidth = this.user.grow + "%"
				// 	this.isShowCard = true
				// } else {
				// 	this.isLogin = false
			// 	// }
			// } catch (e) {
			// 	uni.showToast({
			// 		title: "数据异常，请重试~",
			// 		duration: 1500
			// 	})
			// }


		},
		
		onHide: function() {
			this.isShowCard = false
		},
		mounted() {
			// //第一次进入本界面时都会更新最新数据（访问数据库）
			// try {
			//     const Auth = uni.getStorageSync('Auth');
			//     if (Auth.isLogin) {
			// 		uni.showLoading({})
			// 		uniCloud.callFunction({
			// 			name: 'selectUser',
			// 			data: {
			// 				phone: Auth.phone
			// 			}
			// 		}).then((res) => {
			// 			this.user = res.result.data[0]
			// 			this.isLogin=true
			// 			this.progressWidth = this.user.grow+"%"
			// 			this.isShowCard=true
			// 			this.$store.commit("user/setUser", this.user)
			// 			uni.hideLoading()
			// 		}).catch((err) => {
			// 			uni.hideLoading()
			// 			uni.showModal({
			// 				content: `操作失败：${err.message}`,
			// 				showCancel: false
			// 			})
			// 		})
			//     }
			// 	else{
			// 		this.isLogin=false
			// 	}
			// } catch (e) {
			// 	uni.showToast({
			// 		title:"数据异常，请重试~",
			// 		duration:1500
			// 	})
			// }
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},

		methods: {
			...mapMutations("user", ["setUser"]),
			showCard() {
				uni.navigateTo({
					url: "../../view/myCard?phone=" + this.$store.state.user.user.phone
				})
			},
			feedbackClick(){
				console.log('123');
				c.openPage('/pagesuser/setting/Feedback');
			},
			settingClick(){ 
				c.openPage('setting');
			},
			walletClick(){
				c.openPage('/pagesuser/wallet/MyWallet');
			},
			reload()
			{
				var user=c.getUser(false);
				if(c.isNull(user))
				{
					this.isLogin=false;
					return;
				}
					this.isLogin=true;
				
				c.loading();
				 
				b.getHttpWithLocation("action=userinfo&db=本地圈儿1004"
				+"&queryuserencrptid="+c.getUser().EncryptID,(data)=>{
					 console.log('data'+data+JSON.stringify(data));
					 if(data.Status==1)
					 {
					this.user=data.Data;
					}
							c.hideLoading();
				});
			},
			hrefSort(item) {
				if(item.name==="我的店铺")
				{
					uni.navigateTo({
						url: "../store/store"
					})
				}else
				{
					// uni.navigateTo({
					// 	url: "../../view/sort?item=" + encodeURIComponent(JSON.stringify(item))
					// })
				}
				
			},
			login() {
				uni.navigateTo({
					url: "/pagescommon/login"
				})
			},

			follow() {
				uni.navigateTo({
					url: "../../view/follow"
				})
			},
			infolistClick() {
				c.openPage('/pagesinfo/infolistmy');
				// uni.navigateTo({
				// 	url: "../../view/myTask"
				// })
			},
			orderSellClick() {
				let item={"UserIdentity":"1","OrderType":"10217"};
				c.openPage('/pagesorder/orderlistmy',item);
			},
			orderBuyClick() {
				let item={"UserIdentity":"0","OrderType":"10217"};
				c.openPage('/pagesorder/orderlistmy',item);
			},
			fans() {
				uni.navigateTo({
					url: "../../view/fans"
				})
			},
			issue() {
				uni.navigateTo({
					url: "../../view/issue"
				})
			},
			ToCode() {
				uni.navigateTo({
					// url: "../../view/code"
					url:"../../view/adress"
				})
			},
			SignIn() {
				uni.navigateTo({
					url: "../../view/sign"
				})
			},
			/**
			 * 关注跳转
			 */
			onCollect(type) {
				switch (type) {
					case 'goods':
						uni.navigateTo({
							url: '/pages/GoodsOn/GoodsOn'
						})
						break;
					case 'content':
						uni.navigateTo({
							url: '/pages/ContentorderSellClick/ContentorderSellClick'
						})
						break;
					case 'record':
						uni.navigateTo({
							url: '/pages/BrowsingHistory/BrowsingHistory'
						})
						break;
				}
			},
			/**
			 * 订单
			 */
			onSkipOrder(type) {
				if (type === 5) {
					uni.navigateTo({
						url: '/pages/AfterSalesOrder/AfterSalesOrder',
					})
					return;
				}
				uni.navigateTo({
					url: '/pages/MyOrderList/MyOrderList?type=' + type,
				})
			},
			/**
			 * 钱包跳转点击
			 */
			onWallet(type) {
				switch (type) {
					case 'integral':
						uni.navigateTo({
							url: '/pages/IntegralDetails/IntegralDetails',
						})
						break;
					case 'coupon':
						uni.navigateTo({
							url: '/pages/MyCoupon/MyCoupon',
						})
						break;
					case 'wallet':
						uni.navigateTo({
							url: '/pages/MyWallet/MyWallet',
						})
						break;
					case 'SignIn':
						uni.navigateTo({
							url: '/pages/SignIn/SignIn',
						})
						break;
					case 'payment':
						uni.navigateTo({
							url: '/pages/PaymentCode/PaymentCode',
						})
						break;
					case 'we':
						uni.reLaunch({
							url: '/pages/index/index?isBack=true',
						})
						break;
				}
			},
			/**
			 * 我的服务点击
			 */
			onServer(type) {
				switch (type) {
					case 'feedback':
						uni.navigateTo({
							url: '/pages/Feedback/Feedback'
						})
						break;
					case 'serve':
						this.isHotline = true;
						break;
				}
			},
			/**
			 * 设置点击
			 */
			onSetting() {
				uni.navigateTo({
					url: '/pages/Setting/Setting'
				})
			},
			/**
			 * 消息点击
			 */
			onMessage() {
				uni.navigateTo({
					url: '/pages/Message/Message'
				})
			},
			/**
			 * 会员点击
			 */
			onMmeberVip() {
				uni.navigateTo({
					url: '/pages/MembersOpened/MembersOpened',
				})
			},
			/**
			 * 跳转点击
			 * @param {String} type 跳转类型
			 */
			onSkip(type) {
				switch (type) {
					case 'goods':
						uni.navigateTo({
							url: '/pages/GoodsDetails/GoodsDetails',
							animationType: 'zoom-fade-out',
							animationDuration: 200
						})
						break;
				}
			},
			/**
			 * 用户信息点击
			 * @param {Number} type
			 */
			onUserInfo() {
				console.log('123')
				c.getUser(true);
				if (this.isLogin) {
					c.openPage('/pagesuser/userinfo/userinfo');
					// uni.navigateTo({
					// 	// url: "../../view/userEdit"
					// 	url: "../../view/mine"
					// })
				} 

			},
			//登陆
			hrefLogin() {
				c.getUser(true);
			
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'my.scss';

	.marginLeft {
		margin-left: 2px;
	}
	.myoperate{
		 width: 94%;
		 margin: 20rpx auto;
		 margin-left: 3%;
		 border-radius: 20rpx;
		 overflow: hidden;
	}
</style>
