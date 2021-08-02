<template>
	<view class="issueThing">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
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
				图片上传(第一张图将作为主图展示)
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
 
 <view class="margin-top">
			<view class="cu-form-group " @tap="choosetypeClick(item)" v-for="(item,index) in TypeList">
				<view class="title">{{item['属性名称']}}</view>
			<input :placeholder="item['属性值数据类型']!=12425?'请输入':'请选择'" enable="false" name="input" data-id="item.SelPropertyID" @input="propertyTextchange(item)" v-model="item.SelPropertyValue"></input>
			
		</view>
		</view>
		
			<!-- enter -->
			<view class="cu-form-group flex  justify-around  margin-top">
				<!-- <button class="cu-btn animation-reverse margin-lg basis-sm shadow bg-olive" :class="[animation=='animation-scale-downs'?'animation-scale-down':'']"
				 @tap="publishTask" data-class="animation-scale-downs">请人来帮我</button> -->
				<button class="cu-btn animation-reverse margin-lg basis-sm shadow bg-olive" :class="[animation=='animation-scale-downs'?'animation-scale-down':'']"
				 @tap="publishInfo" data-class="animation-scale-downs" v-if="infoType==10231">发布信息</button>
				 <button class="cu-btn animation-reverse margin-lg basis-sm shadow bg-olive" :class="[animation=='animation-scale-downs'?'animation-scale-down':'']"
				  @tap="publishInfo" data-class="animation-scale-downs" v-if="infoType==10232">发布需求</button>
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
	
	var dataItem={};
	var choosedServiceType={};//选择的服务类型
	var selSubCatalogDict={};//选择的服务类型
	export default {
		// computed:{
		// 	PropertyValued(item){
		// 		return selSubCatalogDict[item.ID];
		// 	}
		// },
		data() {
			return {
				// PropertyValued,
				infoType:"",//服务信息还是需求信息
				selAddressText:"请选择地址",
				selAddress:{},
				TypeList:[],
				infotitle:"",
				infocontent:"",
				price:'',
				SeviceTypeName:"",
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
			 
			// 
			//10045 单个分类  10047 2个分类
			//10022 二手手机  10026二手家电 
			//10248 整租房
			// data.data="{\"ID\":\"10248\",\"InfoType\":\"10231\",\"分类名称\":\"二手手机\",\"图片\":\"\",\"父分类ID\":\"10009\",\"level\":\"2\",\"url\":\"http://local.softmarket.cn/UploadFiles/\"}";
			console.log('onLoad========》'+data+JSON.stringify(data));
			
					if(c.isNull(data.data))
					{
					  c.show('缺少父级类目ID');
					  return;
					  }
					  
			 dataItem=JSON.parse(data.data);
					this.title=dataItem.分类名称;
					this.infoType=dataItem.InfoType;
					// c.show(dataItem.分类名称);
					
					b.getHttpWithLocation("action=getpropertylistbycatalogid&db=本地圈儿1004&catalogid="+dataItem.ID
					,(data)=>{
						let propertyList=data.Data;
						
						//准备一个数据字段空的,用来存储选择的Text更新
						for(let key in propertyList)
						{
							propertyList[key].SubCatalog={};
							propertyList[key].SelPropertyValue="";
					
						}
						this.TypeList=propertyList;
						});
					
		},
		methods: {
			
			
				publishTask(e){
					
						this.Toggle(e,this.infoType);//发布悬赏任务
				},
				publishInfo(e){
					
					this.Toggle(e,this.infoType);//发布信息
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
				if(this.infocontent.length<6)
				{
					c.show('描述内容不能少于6个字');
					this.animation = '';
					return;
				}
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
				// c.loading();
				 this.LoadModal(e);
				
				var filelist=[];
				for(var i=0;i<this.imgList.length;i++)
				{
					var item=this.imgList[i];
					filelist.push({name:i+"photo","uri":item});
				}
			
			// var tmpPropertyList=[];
			// for(let subID in selSubCatalogDict)
			// {
			// 	// console.log('selSubCatalogDict[subID]='+selSubCatalogDict[subID]+JSON.stringify(selSubCatalogDict[subID]));
			// 	let propertyDict={};
			// 	 propertyDict["id"]=subID;
			// 	  propertyDict["propertyid"]=subID;
			// 	propertyDict["value"]= selSubCatalogDict[subID]["ID"];
			// 	tmpPropertyList.push(propertyDict);
				
			
			// 	}
				
				var subCatalogIDList="";
				var tmpPropertyList=[];
				for(let key in this.TypeList)
				{
					let item =this.TypeList[key];
					// console.log("item="+JSON.stringify(item));
					subCatalogIDList+=item.ID+","+item.SubCatalog.ID+",";
					
					
					let propertyDict={};
					
					 propertyDict["id"]=item.PropertyNameCatalogID;
					 propertyDict["propertyid"]=item.ID;
					  propertyDict["value"]=item.SelPropertyID;
					 // if(item.属性值数据类型==12425)//list选择
					 // {
						//  propertyDict["value"]=item.SelPropertyID;
					 // }
					 // else if(item.属性值数据类型==12519)//图片
					 // {propertyDict["value"]=item.SelPropertyID;}
					 // else//string int 文本
					 // {propertyDict["value"]=item.SelPropertyValue;}
					
					
					tmpPropertyList.push(propertyDict);
				}
				
				
				let url="action=info_insert&db=本地圈儿1004"
					+"&demandtype="+demandtype+"&content="+this.infocontent+"&title="+this.infotitle
					+"&catalogid="+dataItem.ID+"&subcatalogid="+subCatalogIDList+"&price="+this.price
					+"&propertylist="+JSON.stringify(tmpPropertyList);
				if(demandtype=="10231")//服务信息
				{
					url+="&addrsendprovince="+this.selAddress.企业地址省份+"&addrsendcity="+this.selAddress.企业地址城市
					+"&addrsendarea="+this.selAddress.企业地址县区+"&addrsenddistrice="+this.selAddress.企业地址
					+"&sellername="+this.selAddress.姓名+"&sellerphone="+this.selAddress.电话;
				}
				else if(demandtype=="10232")//需求信息
				{
					url+="&addrbuyprovince="+this.selAddress.企业地址省份+"&addrbuycity="+this.selAddress.企业地址城市
					+"&addrbuyarea="+this.selAddress.企业地址县区+"&addrbuydistrice="+this.selAddress.企业地址
					+"&buyername="+this.selAddress.姓名+"&buyerphone="+this.selAddress.电话;
				}	
				
					b.uploadFiles(url
					,filelist
					,(data)=>{
						 // console.log('data'+data+JSON.stringify(data));
						 
						 if(data.Status==1)
						 {
							 c.show('发布成功');
							 c.closePageToRoot();
						 }
						 else if(data.Status==10001)
						 {
							 c.confirm('今日发布次数已用完，是否购买？',(clickIndex)=>{
								 if(clickIndex==1)
								 {
									 c.loading();
									 b.getHttpWithLocation("action=infopublishproductlist&db=本地圈儿1004"
									 ,(data)=>{
									 	 console.log('data'+data+JSON.stringify(data));
									 	 if(data.Status==1)
									 	 { 
									 		 let titlelist=[];
									 		 for(var key in data.Data)
									 		 {
									 			 let item=data.Data[key];
									 			 titlelist.push("发布"+item.需求标题+"次"+"("+item.需求价格+"元)");
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
									 			 productItem.ProductName="购买发布"+selItem.需求标题+"次";
									 			 productItem.ProductCount=1;
									 			 productItem.ProductID=selItem.ID;
									 			 productItem.ProductPrice=selItem.需求价格;
									 			 curShopItem.ProductList.push(productItem);
									 			  
									 			 productItem.PropertyList=[];
									 			 
									 			 
									 			 let item={};
									 			 item.OrderType="12536";//任务订单
									 			 item.ShopList=[curShopItem];
									 			 c.openPage("/pagesorder/ConfirmOrder",item);
									 			 
									 		 });
									 	}
									 	c.hideLoading();
									 });
								 }
							 });
						 }
						
								// c.hideLoading();
								this.animation = '';
					});
				
				
				
			},
			//选择服务分类
			choosetypeClick(item){
				if(item.属性值数据类型+"" =="12425")
				{
				item.isPublishChoosing=true;
				item.CatalogID=item.属性值;
				
				//选择分类
				c.notifyRegisterEventOnce("publishing_choosedtype",(data)=>{
					console.log("publishing_choosedtype====>"+JSON.stringify(data))
					choosedServiceType=data;
					
					// for(let index in this.TypeList)
					// {
					// 	let tmpItem=this.TypeList[index];
					// 	if(tmpItem.属性值==data.CatalogID)
					// 	{
					// 		tmpItem.PropertyValue=choosedServiceType.分类名称;
					// 		tmpItem.SubCatalog=data;
					// 		console.log('choosedServiceType.分类名称'+choosedServiceType.分类名称)
					// 		break;
					// 	}
					// 	// console.log(JSON.stringify(item));
					// }
					item.SubCatalog=data;
					item.SelPropertyID=data.ID;
					item.SelPropertyValue=choosedServiceType.分类名称;
					
				
				
					selSubCatalogDict[item.ID]=data;
					
				});
				c.openPage('publishchoosetype',item);
				}
			},
			addressChoose(){
				c.notifyRegisterEventOnce("addressChoosed",(item)=>{
					this.selAddress=item;
					this.selAddressText=this.selAddress.姓名+"-"+this.selAddress.电话+"\n"+this.selAddress.企业地址省份+"-"+this.selAddress.企业地址城市+"-"+this.selAddress.企业地址县区+"\n"+this.selAddress.企业地址;
				});
				c.openPage("/pagesaddress/address",{isChoose:"1"});
			},
			propertyTextchange(item){
				console.log('propertyTextchange'+item.SelPropertyValue);
				item.SelPropertyID=item.SelPropertyValue;
				
				selSubCatalogDict[item.ID]={};
				selSubCatalogDict[item.ID].ID=item.SelPropertyValue;
			},
			//加载框弹出
			LoadModal(e) {
				this.loadModal = true;
				setTimeout(() => {
					this.loadModal = false;
				}, 2000)
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
