<template>
	<view class="page">
		
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">订单详情</block>
		</cu-custom>
		
		<!-- 订单状态 -->
		<view class="order-status">
			<view class="status">
				<text class="iconfont icon-zhuyi"></text>
				<text>{{orderItem.OrderStatusName}}</text>
			</view>
			<view class="reason">
				<!-- <text>剩余12分68秒</text> -->
			</view>
		</view>
		<!-- 收货地址 -->
		<view class="shipping-address">
			<view class="name-phone">
				<text class="iconfont icon-dingwei"></text>
				<text>{{orderItem['收货人']}}</text>
				<text>{{orderItem['电话']}}</text>
			</view>
			<view class="address">
				<text>{{orderItem['收货地址省份']}}{{orderItem['收货地址城市']}}{{orderItem['收货地址县区']}}{{orderItem['收货地址']}}</text>
			</view>
		</view>
		<!-- 订单商品 -->
		<view class="order-goods">
			<view class="goods-list">
				<view class="list" v-for="(item,index) in orderextralist" :key="index">
					<view class="thumb">
						<image :src="'/static/img/goods_thumb_0'+(index+1)+'.png'" mode=""></image>
					</view>
					<view class="item">
						<view class="title">
							<text class="one-omit">{{item['商品名称']}}</text>
						</view>
						<view class="num-size">
							<text>数量：{{item['商品数量']}}</text>
							<text>{{item['商品规格名称']}}</text>
						</view>
						<view class="price">
							<text>￥{{item['商品价格']}}</text>
						</view>
						<view class="order-btn">
							<view class="btn" @click="onApplyAftersales">
								<text>申请售后</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="contact" @tap="chatClick">
				<text class="iconfont icon-kefu"></text>
				<text>联系客服</text>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="order-info">
			<view class="info-list">
				<view class="list">
					<view class="title">订单编号:</view>
					<view class="content">
						<text>{{orderItem.ID}}</text>
						<text class="btn">复制</text>
					</view>
				</view>
				<view class="list">
					<view class="title">下单时间:</view>
					<view class="content">
						<text>{{orderItem['创建日期']}}</text>
					</view>
				</view>
				<view class="list">
					<view class="title">支付方式:</view>
					<view class="content">
						<text>{{orderItem.PayTypeName}}</text>
					</view>
				</view>
				<view class="list">
					<view class="title">配送方式:</view>
					<view class="content">
						<text>普通快递</text>
					</view>
				</view>
				<view class="list">
					<view class="title">配送日期:</view>
					<view class="content">
						<text>2020-11-11</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单明细 -->
		<view class="order-details">
			<view class="details-list">
				<!-- <view class="list">
					<view class="title">
						<text>商品总额</text>
					</view>
					<view class="price">
						<text>￥299.00</text>
					</view>
				</view>
				<view class="list">
					<view class="title">
						<text>运费</text>
					</view>
					<view class="price">
						<text>+￥20.00</text>
					</view>
				</view> -->
				<view class="list action">
					<view class="title">
						<text>实付款：</text>
					</view>
					<view class="price">
						<text>￥{{orderItem['订单价格']}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="footer-btn">
			<view class="del">
				<text>删除订单</text>
			</view>
			<view class="btn" @tap="orderButtonClick">
				<!-- <text>查看发票</text> -->
				<text class="action">{{orderItem.ItemButtonText}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	
	export default {
		data() {
			return {
				userIdentity:"",
				
				orderID:"",
				orderItem:{},
				orderextralist:[],
			};
		},
		onLoad(data) {
			// data.data="{\"OrderID\":\"10087\",\"UserIdentity\":\"0\",\"OrderType\":\"10217\",\"创建日期\":\"2021/5/25 15:17:26\",\"操作人\":\"10000\",\"父账号ID\":\"10000\",\"分类名称\":\"二手物品\",\"图片\":\"6ba897eb-172a-4484-9e08-c14cb00a0830.png\",\"父分类ID\":\"10000\",\"层级\":\"1\",\"所属分类类型\":\"10000\",\"url\":\"https://local.softmarket.cn/UploadFiles/6ba897eb-172a-4484-9e08-c14cb00a0830.png\",\"SubCatalogTotalLevelCount\":1}";
		
			console.log('onLoad========》'+data+JSON.stringify(data));
			
					if(c.isNull(data.data))
					{
					  c.show('缺少父级类目ID');
					  return;
					  }
					  
			let dataItem=JSON.parse(data.data);
			
			this.orderID=dataItem.OrderID;
			if(c.isNull(dataItem.OrderID))
			{
			  c.show('缺少父级产品OrderID');
			  return;
			  }
			  this.userIdentity=dataItem.UserIdentity;
			  
			 this.reload();
				
		},
		methods:{
			reload(){
				c.loading();
				b.getHttpWithLocation("action=orderdetail&db=本地圈儿1004"
				+"&orderid="+this.orderID+"&isloadpropertyall=1"
				,(data)=>{
							
										if(data.Status==1)
											{
					this.orderItem=data.Data.order;
					
								this.orderextralist=data.Data.orderextralist;
				
				if(this.orderItem.订单状态==10224)//待支付
				 {
					 this.orderItem.ItemButtonText="支付";
				 }
				else  if(this.orderItem.订单状态==10225)//待发货
				{
					if(this.userIdentity==0)//买家
					{this.orderItem.ItemButtonText="等待发货";}
					else
					{this.orderItem.ItemButtonText="发货";}
					
				}
				else  if(this.orderItem.订单状态==10226)//已发货
				{
					if(this.userIdentity==0)//买家
					{this.orderItem.ItemButtonText="确认收货";}
					else
					{this.orderItem.ItemButtonText="等待收货";}
				}
				else  if(this.orderItem.订单状态==10227)//已完成
				{
					 this.orderItem.ItemButtonText="已完成";
				}
				else  if(this.orderItem.订单状态==10228)//售后中
				{
					 this.orderItem.ItemButtonText="售后中";
				}
								}
							
					c.hideLoading();
					});
			},
			//操作按钮
			orderButtonClick(){
				if(this.orderItem.订单状态==10224)//待支付
				 {
					if(this.userIdentity==0)//买家
					{	 b.payForOrder(this.orderItem.ID);}
					else
					{}
				 }
				else  if(this.orderItem.订单状态==10225)//待发货
				{
					if(this.userIdentity==0)//买家,等待发货
					{}
					else//卖家发货
					{
						let item={};
						item.OrderID=this.orderItem.ID;
						c.openPage("orderSendGood",item);
					}
					
				}
				else  if(this.orderItem.订单状态==10226)//已发货
				{
					if(this.userIdentity==0)//买家  确认收货
					{
						b.confirmReceiveGood(this.orderItem,()=>{
							this.reloadByID();
						});
					}
					else//卖家 等待收货
					{}
				}
				else  if(this.orderItem.订单状态==10227)//已完成
				{
					
				}
				else  if(this.orderItem.订单状态==10228)//售后中
				{
					
				}
			},
			//聊天
			chatClick(){
				b.openChatPage(this.orderItem.卖家);
			},
			/**
			 * 售后点击
			 */
			onApplyAftersales(){
				uni.navigateTo({
					url: '/pages/AfterSaleType/AfterSaleType',
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'OrderDetails.scss';
</style>
