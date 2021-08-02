<template>
	<view class="storeDetail">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">详情</block>
		</cu-custom>
		<view class="owner">
			<view class="cu-avatar" :style="{backgroundImage:'url('+info.url+')'}"></view>
			<view class="info">
				<view>
					<text class="text-bold">{{info.nickname}}</text>
				</view>
				<view>
					<text class="text-xs text-grey">{{info.createTime}}</text>
					<text class="text-xs text-grey" style="margin-left: 10upx;">发布于{{info["需求标题"]}}</text>
				</view>
			</view>
		</view>
		<view class="store-price">
			<text class="text-price text-xxl text-red">{{info.price}}</text>
			<text class="text-grey text-sm costPrice text-price">{{info["需求标题"]}}</text>
			<text class="text-sm look text-gray">{{info["需求标题"]}}人浏览</text>
		</view>
		<view class="store-title">
			<text class="text-black text-xl">{{info["需求标题"]}}</text>
		</view>

		<view class="cu-list menu sm-border card-menu margin-top">
			<view class="cu-item">
				<view class="action">
					<view class="cu-tag round" :class="'light-'+k" v-for="(v,k) in info.tags" :key="k">#{{v}}</view>
				</view>
			</view>
		</view>

		
		<view class="cu-list grid no-border" style="padding: 20upx;">
			<view class="cu-item" style="width: 100%;" v-for="(item,index) in swiperList" :key="index">
				<image style="width: 100%;border-radius: 25upx;" mode="widthFix" :src="item.url" @click="ViewImage" :data-url="item.url" :data-index="index"></image>
			</view>
		</view>
		
		<view class="chat">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-title text-green"></text>
					<text class="text-lg text-bold">全部留言</text>
				</view>
			</view>
			<view class="chat-list">
				<view class="cu-avatar round sm" :style="{backgroundImage:'url('+info.url+')'}"></view>
				<view class="chat-right">
					<view class="chat-name"><text class="text-bold text-sm">大西瓜</text></view>
					<view class="chat-text"><text class="text-black text-df">想仔细了解了解</text></view>
					<view class="chat-time"><text class="text-gray text-sm">1小时前</text></view>
				</view>
			</view>
		</view>
		<!-- <view class="operate-nav " :style="{opacity:isShowBottomNav?'1':'0'}">
			<view class="operate-left">
				<image mode="widthFix" class="round" src="http://img2.imgtn.bdimg.com/it/u=1039075865,3371165857&fm=26&gp=0.jpg"
				 @tap="hrefCard"></image>
				<view class="username">
					<text>{{info.nickname}}</text>
				</view>
			</view>
			<view class="operate-right">
				<view class="like" @tap="collection">
					<text :class="isCollection?'cuIcon-favorfill text-orange':'cuIcon-favor text-orange'"></text>
					<text>{{isCollection?'已收藏':'收藏'}}</text>
				</view>
				<view class="concat" @tap="hrefChat">
					<text class="cuIcon-messagefill text-black"></text>
					<text>联系</text>
				</view>
			</view>
		</view> -->
		<view class="seat-height" :style="[{height:footer_bottom+20 + 'px'}]"></view>
		<view class="cu-bar bg-white tabbar border shop store" :style="[{height:footer_bottom + 'px',bottom:footer_state + 'px'}]">
			<view class="action">
				<view class="cuIcon-comment"></view> 留言
			</view>
			<view class="action" @tap="collection">
				<view class="like">
					<text :class="isCollection?'cuIcon-favorfill text-orange':'cuIcon-favor text-orange'"></text>
					<text>{{isCollection?'已收藏':'收藏'}}</text>
				</view>
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-red round shadow-blur" @tap="hrefChat">我想要</button>
			</view>
		</view>
	</view>
</template>

<script>
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	var dataItem={};
	
	export default {
		data() {
			return {
				info: null,
				footer_bottom:this.CustomBar,
				footer_state:-this.CustomBar,
				swiperList: [],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				isShowBottomNav: true,
				isOwner: false,
				timer: null,
				isCollection:false
			};
		},
		onLoad(data) {
			data.data="{\"ID\":\"10045\",\"创建日期\":\"2021/5/26 12:53:03\",\"需求标题\":\"噶啥都搞\",\"需求内容\":\"123发斯蒂芬十多个大股东发生过的双方各\",\"图片管理\":\"\",\"视频管理\":\"\",\"发布用户\":\"10000\",\"截止日期\":\"2021/5/26 23:59:59\",\"是否签订合同\":\"0\",\"需求状态\":\"10000\",\"需求状态变更记录\":\"\",\"需求价格\":\"314.00\",\"需求封面\":\"\",\"属性管理\":\"\",\"中标用户\":\"\",\"竞标用户\":\"\",\"分类管理\":\"\",\"托管金额\":\"0.00\",\"商品销量\":\"\",\"评论管理\":\"\",\"库存\":\"0\",\"销量\":\"0\",\"收货地址省份\":\"\",\"收货地址城市\":\"\",\"收货地址县区\":\"\",\"收货地址\":\"\",\"是否支持退换货\":\"10001\",\"审核状态\":\"1000\",\"是否上架\":\"10001\",\"商品对应的需求ID\":\"\",\"是否需求转化商品\":\"10001\",\"需求类型\":\"10003\",\"Latitude\":\"0.0000000000\",\"Longitude\":\"0.0000000000\",\"是否发生退款\":\"10001\",\"目的地\":\"\",\"DestLatitude\":\"0.0000000000\",\"DestLongitude\":\"0.0000000000\",\"StartLatitude\":\"\",\"StartLongitude\":\"\",\"起始地\":\"\",\"操作人\":\"\",\"父账号ID\":\"-1\",\"ID1\":\"10000\",\"创建日期1\":\"2020/7/9 10:52:22\",\"手机号\":\"18953671207\",\"实名认证状态\":\"10000\",\"企业认证状态\":\"10000\",\"是否开通会员\":\"10001\",\"会员过期日期\":\"2020/7/9 10:52:22\",\"企业地址\":\"\",\"企业介绍\":\"\",\"经度\":\"119.12780000\",\"纬度\":\"36.71350500\",\"企业名称\":\"\",\"登录密码\":\"111\",\"推荐人\":\"\",\"姓名\":\"管理员\",\"余额\":\"9760.00\",\"图片管理1\":\"\",\"视频管理1\":\"\",\"信誉等级\":\"\",\"头像\":\"\",\"个人开户银行\":\"\",\"个人银行卡号\":\"\",\"企业开户银行\":\"\",\"企业银行卡号\":\"\",\"身份证照片正面\":\"\",\"身份证照片反面\":\"\",\"营业执照\":\"\",\"个人认证驳回原因\":\"\",\"企业认证驳回原因\":\"\",\"购买的服务\":\"\",\"注册金额\":\"\",\"邮箱\":\"\",\"提现管理\":\"\",\"关注的用户\":\"\",\"访问店铺产品次数\":\"\",\"聊天电话联系次数\":\"\",\"电话\":\"\",\"发货地址省份\":\"\",\"发货地址城市\":\"\",\"发货地址县区\":\"\",\"发货地址\":\"\",\"是否交付押金\":\"10001\",\"充值保证金\":\"0.00\",\"微信账号\":\"\",\"支付宝账号\":\"\",\"支付宝实名认证姓名\":\"\",\"银行卡持卡人姓名\":\"\",\"开通会员日期\":\"2020/7/9 10:52:22\",\"所属分类管理\":\"\",\"DeviceID\":\"\",\"EncryptID\":\"94A7DAF5-5690-45A0-930C-9C7B305F5C8F\",\"车牌号\":\"\",\"操作人1\":\"\",\"父账号ID1\":\"\"}";
			console.log('onLoad========》'+data+JSON.stringify(data));
			
					if(c.isNull(data.data))
					{
					  c.show('缺少父级类目ID');
					  return;
					  }
					  
			 dataItem=JSON.parse(data.data);
			 this.reload();
			 
			
		},
		methods:{
			reload(){
				c.loading();
				 
				b.getHttpWithLocation("action=infodetail&db=本地圈儿1004"
				+"&infoid="+dataItem.ID,(data)=>{
					 console.log('data'+data+JSON.stringify(data));
					 
				this.info=data.Data.InfoItem;
					
							c.hideLoading();
				});
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			hrefChat(){
				uni.navigateTo({
					url:"chatRoom"
				})
			},
			isCollectionFun(){
				uniCloud.callFunction({
					name:"selectThisCollection",
					data:{
						phone:this.$store.state.user.user.phone,
						good:this.info
					}
				}).then((res)=>{
					console.log(res)
					uni.hideLoading()
					if(res.result.total!=0)
					{
						this.isCollection=true
					}
					this.footer_state=0
					
				}).catch((err)=>{
					console.log("错误:", err)
					uni.showToast({
						title: "网络错误~",
						icon: "none",
						duration: 1500
					})
				})
			},
			//收藏
			collection(){
				console.log(this.$store.state.user.user.phone)
				if(!this.isCollection)
				{
					uniCloud.callFunction({
						name:"addCollection",
						data:{
							phone:this.$store.state.user.user.phone,
							good:this.info
						}
					}).then((res)=>{
						console.log(res)
						// if(res)
						uni.showToast({
							title:"收藏成功~",
							icon:"none",
							duration:1500
						})
						this.isCollection=true
					}).catch((err)=>{
						console.log("错误:", err)
						uni.showToast({
							title: "网络错误~",
							icon: "none",
							duration: 1500
						})
					})
				}else{
					uni.showToast({
						title:"已收藏过~",
						icon:"none",
						duration:1500
					})
				}
				
			},
			hrefCard(){
				uni.navigateTo({
					url:"myCard?phone="+this.info.phone
				})
			},
			//滚动条监听
			onPageScroll(res) {
				clearTimeout(this.timer) // 每次滚动前 清除一次
				this.isShowBottomNav = false;
				let that = this
				this.timer = setTimeout(function() {
					that.isShowBottomNav = true;
				}, 500);
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},

			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},

			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},

			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
			//预览图片
			ViewImage(e) {
				console.log(e.currentTarget.dataset.url)
				let that = this
				uni.previewImage({
					urls: that.info.imgList,
					current: e.currentTarget.dataset.url
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	$foot:40rpx;
	.btn-group{
		display: flex;
		justify-content: flex-end!important;
		padding: 0 30upx!important;
	}
	.store{
		border-top: 1upx solid #EEEEEE;
	}
	.footer-bottom{
		position: fixed;
		background-color: #FFFFFF;
		width: 100vw;
		border-top: 1upx solid #EEEEEE;
		transition: 1500ms all;		
	}
	.chat-list{
		display: flex;
		padding: 10upx 20upx;
		border-bottom: 1upx solid #EEEEEE;
		.chat-right{
			flex: 1;
			display: flex;
			flex-flow: column;
			align-content: flex-start;
			padding: 10upx;
			.chat-name{
				max-width: 60vw;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.chat-text{
				margin-top: 6upx;
			}
			.chat-time{
				margin-top: 6upx;
			}
		}
	}
	.storeDetail {
		.chat{
			width: 100vw;
			margin-top: 30upx;
		}
		.delete-thing {
			width: 100vw;
			position: fixed;
			bottom: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.owner{
			width: calc(100% - 40upx);
			margin: 20upx;
			padding-bottom: 30upx;
			display: flex;
			border-bottom: 1upx solid #EEEEEE;
			.info{
				margin-left: 10upx;
				height: 45px;
				display: flex;
				flex-flow: column;
				justify-content: center;
				view:last-child{
					margin-top: 10upx;
				}
			}
			.cu-avatar{
				width: 45px;
				height: 45px;
				border-radius: 5px;
			}
		}
		.operate-nav {
			position: fixed;
			bottom: 110rpx;
			z-index: 99;
			left: 50%;
			height: 90rpx;
			border-radius: 65rpx;
			display: flex;
			justify-content: flex-start;
			width: 600rpx;
			transition: .8s all;
			background-color: #EEEEEE;
			transform: translateX(-50%);
			box-shadow: 0 0 10rpx 1rpx #EEEEEE;

			.operate-left {
				width: 300rpx;
				display: flex;
				align-items: center;

				image {
					margin: 0 20rpx;
					width: 60rpx;
					height: 60rpx;
				}

				.username {
					flex: 1;
					max-width: 220rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.operate-right {
				margin-left: auto;
				height: 100%;
				width: 300rpx;
				display: flex;

				.like {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					background-image: linear-gradient(-90deg, #F8D347, #EEEEEE);
				}

				.concat {
					flex: 1;
					display: flex;
					justify-content: center;
					border-top-right-radius: 65rpx;
					border-bottom-right-radius: 65rpx;
					// background-image: linear-gradient(to right , #9B63FF, #462188);
					background-image: linear-gradient(-90deg, #FB7E22, #F8D347);
					align-items: center;
				}
			}
		}

		.description {
			width: 100vw;
			padding: 15rpx;
		}

		.screen-swiper {
			height: 700rpx;
		}

		.recommend {
			width: 100vw;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.line {
				border: none;
				width: 20vw;
				height: 1px;
				background-color: #f37b1d;
			}

			.circle {
				width: 5px;
				height: 5px;
				border-radius: 50%;
				background-color: #f37b1d;
			}

			.text-lg {
				padding: 0 15rpx;
			}
		}

		.store-title {
			max-width: 100vw;
			padding: 0rpx 20rpx 20rpx 20rpx;
			display: -webkit-box;
			/*设置为弹性盒子*/
			-webkit-line-clamp: 4;
			/*最多显示1行*/
			overflow: hidden;
			/*超出隐藏*/
			text-overflow: ellipsis;
			/*超出显示为省略号*/
			-webkit-box-orient: vertical;
			word-break: break-all;
			/*强制英文单词自动换行*/
		}

		.store-tag {
			padding: 0rpx 20rpx 20rpx 20rpx;
		}

		.store-price {
			width: 100vw;
			padding: 20rpx 20rpx;
			.look {
				padding-left: 5rpx;
				padding-right: 5rpx;
			}
			.costPrice{
				text-decoration:line-through;
				padding-left: 5rpx;
				padding-right: 5rpx;
			}
		}

		.help {
			position: fixed;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			height: $foot;
			width: 100vw;
			text-align: center;
			bottom: 0;
		}

		.shop {
			width: 100vw;
			position: fixed;
			bottom: $foot;

			.submit {
				max-width: 300rpx;
			}
		}
	}

	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
</style>
