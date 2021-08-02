<template>
	<view class="page">
			<cu-custom bgColor="bg-topic-theme" :isBack="true">
				<block slot="backText"></block>
				<block slot="content">钱包</block>
			
				<view slot="right" class="action">
					<!-- <navigator :url="'chat/chat'">全国</navigator> -->
					<!-- <text class="cuIcon text" @tap="shareClick()">分享</text> -->
				</view> 
			</cu-custom>
		<!-- 头部背景 -->
		<view class="head-bg">
			<view class="head-user">
				<view class="user">
				</view>
				<view class="exchange" @click="onConsumeRecord">
					<text>明细</text>
					<text class="iconfont icon-more"></text>
				</view>
			</view>
			<view class="wallet-balance">
				<view class="wallet">
					<text class="number">￥{{loginedUser['余额']}}</text>
					<!-- <button>提现</button> -->
					<!-- <text><text class="iconfont icon-qianbao" style="margin-right: 20rpx;"></text>提现</text> -->
				</view>
			</view>
			<view class="bg">
				<image src="/static/integral_bg1.png" mode=""></image>
			</view>
		</view>
		<!-- 钱包充值 -->
		<view class="wallet-recharge">
			<view class="recharge-title">
				<text>钱包充值</text>
			</view>
			<view class="recharge-list">
				<view class="list" v-for="(item,index) in numberlist" 
				:class="{'action':index==selNumber.id}"
				:key="index" @click="itemClick(item)">
					<view class="price">
						<text>{{item.name}}</text>
					</view>
				<!-- 	<view class="give">
						<text>送2.00元</text>
					</view> -->
				</view>
			</view>
		</view>
		<view class="recharge-btn" >
			<view class="btn" @click="chargeClick()">立即充值 ￥{{selNumber.name}}</view>
			<u-button type="primary" @click="takeClick()">提现</u-button>
		</view>
	</view>
</template>

<script>
	import c from '../../modules/common.js'
	import b from '../../modules/bll.js'
	
	
	export default {
		data() {
			return {
				loginedUser:{},
				selNumber:{id:0,name:"",value:""},//充值金额选中的index
				numberlist:[
				{
					id:0,
					name:"100元",
					value:100
				},
				{
					id:1,
					name:"200元",
					value:200
				},
				{
					id:2,
					name:"300元",
					value:300
				},
				{
					id:3,
					name:"400元",
					value:500
				},
				{
					id:4,
					name:"500元",
					value:500
				},
				{
					id:5,
					name:"600元",
					value:600
				},
				],
				
			};
		},
		onLoad() {
		this.reload();
		},
		methods:{
			reload(){
				b.getUserInfo(()=>{
					this.loginedUser=c.getUser();
					this.selNumber=this.numberlist[0];
				});
			},
			itemClick(item){
				this.selNumber=item;
				
			},
			takeClick(){
				
			c.confirm('确定提现'+this.selNumber.value+"元",(clickIndex)=>{
				if(clickIndex==0){return;}
				b.getHttpWithParam("&action=wallet_take&price="+this.selNumber.value
				,(data)=>{
					if(data.Status==1)
					{
						c.show('提现成功');
						this.reload();
					}
					}
					);
			})
			},
			chargeClick(){
				let url="action=order_insert&type=12665&chagenumber="+this.selNumber.value;
					// +"&productidlist="+productidlist+"&productcountlist="+productCountStr
					// +"&productpropertylist="+productPropertyListStr+"&serviceuserencryptid="+this.serviceUserEncryptID+"&paytype="+this.payTypeID+"&content="+this.infocontent+"&title="+this.infotitle
					// +"&catalogid="+this.dataItem.CatalogID+"&price="+this.price
					// +"&buyeraddressid="+this.selAddress.ID
					// +"&orderprovince="+this.selAddress.企业地址省份+"&ordercity="+this.selAddress.企业地址城市+"&orderarea="+this.selAddress.企业地址县区+"&orderaddress="+this.selAddress.企业地址
					// +"&specificationlist="+productSpecificationListStr;
				
			
				
					b.getHttpWithParam(url
					
					,(data)=>{
						if(data.Status==1)
						{
							b.payForOrderNoWallet(data.Data.orderid,(ret)=>{
								this.reload();
							});
							
						}
						}
						);
						
				// b.payForOrder()
			},
			/**
			 * 消费明细点击
			 */
			onConsumeRecord(){
				uni.navigateTo({
					url: '/pagesuser/wallet/ConsumeRecord'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'MyWallet.scss';
</style>
