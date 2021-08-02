<template>
	<view class="issueThing">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">编辑悬赏任务</block>
		</cu-custom>
		 
		<view class="cu-item" v-if="serviceUserEncryptID!=''"  >
			<image class="cu-avatar round lg" :src="serviceUserItem.Photo"></image>
			<view class="content">
				<view class="text-black"><text class="text-abc"></text>服务商：{{serviceUserItem['姓名']}}</view>
				<view class="text-gray text-sm">
					{{serviceUserItem['企业介绍']}}
				</view>
			</view>
			<!-- <button class="cu-btn round sm bg-gradual-Topic">关注</button> -->
			
		</view>
		
		<view class="choose-adress" @tap="addressChoose">
			<view class="cu-list bg-white menu card-menu shadow-custom">
				<view class="cu-item arrow">
					<view class="content">
						<text class="text-topic text-lg" >{{selAddressText}}</text>
						<!-- <text class="text-topic text-lg" v-if="this.selAddress.ID==null">请选择地址</text> -->
						<!-- <text class="text-topic text-lg" v-if="this.selAddress.ID!=null">{{this.selAddress.adressdetail}}</text> -->
						<text class=" text-grey text-sm"></text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white margin-top" v-if="!isTask">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/4
			</view>
		</view>
		<view class="cu-form-group" v-if="!isTask">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					<image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		
		
		 
		<form>

			<view class="cu-form-group ">
				<view class="title">标题</view>
				<input placeholder="输入标题" name="input" v-model="infotitle"></input>
				<text class='cuIcon-favorfill text-orange'></text>
			</view>
			
			<view class="cu-form-group">
				<view class="title">价格</view>
				<input placeholder="输入价格 " name="input" type="digit" v-model="price"></input>
				<text class='cuIcon-moneybagfill text-orange'></text>
			</view>
			<!-- !!!!! placeholder 在ios表现有偏移 建议使用 第一种样式 -->
			<view class="cu-form-group  area">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" v-model="infocontent" placeholder="请输入详细描述..."></textarea>
			</view>
			
			
			
		<!-- 	<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="输入姓名" name="input" v-model="name"></input>
				<text class='cuIcon-sort text-orange'></text>
			</view>
			<view v-if="!isTask" class="cu-form-group">
				<view class="title">保障</view>
				<input placeholder="例:有发票" name="input"></input>
				<text class='cuIcon-choicenessfill text-orange'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input placeholder="联系方式" name="input" v-model="phone"></input>
				<button class='cu-btn bg-green shadow' @tap="showModal" data-target="DialogModalAdd">添加</button>
			</view>
			<view class="cu-form-group animation-reverse" :class="deleteAnimate==item.name?'animation-slide-left':''" v-for="(item,index) in subConcatList" :key="index">
				<view class="title">{{item.name}}</view>
				<input name="input" :value="item.number"></input>
				<button class='cu-btn bg-red shadow' :data-id="index" :data-class="item.name" @click="deleteConcat">移除</button>
			</view>
 -->
 
			<view class="cu-form-group margin-top" @tap="choosetypeClick(item)" v-for="(item,index) in TypeList">
				<view class="title">{{item['分类名称']}}</view>
			<input :placeholder="item.SubCatalogLevelCount==0?'请输入':'请选择'" enable="false" name="input" v-model="item.SubCatalog.SelPropertyValue"></input>
			
		</view>
	<!-- 	<view class="cu-form-group     margin-top">
			<paytype @change="payTypeChanged" :datas="paytypelist"></paytype>
		</view> -->
			<!-- enter -->
			<view class="cu-form-group flex  justify-around  margin-top">
				<!-- <button class="cu-btn animation-reverse margin-lg basis-sm shadow bg-olive" :class="[animation=='animation-scale-downs'?'animation-scale-down':'']"
				 @tap="publishTask" data-class="animation-scale-downs">请人来帮我</button> -->
				<button class="cu-btn animation-reverse margin-lg basis-sm shadow bg-olive" :class="[animation=='animation-scale-downs'?'animation-scale-down':'']"
				 @tap="publishInfo" data-class="animation-scale-downs" :disabled="!isEnableSubmitButton">{{submitButtonText}}</button>
			</view>
		
	

		</form>
		

		<!-- 加载框-Begin -->
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/loading48.png" mode="aspectFit"></image>
			<view class="gray-text">发布中...</view>
		</view>
		<!-- 加载框-End -->

		<!-- 选择联系方式对话框-Begin-->
		<view class="cu-modal" :class="modalNameADD=='DialogModalAdd'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">选择联系方式</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="padding: 50rpx 20rpx;">
					<view class="concatType">
						<checkbox-group class="block" @change="CheckboxChange">
							<view class="cu-form-group margin-top" v-for="(item,index) in allConcatList" :key="index">
								<view class="title">
									<view class="text-title">
										<text class="text-gray text-bold padding-xs">{{item.name}}</text>
									</view>

									<text class=" text-olive" style="padding-left: 10rpx;">{{item.number}}</text>
								</view>
								<checkbox class='round' :value="JSON.stringify(item)"></checkbox>
							</view>
						</checkbox-group>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">算了</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="enterModal">选好了</view>
				</view>
			</view>
		</view>
		<!-- 选择联系方式对话框-End-->
	</view>
</template>

<script>
	import c from 'modules/common.js'
	import b from 'modules/bll.js'
	import paytype from 'components/i-pay-type/i-pay-type.vue'
	
	var dataItem={};
	var choosedServiceType={};//选择的服务类型
	var selSubCatalogDict={};//选择的服务类型
	export default {
		// computed:{
		// 	PropertyValued(item){
		// 		return selSubCatalogDict[item.ID];
		// 	}
		// },
		components:{paytype},
		data() {
			return {
				selAddressText:"请选择地址",
				// PropertyValued,
				isEnableSubmitButton:true,
				catalogID:"",//父级类别
				orderID:"",//订单号
				submitButtonText:"",//发布按钮的文字
				serviceUserEncryptID:"",//下单给某个用户，么有的话就默认某个类别里
				serviceUserItem:{},//下单给某个用户，么有的话就默认某个类别里
				TypeList:[],
				orderItem:{},//请求到的订单信息
				infotitle:"",
				infocontent:"",
				price:'',
				selAddress:{},
				SeviceTypeName:"",
				payTypeID:"",//选择的支付方式
				paytypelist:[{
					name: '微信',
					id: '10220',
					loading: false,
					img: '../../static/weixin.png',
					
				},{
					name: '支付宝',
					id: '10221',
					loading: false,
					img: '../../static/alipay.png',
				},{
					name: '余额',
					id: '10222',
					loading: false,
					img: '../../static/blance.png'
				} ],
				animation: '',
				allConcatList: [{
						name: "QQ",
						number: "1509827684"
					},
					{
						name: "Phone",
						number: "17625495599"
					},
					{
						name: "WeChat",
						number: "wihkah-254"
					}
				],
				midConcatList: [],
				subConcatList: [], //联系方式列表
				modalName: null,
				index: 0,
				deleteAnimate:'',//移除联系方式动画
				picker: ['闲置', '任务'],
				loadModal: false, //加载框
				isTask:false,
				imgList: [],
				modalNameADD: null,
				textareaAValue: '',
				textareaBValue: '',
				checkbox: [{
					value: 'A',
					checked: true
				}, {
					value: 'B',
					checked: true
				}, {
					value: 'C',
					checked: false
				}],
			};
		},onLoad(data) {
			if(!c.getUser(true))
			{
				return;
			}
			 
			
			//10045 单个分类  10047 2个分类
			//10022 二手手机  10026二手家电
			// data.data="{\"ID\":\"10023\",\"创建日期\":\"2021/6/1 10:30:31\",\"操作人\":\"10000\",\"父账号ID\":\"-1\",\"订单类型\":\"10217\",\"订单价格\":\"111.00\",\"是否支付\":\"10000\",\"支付方式\":\"10222\",\"下单用户\":\"10000\",\"所属需求\":\"\",\"卖家\":\"10000\",\"第三方流水号\":\"\",\"订单状态\":\"10225\",\"订单名称\":\"2222223\",\"商品图片\":\"\",\"电话\":\"管理员\",\"收货地址省份\":\"北京市\",\"收货地址城市\":\"北京\",\"收货地址县区\":\"宣武区\",\"收货地址\":\"央视大厦cbd\",\"所属父订单\":\"0\",\"收货人\":\"\",\"订单状态记录\":\"\",\"是否父订单\":\"10001\",\"物流公司名称\":\"\",\"物流单号\":\"\",\"是否退还押金\":\"\",\"审核状态\":\"\",\"卖家店铺名称\":\"\",\"下单用户昵称\":\"\",\"是否发生退款\":\"10001\",\"退款状态\":\"\",\"退款售后记录\":\"\",\"退款是否平台介入\":\"10001\",\"StartLatitude\":\"\",\"StartLongitude\":\"\",\"DestLatitude\":\"\",\"DestLongitude\":\"\",\"起始地\":\"\",\"目的地\":\"\",\"预估路程\":\"\",\"实际路程\":\"\",\"预估价格\":\"\",\"所属分类ID\":\"\",\"所属分类名称\":\"\",\"ID1\":\"10000\",\"创建日期1\":\"2020/7/9 10:52:22\",\"手机号\":\"18953671207\",\"实名认证状态\":\"10000\",\"企业认证状态\":\"10000\",\"是否开通会员\":\"10001\",\"会员过期日期\":\"2020/7/9 10:52:22\",\"企业地址\":\"\",\"企业介绍\":\"\",\"经度\":\"119.12780000\",\"纬度\":\"36.71350500\",\"企业名称\":\"\",\"登录密码\":\"111\",\"推荐人\":\"\",\"姓名\":\"管理员\",\"余额\":\"8983.00\",\"图片管理\":\"\",\"视频管理\":\"\",\"信誉等级\":\"\",\"头像\":\"\",\"个人开户银行\":\"\",\"个人银行卡号\":\"\",\"企业开户银行\":\"\",\"企业银行卡号\":\"\",\"身份证照片正面\":\"\",\"身份证照片反面\":\"\",\"营业执照\":\"\",\"个人认证驳回原因\":\"\",\"企业认证驳回原因\":\"\",\"购买的服务\":\"\",\"注册金额\":\"\",\"邮箱\":\"\",\"提现管理\":\"\",\"关注的用户\":\"\",\"访问店铺产品次数\":\"\",\"聊天电话联系次数\":\"\",\"电话1\":\"\",\"发货地址省份\":\"\",\"发货地址城市\":\"\",\"发货地址县区\":\"\",\"发货地址\":\"\",\"是否交付押金\":\"10001\",\"充值保证金\":\"0.00\",\"微信账号\":\"\",\"支付宝账号\":\"\",\"支付宝实名认证姓名\":\"\",\"银行卡持卡人姓名\":\"\",\"开通会员日期\":\"2020/7/9 10:52:22\",\"所属分类管理\":\"\",\"DeviceID\":\"\",\"EncryptID\":\"94A7DAF5-5690-45A0-930C-9C7B305F5C8F\",\"车牌号\":\"\",\"操作人1\":\"\",\"父账号ID1\":\"\",\"ID2\":\"10217\",\"创建日期2\":\"2021/5/31 8:52:18\",\"操作人2\":\"10000\",\"父账号ID2\":\"10000\",\"分类名称\":\"【服务订单】直接给某个人或某个分类下，待接单状态\",\"图片\":\"\",\"父分类ID\":\"0\",\"层级\":\"0\",\"所属分类类型\":\"10010\",\"ID3\":\"10225\",\"创建日期3\":\"2021/5/31 17:18:40\",\"操作人3\":\"10000\",\"父账号ID3\":\"10000\",\"分类名称1\":\"待接单\",\"图片1\":\"\",\"父分类ID1\":\"0\",\"层级1\":\"0\",\"所属分类类型1\":\"10012\",\"SellerEncryptID\":\"94A7DAF5-5690-45A0-930C-9C7B305F5C8F\",\"SellerName\":\"管理员\",\"OrderTypeName\":\"【服务订单】直接给某个人或某个分类下，待接单状态\",\"OrderStatusName\":\"待接单\",\"ProductList\":[]}";
			console.log('onLoad========》'+data+JSON.stringify(data));
			
					if(c.isNull(data.data))
					{
					  c.show('缺少父级数据');
					  return;
					  }
					  
			 dataItem=JSON.parse(data.data);
			 // if(c.isNull(dataItem.ID))
			 // {
			 //   c.show('缺少订单号：ID');
			 //   return;
			 //   }
			    this.orderID=dataItem.ID;
				
			   // if(c.isNull(dataItem.ServiceUserEncryptID))
			   // {
			   //   c.show('缺少父级类目ServiceUserEncryptID');
			   //   return;
			   //   }
				 // c.show(dataItem.ServiceUserEncryptID+"123");
				 this.serviceUserEncryptID=dataItem.ServiceUserEncryptID+"";
				
				this.infotitle=dataItem.title;
				this.infocontent=dataItem.content;
				this.price=dataItem.price;
				
				 
					this.title=dataItem.分类名称;
					// c.show(dataItem.分类名称);
					c.loading();
				b.getHttpWithLocation("action=orderdetail&db=本地圈儿1004&orderid="+this.orderID
				,(data)=>{
					
					if(data.Status==1)
					{
						this.orderItem=data.Data.order;
						
					
						this.infotitle=this.orderItem.订单名称;
						// this.infocontent=curInfoItem.content;
						this.price=this.orderItem.订单价格;
						
						this.selAddress.姓名=this.orderItem.收货人;
						this.selAddress.电话=this.orderItem.电话;
						this.selAddress.企业地址省份=this.orderItem.收货地址省份;
						this.selAddress.企业地址城市=this.orderItem.收货地址城市;
						this.selAddress.企业地址县区=this.orderItem.收货地址县区;
						this.selAddress.企业地址=this.orderItem.收货地址;
						this.updateReceiveAddressUI();
						
						let orderExtandList=data.Data.orderextralist;
						if(orderExtandList.length>0)
						{
							let curInfoItem=orderExtandList[0];
							//准备一个数据字段空的,用来存储选择的Text更新
							var propertyList=curInfoItem.InfoPropertyList;
							for(let index in propertyList)
							{
								let subItem=propertyList[index];
								// console.log("subItem==>"+JSON.stringify(subItem))
								subItem.SubCatalog.SelPropertyValue=subItem.SubCatalog.分类名称;
								// subItem.SelPropertyValue="123";
							}
							this.TypeList=propertyList;
						}			 
						
						//加载顶部的banner图
						// let imgUrlList=[];
						// for(var index in data.Data.piclist)
						// {
						// 	// console.log('item='+JSON.stringify(item));
						// 	imgUrlList.push(data.Data.piclist[index].url);}
						
						// // console.log('imgUrlList='+JSON.stringify(imgUrlList));
						// this.imgList=imgUrlList;
						
						
						this.title=this.orderItem.订单名称;
						if(c.getUser().ID==this.orderItem.下单用户)//发布者
						{
							if(this.orderItem.订单状态=="10224")
							{
								this.submitButtonText="支付";
								this.isEnableSubmitButton=true;
							}
							else if(this.orderItem.订单状态=="10225")
							{
								this.submitButtonText="等待服务商接单";
								this.isEnableSubmitButton=false;
							}
							else if(this.orderItem.订单状态=="10226")
							{
								this.submitButtonText="确认完成";
								this.isEnableSubmitButton=true;
							}
							else if(this.orderItem.订单状态=="10227")
							{this.submitButtonText="已完成";
							this.isEnableSubmitButton=false;}
							else if(this.orderItem.订单状态=="10228")
							{this.submitButtonText="售后中";
							this.isEnableSubmitButton=true;}
						}
						else//接单者
						{
							if(this.orderItem.订单状态=="10224")//不存在
							{
								this.submitButtonText="等待买家支付";
								this.isEnableSubmitButton=false;
							}
							else if(this.orderItem.订单状态=="10225")
							{
								this.submitButtonText="立即接单";
								this.isEnableSubmitButton=true;
							}
							else if(this.orderItem.订单状态=="10226")
							{
								this.submitButtonText="等待用户确认完成";
								this.isEnableSubmitButton=false;
							}
							else if(this.orderItem.订单状态=="10227")
							{this.submitButtonText="已完成";
							this.isEnableSubmitButton=false;}
							else if(this.orderItem.订单状态=="10228")
							{this.submitButtonText="售后中";
							this.isEnableSubmitButton=true;}
						}
						
						console.log("isEnableSubmitButton="+this.isEnableSubmitButton);
						
					}
					// let propertyList=data.Data;
					
					// //准备一个数据字段空的,用来存储选择的Text更新
					// for(let key in propertyList)
					// {
					// 	propertyList[key].SubCatalogList[0].SelPropertyValue="";
					// }
					// this.TypeList=propertyList;
					c.hideLoading();
					});
					
				
					
		},
		methods: {
			
			//选择服务分类
			choosetypeClick(item){
				if(item.SubCatalogLevelCount==0)
				{return;}
				item.isPublishChoosing=true;
				//选择分类
				c.notifyRegisterEventOnce("publishing_choosedtype",(data)=>{
					console.log("publishing_choosedtype====>"+JSON.stringify(data))
					choosedServiceType=data;
					// item.SubCatalogList[0].name
					item.SubCatalog.SelPropertyValue=choosedServiceType.分类名称;
					
					// this.TypeList[0].SubCatalogList[0].name=choosedServiceType.分类名称;
					// this.TypeList=this.TypeList;
					// this.SeviceTypeName=choosedServiceType.分类名称;
					// console.log('aaa'+item.ID);
					// c.show('asd');
					// console.log('aaaddd');
					selSubCatalogDict[item.ID]=data;
					// if(selSubCatalogDict.hasOwnProperty(item.ID))
					// {}
				});
				c.openPage('../publish/publishchoosetype',item);
			},
				publishTask(e){
					
						this.Toggle(e,10000);//发布悬赏任务
				},
				publishInfo(e){
					
					this.Toggle(e,10003);//发布信息
				},
			//表单动画
			Toggle(e,demandtype) {
				
				var anmiaton = e.currentTarget.dataset.class;
				this.animation = anmiaton;
				
				
				if(c.getUser().ID==this.orderItem.下单用户)//发布者
				{
					if(this.orderItem.订单状态=="10224")
					{
						this.submitButtonText="支付";
						this.isEnableSubmitButton=true;
					}
					else if(this.orderItem.订单状态=="10225")
					{
						this.submitButtonText="等待服务商接单";
						this.isEnableSubmitButton=false;
					}
					else if(this.orderItem.订单状态=="10226")
					{
						this.submitButtonText="确认完成";
						this.isEnableSubmitButton=true;
					}
					else if(this.orderItem.订单状态=="10227")
					{this.submitButtonText="已完成";
					this.isEnableSubmitButton=false;}
					else if(this.orderItem.订单状态=="10228")
					{this.submitButtonText="售后中";
					this.isEnableSubmitButton=true;}
				}
				else//接单者
				{
					if(this.orderItem.订单状态=="10224")//不存在
					{
						this.submitButtonText="等待买家支付";
						this.isEnableSubmitButton=false;
					}
					else if(this.orderItem.订单状态=="10225")
					{
						this.submitButtonText="立即接单";
						this.isEnableSubmitButton=true;
					}
					else if(this.orderItem.订单状态=="10226")
					{
						this.submitButtonText="等待用户确认完成";
						this.isEnableSubmitButton=false;
					}
					else if(this.orderItem.订单状态=="10227")
					{this.submitButtonText="已完成";
					this.isEnableSubmitButton=false;}
					else if(this.orderItem.订单状态=="10228")
					{this.submitButtonText="售后中";
					this.isEnableSubmitButton=true;}
				}
				
				
				if(this.infotitle.length<3)
				{
					c.show('标题不能少于3个字');
					this.animation = '';
					return;
				}
				// if(this.infocontent.length<6)
				// {
				// 	c.show('描述内容不能少于6个字');
				// 	this.animation = '';
				// 	return;
				// }
				if(this.price.length==0)
				{
					c.show('价格不能为空');
					this.animation = '';
					return;
				}
				if(Object.keys(this.selAddress).length==0)
				{
					c.show('请选择地址');
					this.animation = '';
					return;
				}
				// if(this.payTypeID.length==0)
				// {
				// 	c.show("请选择支付方式");
				// 		this.animation = '';
				// 	return;
				// }
				
				// c.loading();
				 this.LoadModal(e);
				
				var filelist=[];
				for(var i=0;i<this.imgList.length;i++)
				{
					var item=this.imgList[i];
					filelist.push({name:i+"","uri":item});
				}
			
			var subCatalogIDList="";
			var subIDList= Object.keys(selSubCatalogDict);
			for(let subID in selSubCatalogDict)
			{
				// console.log('selSubCatalogDict[subID]='+selSubCatalogDict[subID]+JSON.stringify(selSubCatalogDict[subID]));
				subCatalogIDList+=subID+","+selSubCatalogDict[subID]["ID"]+",";
				}
				
				let type="10217";//默认给某个类别的订单 
				
					let url="https://local.softmarket.cn/A接口/DataHandler.ashx?action=order_insert&db=本地圈儿1004"
					+"&type="+type+"&serviceuserencryptid="+this.serviceUserEncryptID+"&paytype="+this.payTypeID+"&demandtype="+demandtype+"&content="+this.infocontent+"&title="+this.infotitle
					+"&catalogid="+dataItem.ID+"&subcatalogid="+subCatalogIDList+"&price="+this.price
					+"&orderprovince="+this.selAddress.企业地址省份+"&ordercity="+this.selAddress.企业地址城市+"&orderarea="+this.selAddress.企业地址县区+"&orderaddress="+this.selAddress.企业地址;
				
				
					b.uploadFiles(url
					,filelist
					,(data)=>{
						 // console.log('data'+data+JSON.stringify(data));
						 	this.animation = '';
							this.loadModal=false;
						 if(data.Status==1)
						 {
							 b.payForOrder(data.Data.orderid);
							 
								// c.hideLoading();
							
								}
					});
				
				
				
			},
			payTypeChanged(e,item){
				// c.show(JSON.stringify(item)+"asd");
				this.payTypeID=item.id;
			},
			//加载框弹出
			LoadModal(e) {
				this.loadModal = true;
				// setTimeout(() => {
				// 	this.loadModal = false;
				// }, 2000)
			},
			//对话框弹出
			showModal(e) {
				this.modalNameADD = e.currentTarget.dataset.target
			},
			//对话框隐藏
			hideModal(e) {
				this.modalNameADD = null

			},
			//点击”选好了“
			enterModal(e) {
				for (let i = 0; i < this.midConcatList.length; i++) {
					if(this.subConcatList.length){
						let isAdd = true
						for (let j = 0; j < this.subConcatList.length; j++) {
							if (this.midConcatList[i].name == this.subConcatList[j].name) {
								isAdd = false
							}
						}
						if(isAdd)
						{
							this.subConcatList.push(this.midConcatList[i])
						}
					}
					else{
						this.subConcatList.push(this.midConcatList[i])
					}
					
				}
				this.modalNameADD = null
			},
			addressChoose(){
				c.notifyRegisterEventOnce("addressChoosed",(item)=>{
					this.selAddress=item;
					this.updateReceiveAddressUI();
				});
				c.openPage("../address/address",{isChoose:"1"});
			},
			updateReceiveAddressUI()//更新收货地址ui
			{
			this.selAddressText=this.selAddress.姓名+"-"+this.selAddress.电话+"\n"+this.selAddress.企业地址省份+"-"+this.selAddress.企业地址城市+"-"+this.selAddress.企业地址县区+"\n"+this.selAddress.企业地址;	
			},
			
			//移除联系方式
			deleteConcat(e) {
				let _id = e.currentTarget.dataset.id
				let _name = e.currentTarget.dataset.class
				let that = this
				console.log(_name)
				this.deleteAnimate=_name
				let timer = setTimeout(function(){
					that.subConcatList.splice(_id, 1)
					clearTimeout(timer)
				},500)
			},
			PickerChange(e) {
				this.index = e.detail.value
				if(this.index==1)
				{
					this.isTask = true
				}
				else{
					this.isTask=false
				}
			},

			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					cancelText: '点错了',
					confirmText: '是的',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			},

			//复选框操作
			CheckboxChange(e) {
				let items = this.checkbox
				let values = e.detail.value
				this.midConcatList = []
				console.log("1:", this.midConcatList)
				for (let i = 0; i < values.length; i++) {
					let obj = JSON.parse(values[i])
					this.midConcatList.push(obj)
				}
				console.log("2:", this.midConcatList)
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
	.issueThing {
		position: relative;
		min-height: 100vh;
		width: 100vw;
		overflow: hidden;

		.enter {
			position: absolute;
			bottom: 0;
			width: 100%;
		}

		.cu-modal .cu-dialog .padding-xl .concatType .block .margin-top .title {
			display: flex;
		}

		.cu-modal .cu-dialog .padding-xl .concatType .block .margin-top .title .text-title {
			width: 70px;
			text-align: right;
		}
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>

<style lang="scss" scoped>
	.cu-item{
		padding: 10rpx 30rpx;
		align-items: center;
		display: flex;
		justify-content: flex-start;
		.cu-btn{
			margin-left: auto;
		}
		.content{
			padding-left: 10rpx;
		}
	}
</style>
