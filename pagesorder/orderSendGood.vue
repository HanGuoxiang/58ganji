<template>
	<view class="issueThing">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">发货</block>
		</cu-custom>
		 
	
		
		
	
		 
		<form>
			<view class="cu-form-group ">
				<!-- <view class="title">请选择发货方式</view> -->
				<input placeholder="请选择发货方式" name="input" disabled="" v-model="selSendGoodTypeName" @tap="chooseType"></input>
				<text class='cuIcon-favorfill text-orange'></text>
			</view>
			<view class="cu-form-group ">
				<!-- <view class="title">物流公司</view> -->
				<input placeholder="请输入物流公司" name="input" v-model="expressName"></input>
				<text class='cuIcon-favorfill text-orange'></text>
			</view>
			
			<view class="cu-form-group">
				<!-- <view class="title">请输入物流</view> -->
				<input placeholder="请输入物流单号 " name="input" type="digit" v-model="expressNumber"></input>
				<text class='cuIcon-moneybagfill text-orange'></text>
			</view>
			
			<!-- enter -->
			<view class="cu-form-group flex  justify-around  margin-top">
				<!-- <button class="cu-btn animation-reverse margin-lg basis-sm shadow bg-olive" :class="[animation=='animation-scale-downs'?'animation-scale-down':'']"
				 @tap="publishTask" data-class="animation-scale-downs">请人来帮我</button> -->
				<button class="cu-btn animation-reverse margin-lg basis-sm shadow bg-olive" :class="[animation=='animation-scale-downs'?'animation-scale-down':'']"
				 @tap="publishInfo" data-class="animation-scale-downs">发货</button>
			</view>
		
	

		</form>
		

		<!-- 加载框-Begin -->
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/loading48.png" mode="aspectFit"></image>
			<view class="gray-text">发布中...</view>
		</view>
		<!-- 加载框-End -->

		
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
				selSendGoodTypeID:"",
				selSendGoodTypeName:"",
				sendGoodTypeList:[],//发货类型
				expressNumber:"",
				expressName:"",
				// PropertyValued,
				orderID:"",//父级类别
				subCatalogList:[],//子分类列表
				serviceUserEncryptID:"",//下单给某个用户，么有的话就默认某个类别里
				serviceUserItem:{},//下单给某个用户，么有的话就默认某个类别里
				TypeList:[],
				productID:"",//对某一产品下单
				sendType:"",
				infocontent:"",
				price:'',
				selAddress:{},
				selAddressText:"请选择地址",
				SeviceTypeName:"",
				payTypeID:"",//选择的支付方式
				
				animation: '',
				
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
				
			};
		},onLoad(data) {
			if(!c.getUser(true))
			{
				return;
			}
			 
			
		
			
					if(c.isNull(data.data))
					{
					  c.show('缺少父级类目ID');
					  return;
					  }
					  
			 dataItem=JSON.parse(data.data);
			
			this.orderID=dataItem.OrderID;
			if(c.isNull(this.orderID))
			{
			  c.show('缺少父级产品orderID');
			  return;
			  }
			
			 c.loading();
			 b.getHttpWithLocation("action=sendgoodtypelist&db=本地圈儿1004"
			 +"&infoid="+dataItem.productID+"&isloadpropertyall=1"
			 ,(data)=>{
			 				
							if(data.Status==1)
							{
			 	this.sendGoodTypeList=data.Data;
			 	
				this.selSendGoodTypeID=this.sendGoodTypeList[0].ID;
				this.selSendGoodTypeName=this.sendGoodTypeList[0].分类名称;
			}
			 	c.hideLoading();
			 	});
				
				
					
		},
		methods: {
			chooseType(){
				let strlist=[];
				for(let index in this.sendGoodTypeList)
				{
					let item=this.sendGoodTypeList[index];
					
					strlist.push(item.分类名称)
				}
				c.showActionSheet(strlist,(clickIndex)=>{
					let selItem=this.sendGoodTypeList[clickIndex];
					this.selSendGoodTypeID=selItem.ID;
					this.selSendGoodTypeName=selItem.分类名称;
				});
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
				if(this.expressName.length<3)
				{
					c.show('标题不能少于3个字');
					this.animation = '';
					return;
				}
				
				if(this.expressNumber.length<6)
				{
					c.show('物流单号错误');
					this.animation = '';
					return;
				}
				
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
			
			
				
			let productidlist=this.productID+"";
					let url="https://local.softmarket.cn/A接口/DataHandler.ashx?action=order_sendgood&db=本地圈儿1004"
					+"&orderid="+this.orderID;
				
				
					b.uploadFiles(url
					,filelist
					,(data)=>{
						 // console.log('data'+data+JSON.stringify(data));
						 	this.animation = '';
							this.loadModal=false;
						 if(data.Status==1)
						 {
							 c.show('发货成功');
							c.closePage();
							 
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
