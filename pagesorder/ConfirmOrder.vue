<template>
	<view class="page">
		<!-- <view class="issueThing"> -->
			<cu-custom bgColor="bg-topic-theme" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">确认订单</block>
			</cu-custom>
			 
		<!-- 地址 -->
		<view class="address-data">
			<view class="address-list" @click="addressChoose()">
				<view class="list">
					<text>{{selAddress["企业地址省份"]}}{{selAddress["企业地址城市"]}}{{selAddress['企业地址县区']}}</text>
				</view>
				<view class="list">
					<text class="address">{{selAddress["企业地址"]}}</text>
				</view>
				<view class="list">
					<text>{{selAddress['姓名']}}</text>
					<text>{{selAddress['电话']}}</text>
				</view>
				<!--< view class="list">
					<text class="tips">(如果快递不方便接收，您可以选择暂时寄存服务)</text>
				</view> -->
			</view>
			<view class="bar">

			</view> 
		</view>
		<!-- 商品 --> 
		<view class="goods-data" v-for="(shopItem,index) in shopList" :key="index">
			<view class="goods-title">
				<text>{{shopItem.ShopName}}</text>
			</view>
			<view class="goods-list">
				<view class="list" v-for="(productItem,subindex) in shopItem.ProductList" :key="subindex">
					<view class="thumb">
						<image :src="'/static/img/goods_thumb_0'+(subindex+1)+'.png'" mode=""></image>
					</view>
					<view class="item">
						<view class="title">
							<text class="name one-omit">{{productItem.ProductName}}</text>
							<text class="attr">{{productItem.PropertyNameStr}}</text>
						</view>
						<view class="price-number">
							<view class="price">
								<text class="min">￥</text>
								<text class="max">{{productItem.ProductPrice}}</text>
								<!-- <text class="min">.00</text> -->
							</view>
							<view class="number">
								<text>x {{productItem.ProductCount}}</text>
							</view>
						</view>
						<!-- <view class="tag">
							<text>支持七天无理由退货</text>
						</view> -->
					</view>
				</view>
			</view>
			<view class="delivery">
			<!-- 	<div class="list">
					<view class="title">配送</view>
					<view class="content">
						<text>快递运输</text>
						<text class="iconfont icon-more"></text>
					</view>
				</div> -->
			<!-- 	<view class="list">
					<view class="title">
						<text>优惠券</text>
					</view>
					<view class="price">
						<text>-￥19.00</text>
							<text class="iconfont icon-more"></text>
					</view>
					
				</view> -->
				<div class="list">
					<view class="title">留言</view>
					<view class="content">
						<input type="text" placeholder="选填,建议先和商家沟通确认">
					</view>
				</div>
			</view>
		</view>
		<!-- 优惠 -->
	<!-- 	<view class="discounts-data">
			<view class="discounts">
				<div class="list" @click="$refs['InvoiceInfo'].show()">
					<view class="title">发票</view>
					<view class="content">
						<text>不开发票</text>
						<text class="iconfont icon-more"></text>
					</view>
				</div>
				<div class="list" @click="$refs['UseCoupon'].show()">
					<view class="title">优惠券</view>
					<view class="content">
						<text>无可用</text>
						<text class="iconfont icon-more"></text>
					</view>
				</div>
				<div class="list">
					<view class="title">积分</view>
					<view class="content">
						<text>共300，满1000可用</text>
						<text class="iconfont icon-more"></text>
					</view>
				</div>
			</view>
		</view> -->
		<!-- 订单金额 -->
		<!-- <view class="order-price">
			<view class="price-list">
				<view class="list">
					<view class="title">
						<text>商品金额</text>
					</view>
					<view class="price">
						<text>￥299.00</text>
						<text class="iconfont icon-more"></text>
					</view>
				</view>
				<view class="list">
					<view class="title">
						<text>会员折扣</text>
					</view>
					<view class="price">
						<text>-￥19.00</text>
					</view>
				</view>
				<view class="list">
					<view class="title">
						<text>运费</text>
					</view>
					<view class="price">
						<text class="highlight">+￥0.00</text>
					</view>
				</view>
				<view class="list">
					<view class="title">
						<text>运费险</text>
					</view>
					<view class="price">
						<text class="highlight">+￥0.00</text>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 地址提示 -->
		<!-- <view class="address-tips" :style="scrollTop >= 100 ? '':'display:none'"> -->
		<view class="address-tips" >
			<text>黑龙江哈尔滨市道里区爱建路1333号</text>
		</view>
		<!-- 底部合计提交 -->
		<view class="footer-submit">
			<view class="price">
				<text class="min">￥</text>
				<text class="max">{{orderTotalPrice}}</text>
				<!-- <text class="min">.00</text> -->
			</view>
			<view class="submit" @click="onSubmit">
				<text>提交订单</text>
			</view>
		</view>
		<!-- 发票 -->
		<invoice-info ref="InvoiceInfo"></invoice-info>
		<!-- 优惠券 -->
		<use-coupon ref="UseCoupon"></use-coupon>
	</view>
</template>

<script>
	
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	import InvoiceInfo from 'components/InvoiceInfo/InvoiceInfo.vue';
	import UseCoupon from 'components/UseCoupon/UseCoupon.vue' 
	export default {
		components:{
			// 发票
			InvoiceInfo,
			// 优惠券
			UseCoupon,
		},
		data() {
			return {
				//商品列表,支持多商家付款
				/*
				[
					{
						ShopID:
						ShopName:
						Coupon:{
							CouponID
							CouponName
						}
						ProductList:[
							ProductName:
							ProductCount:
							ProductPrice:
							ProductPropertyList:[
								{
									PropertyCatalogID:
									PropertyName:
									PropertyValueName
								}
							]
						]
					}
				]
				*/
				shopList:[],//
				selAddress:{},
				dataItem:{},
				infoIDAddTopTime:"",//给信息延迟置顶时间
				orderType:"",//订单类型
				scrollTop: 0,
			};
		}, 
		onPageScroll(e){
			this.scrollTop = e.scrollTop;
		},
		onLoad(data) {
			let loginedUser=c.getUser(true);
			if(!loginedUser)
			{return;}
			
			// data.data="{\"OrderType\":\"10217\",\"ShopList\":[{\"ShopID\":\"10000\",\"ShopName\":\"管理员\",\"ProductList\":[{\"ProductName\":\"七星国际1号楼整租\",\"ProductCount\":1,\"ProductID\":\"10115\",\"ProductPrice\":\"5000.00\",\"PropertyList\":[{\"PropertyDataID\":\"10051\",\"PropertyName\":\"发布人身份\",\"PropertyCatalogID\":\"10003\",\"PropertySystemName\":\"发布人身份\",\"PropertySystemValueID\":\"12417\",\"ID\":\"10051\",\"创建日期\":\"2021/6/7 9:28:05\",\"操作人\":\"10000\",\"父账号ID\":\"-1\",\"所属信息\":\"10115\",\"所属属性\":\"10003\",\"属性值\":\"12419\",\"属性名分类类型\":\"\",\"属性值录入\":\"\",\"属性值数据类型\":\"12425\",\"ID1\":\"10003\",\"创建日期1\":\"2021/6/6 21:37:42\",\"操作人1\":\"10000\",\"父账号ID1\":\"10000\",\"属性名称\":\"发布人身份\",\"属性值1\":\"12417\",\"属性值数据类型1\":\"12425\",\"所属分类\":\"10248\",\"是否录入信息必填\":\"10001\",\"PropertyValueName\":\"经纪人\"},{\"PropertyDataID\":\"10052\",\"PropertyName\":\"小区名\",\"PropertyCatalogID\":\"10004\",\"PropertySystemName\":\"小区名\",\"PropertySystemValueID\":\"\",\"ID\":\"10052\",\"创建日期\":\"2021/6/7 9:28:05\",\"操作人\":\"10000\",\"父账号ID\":\"-1\",\"所属信息\":\"10115\",\"所属属性\":\"10004\",\"属性值\":\"七星国际\",\"属性名分类类型\":\"\",\"属性值录入\":\"\",\"属性值数据类型\":\"12424\",\"ID1\":\"10004\",\"创建日期1\":\"2021/6/6 21:38:17\",\"操作人1\":\"10000\",\"父账号ID1\":\"10000\",\"属性名称\":\"小区名\",\"属性值1\":\"\",\"属性值数据类型1\":\"12424\",\"所属分类\":\"10248\",\"是否录入信息必填\":\"10001\",\"PropertyValueName\":\"七星国际\"},{\"PropertyDataID\":\"10053\",\"PropertyName\":\"室\",\"PropertyCatalogID\":\"10005\",\"PropertySystemName\":\"室\",\"PropertySystemValueID\":\"12428\",\"ID\":\"10053\",\"创建日期\":\"2021/6/7 9:28:05\",\"操作人\":\"10000\",\"父账号ID\":\"-1\",\"所属信息\":\"10115\",\"所属属性\":\"10005\",\"属性值\":\"12433\",\"属性名分类类型\":\"\",\"属性值录入\":\"\",\"属性值数据类型\":\"12425\",\"ID1\":\"10005\",\"创建日期1\":\"2021/6/6 21:38:50\",\"操作人1\":\"10000\",\"父账号ID1\":\"10000\",\"属性名称\":\"室\",\"属性值1\":\"12428\",\"属性值数据类型1\":\"12425\",\"所属分类\":\"10248\",\"是否录入信息必填\":\"10001\",\"PropertyValueName\":\"5\"},{\"PropertyDataID\":\"10054\",\"PropertyName\":\"厅\",\"PropertyCatalogID\":\"10006\",\"PropertySystemName\":\"厅\",\"PropertySystemValueID\":\"12435\",\"ID\":\"10054\",\"创建日期\":\"2021/6/7 9:28:05\",\"操作人\":\"10000\",\"父账号ID\":\"-1\",\"所属信息\":\"10115\",\"所属属性\":\"10006\",\"属性值\":\"12437\",\"属性名分类类型\":\"\",\"属性值录入\":\"\",\"属性值数据类型\":\"12425\",\"ID1\":\"10006\",\"创建日期1\":\"2021/6/6 22:05:42\",\"操作人1\":\"10000\",\"父账号ID1\":\"10000\",\"属性名称\":\"厅\",\"属性值1\":\"12435\",\"属性值数据类型1\":\"12425\",\"所属分类\":\"10248\",\"是否录入信息必填\":\"10001\",\"PropertyValueName\":\"2\"},{\"PropertyDataID\":\"10055\",\"PropertyName\":\"卫\",\"PropertyCatalogID\":\"10007\",\"PropertySystemName\":\"卫\",\"PropertySystemValueID\":\"12442\",\"ID\":\"10055\",\"创建日期\":\"2021/6/7 9:28:05\",\"操作人\":\"10000\",\"父账号ID\":\"-1\",\"所属信息\":\"10115\",\"所属属性\":\"10007\",\"属性值\":\"12444\",\"属性名分类类型\":\"\",\"属性值录入\":\"\",\"属性值数据类型\":\"12425\",\"ID1\":\"10007\",\"创建日期1\":\"2021/6/6 22:07:13\",\"操作人1\":\"10000\",\"父账号ID1\":\"10000\",\"属性名称\":\"卫\",\"属性值1\":\"12442\",\"属性值数据类型1\":\"12425\",\"所属分类\":\"10248\",\"是否录入信息必填\":\"10000\",\"PropertyValueName\":\"2\"},{\"PropertyDataID\":\"10056\",\"PropertyName\":\"总楼层\",\"PropertyCatalogID\":\"10008\",\"PropertySystemName\":\"总楼层\",\"PropertySystemValueID\":\"\",\"ID\":\"10056\",\"创建日期\":\"2021/6/7 9:28:05\",\"操作人\":\"10000\",\"父账号ID\":\"-1\",\"所属信息\":\"10115\",\"所属属性\":\"10008\",\"属性值\":\"32\",\"属性名分类类型\":\"\",\"属性值录入\":\"\",\"属性值数据类型\":\"12423\",\"ID1\":\"10008\",\"创建日期1\":\"2021/6/6 22:10:25\",\"操作人1\":\"10000\",\"父账号ID1\":\"10000\",\"属性名称\":\"总楼层\",\"属性值1\":\"\",\"属性值数据类型1\":\"12423\",\"所属分类\":\"10248\",\"是否录入信息必填\":\"10000\",\"PropertyValueName\":\"32\"},{\"PropertyDataID\":\"10057\",\"PropertyName\":\"所在楼层\",\"PropertyCatalogID\":\"10009\",\"PropertySystemName\":\"所在楼层\",\"PropertySystemValueID\":\"\",\"ID\":\"10057\",\"创建日期\":\"2021/6/7 9:28:05\",\"操作人\":\"10000\",\"父账号ID\":\"-1\",\"所属信息\":\"10115\",\"所属属性\":\"10009\",\"属性值\":\"23\",\"属性名分类类型\":\"\",\"属性值录入\":\"\",\"属性值数据类型\":\"12423\",\"ID1\":\"10009\",\"创建日期1\":\"2021/6/6 22:10:43\",\"操作人1\":\"10000\",\"父账号ID1\":\"10000\",\"属性名称\":\"所在楼层\",\"属性值1\":\"\",\"属性值数据类型1\":\"12423\",\"所属分类\":\"10248\",\"是否录入信息必填\":\"10000\",\"PropertyValueName\":\"23\"},{\"PropertyDataID\":\"10058\",\"PropertyName\":\"楼层概况\",\"PropertyCatalogID\":\"10010\",\"PropertySystemName\":\"楼层概况\",\"PropertySystemValueID\":\"12449\",\"ID\":\"10058\",\"创建日期\":\"2021/6/7 9:28:05\",\"操作人\":\"10000\",\"父账号ID\":\"-1\",\"所属信息\":\"10115\",\"所属属性\":\"10010\",\"属性值\":\"12451\",\"属性名分类类型\":\"\",\"属性值录入\":\"\",\"属性值数据类型\":\"12425\",\"ID1\":\"10010\",\"创建日期1\":\"2021/6/6 22:12:21\",\"操作人1\":\"10000\",\"父账号ID1\":\"10000\",\"属性名称\":\"楼层概况\",\"属性值1\":\"12449\",\"属性值数据类型1\":\"12425\",\"所属分类\":\"10248\",\"是否录入信息必填\":\"10000\",\"PropertyValueName\":\"中\"},{\"PropertyDataID\":\"10059\",\"PropertyName\":\"付款方式\",\"PropertyCatalogID\":\"10011\",\"PropertySystemName\":\"付款方式\",\"PropertySystemValueID\":\"12453\",\"ID\":\"10059\",\"创建日期\":\"2021/6/7 9:28:05\",\"操作人\":\"10000\",\"父账号ID\":\"-1\",\"所属信息\":\"10115\",\"所属属性\":\"10011\",\"属性值\":\"12455\",\"属性名分类类型\":\"\",\"属性值录入\":\"\",\"属性值数据类型\":\"12425\",\"ID1\":\"10011\",\"创建日期1\":\"2021/6/6 22:13:48\",\"操作人1\":\"10000\",\"父账号ID1\":\"10000\",\"属性名称\":\"付款方式\",\"属性值1\":\"12453\",\"属性值数据类型1\":\"12425\",\"所属分类\":\"10248\",\"是否录入信息必填\":\"10000\",\"PropertyValueName\":\"押二付三\"},{\"PropertyDataID\":\"10061\",\"PropertyName\":\"装修情况\",\"PropertyCatalogID\":\"10013\",\"PropertySystemName\":\"装修情况\",\"PropertySystemValueID\":\"12468\",\"ID\":\"10061\",\"创建日期\":\"2021/6/7 9:28:05\",\"操作人\":\"10000\",\"父账号ID\":\"-1\",\"所属信息\":\"10115\",\"所属属性\":\"10013\",\"属性值\":\"12471\",\"属性名分类类型\":\"\",\"属性值录入\":\"\",\"属性值数据类型\":\"12425\",\"ID1\":\"10013\",\"创建日期1\":\"2021/6/6 22:17:33\",\"操作人1\":\"10000\",\"父账号ID1\":\"10000\",\"属性名称\":\"装修情况\",\"属性值1\":\"12468\",\"属性值数据类型1\":\"12425\",\"所属分类\":\"10248\",\"是否录入信息必填\":\"10000\",\"PropertyValueName\":\"中等装修\"}]}],\"Coupon\":{}}]}";
			console.log('onLoad==========>'+JSON.stringify(data))
			if(c.isNull(data.data))
			{
				c.show('缺少父类参数')
				return;
			}
			
			//查询父级的子分类,只查询服务分类下的子分类
			b.getHttpWithLocation("action=addresslist&db=本地圈儿1004",(data)=>{
				 // console.log('data'+data+JSON.stringify(data));
				if(data.Status==1)
				{
					 
				if(data.Data.length>0)
				{
				this.selAddress=data.Data[0];
				this.updateAddressUI();
				}		
						}
						});
						
			this.dataItem=JSON.parse(data.data);
			this.orderType=this.dataItem.OrderType;
			if(c.isNull(this.orderType))
			{
				c.show('orderType 不能为空');
				return;
			}
			
			//给某一个信息  延长置顶时间 
			if(this.orderType=="12533")
			{
				this.infoIDAddTopTime=this.dataItem.InfoIDAddTopTime;
				if(c.isNull(this.infoIDAddTopTime))
				{
					c.show('infoIDAddTopTime 不能为空');
					return;
				}
			}
			
				
			
			
			let tmpShopList=this.dataItem.ShopList;
			console.log('tmpShopList=='+JSON.stringify(tmpShopList))
			//更新属性集合
			for(let index in tmpShopList)
			{
				console.log('index=='+index)
				let shopItem=tmpShopList[index];
				console.log('shopItem=='+JSON.stringify(shopItem))
				let productList=shopItem.ProductList;
				for(let proIndex in productList)
				{
					let curProduct=productList[proIndex];
					
					let tmpPropertyNameStr="";
					for(let propertyIndex in curProduct.PropertyList)
					{
						let curProperty=curProduct.PropertyList[propertyIndex];
						// console.log('curProperty='+JSON.stringify(curProperty))
						tmpPropertyNameStr+=curProperty.PropertyName+":"+curProperty.PropertyValueName+" ";
					}
					// console.log('tmpPropertyNameStr='+tmpPropertyNameStr)
					curProduct.PropertyNameStr=tmpPropertyNameStr;
					curProduct.PropertyNameStrOrigin=tmpPropertyNameStr;
					
					let strLength=Math.ceil(50,tmpPropertyNameStr.length);
					if(tmpPropertyNameStr.length>strLength)
					{curProduct.PropertyNameStr=tmpPropertyNameStr.substr(0,strLength)+"...";}
					else
					{curProduct.PropertyNameStr=tmpPropertyNameStr.substr(0,strLength);}
					
				}
				
			}
			
		
			
			this.shopList=tmpShopList;
			
		},
		computed:{
			orderTotalPrice(){
				let ret=0;
				for(let index in this.shopList)
				{
					let shopItem=this.shopList[index];
					let productList=shopItem.ProductList;
					for(let proIndex in productList)
					{
						let curProduct=productList[proIndex];
						ret+=curProduct.ProductPrice*curProduct.ProductCount;
					}
					
				}
				return ret;
			}
		},
		methods:{
			/**
			 * 提交订单
			 */
			onSubmit(){
				
				if(c.isNull(this.selAddress.ID))
				{
					c.show('请选择地址')
					return;
				}
				c.loading();
				let productidlist="";
				let productCountStr='';
				let productPropertyListStr='';
				for(let index in this.shopList)
				{
					let shopItem=this.shopList[index];
					let productList=shopItem.ProductList;
					for(let proIndex in productList)
					{
						let curProduct=productList[proIndex];
						productidlist+=curProduct.ProductID+",";
						productCountStr+=curProduct.ProductCount+",";
						productPropertyListStr=curProduct.PropertyNameStrOrigin+",";
					}
					
				}
				
						let url="https://local.softmarket.cn/A接口/DataHandler.ashx?action=order_insert&db=本地圈儿1004"
						+"&type="+this.orderType+"&productidlist="+productidlist+"&productcountlist="+productCountStr
						+"&productpropertylist="+productPropertyListStr+"&serviceuserencryptid="+this.serviceUserEncryptID+"&paytype="+this.payTypeID+"&content="+this.infocontent+"&title="+this.infotitle
						+"&catalogid="+this.dataItem.CatalogID+"&price="+this.price
						+"&buyeraddressid="+this.selAddress.ID
						+"&orderprovince="+this.selAddress.企业地址省份+"&ordercity="+this.selAddress.企业地址城市+"&orderarea="+this.selAddress.企业地址县区+"&orderaddress="+this.selAddress.企业地址;
					
					//给信息增加置顶时间
					if(this.orderType=="12533")
					{
						url+="&infoIDAddTopTime="+this.infoIDAddTopTime;
					}
					
						b.getHttpWithLocation(url
						
						,(data)=>{
							 // console.log('data'+data+JSON.stringify(data));
							 	this.animation = '';
								this.loadModal=false;
								 c.hideLoading();
							 if(data.Status==1)
							 {
								
								 b.payForOrder(data.Data.orderid,(ret)=>{
									 if(ret==1)
									 {
										 c.closePage();
									 }
								 });
								 
									// c.hideLoading();
								
									}
						});
						
				// uni.redirectTo({
				// 	url: '/pages/CashierDesk/CashierDesk',
				// })
			},
			addressChoose(){
				c.notifyRegisterEventOnce("addressChoosed",(item)=>{
					this.selAddress=item;
					this.updateAddressUI();
				});
				c.openPage("/pagesaddress/address",{isChoose:"1"});
			},
			updateAddressUI(){
				
					this.selAddressText=this.selAddress.姓名+"-"+this.selAddress.电话+"\n"+this.selAddress.企业地址省份+"-"+this.selAddress.企业地址城市+"-"+this.selAddress.企业地址县区+"\n"+this.selAddress.企业地址;
				
			},
      /**
       * 跳转点击 
       * @param {String} type 跳转类型
       */
      onSkip(type){
        switch (type){
          case 'address':
            uni.navigateTo({
              url: '/pages/AddressList/AddressList',
            })
            break;
        }
      }
		}
	}
</script>
 
<style scoped lang="scss">
	@import 'ConfirmOrder.scss';
</style>
