<template>
	<view class="collection">
		
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<!-- class="container" -->
			<view style="display: flex;flex-direction: column;">  
		<scroll-view scroll-x class="bg-white nav text-center" style="position: static;" :style="{position:'static',top:custombar+'px'}" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in navList" :key="index" @tap="tabSelect" :data-id="index" :data-tag="item.tagObject">
				{{item.tagObject['分类名称']}}
			</view> 
		</scroll-view>
		<!-- <view class="goods" style="position: static;"> -->
			<HMfilterDropdown style="position: static;"   :filterData="filterData" :defaultSelected ="defaultSelected" @confirm="confirm"></HMfilterDropdown>
		<!-- </view> -->
		
		<!-- <HMfilterDropdown class="goods"  :menuTop="0" :filterData="filterData" :defaultSelected ="defaultSelected"  :updateMenuName="true" @confirm="confirm" dataFormat="Object"></HMfilterDropdown> -->
		<!-- :style="{marginLeft:'-'+TabCur*100+'vw',top:'100rpx'}" -->
		<!-- <view class="goods" > -->
			<!-- <view class="good">
				<Goods @clickHref="hrefstoreDetail" :taskList="infoList"></Goods>
			</view> -->
			<!-- <view class="good"> -->
				<!-- <taskItem @hrefTask="hrefTaskDetail" :taskList="infoList"></taskItem> -->
				<view class="task" style="position: static;">
					<view class="cu-chat" >
						<!-- <view class="cu-item animation-bottom-top" :style="{'animationDelay': (index + 1)*0.1 + 's'}" v-for="(item,index) in taskList" -->
						 <!-- :key="index" @click="hrefTask(item)"> -->
				<!-- <view class="cu-item animation-bottom-top" :style="{'animationDelay': (index + 1)*0.1 + 's'}" v-for="(index,item) in infoList" -->
				 <!-- @click="hrefTaskDetail(item)"> -->
				 <view class="cu-item animation-bottom-top"  v-for="item in infoList"
				  @click="hrefTaskDetail(item)">
				 
							<view class="main">
				
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
						</view>
					</view>
				</view>
			<!-- </view> -->
		<!-- 	<view class="good">
				<taskItem @hrefTask="hrefTaskDetail" :taskList="infoList"></taskItem>
			</view>
 -->
		<!-- </view> -->
		</view>
	</view>
</template>

<script> 
	 // import uniShare from 'uni_modules/uni-share/js_sdk/uni-share.js';
	 // import HMfilterDropdown from 'uni_modules/HM-filterDropdown/components/HM-filterDropdown/HM-filterDropdown.vue';
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
				curPropertyIDListStr:"",//属性id的12,2,12
				defaultSelected:[],
				  filterData:[],//顶部的筛选菜单栏
				infoType:"10231",//10231是服务信息，10232是任务订单
				TabCur: 0,
				scrollLeft: 0,
				custombar:this.CustomBar,
				navList:[],
				infoList:[],
				taskList: [ ]
			}
		},
		onLoad(data) {
			// data.data="{\"ID\":\"10248\",\"创建日期\":\"2021/5/25 15:17:26\",\"操作人\":\"10000\",\"父账号ID\":\"10000\",\"分类名称\":\"二手物品\",\"图片\":\"6ba897eb-172a-4484-9e08-c14cb00a0830.png\",\"父分类ID\":\"10000\",\"层级\":\"1\",\"所属分类类型\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/6ba897eb-172a-4484-9e08-c14cb00a0830.png\",\"SubCatalogTotalLevelCount\":1}";
			console.log('onLoad========》'+data+JSON.stringify(data));
			
					if(c.isNull(data.data))
					{
					  c.show('缺少父级类目ID');
					  return;
					  }
					  
			 dataItem=JSON.parse(data.data);
			 this.title=dataItem.分类名称;
			 
			 
			
			 
			 // c.loading();
			 // b.getHttpWithLocation("action=cataloglistbyparentid&db=本地圈儿1004"
			 // +"&id="+dataItem.ID+"&levelcount=2",(data)=>{

			 // 	 console.log('data'+data+JSON.stringify(data));
			 // 	 if(data.Status==1)
			 // 	 {
				// 	 let tmpData=data;
				// 	 let dataStr= JSON.stringify(tmpData);
					
				// 	 dataStr=dataStr.replace("children","submenu");
				// 	 dataStr=dataStr.replace("分类名称","name");
					
				// 	 let data2=JSON.parse(dataStr);
				// 	   // console.log("234:"+JSON.stringify(data2)+"");
				// 	 let serviceDemandItem={};
				// 	 serviceDemandItem.name="服务信息";
				// 	 serviceDemandItem.type="hierarchy";
				// 	 serviceDemandItem.submenu=[{"name":"服务信息","value":"10000"},{"name":"悬赏任务","value":"10001"}];
				// 	  //筛选菜单
				// 	 let filterItem={};
				// 	 filterItem.name="筛选";
				// 	 filterItem.type="filter";
				// 	 filterItem.submenu=data2.Data;
				// 	 let filterlist=[serviceDemandItem,filterItem];
					 
				// 	 // console.log("filterlist"+JSON.stringify(filterlist));
				// 	 this.filterData=filterlist;
					 
				// // 	 this.defaultSelected=[];
				// // 	 this.$nextTick(()=>{
				// // this.defaultSelected = [
				// // 	[0],//第0个菜单选中 一级菜单的第1项，二级菜单的第1项，三级菜单的第3项
				// // 	[[null,]]
				// // ];
				// 	 // });
					 
				// 	 }
				// 	 // c.hideLoading();
				// 	 this.reload();
				// 	 });
			 // 
		 this.reload();
			
		},
		methods:{
			reload(){
				c.loading();
				
				 //查询父级的子分类,只查询服务分类下的子分类
				b.getHttpWithLocation("action=cataloglistbyparentid&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50"
				+"&id="+dataItem.ID+"&catalogtypeid=10000&levelcount=1",(data)=>{
					 // console.log('data'+data+JSON.stringify(data));
					if(data.Status==1)
					{
						
					//如果没有子分类，则直接加载当前分类下的数据
					 this.navList=data.Data;
					if(data.Data.length>0)
					{
						// c.show(JSON.stringify(data.Data[0]));
						// return;
						selCatalogItem=data.Data[0].tagObject;
						this.reloadDataByCatalog(selCatalogItem.ID);
					}
					else
					{
						this.reloadDataByCatalog(dataItem.ID);
					}
					 // setTimeout(()=>{
					 // 	this.infoScroll();
					 // },500)
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
			//tab栏切换事件
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				// c.show('1q23'+JSON.stringify(e.currentTarget.dataset.tag));
				// return;
				
				 
				
				  // this.defaultSelected = [];
				
				  
				  let item=e.currentTarget.dataset.tag;
				 //  //查询父级的子分类
				 // b.getHttpWithLocation("action=cataloglistbyparentid&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&id="+item.ID+"&levelcount=1",(data)=>{
				 // 	 console.log('data'+data+JSON.stringify(data));
				 	 
				 // 	 // this.navList=data.Data;
				 // 	 // setTimeout(()=>{
				 // 	 // 	this.infoScroll();
				 // 	 // },500)
				 // 			c.hideLoading();
				 // });
				 
				 
				this.reloadDataByCatalog(item.ID);
				 
			},
			reloadDataByCatalog(catalogid,propertyIDStr)
			{
				
				// if(this.infoType=="10231")//服务信息
				// {
				c.loading();
				b.getHttpWithLocation("action=infolist&db=本地圈儿1004"
				+"&infotype="+this.infoType+"&ordertype=10001&istopload=1&pageindex=0&pagesize=50&catalogid="+catalogid+"&propertyid="+propertyIDStr,(data)=>{
					 // console.log('data'+data+JSON.stringify(data));
					 if(data.Status==1)
					 {
					 // this.infoList=data.Data.DemandList;
					 var tmplist=[];
					 
					 //置顶信息
					 for(let index in data.Data.TopList)
					 {
					 						 let item=data.Data.TopList[index];
					 						 let tmpItem={};
					 						 // console.log("item.需求标题="+item.需求标题+JSON.stringify(item));
					 						 tmpItem.ID=item.ID; 
											 tmpItem.IsTop=1;
					 						 tmpItem.title=item.需求标题;
					 						 tmpItem.content=item.需求内容;
					 						  tmpItem.price=item.需求价格;
					 						  tmpItem.date=item.创建日期;
					 						 tmplist.push(tmpItem);
					 }
					 
					 //正常查询信息
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
											 tmplist.push(tmpItem);
					}
					
					
					 this.infoList=tmplist;
					 // console.log(" this.infoList"+JSON.stringify( this.infoList))
					 let serviceDemandItem={};
					 serviceDemandItem.name="服务信息";
					 serviceDemandItem.type="hierarchy";
			
					 serviceDemandItem.submenu=[{"name":"服务信息","value":"10231"},{"name":"需求信息","value":"10232"}];
					 //筛选菜单
					 let filterItem={};
					 filterItem.name="筛选";
					 filterItem.type="filter";
					 filterItem.submenu=data.Data.PropertyList;
					 
					 
					 let filterlist=[];
					 if(data.Data.PropertyList.length>0)
					 {filterlist=[serviceDemandItem,filterItem];}
					 else
					 {filterlist=[serviceDemandItem];}
					 
					this.filterData=filterlist;
									
									// this.reloadMenuFilter(data.Data.CatalogTypeList);
							
							}
							c.hideLoading();
				});
				// }
				// else//赏金任务
				// {
				// 	//只查询待接单的
				// 	c.loading();
				// 	b.getHttpWithLocation("action=orderlist&db=本地圈儿1004"
				// 	+"&ordertype=10217&orderstatus=10225&pageindex=0&pagesize=50&catalogid="+catalogid+"&propertyid="+propertyIDStr,(data)=>{
				// 		 console.log('data'+data+JSON.stringify(data));
				// 		 if(data.Status==1)
				// 		 {
				// 		 // this.infoList=data.Data.OrderList;
						 
				// 		var tmplist=[];
				// 		for(let index in data.Data)
				// 		{
				// 								 let item=data.Data[index];
				// 								 let tmpItem={};
				// 								 // console.log("item.需求标题="+item.需求标题+JSON.stringify(item));
				// 								 tmpItem.title=item.订单名称;
				// 								 tmpItem.content=item.需求内容;
				// 								  tmpItem.price=item.订单价格;
				// 								  tmpItem.date=item.创建日期;
				// 								 tmplist.push(tmpItem);
				// 		}
				// 		this.infoList=tmplist;
						 
						 
				// 		 let serviceDemandItem={};
				// 		  serviceDemandItem.name="服务信息";
				// 		  serviceDemandItem.type="hierarchy";
				// 		  serviceDemandItem.submenu=[{"name":"服务信息","value":"10000"},{"name":"悬赏任务","value":"10001"}];
				// 		  //筛选菜单
				// 		  // let filterItem={};
				// 		  // filterItem.name="筛选";
				// 		  // filterItem.type="filter";
				// 		  // filterItem.submenu=data.Data.CatalogTypeList;
				// 		  let filterlist=[serviceDemandItem];
				// 		  // this.filterData=[];
				// 		 // this.filterData=filterlist;
						 
				
								
				// 				}
				// 				c.hideLoading();
				// 	});
				// }
			},
			//接收菜单结果
			confirm(e){
				// this.indexArr = e.index;
				// this.valueArr = e.value;
				console.log('confirm====>');
				console.log(e.index+JSON.stringify(e.index)+"--"+e.value+JSON.stringify(e.value));
				// if((e.value+"").replace(",","")==(this.curPropertyIDListStr+"").replace(",",""))
				// {return;}
				
				let isReload=false;
				console.log("this.infoType="+this.infoType+"===e.value[0]"+e.value[0]);
				if(c.isNull(e.value[0]+""))
				{return;}
				if(this.infoType+""!=e.value[0]+"")
				{
					//得到过滤菜单第一个item下的选中项
					this.infoType=e.value[0]+"";
					isReload=true;
				}
				
				// if(this.infoType=="10001")//服务信息
				// {
					console.log("this.curPropertyIDListStr="+this.curPropertyIDListStr+"===e.value[1]"+e.value[1]);
					if(this.curPropertyIDListStr!=e.value[1].toString())
					{isReload=true;
					this.curPropertyIDListStr=e.value[1].toString();
					}
				// this.curPropertyIDListStr=e.value;
				// }
				if(!isReload)
				{return;}
				
				if(this.navList.length==0)
				{
					this.reloadDataByCatalog(dataItem.ID,this.curPropertyIDListStr);
				}
				else
				{
					this.reloadDataByCatalog(selCatalogItem.ID,this.curPropertyIDListStr);
				}
				// this.filterData[0][0]
			},
			reloadMenuFilter(filterData){
				serviceDemandItem.submenu=[{"name":"服务信息","value":"10000"},{"name":"悬赏任务","value":"10001"}];
				 //筛选菜单
								 let filterItem={};
								 filterItem.name="筛选";
								 filterItem.type="filter";
								 filterItem.submenu=data.Data.CatalogTypeList;
								 let filterlist=[serviceDemandItem,filterItem];
				this.filterData=filterlist;
			},
			hrefTaskDetail(item) {
				console.log("item===>"+JSON.stringify(item));
				c.openPage('infodetail',item);
				
				// if(this.infoType=="10231")//服务信息
				// {
				// 	c.openPage('infodetail',item);
				// }
				// else if(this.infoType=="10232")//任务订单信息
				// {
				// 	c.openPage('../order/orderupdate',item);
				// }
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
