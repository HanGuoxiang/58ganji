<template>
	<view class="collection">
		
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的需求</block>
		</cu-custom>
			<view class="container"> 
		<scroll-view scroll-x class="bg-white nav text-center" :style="{position:'fixed',top:custombar+'px'}" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in navList" :key="index" @tap="tabSelect" :data-id="index" :data-tag="item">
				{{item['分类名称']}}
			</view>
		</scroll-view>
	<!-- 	<view class="goods">
			<HMfilterDropdown  menuTop="200" :filterData="filterData" :defaultSelected ="defaultSelected" @confirm="confirm"></HMfilterDropdown>
		</view> -->
		
		<!-- <HMfilterDropdown class="goods"  :menuTop="0" :filterData="filterData" :defaultSelected ="defaultSelected"  :updateMenuName="true" @confirm="confirm" dataFormat="Object"></HMfilterDropdown> -->
	
			<!-- <view class="good">
				<Goods @clickHref="hrefstoreDetail" :taskList="infoList"></Goods>
			</view> -->
			
			<view class="good">
				<view class="task">
					<view class="cu-chat">
						<view class="cu-item animation-bottom-top" :style="{'animationDelay': (index + 1)*0.1 + 's'}" v-for="(item,index) in taskList"
						 :key="index" @click="hrefTask(item)">
				
							<view class="main">
				
								<view class="content shadow">
				
									<view class="item-header">
				
										<view class="item-title text-lg text-bold">{{item['订单名称']}}</view>
										<view class="item-price"><text class="text-price text-red text-lg text-bold padding-sm">{{item['订单价格']}}</text></view>
									</view>
									<view class="item-desc text-gray text-sm">
										{{item['需求内容']}}
										
									</view>
									<view class="item-tag">
										<view class="cu-tag bg-red sm round" :class="'light-'+k" v-for="(v,k) in item.tags" :key="k">{{v}}</view>
										<!-- <view class="cu-tag bg-green light sm round">史诗</view> -->
									</view>
									<view class="university">
										<!-- <text class="text-grey text-sm">{{item.服务商}}</text> -->
									</view>
								</view>
							</view>
				
				
							<view class="date">
								<text class="text-xs text-gray">发布时间:{{item['创建日期']}}</text>
								<button class="cu-btn round shadow bg-yellow sm"  @click.stop="hrefChat(item)">{{item.OrderStatusName}}</button>
								
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
				defaultSelected:[],
				  filterData:[],
				demandtype:10003,//纯信息 10000任务
				TabCur: 0,
				scrollLeft: 0,
				custombar:this.CustomBar,
				navList:[],
				infoList:[],
				taskList: [{
						id: 0,
						type: "任务",
						sort: "兼职",
						title: "找人做兼职",
						price: "50.00",
						time: "2020-9-12 15:16",
						auth: {
							code: "52154",
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg",
							name: "西瓜不甜",
							campus:"清华大学"
						},
						tag: ['轻松', '方便'],
						desc: "项目 Darling 编译成功，前端运行日志，请在小程序开发工具中查看"
					},
					
					]
			}
		},
		onLoad(data) {
			data.data="{\"ID\":\"10005\",\"创建日期\":\"2021/5/25 15:17:26\",\"操作人\":\"10000\",\"父账号ID\":\"10000\",\"分类名称\":\"二手物品\",\"图片\":\"6ba897eb-172a-4484-9e08-c14cb00a0830.png\",\"父分类ID\":\"10000\",\"层级\":\"1\",\"所属分类类型\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/6ba897eb-172a-4484-9e08-c14cb00a0830.png\",\"SubCatalogTotalLevelCount\":1}";
			console.log('onLoad========》'+data+JSON.stringify(data));
			
					if(c.isNull(data.data))
					{
					  c.show('缺少父级类目ID');
					  return;
					  }
					  
			 dataItem=JSON.parse(data.data);
			
		
		// this.navList=[];
			
		},
		onShow() {
			console.log("onShow=================>");
			 this.reload();
		},
		methods:{
			reload(){
				
				c.loading();
				b.getHttpWithLocation("action=cataloglistbytypeid&db=本地圈儿1004"
				+"&catalogtypeid=10012&pageindex=0&pagesize=50&isquerymy=1&queryuserencryptid="+c.getUser(true).EncryptID,(data)=>{
					 // console.log('data'+data+JSON.stringify(data));
					 if(data.Status==1)
					 {
					 this.navList=data.Data;
					if(this.navList.length>0)
					{
						this.reloadByID(this.navList[0].ID);
					}
							c.hideLoading();
							}
				});
				
				
				
				
			},
			reloadByID(orderStatusID)
			{
				c.loading();
				b.getHttpWithLocation("action=orderlist&db=本地圈儿1004"
				+"&ordertype=10217&orderstatus="+orderStatusID+"&orderuserencryptid="+c.getUser(false).EncryptID+"&pageindex=0&pagesize=50&isquerymy=1&queryuserencryptid="+c.getUser(true).EncryptID,(data)=>{
					 // console.log('data'+data+JSON.stringify(data));
					 if(data.Status==1)
					 {
					 this.taskList=data.Data;
					 // c.show(this.taskList);
					// 				 let rootItem={};
					// 				 rootItem.name="筛选";
					// 				 rootItem.type="filter";
					// 				 rootItem.submenu=data.Data.CatalogTypeList;
					// 				 let filterlist=[rootItem];
					// this.filterData=filterlist;
									
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
				 
				this.reloadByID(item.ID)
				 
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
			hrefTask(item) {
				c.openPage('orderupdate',item);
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

<style lang="scss">
	@import 'common/uni-ui.scss';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.shop {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.shop-picture {
		width: 110px;
		height: 110px;
	}

	.shop-picture-column {
		width: 100%;
		height: 170px;
		margin-bottom: 10px;
	}

	.shop-price {
		margin-top: 5px;
		font-size: 12px;
		color: #ff5a5f;
	}

	.shop-price-text {
		font-size: 16px;
	}

	.hot-tag {
		background: #ff5a5f;
		border: none;
		color: #fff;
	}

	.button-box {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		background: #007AFF;
		color: #fff;
	}

	.uni-link {
		flex-shrink: 0;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}


	// 默认加入 scoped ，所以外面加一层提升权重
	.list {
		.uni-list--waterfall {

			/* #ifndef H5 || APP-VUE */
			// 小程序 编译后会多一层标签，而其他平台没有，所以需要特殊处理一下
			/deep/ .uni-list {
				/* #endif */
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				padding: 5px;
				box-sizing: border-box;

				/* #ifdef H5 || APP-VUE */
				// h5 和 app-vue 使用深度选择器，因为默认使用了 scoped ，所以样式会无法穿透
				/deep/
				/* #endif */
				.uni-list-item--waterfall {
					width: 50%;
					box-sizing: border-box;

					.uni-list-item__container {
						padding: 5px;
						flex-direction: column;
					}
				}

				/* #ifndef H5 || APP-VUE */
			}

			/* #endif */
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
