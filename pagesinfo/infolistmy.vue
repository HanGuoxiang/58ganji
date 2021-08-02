<template>
	<view class="collection">
		
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{title}}</block>
		</cu-custom>
			<view class="container"> 
		<scroll-view scroll-x class="bg-white nav text-center" :style="{position:'fixed',top:custombar+'px'}" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in navList" :key="index" @tap="tabSelect" :data-id="index" :data-tag="item.tagObject" :data-infotype="item.id">
				{{item.name}}
			</view>
		</scroll-view>
	<!-- 	<view class="goods">
			<HMfilterDropdown  menuTop="200" :filterData="filterData" :defaultSelected ="defaultSelected" @confirm="confirm"></HMfilterDropdown>
		</view> -->
		
		<!-- <HMfilterDropdown class="goods"  :menuTop="0" :filterData="filterData" :defaultSelected ="defaultSelected"  :updateMenuName="true" @confirm="confirm" dataFormat="Object"></HMfilterDropdown> -->
	<!-- 	<view class="goods" :style="{marginLeft:'-'+TabCur*100+'vw'}"> -->
		<view class="goods" :style="{marginLeft:'-'+0*100+'vw'}">
			<!-- <view class="good">
				<Goods @clickHref="hrefstoreDetail" :taskList="infoList"></Goods>
			</view> -->
			<view class="good">
				<view class="task" >
					<view class="cu-chat">
						<!-- <view class="cu-item animation-bottom-top" :style="{'animationDelay': (index + 1)*0.1 + 's'}" v-for="(item,index) in taskList" -->
						 <!-- :key="index" @click="hrefTask(item)"> -->
				<!-- <view class="cu-item animation-bottom-top" :style="{'animationDelay': (index + 1)*0.1 + 's'}" v-for="(index,item) in infoList" -->
				 <!-- @click="hrefTaskDetail(item)"> -->
			<!-- 	 <view class="cu-item animation-bottom-top"  v-for="item in infoList" @click="updateClick(item)"> -->
				 	 <view class="cu-item animation-bottom-top"  v-for="item in infoList" >
							<view class="main">
				
								<view class="content shadow">
				
									<view class="item-header">
				
										<view class="item-title text-lg text-bold">{{item['需求标题']}}</view>
														
														<button class="cu-btn   bg-blue  sm"  v-if="item.TopTimeRemain>=0">置顶中</button>
														
										<view class="item-price"><text class="text-price text-red text-lg text-bold padding-sm">{{item['需求价格']}}</text></view>
									</view>
									<view class="item-desc text-gray text-sm">
										{{item['需求内容']}}
										 
									</view>
									<view class="item-tag">
										<view class="cu-tag bg-red sm round" :class="'light-'+k" v-for="(v,k) in item.tags" :key="k">{{v}}</view>
										<!-- <view class="cu-tag bg-green light sm round">史诗</view> -->
									</view>
									<!-- <view class="university">
										<text class="text-grey text-sm">{{item.需求价格}}</text>
									</view> -->
								</view>
							</view>
				
				 
							<view class="date">
								<text class="text-xs text-gray">发布时间:{{item['创建日期']}}</text>
								
								<view class="item-price">
									
									<button class="cu-btn round shadow bg-orange  sm"  @click="updateClick(item)">修改</button>
										<button class="cu-btn round shadow bg-yellow sm"  @click="refreshClick(item)">刷新</button>
										<button class="cu-btn round shadow bg-green sm"  @click="topClick(item)">置顶</button>
									<button class="cu-btn round shadow bg-red sm"  @click="deleteClick(item)">删除</button>
								</view>
								
							</view>
						</view>
					</view>
					</view>
				
			</view>
			<!-- <view class="good">
				<taskItem @hrefTask="hrefTaskDetail" :taskList="infoList"></taskItem>
			</view> -->

		</view>
		</view>
	</view>
</template>

<script>
	 import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	 // import data from '@/modules/data.js';//筛选菜单数据
	 
	import Goods from "@/components/goods.vue"
	import taskItem from "@/components/taskItem.vue"
	
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	var dataItem={};
	var selCatalogItem={};//选择的分类对象
	export default{
		components:{
				'HMfilterDropdown':HMfilterDropdown ,
			Goods,
			taskItem,
		
		},
		data(){
			return{
				options:{},
				title:"",
				defaultSelected:[],
				  filterData:[],
				demandtype:10003,//纯信息 10000任务
				TabCur: 0,
				infoType:"10231",
				scrollLeft: 0,
				custombar:this.CustomBar,
				navList:[{"name":"服务","id":"10231"},{"name":"需求","id":"10232"}],
				infoList:[],
				taskList: [
					{
						id: 2,
						type: "任务",
						sort: "代课",
						title: "填起拼车",
						price: "18.00",
						time: "2020-9-13 12:30",
						auth: {
							code: "52154",
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg",
							name: "lenom",
							campus:"清华大学"
							
						},
						tag: ['高数', '楼401'],
						desc: "求导"
					}]
			}
		},
		onLoad(data) {
			// data.data="{\"ID\":\"10005\",\"InfoType\":\"10231\",\"创建日期\":\"2021/5/25 15:17:26\",\"操作人\":\"10000\",\"父账号ID\":\"10000\",\"分类名称\":\"二手物品\",\"图片\":\"6ba897eb-172a-4484-9e08-c14cb00a0830.png\",\"父分类ID\":\"10000\",\"层级\":\"1\",\"所属分类类型\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/6ba897eb-172a-4484-9e08-c14cb00a0830.png\",\"SubCatalogTotalLevelCount\":1}";
			console.log('onLoad========》'+data+JSON.stringify(data));
		
					if(c.isNull(data.data))
					{
					  c.show('缺少父级类目ID');
					  return;
					  }
					
			 dataItem=JSON.parse(data.data);
			
		this.infoType=dataItem.InfoType;
		this.title="我的发布";
		
			
		},
		onShow() {
			console.log("onShow=================>");
			 this.reload();
		},
		methods:{
			reload(){
				let loginedUser= c.getUser(true);
				// console.log('loginedUser'+loginedUser+JSON.stringify(loginedUser))
				if(!loginedUser)
				{return;}
				
				c.loading();
				b.getHttpWithLocation("action=infolist&db=本地圈儿1004"
				+"&infotype="+this.infoType+"&ordertype=10000&pageindex=0&pagesize=50&isquerymy=1&queryuserencryptid="+c.getUser(false).EncryptID,(data)=>{
					 // console.log('data'+data+JSON.stringify(data));
					 if(data.Status==1)
					 {
					
					 this.infoList=data.Data.DemandList;
					 
									 let rootItem={};
									 rootItem.name="筛选";
									 rootItem.type="filter";
									 rootItem.submenu=data.Data.CatalogTypeList;
									 let filterlist=[rootItem];
					this.filterData=filterlist;
									
									// let ret=[];
									// let typelist=data.Data.CatalogTypeList;
									// for(let item in typelist)
									// {
										
									// }
							c.hideLoading();
							}
				});
				
				
			},
			// uniCloud.callFunction({
			// 	name:"selectCollection",
			// 	data:{
			// 		phone:this.$store.state.user.user.phone
			// 	}
			// }).then((res)=>{
			// 	this.goodslist=res.result.data
			// 	this.isLoad=false
			// }).catch((err) => {
			// 	uni.showModal({
			// 		content: `操作失败：${err.message}`,
			// 		showCancel: false
			// 	})
			// })
			updateClick(item){
				c.openPage('infoupdate',item);
			},
			//购买置顶
			topClick(item){
		
								c.confirm("当前信息置顶到期时间是【"+item.置顶到期时间+"】，是否前去购买？",(clickIndex)=>{
									if(clickIndex==1)//
									{
										
										c.loading();
										b.getHttpWithLocation("action=infotopproductlist&db=本地圈儿1004"
										,(data)=>{
											 console.log('data'+data+JSON.stringify(data));
											 if(data.Status==1)
											 { 
												 let titlelist=[];
												 for(var key in data.Data)
												 {
													 let tmpItem=data.Data[key];
													 titlelist.push("延长置顶"+tmpItem.需求标题+"天"+"("+tmpItem.需求价格+"元)");
												 }
												 c.showActionSheet(titlelist,(clicKIndex)=>{
													 if(clicKIndex==-1)
													 {return;} 
													 
													 let selItem=data.Data[clicKIndex];
													 // c.show("选择了"+selItem.需求标题);
													 
													 
													 //准备商店以及下面的产品信息
													 let curShopItem={};
													 curShopItem.ShopID="";
													 curShopItem.ShopName="";
													 curShopItem.ProductList=[];
													 curShopItem.Coupon={};
													 
													 let productItem={};
													 productItem.ProductName="延长【"+item.需求标题+"】置顶"+selItem.需求标题+"天";
													  // productItem.ProductName="延长置顶"+selItem.需求标题+"天";
													 productItem.ProductCount=1;
													 productItem.ProductID=selItem.ID;
													 productItem.ProductPrice=selItem.需求价格;
													 curShopItem.ProductList.push(productItem);
													  
													 productItem.PropertyList=[];
													 
													 
													 let passedItem={};
													 passedItem.OrderType="12533";//任务订单
													 passedItem.InfoIDAddTopTime=item.ID;
													 passedItem.ShopList=[curShopItem];
													 c.openPage("../order/ConfirmOrder",passedItem);
													 
												 });
											}
											c.hideLoading();
										});
										}
				});
			},
			//刷新
			refreshClick(item){
				c.loading();
				b.getHttpWithLocation("action=inforefresh&db=本地圈儿1004"
				+"&infoid="+item.ID,(data)=>{
					 console.log('data'+data+JSON.stringify(data));
					 if(data.Status==1)
					 { c.show('刷新成功');
							}
							else if(data.Status==10000)
							{
								c.confirm("今日刷新次数已经用完，是否前去购买？",(clickIndex)=>{
									if(clickIndex==1)//
									{
										
										c.loading();
										b.getHttpWithLocation("action=inforefreshproductlist&db=本地圈儿1004"
										,(data)=>{
											 console.log('data'+data+JSON.stringify(data));
											 if(data.Status==1)
											 { 
												 let titlelist=[];
												 for(var key in data.Data)
												 {
													 let item=data.Data[key];
													 titlelist.push("刷新"+item.需求标题+"次"+"("+item.需求价格+"元)");
												 }
												 c.showActionSheet(titlelist,(clicKIndex)=>{
													 if(clicKIndex==-1)
													 {return;} 
													 
													 let selItem=data.Data[clicKIndex];
													 c.show("选择了"+selItem.需求标题);
													 
													 
													 //准备商店以及下面的产品信息
													 let curShopItem={};
													 curShopItem.ShopID="";
													 curShopItem.ShopName="";
													 curShopItem.ProductList=[];
													 curShopItem.Coupon={};
													 
													 let productItem={};
													 productItem.ProductName="购买刷新"+selItem.需求标题+"次";
													 productItem.ProductCount=1;
													 productItem.ProductID=selItem.ID;
													 productItem.ProductPrice=selItem.需求价格;
													 curShopItem.ProductList.push(productItem);
													  
													 productItem.PropertyList=[];
													 
													 
													 let item={};
													 item.OrderType="12530";//任务订单
													 item.ShopList=[curShopItem];
													 c.openPage("../order/ConfirmOrder",item);
													 
												 });
											}
											c.hideLoading();
										});
										
									}
								});
							}
							c.hideLoading();
				});
			},
			deleteClick(item){
				c.confirm("确定要删除？",(clickIndex)=>{
					// c.show(clickIndex+"==");
					if(clickIndex)
					{
						c.loading();
						b.getHttpWithLocation("action=demand_delete&db=本地圈儿1004"
						+"&demandid="+item.ID+"&queryuserencryptid="+c.getUser(false).EncryptID,(data)=>{
							 console.log('data'+data+JSON.stringify(data));
							 if(data.Status==1)
							 {
							 
									this.reload();
									}
									c.hideLoading();
						});
						
					}
				})
			},
			//tab栏切换事件
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				// c.show('1q23'+JSON.stringify(e.currentTarget.dataset.tag));
				// return;
				
				
				
				  this.defaultSelected = [];
				
				  
				  
				   this.infoType=e.currentTarget.dataset.infotype;
				   this.reload();
				 //  //查询父级的子分类
				 // b.getHttpWithLocation("action=cataloglistbyparentid&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&id="+item.ID+"&levelcount=1",(data)=>{
				 // 	 console.log('data'+data+JSON.stringify(data));
				 	 
				 // 	 // this.navList=data.Data;
				 // 	 // setTimeout(()=>{
				 // 	 // 	this.infoScroll();
				 // 	 // },500)
				 // 			c.hideLoading();
				 // });
				 
				// this.reloadDataByCatalog(item.ID);
				 
			},
			reloadDataByCatalog(catalogid,catalogTypeIDStr)
			{
				
				c.loading();
				b.getHttpWithLocation("action=infolist&db=本地圈儿1004"
				+"&ordertype=10000&pageindex=0&pagesize=50&catalogid="+catalogid+"&propertyid="+catalogTypeIDStr,(data)=>{
					 console.log('data'+data+JSON.stringify(data));
					 if(data.Status==1)
					 {
					 this.infoList=data.Data.DemandList;
									 let rootItem={};
									 rootItem.name="筛选";
									 rootItem.type="filter";
									 rootItem.submenu=data.Data.CatalogTypeList;
									 let filterlist=[rootItem];
					this.filterData=filterlist;
									
									// let ret=[];
									// let typelist=data.Data.CatalogTypeList;
									// for(let item in typelist)
									// {
										
									// }
							c.hideLoading();
							}
				});
			},
			//接收菜单结果
			confirm(e){
				// this.indexArr = e.index;
				// this.valueArr = e.value;
				console.log(':'+e.index+JSON.stringify(e.index)+"--"+e.value+JSON.stringify(e.value));
				if(e.value=="")
				{return;}
				this.reloadDataByCatalog(selCatalogItem.ID,e.value);
				// this.filterData[0][0]
			},
			hrefTaskDetail(item) {
				c.openPage('infodetail',item);
				// uni.navigateTo({
				// 	url: "taskDetail?item=" + encodeURIComponent(JSON.stringify(item))
				// })
			},
			hrefstoreDetail(item){
				uni.navigateTo({
					url:"storeDetail?item=" + encodeURIComponent(JSON.stringify(item))
				})
			}
		}
	}
</script>

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
