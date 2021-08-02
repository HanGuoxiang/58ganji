<template>
	<view class='productSort copy-data'>
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
		  		<block slot="backText">返回</block> 
		  		<block slot="content">服务类型</block>
				<!-- <block slot="right" class="action" @click="publish()">发布</block> -->
				<view slot="right" class="action">
					<!-- <navigator :url="'chat/chat'">全国</navigator> -->
					<!-- <text class="cuIcon text" @tap="publish()">发布</text> -->
				</view> 
		  </cu-custom>
			 
				
	<!-- 	<view class='header acea-row row-center-wrapper'>
			<view class='acea-row row-between-wrapper input'>
				<text class='iconfont icon-sousuo'></text>
				<input type='text' placeholder='点击搜索商品信息' @confirm="searchSubmitValue" confirm-type='search' name="search"
				 placeholder-class='placeholder'></input>
			</view>
		</view> -->
			<!-- <scroll-view scroll-y="true" class="left-wrapper" scroll-with-animation="true" :scroll-top="left_scroll"> -->
			<!-- <scroll-view -->
		<view class='aside' style="margin-top: 1000rpx;background-color: #007AFF;"> 
		
			<view class='item acea-row row-center-wrapper' :class='index==navActive?"on":""' v-for="(item,index) in productList"
			 :key="index" @click='tap(index,"b"+index,item)'><text>{{item.tagObject['分类名称']}}</text></view>
			
		</view>
		 <!-- </scroll-view> -->
<!-- 		<scroll-view scroll-y="true" class="left-wrapper" scroll-with-animation="true" :scroll-top="left_scroll">
			<view class="aside">
				<view class="title-content" :class="select_index === index?'onSelected':''" v-for="(title,index) in productList"
				 :key="title.id" @tap="choose(index)">{{title.分类名称}}</view>
			</view>
		</scroll-view> --> 
		
		<view class='conter'>
			<scroll-view scroll-y="true" :scroll-into-view="toView" :style='"height:"+height+"rpx;"' @scroll="scroll"
			 scroll-with-animation='true'>
				<block v-for="(item,index) in productList" :key="index"> 
					<view v-if="item.children.length>0">
						<view class='listw' :id="'b'+index">
							<view class='title acea-row row-center-wrapper'>
								<view class='line'></view>
								<view class='name'>{{item.tagObject['分类名称']}}</view>
								<view class='line'></view>
							</view>
							<view class='list acea-row'>
								<block v-for="(itemn,indexn) in item.children" :key="indexn">
									<navigator hover-class='none' :url='"/pages/goods_list/index?sid="+itemn.id+"&title="+item.tagObject["分类名称"]' class='item acea-row row-column row-middle'>
										<view class='picture' @tap="itemClick(itemn)">
											<image :src='itemn.pic' v-if="itemn.pic"></image>
											<image src="/static/images/sort-img.png" v-else></image>
										</view>
										<view class='name line1'>{{itemn.tagObject['分类名称']}}</view>
									</navigator>
								</block>
							</view>
						</view>
					</view>				
				</block>
				<view :style='"height:"+(height-300)+"rpx;"' v-if="number<15"></view>
			</scroll-view>
		</view>
		<view class="uni-p-b-98"></view>
		<!-- <tabBar :pagePath="'/pages/goods_cate/goods_cate'"></tabBar> -->
	</view>
</template>

<script>
	// import tabBar from "@/pages/index/components/tabBar.vue";
	// import {
	// 	getCategoryList
	// } from '@/api/store.js';
	
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	// isPublishing  是否发布过程
	export default {
		// components:{
		// 	tabBar
		// },
		data() {
			return {
				dataItem:{},
				catalogID:"",//分类id
				navlist: [],
				productList: [],
				navActive: 0,
				number: "",
				height: 0,
				hightArr: [],
				toView: ""
			}
		},
		onLoad(data) {
			//10082 
			data.data="{\"isPublishing\":true,\"CatalogID\":\"10007\",\"ID\":\"10007\",\"创建日期\":\"2021/5/25 15:17:40\",\"操作人\":\"10000\",\"父账号ID\":\"10000\",\"分类名称\":\"本地服务\",\"图片\":\"\",\"父分类ID\":\"10000\",\"层级\":\"1\",\"所属分类类型\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/\"}";
			
			console.log('onLoad========》'+data+JSON.stringify(data));
			
					if(c.isNull(data.data))
					{
					  c.show('缺少父级类目ID');
					  return;
					  }
					  
			this.dataItem=JSON.parse(data.data);
		
		this.catalogID=this.dataItem.CatalogID;
			this.reload();
		},
		onReady() {
			// this.$nextTick(()=>{
			// 	const query = uni.createSelectorQuery();
			// 	query.select('#tabbar').boundingClientRect(data => {
			// 		console.log(data)
			// 	}).exec();
			// });
		},
		methods: {
			reload(){
				if(c.isNull(this.catalogID))
				{
					c.show("this.catalogID null");
					return;}
				c.loading();
				 // cataloglistbyparentid
				b.getHttpWithLocation("action=getpropertydetailbypcatalogid&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&catalogid="+this.catalogID+"&levelcount=3",(data)=>{
					 console.log('data'+data+JSON.stringify(data));
					 
					 this.productList=data.Data;
					 setTimeout(()=>{
					 	this.infoScroll();
					 },500)
							c.hideLoading();
				});
			},
			//点击子分类后进行
			itemClick(item){
				console.log('item='+JSON.stringify(item));
				
			
				if(this.dataItem.isPublishing)//来自发布顶级，选择二级分类，进去发布页面
				{c.openPage('/pagespublish/publishfinished',item.tagObject);}
				else if(this.dataItem.isPublishChoosing)//来个发布页面，选择服务类型，返回发布页面
				{
						item.tagObject.CatalogID=this.dataItem.CatalogID;
					c.notifyEvent("publishing_choosedtype",item.tagObject);
					c.closePage();
					}
				else{
					
				}
			},
			tap: function(index, id,item) {
				
				
					console.log('item='+JSON.stringify(item));
				
				if(this.dataItem.isPublishing)//来自发布顶级，选择二级分类，进去发布页面
				{}
				else if(this.dataItem.isPublishChoosing)//来个发布页面，选择服务类型，返回发布页面
				{
					if(item.children.length==0)
					{
							item.tagObject.CatalogID=this.dataItem.CatalogID;
						c.notifyEvent("publishing_choosedtype",item.tagObject);
						c.closePage();
						// return;
					}
					}
				else{
					
				}
				// console.log('asdfasdfsdf');
				this.toView = id;
				this.navActive = index;
			},
			infoScroll: function() {
				let that = this;
				let len = that.productList.length;
				this.number = that.productList[len - 1].children.length;
				//设置商品列表高度
				uni.getSystemInfo({
					success: function(res) {
						that.height = (res.windowHeight) * (750 / res.windowWidth) - 98;
					},
				});
				let height = 0;
				let hightArr = [];
				for (let i = 0; i < len; i++) {
					//获取元素所在位置
					let query = uni.createSelectorQuery().in(this);
					let idView = "#b" + i;
					query.select(idView).boundingClientRect();
					query.exec(function(res) {
						let top = res[0].top;
						hightArr.push(top);
						that.hightArr = hightArr
					});
				};
			},
			
			
			scroll: function(e) {
				let scrollTop = e.detail.scrollTop;
				let scrollArr = this.hightArr;
				for (let i = 0; i < scrollArr.length; i++) {
					if (scrollTop >= 0 && scrollTop < scrollArr[1] - scrollArr[0]) {
						this.navActive = 0
					} else if (scrollTop >= scrollArr[i] - scrollArr[0] && scrollTop < scrollArr[i + 1] - scrollArr[0]) {
						this.navActive = i
					} else if (scrollTop >= scrollArr[scrollArr.length - 1] - scrollArr[0]) {
						this.navActive = scrollArr.length - 1
					}
				}
			},
			searchSubmitValue: function(e) {
				if (this.$util.trim(e.detail.value).length > 0)
					uni.navigateTo({
						url: '/pages/goods_list/index?searchValue=' + e.detail.value
					})
				else
					return this.$util.Tips({
						title: '请填写要搜索的产品信息'
					});
			},
		}
	}
</script>

<style scoped lang="scss">
	.productSort .header {
		width: 100%;
		height: 96rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.productSort .header .input {
		width: 700rpx;
		height: 60rpx;
		background-color: #f5f5f5;
		border-radius: 50rpx;
		box-sizing: border-box;
		padding: 0 25rpx;
	}

	.productSort .header .input .iconfont {
		font-size: 35rpx;
		color: #555;
	}

	.productSort .header .input .placeholder {
		color: #999;
	}

	.productSort .header .input input {
		font-size: 26rpx;
		height: 100%;
		width: 597rpx;
	}

	.productSort .aside {
		position: fixed;
		width: 24%;
		left: 0;
		top:0;
		background-color: #f7f7f7;
		overflow-y: auto;
		overflow-x: hidden;
		height: auto;
		margin-top: 96rpx;
		/* 兼容 IOS<11.2 */
		bottom: calc(100rpx+ constant(safe-area-inset-bottom));
		/* 兼容 IOS>11.2 */
		bottom: calc(100rpx + env(safe-area-inset-bottom));
	}

	.productSort .aside .item {
		height: 100rpx;
		width: 100%;
		font-size: 26rpx;
		color: #424242;
	}

	.productSort .aside .item.on {
		background-color: #fff;
		border-left: 4rpx solid #fc4141;
		width: 100%;
		text-align: center;
		color: #fc4141;
		font-weight: bold;
	}

	.productSort .conter {
		margin: 96rpx 0 0 180rpx;
		padding: 0 14rpx;
		background-color: #fff;
	}

	.productSort .conter .listw {
		padding-top: 20rpx;
	}

	.productSort .conter .listw .title {
		height: 90rpx;
	}

	.productSort .conter .listw .title .line {
		width: 100rpx;
		height: 2rpx;
		background-color: #f0f0f0;
	}

	.productSort .conter .listw .title .name {
		font-size: 28rpx;
		color: #333;
		margin: 0 30rpx;
		font-weight: bold;
	}

	.productSort .conter .list {
		flex-wrap: wrap;
	}

	.productSort .conter .list .item {
		width: 177rpx;
		margin-top: 26rpx;
	}

	.productSort .conter .list .item .picture {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.productSort .conter .list .item .picture image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.productSort .conter .list .item .name {
		font-size: 24rpx;
		color: #333;
		height: 56rpx;
		line-height: 56rpx;
		width: 120rpx;
		text-align: center;
	}

	.category {

		.category-wrapper {
			width: 100%;
			display: flex;
			flex-direction: row;
			position: absolute;
			top: 0;
			bottom: 0;

			.left-wrapper {
				width: 200rpx;
				flex: 0 0 200rpx;
				background-color: #f6f6f6;

				.left-content {

					.title-content {
						width: 100%;
						height: 100rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 25rpx;
						border-bottom: 1px solid #dedede;
						cursor: pointer;

						&:last-child {
							border-bottom: 0;
						}

						&.onSelected {
							background-color: #fff;
							position: relative;
							color: #feb436;

							&::before {
								content: '';
								position: absolute;
								left: 0;
								top: 0;
								width: 10rpx;
								height: 100%;
								background: linear-gradient(124deg, #feb436 0%, #fb7c22 100%);
							}
						}
					}
				}
			}

			.right-wrapper {
				flex: 1;

				.right-content {
					width: 100%;
					padding: 20rpx 0;
					border-left: 1rpx solid #efefef;
					box-sizing: border-box;

					.banner-wrapper {
						padding: 0 20rpx;

						.swiper-content {
							width: 100%;
							height: 180rpx;
							margin-bottom: 20rpx;

							.swiper-item {
								.swiper-img {
									width: 100%;
									height: 180rpx;
								}
							}
						}
					}

					.product-wrapper {
						.category-item {

							.category-title {
								height: 60rpx;
								font-size: 26rpx;
								line-height: 60rpx;
								font-weight: 500;
								background-color: #f6f6f6;
								padding-left: 20rpx;
								color: #000;
							}

							.category-content {
								display: flex;
								flex-direction: row;
								flex-flow: wrap;
								padding: 20rpx 20rpx 0;


								.product-item {
									width: 33%;
									display: flex;
									flex-direction: column;
									justify-content: center;
									align-items: center;
									margin-bottom: 20rpx;

									.product-img {
										width: 120rpx;
										height: 140rpx;
										margin-bottom: 10rpx;
									}

									.product-title {
										font-size: 23rpx;
									}
								}
							}
						}
					}
				}
			}
		}

	}
</style>
