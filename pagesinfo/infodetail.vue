<template>
	<view class="storeDetail">
		
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">详情</block>
		
		<!-- app和小程序显示，h5不显示 -->
			<view slot="right" class="action" v-if="isShareButtonShow">
				<!-- <navigator :url="'chat/chat'">全国</navigator> -->
				<text class="cuIcon text" @tap="shareClick()">分享</text>
			</view> 
		</cu-custom>
		
		<!-- <view class="cu-bar bg-white"> -->
			<swiper class="card-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			 duration="500" @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#F8D347">
				<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
					<view class="swiper-item" @click="topBannerClick(item)">
							<image :src="item.url" mode="aspectFill" ></image>
					<!-- 	<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image> -->
						<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
					</view>
				</swiper-item>
			</swiper> 
		<!-- </view> -->
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-titles text-green"></text>
				<text class="text-xl text-bold">{{info['需求标题']}}</text>
			</view>
		</view>
		<view class="cu-list menu sm-border card-menu margin-top">
			
			<!-- <view class="cu-item" >
				<view class="content">
					<text class="cuIcon-sort text-grey"></text>
					<text class="text-grey">标题</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.需求标题}}</text>
				</view>
			</view> -->
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-choicenessfill text-grey"></text>
					<text class="text-grey">价格</text>
				</view>
				<view class="action">
					<text class="text-price text-red text-lg">{{info['需求价格']}}</text>
				</view>
			</view>
			
			<!-- <view class="cu-item" >
				<view class="content">
					<text class="cuIcon-sort text-grey"></text>
					<text class="text-grey">昵称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.姓名}}</text>
				</view>
			</view> -->
			<view class="cu-item" >
				<view class="content">
					<text class="cuIcon-sort text-grey"></text>
					<text class="text-grey">发布时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info['创建日期']}}</text>
				</view>
			</view>
			<view class="cu-item" v-for="(item,index) in propertyList">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">{{item.PropertyName}}</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{item.PropertyValueName}}</text>
				</view>
			</view>
			<!-- <view class="cu-item" >
				<view class="content">
					<text class="cuIcon-tagfill text-red  margin-right-xs"></text>
					<text class="text-grey">标签</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-orange" :class="'light-'+k" v-for="(v,k) in info.tags" :key="k">{{v}}</view>
				</view>
			</view> -->
		</view>
		<view class="cu-bar bg-white margin-top" >
			<view class="action">
				<text class="cuIcon-titles text-green"></text>
				<text class="text-xl text-bold">详细描述</text>
			</view>
		</view>
		<view class="description">
			<text class="text-lg">{{info['需求内容']}}</text>
		</view>
		
		<!-- <view class="operate-nav " :style="{opacity:isShowBottomNav?'1':'0'}">
			<view class="operate-left">
				<image mode="widthFix" class="round" src="http://img2.imgtn.bdimg.com/it/u=1039075865,3371165857&fm=26&gp=0.jpg"
				 @tap="hrefCard"></image>
				<view class="username">
					<text>{{info.auth.name}}</text>
				</view>
			</view>
			<view class="operate-right">
				<view class="like">
					<text class="cuIcon-favor text-gray"></text>
					<text>收藏</text>
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
				<view class="cu-avatar-group">
					<view class="cu-avatar lg radius" :style="{backgroundImage:'url('+info.PublishUserPhotoUrl+')'}"></view>
				</view>
				<view class="info">
					<view>
						<text class="text-bold text-lg">{{info['姓名']}}</text>
					</view>
					<view>
						<text class="text-xs text-olive">查看楼主</text>
					</view>
				</view>
			</view>
			
			<view style="justify-content: flex-end;" v-if="info['需求类型']==10231">
				<button class="cu-btn bg-orange round shadow-blur" @tap="orderClick">下单</button>
			</view>
			<view  style="justify-content: flex-end; margin: 10rpx;">
				<button class="cu-btn bg-green round shadow-blur" @tap="chatClick">聊天</button>
	
			</view>
			<view class="btn-group" style="justify-content: flex-end;margin-left: 10rpx">
				<button class="cu-btn bg-red round shadow-blur" @tap="telClick">电话</button>
			</view>
		</view>
	</view>
</template>

<script>
	
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	 // import uniShare from 'uni_modules/uni-share/js_sdk/uni-share.js';
	 

	 
	export default {
		data() {
			return {
			dataItem:{},
				info: {},
				publishuser:{},//发布信息的用户
				propertyList:[],
				swiperList: [], 
				cardCur: 0,
				dotStyle: false,
				towerStart: 0,
				direction: '',
				isShowBottomNav: true,
				isOwner: false,
				timer: null,
				footer_bottom:this.CustomBar,
				footer_state:0,
				isCollection:false,
				isShareButtonShow:false
			};
		},
		onLoad(data) {
			// data.data="{\"ID\":\"10115\",\"创建日期\":\"2021/5/26 12:53:03\",\"需求标题\":\"噶啥都搞\",\"需求内容\":\"123发斯蒂芬十多个大股东发生过的双方各\",\"图片管理\":\"\",\"视频管理\":\"\",\"发布用户\":\"10000\",\"截止日期\":\"2021/5/26 23:59:59\",\"是否签订合同\":\"0\",\"需求状态\":\"10000\",\"需求状态变更记录\":\"\",\"需求价格\":\"314.00\",\"需求封面\":\"\",\"属性管理\":\"\",\"中标用户\":\"\",\"竞标用户\":\"\",\"分类管理\":\"\",\"托管金额\":\"0.00\",\"商品销量\":\"\",\"评论管理\":\"\",\"库存\":\"0\",\"销量\":\"0\",\"收货地址省份\":\"\",\"收货地址城市\":\"\",\"收货地址县区\":\"\",\"收货地址\":\"\",\"是否支持退换货\":\"10001\",\"审核状态\":\"1000\",\"是否上架\":\"10001\",\"商品对应的需求ID\":\"\",\"是否需求转化商品\":\"10001\",\"需求类型\":\"10003\",\"Latitude\":\"0.0000000000\",\"Longitude\":\"0.0000000000\",\"是否发生退款\":\"10001\",\"目的地\":\"\",\"DestLatitude\":\"0.0000000000\",\"DestLongitude\":\"0.0000000000\",\"StartLatitude\":\"\",\"StartLongitude\":\"\",\"起始地\":\"\",\"操作人\":\"\",\"父账号ID\":\"-1\",\"ID1\":\"10000\",\"创建日期1\":\"2020/7/9 10:52:22\",\"手机号\":\"18953671207\",\"实名认证状态\":\"10000\",\"企业认证状态\":\"10000\",\"是否开通会员\":\"10001\",\"会员过期日期\":\"2020/7/9 10:52:22\",\"企业地址\":\"\",\"企业介绍\":\"\",\"经度\":\"119.12780000\",\"纬度\":\"36.71350500\",\"企业名称\":\"\",\"登录密码\":\"111\",\"推荐人\":\"\",\"姓名\":\"管理员\",\"余额\":\"9760.00\",\"图片管理1\":\"\",\"视频管理1\":\"\",\"信誉等级\":\"\",\"头像\":\"\",\"个人开户银行\":\"\",\"个人银行卡号\":\"\",\"企业开户银行\":\"\",\"企业银行卡号\":\"\",\"身份证照片正面\":\"\",\"身份证照片反面\":\"\",\"营业执照\":\"\",\"个人认证驳回原因\":\"\",\"企业认证驳回原因\":\"\",\"购买的服务\":\"\",\"注册金额\":\"\",\"邮箱\":\"\",\"提现管理\":\"\",\"关注的用户\":\"\",\"访问店铺产品次数\":\"\",\"聊天电话联系次数\":\"\",\"电话\":\"\",\"发货地址省份\":\"\",\"发货地址城市\":\"\",\"发货地址县区\":\"\",\"发货地址\":\"\",\"是否交付押金\":\"10001\",\"充值保证金\":\"0.00\",\"微信账号\":\"\",\"支付宝账号\":\"\",\"支付宝实名认证姓名\":\"\",\"银行卡持卡人姓名\":\"\",\"开通会员日期\":\"2020/7/9 10:52:22\",\"所属分类管理\":\"\",\"DeviceID\":\"\",\"EncryptID\":\"94A7DAF5-5690-45A0-930C-9C7B305F5C8F\",\"车牌号\":\"\",\"操作人1\":\"\",\"父账号ID1\":\"\"}";

			console.log('onLoad========》'+data+JSON.stringify(data));
			
					if(c.isNull(data.data))
					{
					  c.show('缺少父级类目ID');
					  return;
					  }
							this.originData=data;	  
			 this.dataItem=JSON.parse(data.data);
			 this.reload();
			 
			 if(c.isPlatformApp()||c.isPlatformWeiXin())
			 {this.isShareButtonShow=true;}
			
		},
		methods:{
			reload(){
				c.loading();
				 
				b.getHttpWithLocation("action=infodetail&db=本地圈儿1004"
				+"&infoid="+this.dataItem.ID+"&isfilternodataproperty=1",(data)=>{
					 console.log('data'+data+JSON.stringify(data));
					 
			
				this.info=data.Data.InfoItem;
				this.publishuser=data.Data.PublishUser;
					this.swiperList=data.Data.piclist;
					this.propertyList=data.Data.InfoPropertyList;
					
					if(this.info.信息类型==10232)//需求显示付款按钮
					{}
					
							c.hideLoading();
				});
			},
			//轮播图的事件
			cardSwiper(e) {
				this.cardCur = e.detail.current
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
			telClick(){c.callPhone(this.publishuser.手机号);},
			orderClick(){
				
			
				//准备商店以及下面的产品信息
				let curShopItem={};
				curShopItem.ShopID=this.publishuser.ID;
				curShopItem.ShopName=this.publishuser.姓名;
				curShopItem.ProductList=[];
				curShopItem.Coupon={};
				
				let productItem={};
				productItem.ProductName=this.info.需求标题;
				productItem.ProductCount=1;
				productItem.ProductID=this.info.ID;
				productItem.ProductPrice=this.info.需求价格;
				curShopItem.ProductList.push(productItem);
				
				productItem.PropertyList=[];
				for(let index in this.propertyList)
				{
					let curProperty=this.propertyList[index];
					// curProperty.PropertyCatalogID=curProperty.PropertyCatalogID;
					productItem.PropertyList.push(curProperty);
				}
				
				
				
				
				let item={};
				item.OrderType="10217";//任务订单
				item.ShopList=[curShopItem];
				c.openPage("/pagesorder/ConfirmOrder",item);
			},
			chatClick(){
				let user=c.getUser(true);
				console.log(JSON.stringify(user));
				if(!user)
				{return;}
				
				// b.openChatPageWithToUserID(this.publishuser.ID);
				
				b.openChatPage(this.publishuser.ID);
				
			
				// let item={};
				// item.productID=this.info.ID;
				// item.CatalogID=this.info.CatalogID;
				// item.ServiceUserEncryptID=this.publishuser.EncryptID;
				// item.title=this.info.需求标题;
				// item.content=this.info.需求内容;
				// item.price=this.info.需求价格;
				// b.openPublishPage(item,"1");
			},
			hrefChat(){
				uni.navigateTo({
					url:"chatRoom"
				})
			},
			hrefCard(){
				uni.navigateTo({
					url:"myCard"
				})
			},
			shareClick() {
 
let dataItemShare={ID:this.dataItem.ID};
				 b.share(b.getHost()+"h5/#/pagesinfo/infodetail?data="+JSON.stringify(dataItemShare),this.info.需求标题,this.info.需求内容,b.getHostFile()+this.info.需求封面);
				 },
					    
		}
	}
</script>

<style lang="scss" scoped>
	$foot:40rpx;

	.storeDetail {
		.store{
			border-top: 1upx solid #EEEEEE;
			.btn-group{
				justify-content: flex-end;
				padding: 0 30upx!important;
			}
			.action{
				flex: 2;
				display: flex;
				justify-content: flex-start;
				padding-left: 10upx;
				.cu-avatar-group{
					padding: 0 10upx;
					.radius{
						border-radius: 10upx!important;
					}
				}
				.info{
					margin-left: 10upx;
					height: 45px;
					display: flex;
					flex-flow: column;
					justify-content: center;
					view:last-child{
						margin-top: 10upx;
						text-align: left;
					}
				}
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
		.delete-thing{
			width: 100vw;
			position: fixed;
			bottom: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.description{
			width: 100vw;
			padding: 15rpx;
		}
		.screen-swiper {
			height: 700rpx;
		}
		.recommend{
			width: 100vw;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.line{
				border: none;
				width: 20vw;
				height: 1px;
				background-color: #f37b1d;
			}
			.circle{
				width: 5px;
				height: 5px;
				border-radius: 50%;
				background-color: #f37b1d;
			}
			.text-lg{
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
			.submit{
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
