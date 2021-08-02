<template>
	<view class="pages-height">
		<cu-custom bgColor="bg-topic-theme" :isBack="true"><block slot="content">收货地址</block></cu-custom>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<!-- 添加收货地址-Begin -->
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 添加收货地址<text class="addAdress text-sm text-gray" @tap="showModalADD" data-target="DialogModalAdd">添加</text>
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in recentyList" :key="index"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
				 @tap="itemClick(item)">
					<view class="cu-avatar round lg" >
						<!-- <text>{{item.姓名.substr(0,Math.min(1,item.姓名.lenth))}}</text> -->
					</view>
					<view class="content">
						<view class="text-grey">
							<view class="text-cut">{{item['姓名']}}</view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.adress}}
							</view>
						</view>
					</view>
					<view class="action" style="width: 100px;">
						<view class="text-black" style="font-size: 32rpx;">{{item['电话']}}</view>
					</view>
					<button type="primary" @click="addressItemClick(item)"  data-target="DialogModalAdd" >编辑</button>
					<view class="move">
						<!-- <view class="bg-grey">置顶</view> -->
						<view class="bg-red" @tap="delClick(item)">删除</view>
					</view>
				</view>
			</view>
			<!-- 添加收货地址-End -->
		</scroll-view>
		<view class="cu-modal" :class="modalNameADD=='DialogModalAdd'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">联系方式</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="padding: 50rpx 20rpx;background-color: #FFFFFF;">
					<view class="cu-form-group">
						<view class="title">姓名：</view>
						<input placeholder="输入姓名" name="input"  v-model="name"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">电话：</view>
						<input placeholder="输入电话" name="input"  v-model="phone"></input>
					</view>
					<button type="primary" @click="onCityClick">选择地址</button>
					<view class="cu-form-group">
						<view class="title">地址：</view>
						<view>{{province}}-{{city}}-{{area}}</view>
					</view>
					<textarea maxlength="50" v-model="address"   placeholder="请输入详细地址..." style="height: 100px;text-align: left;padding: 5rpx 30rpx;"></textarea>

<view class="cu-form-group" >
	是否设置默认地址
<radio-group @change="defaultAddressChange">
	<radio value="10000">是</radio>
	<radio checked="true" value="10001">否</radio>
</radio-group>		
			</view>
<!-- 					<button type="primary" @click="onCityClick">设置为默认地址</button> -->
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">算了</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="enterModal" v-if="subType==1">添加</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="enterModal" v-else>保存</view>
				</view>
			</view>
		</view>
		<!-- 加载 -->
		<view class="cu-load" :class="!isLoad?'loading':'over'"></view>
		<selectAddress ref='selectAddress' @selectAddress="successSelectAddress"></selectAddress>
		
		<!-- <uni-popup :show="type === 'bottom'" position="bottom" mode="fixed" msg="选择收货地址" @hidePopup="togglePopup('')">
		    <semp-city @confirm="onCityClick" platform="jd"></semp-city>
		</uni-popup> -->
	</view>
</template>

<script>
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	
	// import sempCity from "@/components/semp-city/semp-city.vue"
	import selectAddress from '@/components/yixuan-selectAddress/yixuan-selectAddress.vue'
	
	export default {
		  components: {selectAddress},
		data() {
			return {
				subType:"1",//http接口，新增，0修改
				// selCityItem:{},//选择的城市
				isChoose:"0",//是否选择返回
				isDefaultAddress:"10001",//添加地址是否默认
				selAddressID:"",//选中编辑的当前id
				province:"",
				city:"",
				area:"",
				name:"",
				phone:"",
				address:"",
				type:"bottom",
				modalNameADD:null,
				modalName: null,
				skin: false,
				listTouchStart: 0,
				listTouchStartY:0,
				listTouchDirection: null,
				isLoad: true,
				recentyList: [ ]
			};
		},
		onLoad(data) {
			// data.data="{\"isChoose\":\"1\"}";
			console.log('onLoad========》'+data.data+data+JSON.stringify(data));
			
			if(!c.isNull( data.data))
			{
				var dataItem=JSON.parse( data.data);
				console.log('22'+dataItem.isChoose)
				this.isChoose=dataItem.isChoose;
			}
			this.reload();
		}, 
		methods: {
			reload(){
				//检测用户登录
				c.getUser(true);
				
				c.loading();
				
				 //查询父级的子分类,只查询服务分类下的子分类
				b.getHttpWithLocation("action=addresslist&db=本地圈儿1004",(data)=>{
					 // console.log('data'+data+JSON.stringify(data));
					if(data.Status==1)
					{
						
					//如果没有子分类，则直接加载当前分类下的数据
					 this.recentyList=data.Data;
					
							c.hideLoading();
							}
				});
			},
			enterModal(){
				if(this.name.length==0)
				{c.show("请输入姓名"); return;}
				if(this.phone.length==0)
				{c.show("请输入手机号"); return;}
				if(this.province.length==0||this.province.length==0||this.province.length==0)
				{c.show("请选择地址"); return;}
				
				if(this.address.length==0)
				{c.show("请输入详细地址"); return;}
				
				
				c.loading();
				
				 //查询父级的子分类,只查询服务分类下的子分类
				b.getHttpWithLocation("action=addresssave&db=本地圈儿1004"
				+"&id="+this.selAddressID+"&type="+this.subType+"&issetdefault="+this.isDefaultAddress+"&addrname="+this.name+"&addrphone="+this.phone+"&addrprovince="+this.province
				+"&addrcity="+this.city+"&addrarea="+this.area+"&addraddress="+this.address,(data)=>{
					 // console.log('data'+data+JSON.stringify(data));
					if(data.Status==1)
					{
						if(this.subType=="1")
						{
							c.show('添加成功');
						}
						else
						{
							c.show('修改成功');
						}
						this.hideModal();
					this.reload();
					
							c.hideLoading();
							}
				});
			},
			// onCityClick(e){
			//             // this.provinceName=e.province.label;
			//             // this.cityName=e.city.label;
			//             // this.countyName=e.county.label;
			//             // this.townName=e.town.label;
			//             this.togglePopup()
			//         },
			//         togglePopup(){
			
			//             this.tankuang.close()
			//         },
			defaultAddressChange(e){
				// console.log(e.target.value+JSON.stringify(e)+"as");
				this.isDefaultAddress=e.target.value;
			},
			onCityClick(){
				  this.$refs.selectAddress.show();
			},
			  successSelectAddress(address){ //选择成功回调
			    console.log(address);
				if(address.index==0)
				{
					this.province=address.text;
				}
				else if(address.index==1)
				{
					this.city=address.text;
				}
				else if(address.index==2)
				{
					this.area=address.text;
				}
			        },
			    initUI(){
					this.selAddressID="";
					this.name="";
					this.phone="";
					this.address="";
					this.province="";
					this.city="";
					this.area="";
				},
				delClick(item){
					c.confirm("确定要删除？",(clickIndex)=>{
						if(clickIndex==1)
						{
							c.loading();
							
							 //查询父级的子分类,只查询服务分类下的子分类
							b.getHttpWithLocation("action=addressdel&db=本地圈儿1004"
							+"&addressid="+item.ID,(data)=>{
								 // console.log('data'+data+JSON.stringify(data));
								if(data.Status==1)
								{
										// c.show('删除成功');
									
								this.reload();
								
										c.hideLoading();
										}
							});
						}
					});
				},
			showModalADD(e){
				this.subType=1;
				this.initUI();
				this.modalNameADD = e.currentTarget.dataset.target
			},
			showModal(e) {
				
				this.modalName = e.currentTarget.dataset.target
				console.log(JSON.stringify(this.modalName));
			},
			hideModal(e) {
				this.modalName = null
				this.modalNameADD=null
			},
			addressItemClick(item){
				
				this.subType=0;
				// console.log(item+JSON.stringify(e.target));
				// let item=e.target.dataset.tag;
				this.selAddressID=item.ID;
				this.name=item.姓名;
				this.phone=item.电话;
				this.address=item.企业地址
				this.province=item.企业地址省份;
				this.city=item.企业地址城市;
				this.area=item.企业地址县区;
				// this.showModalADD(e);
				// this.modalNameADD = e.currentTarget.dataset.target
				this.modalNameADD="DialogModalAdd";
			},
			hrefChatRoom() {
				uni.navigateTo({
					url: "../../view/chatRoom"
				})
			},
itemClick(item){
	// c.show('123'+this.isChoose);
	if(this.isChoose=="1")
	{
		console.log('===>'+JSON.stringify(item))
		c.notifyEvent("addressChoosed",item);
		c.closePage();
	}
},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
				this.listTouchStartY=e.touches[0].pageY
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				if(e.touches[0].pageX - this.listTouchStart < 0)
				{
					if((Math.abs(e.touches[0].pageY - this.listTouchStartY)<20))
					{
						this.listTouchDirection = 'left'
					}
					else{
						this.listTouchDirection = 'right'
					}
				}
				else{
					this.listTouchDirection = 'right'
				}
				// this.listTouchDirection = (e.touches[0].pageX - this.listTouchStart > 0)&&(Math.abs(e.touches[0].pageY - this.listTouchStartY)<20)? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				// console.log(this.listTouchDirection)
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		padding-bottom: 120rpx;

	}
	.cu-item{
		// border-bottom: 2px dashed #8dc63f;
	}
	.addAdress{
		margin-left: 25rpx;
	}
	.header {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 220rpx;
		display: flex;
		align-items: flex-end;
		background-color: #FFFFFF;
		z-index: 99999;
	}
	.page.show {
		overflow: hidden;
	}

	.cu-load {
		background-color: #FFFFFF;
		padding-bottom: 30rpx;
		color: black;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
