<template>
	<view class="index">

		<cu-custom-header bgColor="bg-topic-theme" :isBack="true" class="custom">
			<!-- <block slot="backText" class="text-sm location">清华大学</block> -->
			<block slot="backText" class="text-sm location">
			<text class="cuIcon text" @tap="chooseCityClick()">{{curCity}}</text>
			</block>
				<!-- <text class="cuIcon text" @tap="chooseCityClick()">{{curCity}}</text> -->
		</cu-custom-header>
		
		<!-- 最底层下拉刷新辅助的view --> 
		<view class="refresh"></view>
		<view class="container"> 
			<view class="my-background-circle bg-topic-theme"></view>
			<!-- 轮播-begin -->
			<swiper class="card-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			 duration="500" @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#F8D347">
				<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''" >
					<view class="swiper-item"  @tap="topBannerClick(item)">
							<image :src="item.picurl" mode="aspectFill"  ></image>
					<!-- 	<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image> -->
						<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
					</view>
				</swiper-item>
			</swiper>  
			<!-- 轮播-end -->
			<!-- 九宫格-begin -->
			<!-- <Grid @hrefSort="hrefSort" :gridCol="gridCol" :cuIconList="cuIconList"></Grid> -->
			<view class="cu-list grid padding-lr" :class="['col-' + gridCol,'no-border']">
				<view class=" cu-item list"  v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2"  @tap="hrefSort(item)">
					<image :src="item.url" mode="aspectFit"   style="height: 100rpx;" ></image> 
					<!-- <image :src="item.url"  class="image" ></image> -->
					
		<!-- <u-image :src="item.url"></u-image> -->
					<!-- <view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view> -->
					<text>{{item["标题"]}}</text>
				</view>
			</view>
			
			<!-- 九宫格-end --> 
			<!-- tab栏切换-begin -->
			<scroll-view scroll-x class="nav nav-liner" :style="isFixed?'position:fixed;top:'+customHeight+'px;':'position:relative;top:unset;'"
			 scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?'text-black':''" v-for="(item,index) in sortList" :key="index" @tap="tabSelect"
				 :data-id="index">
					<view class="cu-bar justify-center">
						<view class="action sub-title">
							<text class="text-sm text-bold text-black" :class="index==TabCur?'text-focus':''">{{item.name}}</text>
							<text class="bg-topic-theme" :class="index==TabCur?'isFocus':'foucus-no'" style="width:3rem"></text>
							<!-- last-child选择器-->
						</view>
					</view>
				</view>
			</scroll-view>

			<!-- 辅助tab栏固定 -->
			<view :style="{height:isFixed?'90rpx':'0'}"></view>

			<!-- tab栏切换-end -->
			<view class="goods" :style="{marginLeft:'-'+TabCur*100+'vw'}">
				<view class="good">
					<view class="goods-list">
						
					<!-- 	<view class="list" v-for="(item,index) in infoList" :key="index">
							<view class="thumb">
								<image :src="item.url" mode=""></image>
							</view>
							<view class="item">
								<view class="title">
									<text class="name one-omit">{{item.title}}</text>
									<text class="attr">{{item.content}}</text>
								</view>
								<view class="price-number">
									<view class="price">
										<text class="min">￥</text>
										<text class="max">{{item.price}}</text>
									
									</view>
									<view class="number">
										<text>x {{item.date}}</text>
									</view>
								</view>
							
							</view>
						</view>
					</view> -->
					
						<view class="task" >
						<view class="cu-chat">
					<view class="cu-item animation-bottom-top"  v-for="item in infoList"
					 @click="hrefTaskDetail(item)">
				
							<!-- <view class="content"> -->
								<view class="main">
													<view class="thumb"  >
														<image :src="item.url" @error="imageError" style="width: 120rpx;height: 120rpx;" mode="aspectFit"  v-if="item.haspic" ></image>
														<image src="../../static/img_no.png" style="width: 120rpx;height: 120rpx;"   v-else></image>
														
													</view>
									<view class="content shadow">
													
										<view class="item-header">
													
											<view class="item-title text-lg text-bold">{{item.title}}</view>
											<button class="cu-btn round shadow bg-blue sm" v-if="item.IsTop==1" >置顶</button>
											<view class="item-price"><text class="text-price text-red text-lg text-bold padding-sm">{{item.price}}</text></view>
										</view>
										<view class="item-desc text-gray text-sm">
											{{item.content}}
											
										</view>
										<view class="item-tag">
											<view class="cu-tag bg-red sm round" :class="'light-'+k" v-for="(v,k) in item.tags" :key="k">{{v}}</view>
											<!-- <view class="cu-tag bg-green light sm round">史诗</view> -->
										</view>
										<view class="university">
											<text class="text-grey text-sm">{{item.price}}</text>
										</view>
									</view>
								</view>
													
													
								<view class="date">
									<text class="text-xs text-gray">发布时间:{{item.date}}</text>
									<button class="cu-btn round shadow bg-yellow sm"  @click.stop="hrefChat(item)">联系TA</button>
									
								</view>
							<!-- </view> -->
							</view>
					</view>
					</view>
					</view>
					
					<!-- <Goods @clickHref="hrefstoreDetail" :isMore="isMore1" :goods="goodslist1" :colWidth="colWidth" :col="col"></Goods> -->
				</view>
				<view class="good">
					<Goods @clickHref="hrefstoreDetail" :isMore="isMore2" :goods="goodslist2" :colWidth="colWidth" :col="col"></Goods>
				</view>
				<view class="good">
					<Goods @clickHref="hrefstoreDetail" :isMore="isMore3" :goods="goodslist3" :colWidth="colWidth" :col="col"></Goods>
				</view>
				<view class="good">
					<Goods @clickHref="hrefstoreDetail" :isMore="isMore4" :goods="goodslist4" :colWidth="colWidth" :col="col"></Goods>
				</view>
			</view>
 
		</view>

	</view> 
</template> 

<script>
	import Grid from "@/components/grid.vue"
	import Goods from "@/components/goods.vue"
	
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	export default {
		components: {
			Grid,
			Goods
		},
		data() {
			return {
				curCity:"全国",
				catalogImgHeight:50,
				cardCur: 0,
				lastTabCur: 0,
				TabCur: 0,
				scrollLeft: 0,
				scrollHeight: 0,
				customHeight: 0,
				marginTop: 0,
				isFixed: false,
				gridCol: 4,
				cuIconList: [],
				swiperList: [],
				infoList:[],
				sortList: [{ 
						id: 1,
						name: '最新发布',
						code: 'newest'
					},
					// {
					// 	id: 2,
					// 	name: '全新闲置',
					// 	code: 'like'
					// },
					// {
					// 	id: 3,
					// 	name: '低价秒杀',
					// 	code: 'cheap'
					// }, 
					// {
					// 	id: 4,
					// 	name: '大家都看',
					// 	code: 'everbody'
					// }
				],
				goodslist1: [],
				goodslist2: [],
				goodslist3: [],
				goodslist4: [],
				isMore1: true,
				isMore2: true,
				isMore3: true,
				isMore4: true,
				page: 1,
				pageSize: 20,
				pagePrice: 1,
				pageLook: 1,
				pageNew: 1,
				isFresh: false,
				col: 2,
				colWidth: 172

			}
		},
		mounted() {
			this.getCol()
			// this.selectGoods()
		},
		onLoad()  {
			this.reload();
		},
		methods: {
			reload() 
			{
				b.getAppUsingCity(1,(data)=>{
					this.curCity=data;
					});
					
				c.loading(); 
				 
				b.getHttpWithLocation("action=buyhome&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&",(data)=>{
					 // console.log('data'+data+JSON.stringify(data));
					 
					 this.swiperList=data.Data.TopBanner;
					this.cuIconList=data.Data.SystemCatalogList;
					
					for(let index in this.swiperList)
					{
											 let item=this.swiperList[index];
											 let tmpItem={};
											 // console.log("item.需求标题="+item.需求标题+JSON.stringify(item));
											
											   item.picurl=b.getHostFile()+item.封面;
											  }
							c.hideLoading();
								uni.stopPullDownRefresh()
				}); 
				 
				 
				
				// c.loading();
				b.getHttpWithLocation("action=infolist&db=本地圈儿1004"
				+"&infotype=&ordertype=10000&pageindex=0&pagesize=50&catalogid=&propertyid=",(data)=>{
					 // console.log('data'+data+JSON.stringify(data));
					 if(data.Status==1)
					 {
					 // this.infoList=data.Data.DemandList;
					 var tmplist=[];
					 for(let index in data.Data.DemandList)
					 {
						 let item=data.Data.DemandList[index];
						 let tmpItem={};
						 // console.log("item.需求标题="+item.需求标题+JSON.stringify(item));
						 tmpItem.ID=item.ID; 
						 tmpItem.title=item.需求标题;
						 tmpItem.content=item.需求内容;
						  tmpItem.price=item.需求价格;
						  tmpItem.date=item.创建日期;
						  tmpItem.url=b.getHostFile()+item.需求封面;
						  tmpItem.haspic=true;
						  if(item.需求封面.length==0)
						  {tmpItem.haspic=false;}
						
						 tmplist.push(tmpItem);
					 }
					 this.infoList=tmplist;
					 // console.log(" this.infoList"+JSON.stringify( this.infoList))
			
					
							
							}
							uni.stopPullDownRefresh()
							// c.hideLoading();
				});
			},
			//顶部banner点击后 
			topBannerClick(item){
				console.log('topBannerClick');
				b.openBannerPage(item);
			},
			hrefSort(item) {
				console.log("item===>"+JSON.stringify(item));
				// c.openPage('../../view/sort',item);
				b.openBannerPage(item);
				// if(item.SubCatalogTotalLevelCount==1)//进去一个分类
				// {c.openPage('../info/infolist',item);}
				// else if(item.SubCatalogTotalLevelCount==2)//进去一个分类
				// { 
				// 	c.openPage('cataloglist',item);
				// }
				// else if(item.SubCatalogTotalLevelCount==0)//没有子分类，则直接进入列表
				// {c.openPage('../info/infolist',item);}
			},
			//定位城市
			chooseCityClick(){
				// c.show('2');
				// uni.navigateTo({
				// 	url:'view/chooseCity'+"?data="
				// });
				c.openPage('../../view/chooseCity');
				// uni.$once("chooseCityFinished",function(data){
					uni.$once("chooseCityFinished",(data)=>{
					console.log('asdf'+data);
					// c.show('asds'+data);
				
					this.reload(false);
					
					
				});
			}, 
			hrefTaskDetail(item) {
				console.log("item===>"+JSON.stringify(item));
				c.openPage('/pagesinfo/infodetail',item);
				},
			onPullDownRefresh() {
				//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
				this.page = 1
				this.pageLook = 1
				this.pageNew = 1
				this.pagePrice = 1
				this.goodslist1 = []
				this.goodslist2 = []
				this.goodslist3 = []
				this.goodslist4 = []
				this.isFresh = true
				this.TabCur = 0
				uni.showLoading({
					title: "刷新中..."
				})
				// this.getCol()
				this.reload();
			},
			//最新上架的物品
			selectGoods() {
				// uniCloud.callFunction({
				// 	name: "selectGoods",
				// 	data: {
				// 		page: this.page,
				// 		pageSize: this.pageSize
				// 	}
				// }).then((res) => {
					// console.log("分页查询商品1:", res)
					// this.goodslist1 = res.result.list.data
					// this.goodslist1 = this.handleArray(res.result.list.data)
					// if (this.goodslist1.length < this.pageSize) {
					// 	this.isMore1 = false
					// }
					// this.page++
					// if (!this.isFresh) {
					// 	uni.hideLoading()
					// }
					// console.log(this.goodslist1)
					// uni.stopPullDownRefresh()
					// uni.hideLoading()

				// }).catch((err) => {
				// 	console.log("错误:", err)
				// 	uni.showToast({
				// 		title: "网络错误~",
				// 		icon: "none",
				// 		duration: 1500
				// 	})
				// })
			},
			
			imageError(e){
				// console.log('12')
				// e.currentTarget.src="img_no.png";
			},
			//全新闲置
			selectNew() {
				uniCloud.callFunction({
					name: "selectNew",
					data: {
						page: this.pageNew,
						pageSize: this.pageSize
					}
				}).then((res) => {
					console.log("分页查询商品2:", res)

					this.goodslist2 = this.handleArray(res.result.list.data)
					if (this.goodslist2.length < this.pageSize) {
						this.isMore2 = false
					}
					this.pageNew++
					if (!this.isFresh) {
						uni.hideLoading()
					}
					console.log(this.goodslist2)
					uni.stopPullDownRefresh()
					uni.hideLoading()
				}).catch((err) => {
					console.log("错误:", err)
					uni.showToast({
						title: "网络错误~",
						icon: "none",
						duration: 1500
					})
				})
			},
			
			//	低价秒杀的物品
			selectDownPrice() {
				uniCloud.callFunction({
					name: "selectDownPrice",
					data: {
						page: this.pagePrice,
						pageSize: this.pageSize
					}
				}).then((res) => {
					console.log("分页查询商品3:", res)
					this.goodslist3 = this.handleArray(res.result.list.data)
					if (this.goodslist3.length < this.pageSize) {
						this.isMore3 = false
					}
					this.pagePrice++
					if (!this.isFresh) {
						uni.hideLoading()
					}
					console.log(this.goodslist3)
					uni.stopPullDownRefresh()
					uni.hideLoading()
				}).catch((err) => {
					console.log("错误:", err)
					uni.showToast({
						title: "网络错误~",
						icon: "none",
						duration: 1500
					})
				})
			},
			//浏览人数最多的物品
			selectLook() {
				uniCloud.callFunction({
					name: "selectLook",
					data: {
						page: this.pageLook,
						pageSize: this.pageSize
					}
				}).then((res) => {
					console.log("分页查询商品4:", res)
					this.goodslist4 = this.handleArray(res.result.list.data)
					this.isMore4 = true
					if (this.goodslist4.length < this.pageSize) {
						this.isMore4 = false
					}
					this.pageLook++
					if (!this.isFresh) {
						uni.hideLoading()
					}
					console.log(this.goodslist4)
					uni.stopPullDownRefresh()
					uni.hideLoading()
				}).catch((err) => {
					console.log("错误:", err)
					uni.showToast({
						title: "网络错误~",
						icon: "none",
						duration: 1500
					})
				})
			},
			//轮播图的事件
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			//tab栏切换事件
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.getCol()
			},
			//商品点击事件
			hrefstoreDetail(item) {
				console.log("item:", item)
				uni.navigateTo({
					url: "/view/storeDetail?item=" + encodeURIComponent(JSON.stringify(item))
				})
			},
			onReady() { //页面初次渲染完毕执行
				// console.log(this.$store.state.user)
				const query = uni.createSelectorQuery().in(this);
				query.select('.custom').boundingClientRect(data => {
					this.customHeight = data.height
				}).exec();
				query.select('.nav-liner').boundingClientRect(data => {
					this.scrollHeight = data.top - this.customHeight
					this.marginTop = data.height
				}).exec();
			},
		
			onPageScroll(res) {
				if (res.scrollTop >= this.scrollHeight) {
					this.isFixed = true
				} else {
					this.isFixed = false
				}

			},
			add() {
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: 'add',
					data: {
						name: 'DCloud',
						subType: 'uniCloud',
						createTime: Date.now()
					}
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: `成功添加一条数据，文档id为：${res.result.id}`,
						showCancel: false
					})
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `添加数据失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},


			//根据设备宽度计算总列数
			getCol() {
				// if(this.screenWidth<500)
				// {
				this.colWidth = this.screenWidth / 2 - 15
				if (this.TabCur == 0 && this.goodslist2.length == 0) {
					this.selectGoods()
				} else if (this.TabCur == 1 && this.goodslist2.length == 0) {
					this.selectNew()
				} else if (this.TabCur == 2 && this.goodslist3.length == 0) {
					this.selectDownPrice()
				} else if (this.TabCur == 3 && this.goodslist4.length == 0) {
					this.selectLook()
				}

				// }
				// else{
				// 	this.colWidth=192
				// 	this.col = this.screenWidth/3
				// 	this.selectGoods()
				// }
			},
			//把数组格式化为目标数组形式
			handleArray(arr) {
				console.log("需处理的数组：", arr)
				let operateArr = []
				for (let i = 0; i < this.col; i++) {
					operateArr.push([])
				}
				console.log("数组容器：", operateArr)
				for (let i = 0, j = 0; i < arr.length; i++) {
					if (j < this.col) {
						operateArr[j].push(arr[i])
						j++
					} else {
						j = 0
						operateArr[j].push(arr[i])
						j++
					}

				}
				console.log("处理后的数组：", operateArr)
				return operateArr
			}
		}

	}
</script>

<style lang="scss" scoped>
	.index {
		min-height: 100vh;
		overflow-x: hidden;

		.refresh {
			position: fixed;
			z-index: -1;
			background-color: #F8D347;
			width: 100vw;
			height: 50vh;
			top: 0;
			left: 0;
		}

		.container {
			position: relative;
			background-color: #FFFFFF;

			.my-background-circle {
				position: absolute;
				width: 100%;
				height: 200rpx;
				/* #ifdef APP-PLUS */
				height: 240rpx;
				/* #endif */
				height: 280rpx;
				border-radius: 0 0 50% 50% / 0% 0% 15% 15%;
				overflow: hidden;
			}

			.goods {
				background-color: #EEEEEE;
				display: flex;
				position: relative;
				width: 400vw;
				margin-left: 0;
				transition: .5s all;

				.good {
					flex: 1;
				}
			}

		}
	}

	.isFixed-true {
		position: fixed;
	}

	.Tabcur-1 {
		margin-left: -100vw;
	}

	.marginTopTab {
		margin-top: 90rpx;
	}

	.nav-liner {
		background: linear-gradient(top, #FFFFFF 0%, #eeeeee 100%);
		z-index: 99;
	}

	.sub-title {
		text {
			font-size: 32rpx;
		}
	}

	.nav .cu-item {
		margin: 0;
	}

	.location {
		max-width: 200rpx;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.text-focus {
		font-size: 36rpx !important;
	}

	.isFocus {
		display: inline-block;
	}

	.foucus-no {
		display: none !important;
	}

	.cu-bar .action.sub-title text[class*="bg-"]:last-child {
		position: absolute;
		display: inline-block;
		bottom: 0.5rem;
		border-radius: 6rpx;
		width: 100%;
		height: 0.3rem;
		// left: 0.6rem;
		opacity: 0.8;
		z-index: 0;

	}

	.cu-bar .action:first-child {
		margin-left: 0;
	}

	.cu-bar .action:last-child {
		margin-right: 0;
	}

	.content {
		padding-bottom: 30px;
	}

	.title {
		font-weight: bold;
		text-align: center;
		padding: 20px 0px;
		font-size: 20px;
	}

	.tips {
		color: #999999;
		font-size: 14px;
		padding: 20px 30px;
	}

	.btn-list {
		padding: 0px 30px;
	}

	.btn-list button {
		margin-bottom: 20px;
	}

	.upload-preview {
		width: 100%;
	}
	
	.box{
	    position: relative;
	    width: 50%;
	    height: 0;
	    padding-bottom: 50%;
	}
.box img {
    position:  absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.image{
position: relative;
width: 100%;
height: 0px;
padding-top: 100%; //padding-bottom都可以
img{
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
}
</style>


<style lang="scss" scoped>

	.collection{
		min-height: 100vh;
		background-color: #EEEEEE;
		overflow-x: hidden;
		.nav{
			z-index: 99;
		}
		.goods{
			display: flex;
			position: relative;
			margin-left: 0;
			transition: .5s all;
			margin-top: 90rpx;
			.good{
				flex: 1;
			}
		}
	}
	
	
</style>

<style lang="scss" scoped>
	
	.cu-chat .cu-item>.main .content {
		display: block;
		width: 100%;

		padding: 0;
	}

	.cu-chat .cu-item>.main .content::before {
		display: none;

	}

	.cu-chat .cu-item>.main .content::after {
		display: none;

	}
	
.cu-chat .cu-item .date{
	height: 40px;
	left: 0;
	bottom: 0;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 0 15rpx;
		button{
			margin-left: auto;
			margin-right: 10rpx;
		}
	}
	.cu-chat .cu-item>.main {
		max-width: 100% !important;
		min-width: 100% !important;
	}

	.cu-chat .cu-item>.cu-avatar {
		width: 35px !important;
		height: 35px !important;
		border-radius: 50%;
	}

	.task {
		width: 100vw;
		display: flex;
		flex-flow: column;

		.cu-chat {
			.cu-item {
				margin: 10rpx 10rpx 0 10rpx;
				padding: 30rpx 15rpx 70rpx 15rpx;
				border-radius: 3px;
				background-color: #FFFFFF;
				.main {
					margin: 0;

					.content {
						background-color: #FFFFFF;

						.university {
							width: 100%;
							text-align: right;
							padding: 0 15rpx;
						}

						.item-header {
							width: 100%;
							display: flex;
							justify-content: flex-start;
							align-items: center;

							.item-price {
								margin-left: auto;
							}

							.item-title {
								// padding: 7px;
								display: -webkit-box;
								/*设置为弹性盒子*/
								-webkit-line-clamp: 1;
								/*最多显示1行*/
								overflow: hidden;
								/*超出隐藏*/
								text-overflow: ellipsis;
								/*超出显示为省略号*/
								-webkit-box-orient: vertical;
								word-break: break-all;
								/*强制英文单词自动换行*/
								max-width: 350rpx;
							}
						}

						.item-desc {
							// padding: 7px;
							display: -webkit-box;
							/*设置为弹性盒子*/
							-webkit-line-clamp: 3;
							/*最多显示1行*/
							overflow: hidden;
							/*超出隐藏*/
							text-overflow: ellipsis;
							/*超出显示为省略号*/
							-webkit-box-orient: vertical;
							word-break: break-all;
							/*强制英文单词自动换行*/
							max-width: 600rpx;
						}
					}
				}
			}

		}

	}
</style>
<style scoped lang="scss">
	@import 'pagesorder/ConfirmOrder.scss'; 
</style>