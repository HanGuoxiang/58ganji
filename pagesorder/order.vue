<template>
	<view class="issueThing">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">发布需求</block>
		</cu-custom>
		 
		 <view class="cu-item"   >
		 <block v-for="(sub,index) in subCatalogList" :key="index">
		 	<view class="sub-menu" :id="'first_id'+index" :class="{'on':1}" @tap="selectHierarchyMenu(page_index,index,null,null)">
		 		<view class="menu-name">
		 			<text>{{sub['分类名称']}}</text>
		 			<text class="iconfont selected"></text>
		 		</view>
		 	</view>
		 </block>
		 
		 </view>
		 
		 
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
				 @tap="publishInfo" data-class="animation-scale-downs">发布需求</button>
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
				
				// PropertyValued,
				catalogID:"",//父级类别
				subCatalogList:[],//子分类列表
				serviceUserEncryptID:"",//下单给某个用户，么有的话就默认某个类别里
				serviceUserItem:{},//下单给某个用户，么有的话就默认某个类别里
				TypeList:[],
				productID:"",//对某一产品下单
				infotitle:"",
				infocontent:"",
				price:'',
				selAddress:{},
				selAddressText:"请选择地址",
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
			// data.data="{\"productID\":\"10001\",\"ID\":\"10026\",\"分类名称\":\"二手手机\",\"图片\":\"\",\"父分类ID\":\"10009\",\"level\":\"2\",\"url\":\"http://local.softmarket.cn/UploadFiles/\"}";
			// data.data="{\"productID\":\"10069\",\"CatalogID\":\"10022\",\"ServiceUserEncryptID\":\"94A7DAF5-5690-45A0-930C-9C7B305F5C8F\",\"title\":\"1 杀杀杀啊1111\",\"content\":\"11111222\",\"price\":\"111.00\"}";
			console.log('onLoad========》'+data+JSON.stringify(data));
			
					if(c.isNull(data.data))
					{
					  c.show('缺少父级类目ID');
					  return;
					  }
					  
			 dataItem=JSON.parse(data.data);
			
			if(c.isNull(dataItem.productID)&&c.isNull(dataItem.CatalogID))
			{
			  c.show('缺少父级产品productID'+dataItem.productID+'或者CatalogID'+dataItem.CatalogID);
			  return;
			  }
			  this.productID=dataItem.productID;
			  
			if(c.isNull(dataItem.CatalogID))
			{
			  c.show('缺少父级类目CatalogID');
			  return;
			  }
			   this.catalogID=dataItem.CatalogID;
			   
			 c.loading();
			 b.getHttpWithLocation("action=infodetail&db=本地圈儿1004"
			 +"&infoid="+dataItem.productID+"&isloadpropertyall=1"
			 ,(data)=>{
			 				
			 	let info=data.Data.InfoItem;
			 	this.infotitle=info.需求标题;
			 	this.price=info.需求价格;
			 	this.infocontent=info.需求内容;
			 	
			 	
			 	///加载多个属性
			 	//准备一个数据字段空的,用来存储选择的Text更新
			 	var propertyList=data.Data.InfoPropertyList;
			 	for(let key in propertyList)
			 	{
			 		let subItem=propertyList[key].SubCatalog;
					// console.log("subItem==>"+JSON.stringify(subItem))
			 		subItem.SelPropertyValue=subItem.分类名称;
			 	}
			 	this.TypeList=propertyList;
			 
				
			 	//加载顶部的banner图
			 	let imgUrlList=[];
			 	for(var index in data.Data.piclist)
			 	{
			 		// console.log('item='+JSON.stringify(item));
			 		imgUrlList.push(data.Data.piclist[index].url);}
			 	
			 	// console.log('imgUrlList='+JSON.stringify(imgUrlList));
			 	this.imgList=imgUrlList;
			 	
				
			
			 	c.hideLoading();
			 	});
				
				
			 
				
			 //   if(c.isNull(dataItem.ServiceUserEncryptID))
			 //   {
			 //     // c.show('缺少父级类目ServiceUserEncryptID');
			 //     // return;
			 //     }
				// else{
				// 	 this.serviceUserEncryptID=dataItem.ServiceUserEncryptID+"";
				// }
				
				
				// this.infotitle=dataItem.title;
				// this.infocontent=dataItem.content;
				// this.price=dataItem.price;
				
				 
				// 	this.title=dataItem.分类名称;
				// 	// c.show(dataItem.分类名称);
				// 	c.loading();
				// b.getHttpWithLocation("action=getcatalogtypelist&db=本地圈儿1004&catalogid="+this.catalogID
				// ,(data)=>{
				// 	let propertyList=data.Data;
					
				// 	//准备一个数据字段空的,用来存储选择的Text更新
				// 	for(let key in propertyList)
				// 	{
				// 		propertyList[key].SubCatalogList[0].SelPropertyValue="";
				// 	}
				// 	this.TypeList=propertyList;
				// 	c.hideLoading();
				// 	});
					
				// 	if(!c.isNull(this.serviceUserEncryptID))
				// 	{
				// 		c.loading();
				// 		b.getHttpWithLocation("action=userinfo&db=本地圈儿1004&queryuserencrptid="+this.serviceUserEncryptID
				// 		,(data)=>{
				// 			// this.serviceUserEncryptID=data.Data.EncryptID;
				// 			this.serviceUserItem=data.Data;
				// 			c.hideLoading();
				// 			});
				// 	}
					
		},
		methods: {
			
			//选择服务分类
			choosetypeClick(item){
				if(item.SubCatalogList.length==0)
				{return;}
				item.isPublishChoosing=true;
				//选择分类
				c.notifyRegisterEventOnce("publishing_choosedtype",(data)=>{
					console.log("publishing_choosedtype====>"+JSON.stringify(data))
					choosedServiceType=data;
					item.SubCatalog.SelPropertyValue=choosedServiceType.分类名称;
					// item.SubCatalogList[0].SelPropertyValue=choosedServiceType.分类名称;
					
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
				c.openPage('../publis/publishchoosetype',item);
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
			for(let key in this.TypeList)
			{
				let item =this.TypeList[key];
				// console.log("item="+JSON.stringify(item));
				subCatalogIDList+=item.ID+","+item.SubCatalog.ID+",";
			}
			
			// var subCatalogIDList="";
			// var subIDList= Object.keys(selSubCatalogDict);
			// for(let subID in selSubCatalogDict)
			// {
			// 	// console.log('selSubCatalogDict[subID]='+selSubCatalogDict[subID]+JSON.stringify(selSubCatalogDict[subID]));
			// 	subCatalogIDList+=subID+","+selSubCatalogDict[subID]["ID"]+",";
			// 	}
				
			let productidlist=this.productID+"";
					let url="https://local.softmarket.cn/A接口/DataHandler.ashx?action=order_insert&db=本地圈儿1004"
					+"&type=10217&productidlist="+productidlist+"&productcountlist=1&serviceuserencryptid="+this.serviceUserEncryptID+"&paytype="+this.payTypeID+"&demandtype="+demandtype+"&content="+this.infocontent+"&title="+this.infotitle
					+"&catalogid="+dataItem.CatalogID+"&subcatalogid="+subCatalogIDList+"&price="+this.price
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
					this.selAddressText=this.selAddress.姓名+"-"+this.selAddress.电话+"\n"+this.selAddress.企业地址省份+"-"+this.selAddress.企业地址城市+"-"+this.selAddress.企业地址县区+"\n"+this.selAddress.企业地址;
				});
				c.openPage("../address/address",{isChoose:"1"});
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
<style lang="scss">
	.HMfilterDropdown {
		flex-shrink: 0;
		width: 100%;
		position: fixed;
		// position: sticky;
		z-index: 997;
		flex-wrap: nowrap;
		display: flex;
		flex-direction: row;
		top: var(--window-top);
		left:0;
		// top:100px;
		overflow-y: hidden;
		&.setDropdownBottom{
			// height: 345px;
			bottom: 0;
		}
		view {
			display: flex;
			flex-wrap: nowrap;
		}
	}
	.region {
		flex: 1;
		height: 44px;
	}
	.nav {
		width: 100%;
		height: 44px;
		border-bottom: solid 1rpx #eee;
		z-index: 12;
		background-color: #ffffff;
		flex-direction: row;
		.first-menu {
			width: 100%;
			font-size: 13px;
			color: #757575;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			transition: color .2s linear;

			&.on {
				color: #ec652b;

				.iconfont {
					color: #ec652b;
				}
			}
			.name {
				height: 20px;
				text-align: center;
				text-overflow: clip;
				overflow: hidden;
			}
			.iconfont {
				width: 13px;
				height: 13px;
				align-items: center;
				justify-content: center;
				transition: transform .2s linear, color .2s linear;
			}
		}
	}
	.sub-menu-class {
		width: 100%;
		position: absolute;
		left: 0;
		transform: translate3d(0, - 100%, 0);
		max-height: 345px;
		background-color: #ffffff;
		z-index: 11;
		box-shadow: 0 5px 5px rgba(0, 0, 0, .1);
		overflow: hidden;
		flex-direction: row;
		transition: transform .15s linear;
		&.hide {
			display: none;
		}

		&.show {
			transform: translate3d(0, calc(44px + 1rpx), 0);
		}
	}
	.sub-menu-list {
		width: 100%;
		height: 345px;
		flex-direction: column;
		.sub-menu {
			min-height: 44px;
			font-size: 13px;
			flex-direction: column;
			padding-right: 15px;
			>.menu-name {
				height: 44px;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				>.iconfont {
					display: none;
					font-size: 18px;
					color: #ec652b;
				}
			}
		}
		&.first {
			flex-shrink: 0;
			width: 236rpx;
			background-color: #f0f0f0;
			.sub-menu {
				padding-left: 15px;

				&.on {
					background-color: #fff;
				}
			}
		}
		&.alone {
			max-height: 345px;
			min-height: 170px;
			height: auto;
			.sub-menu {
				min-height: calc(44px - 1rpx);
				margin-left: 15px;
				border-bottom: solid 1rpx #e5e5e5;

				&.on {
					color: #ec652b;

					>.menu-name {
						>.iconfont {
							display: block;
						}
					}
				}
			}
		}
		&.not-first {
			.sub-menu {
				min-height: calc(44px - 1rpx);
				margin-left: 15px;
				border-bottom: solid 1rpx #e5e5e5;
				>.menu-name {
					height: calc(44px - 1rpx);
					>.iconfont {
						display: none;
						font-size: 18px;
						color: #ec652b;
					}
				}
				&.on {
					color: #ec652b;
					>.menu-name {
						>.iconfont {
							display: block;
						}
					}
				}
				.more-sub-menu {
					flex-direction: row;
					flex-wrap: wrap;
					padding-bottom: 9px;
					>text {
						height: 30px;
						border-radius: 3px;
						background-color: #f5f5f5;
						color: #9b9b9b;
						margin-bottom: 6px;
						margin-right: 6px;
						text-align: center;
						line-height: 30px;
						border: solid #f5f5f5 1rpx;
						flex: 0 0 calc(33.33% - 6px);
						overflow: hidden;
						font-size: 12px;
						&:nth-child(3n) {
							margin-right: 0;
						}
						&.on {
							border-color: #f6c8ac;
							color: #ec652b;
						}
						.iconfont {
							color: #9b9b9b;
						}
					}
				}
			}
		}
	}
	.filter {
		width: 100%;
		height: 345px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.menu-box {
			width: 698rpx;
			height: calc(345px - 75px);
			flex-shrink: 1;
			.box {
				width: 100%;
				margin-top: 16px;
				flex-direction: column;
				.title {
					width: 100%;
					font-size: 13px;
					color: #888;
				}
				.labels {
					flex-direction: row;
					flex-wrap: wrap;
					.on {
						border-color: #ec652b;
						background-color: #ec652b;
						color: #fff;
					}
					>view {
						width: 148rpx;
						height: 30px;
						border: solid 1rpx #adadad;
						border-radius: 2px;
						margin-right: 15px;
						margin-top: 8px;
						font-size: 12px;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						&:nth-child(4n) {
							margin-right: 0;
						}
					}
				}
			}
		}
		.btn-box {
			flex-shrink: 0;
			width: 698rpx;
			height: 75px;
			flex-direction: row !important;
			align-items: center;
			justify-content: space-between;
			>view {
				width: 320rpx;
				height: 40px;
				border-radius: 40px;
				border: solid 1rpx #ec652b;
				align-items: center;
				justify-content: center;
			}
			.reset {
				color: #ec652b;
			}
			.submit {
				color: #fff;
				background-color: #ec652b;
			}
		}
	}
	.mask {
		z-index: 10;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0);
		transition: background-color .15s linear;
		&.show {
			background-color: rgba(0, 0, 0, 0.5);
		}
		&.hide {
			display: none;
		}
	}
	/* 字体图标 */
	@font-face {
		font-family: "HM-FD-font";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALAAAsAAAAABpQAAAJzAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgp4gQIBNgIkAwwLCAAEIAWEbQc5G8sFERWMIbIfCbbzqA4hp7InSBibVsYGb4J42o82b3e/nJlHMw/NHbGOlwKJRCRpwzPtpAECCOZubdqxjYpQLMlVg+70/08edrgQOtx2ukpVyApZn+dyehPoQObHo3O85rYx9vOjXoBxQIHugW2yIkqIW2QXcScu4jwE8CSWbKSmrqUHFwOaJoCsLM5P4haSGIxRcRHshrUGucLCVcfqI3AZfV/+USguKCwNmtsxVztDxU/n55C+3W0Z4QQpEOTNFqCBbMCAjDUWB9CIwWk87aa70cYgqLkyd3dEmm+18R8eKATEBrV7A5CulBT8dKiWOYZk412XNcDdKSEKSGODnyKIDl+dmVt9/Dx4pu/xyeutkMlHISGPTsPCnoTNP9nOT6wTtDdlO6dPr47efvj942lkYuQzrhMKEjq9N6y98P3340gmlJ/RStUD6F31CAEEPtUW94/7rf+7XgaAz57X0ZHXAGsFFwVgw38yALuMb0IBbVyNamFYEw4oKMDTj3AHRQP5Pt4dci9VwSVkRNQh5r7CLskZadhsWHhRDBsXczk8ZYk3ewnCxmQeQKa3BOHvA8XXO2j+vqRhf7CE+sPmn4anvoL29JLa4qqaUQkmoK+QG2osCckq7txi2leK86aIPyJ3eQZ8xytXYmyQ51jQndJAxIJlqiGSLsOqImiZCjTiZCJt6Lq26U2OoXqwUo0hRaAE0K5AziANy/uLVeXzWyjVqyjcoeupjxDr5MMDn8MDkLG9Aenu5ZrOSSoghAUsRmogkkahSoWAtnlUARnCkY3It0Iu7mWhdmd9Z/19BwBP6GidEi0G56opckXTGZVSPxgAAAA=');
	}
	.iconfont {
		font-family: "HM-FD-font" !important;
		font-size: 13px;
		font-style: normal;
		color: #757575;
		&.triangle {
			&:before {
				content: "\e65a";
			}
		}
		&.selected {
			&:before {
				content: "\e607";
			}
		}
	}
</style>
