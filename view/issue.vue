<template>
	<view class="issue bg-gradual-Topic">
		<cu-custom bgImage="" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">发布</block>
		</cu-custom>
		<view class="step" :class="showId==1?'showCard':'step-'+(2-showId)" :style="showId>1?'left:-100%;opacity:0;z-index:100;':''">
			<view class="step-container">
				<view class="cu-form-group margin-top">
					<view class="title">发布类型</view>
					<picker @change="PickerChangeIssue" :value="index" :range="pickerIssue">
						<view class="picker">
							{{index>-1?pickerIssue[index]:'发布的类型'}}
						</view>
					</picker>
				</view>
				<view v-if="!isTask" class="cu-form-group">
					<view class="title">物品类型</view>
					<picker @change="PickerChangeThing" :value="indexThing" :range="pickerThing">
						<view class="picker">
							{{indexThing>-1?pickerThing[indexThing]:'物品的类型'}}
						</view>
					</picker>
				</view>
				<!-- <view class="cu-form-group">
					<view class="title">详细分类</view>
					<input :placeholder="isTask?'例如:'+msgSort[1]:'例如:'+msgSort[0]" name="input" v-model="detailSort"></input>
					<text class='cuIcon-sort text-black'></text>
				</view> -->
				<view class="cu-bar margin-top bg-white">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>是否全新
					</view>
					<view class="action">
						<text class="text-df margin-right-sm"></text>
						<switch @change="SetShadow" :class="shadow?'checked':''" color="#39B54A"></switch>
					</view>
				</view>
			</view>
			
		</view>
		<view class="step" :class="showId==2?'showCard':'step-'+(3-showId)" :style="showId>2?'left:-100%;opacity:0;z-index:100;':''">
			<view class="step-container">
				<view class="cu-form-group">
					<view class="title">标题</view>
					<input placeholder="输入标题" name="input" v-model="title"></input>
					<text class='cuIcon-favorfill text-orange'></text>
				</view>
				<view class="cu-form-group">
					<view class="title">价格</view>
					<input placeholder="输入价格 < 10000" name="input" v-model="price"></input>
					<text class='cuIcon-moneybagfill text-orange'></text>
				</view>
				<view class="cu-form-group" v-if="!isTask">
					<view class="title">原价</view>
					<input placeholder="输入原价 < 10000" name="input" v-model="costPrice"></input>
					<text class='cuIcon-moneybagfill text-orange'></text>
				</view>
				<view v-if="!isTask" class="cu-form-group">
					<view class="title">保障</view>
					<input placeholder="例:有发票" name="input" v-model="ensure"></input>
					<text class='cuIcon-choicenessfill text-orange'></text>
				</view>
				<view v-if="!isTask" class="cu-form-group">
					<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaReson" placeholder="请输入转手原因..." style="height: 10vh;"></textarea>
				</view>
			</view>
			
		</view>
		<view class="step" :class="showId==3?'showCard':'step-'+(4-showId)" :style="showId>3?'left:-100%;opacity:0;z-index:100;':''">
		<view class="step-container">
			<!-- <view class="cu-form-group">
				<view class="title">联系方式</view>
				<input placeholder="添加联系方式" name="input" disabled="true"></input>
				<button class='cu-btn bg-green shadow' @tap="showModal" data-target="DialogModalAdd">添加</button>
			</view> -->
			<view class="cu-form-group animation-reverse" :class="deleteAnimate==item.name?'animation-slide-left':''" v-for="(item,index) in subConcatList" :key="index">
				<view class="title">{{item.name}}</view>
				<input name="input" :value="item.number"></input>
				<button class='cu-btn bg-red shadow' :data-id="index" :data-class="item.name" @click="deleteConcat">移除</button>
			</view>
			<view class="cu-form-group">
				<view class="title">标签</view>
				<input placeholder="添加标签" name="input" v-model="tagText"></input>
				<button class='cu-btn bg-green shadow' @tap="addTag" data-target="DialogModalAdd">添加</button>
			</view>
			<view class="item-tag" style="padding: 15rpx;">
				<view class="cu-tag bg-red sm round" :class="'light-'+k" v-for="(v,k) in tags" :key="k" @tap="deleteTag" :data-index="k">{{v}}</view>
				<!-- <view class="cu-tag bg-green light sm round">史诗</view> -->
			</view>
		</view>
			
		</view>
		<view v-if="!isTask" class="step" :class="showId==4?'showCard':'step-'+(5-showId)" :style="showId>4?'left:-100%;opacity:0;z-index:100;':''">
		<view class="step-container">
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
		</view>
			
		</view>
		<view class="step" :class="showId==sortId?'showCard':'step-'+((sortId+1)-showId)">
			<view class="step-container">
				<view class="cu-form-group area">
					<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="请输入详细描述..." style="height: 60vh;"></textarea>
				</view>
			</view>
			
		</view>
		
		<view class="btnBox">
			<button class="cu-btn round lg bg-cyan shadow" @tap="prev">上一步</button>
			<view class="mid"></view>
			<button class="cu-btn round lg bg-yellow shadow" @tap="next">{{btnText}}</button>
		</view>
		
		<!-- 加载框-Begin -->
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/loading48.png" mode="aspectFit"></image>
			<view class="gray-text">发布中...</view>
		</view>
		<!-- 加载框-End -->
		
		<!-- 选择联系方式对话框-Begin-->
		<!-- <view class="cu-modal" :class="modalNameADD=='DialogModalAdd'?'show':''">
			<view class="cu-dialog" style="background-color: #FFFFFF;">
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
									<input  class=" text-olive" style="padding-left: 10rpx;" placeholder="请输入..." v-model="item.number" @input="onInput"/>
								</view>
								<checkbox class='round' :disabled="item.number==''?true:false" :value="JSON.stringify(item)"></checkbox>
							</view>
						</checkbox-group>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">算了</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="enterModal">选好了</view>
				</view>
			</view>
		</view> -->
		<!-- 选择联系方式对话框-End-->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				animation: '',
				sortId:5,
				btnText:"下一步",
				msgSort:['手机、电脑','拿快递、找跑腿'],
				allConcatList: [{
						name: "QQ",
						number: ""
					},
					{
						name: "Phone",
						number: ""
					},
					{
						name: "WeChat",
						number: ""
					}
				],
				midConcatList: [],
				subConcatList: [], //联系方式列表
				modalName: null,
				deleteAnimate:'',//移除联系方式动画
				showId:1,
				pickerIssue: ['闲置', '任务'],
				// pickerIssueNeed: ['出售', '需求'],
				pickerThing:['日用百货','可口美食','服饰鞋包','文化娱乐','个护化妆','电脑数码','图书杂志','其他'],
				index: 0,
				indexThing:0,
				isTask:false,
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
				imgList: [],
				modalNameADD: null,
				textareaAValue: '',
				textareaBValue: '',
				textareaResonValue:'',
				tags:[],
				tagText:"",
				loadModal: false, //加载框
				isInput:false,
				detailSort:"",//详细分类
				title:"",//标题
				price:"",//现价
				costPrice:"",//原价
				ensure:"",//保障
				information:{},//上架的物品/任务的所有信息
				shadow:false//是否全新
			}
		},
		mounted() {
			//查询联系方式
			uniCloud.callFunction({
				name:"selectConcat",
				data:{
					phone: this.$store.state.user.user.phone
				}
			}).then((res)=>{
				if(res.result.data.length!=0)
				{
					this.allConcatList = res.result.data[res.result.data.length-1].list
				}
			}).catch((err) => {
				uni.showModal({
					content: `操作失败：${err.message}`,
					showCancel: false
				})
			})
		},
		methods:{
			
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
			//是否修改联系方式
			onInput(){
				this.isInput=true
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
				console.log(this.subConcatList)
				if(this.isInput)
				{
					try {
					    const Auth = uni.getStorageSync('Auth')
					    const concat = {phone:Auth.phone,list:this.allConcatList}
						uniCloud.callFunction({
							name:"addConcat",
							data:concat
						}).then((res)=>{
							
						}).catch((err) => {
							uni.showModal({
								content: `操作失败：${err.message}`,
								showCancel: false
							})
						})
					} catch (e) {
						uni.showToast({
							icon:"none",
							title:"数据异常",
							duration:1500
						})
					}
					
				}
				this.modalNameADD = null
			},
			//移除联系方式
			deleteConcat(e) {
				let _id = e.currentTarget.dataset.id
				let _name = e.currentTarget.dataset.class
				let that = this
				this.deleteAnimate=_name
				let timer = setTimeout(function(){
					that.subConcatList.splice(_id, 1)
					that.deleteAnimate=''
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
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						console.log("图片1",res)
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			updateImage(){
				let that = this
				this.information.imgList = []
				for(let i = 0;i<this.imgList.length;i++)
				{
					let filePath = this.imgList[i];
					//进行上传操作
					let uuid =that.$store.state.user.user.phone+Date.parse(new Date())+'good.jpg'
					const result = uniCloud.uploadFile({
						filePath: filePath,
						cloudPath: uuid,
						onUploadProgress: function(progressEvent) {
							console.log(progressEvent);
							let percentCompleted = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							);
						}
					}).then((res1)=>{
						console.log("上传：",res1);
						
						that.information.imgList.push(res1.fileID)
						this.ImagesComplete(i)
					})
					
					// this.totalCode = this.totalCode.concat(res.tempFilePaths)
				}
			},
			//图片上传完成
			ImagesComplete(value){
				if(value==this.imgList.length-1)
				{
					this.issueFun()
				}
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
			textareaReson(e){
				this.textareaResonValue = e.detail.value
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
			PickerChangeIssue(e) {
				this.index = e.detail.value
				if(this.index==1)
				{
					this.isTask = true
					this.sortId = 4
				}
				else{
					this.isTask=false
					this.sortId = 5
				}
			},
			PickerChangeThing(e) {
				this.indexThing = e.detail.value
			},
			next(){
				
				if(this.index==0)
				{
					if(this.showId<5)
					{
						this.showId = this.showId+1
						if(this.showId==5){
							this.btnText="发布"
						}
						
					}
					else if(this.showId==5){
						this.issueGood()
					}
				}else if(this.index==1){
					if(this.showId<4)
					{
						this.showId = this.showId+1
						if(this.showId==4){
							this.btnText="发布"
						}
						
					}
					else if(this.showId==4){
						this.issueGood()
					}
				}
				
			},
			prev(){
				if(this.showId>1)
				{
					this.showId = this.showId-1
					if(this.showId<5)
					{
						this.btnText="下一步"
					}
				}
			},
			addTag(){
				if(this.tagText.replace(/\s*/g,"")!=""&&this.tagText.replace(/\s*/g,"").length<5)
				{
					this.tags.push(this.tagText.replace(/\s*/g,""))
					this.tagText=""
				}
				else{
					uni.showToast({
						title:"标签格式错误~",
						icon:"none",
						duration:1500
					})
				}
			},
			deleteTag(e){
				this.tags.splice(e.currentTarget.dataset.index, 1)
			},
			
			//发布
			issueGood(){
				if(this.index==0)
				{
					this.issueThing()
				}
				else if(this.index==1)
				{
					this.issueTask()
				}
			},
			issueThing(){
				let isFormat = this.formatisTrue()
				if(isFormat =="true")
				{
					this.updateImage() //上传图片
					
				}else{
					uni.showToast({
						title:isFormat,
						icon:"none",
						duration:1500
					})
					
				}
			},
			issueFun(){
				this.loadModal = true
				this.information.phone = this.$store.state.user.user.phone
				this.information.nickname =  this.$store.state.user.user.nickname
				this.information.title = this.title
				this.information.titleSorts = this.pickerThing[this.indexThing]
				this.information.price = this.price
				this.information.costPrice = this.costPrice
				this.information.sorts = this.pickerIssue[this.index]
				this.information.detailSort = this.detailSort
				this.information.ensure = this.ensure
				this.information.textareaAValue = this.textareaAValue
				this.information.textareaResonValue = this.textareaResonValue
				this.information.tags = this.tags
				this.information.look = 0
				this.information.isNew = this.shadow
				let rates = this.price%this.costPrice+''
				this.information.rate = parseFloat(this.price/this.costPrice+'.'+rates.substring(0,2))*10
				this.information.avatar = this.$store.state.user.user.avatar
				this.information.university = this.$store.state.user.user.university
				this.information.createTime = this.tick()
				console.log(this.information)
				uniCloud.callFunction({
					name:"issueGood",
					data:this.information
				}).then((res)=>{
					this.init()
					this.loadModal = false
					this.showId=0
					uni.showToast({
						title:"已完成~",
						duration:1500
					})
				}).catch((err) => {
					uni.showModal({
						content: `操作失败：${err.message}`,
						showCancel: false
					})
				})
			},
			issueTask(){
				let isFormat = this.formatisTrue()
				if(isFormat =="true")
				{
					this.loadModal = true
					this.information.auth={}
					this.information.auth.phone=this.$store.state.user.user.phone
					this.information.auth.name = this.$store.state.user.user.nickname
					this.information.auth.avatar = this.$store.state.user.user.avatar
					this.information.auth.campus = this.$store.state.user.user.university
					this.information.title = this.title
					this.information.price = this.price
					this.information.sorts = this.pickerIssue[this.index]
					this.information.detailSort = this.detailSort
					this.information.textareaAValue = this.textareaAValue
					this.information.tags = this.tags
					this.information.createTime = this.tick()
					// console.log(this.information)
					uniCloud.callFunction({
						name:"issueTask",
						data:this.information
					}).then((res)=>{
						this.init()
						this.loadModal = false
						this.showId=0
						uni.showToast({
							title:"已完成~",
							duration:1500
						})
					}).catch((err) => {
						uni.showModal({
							content: `操作失败：${err.message}`,
							showCancel: false
						})
					})
				}else{
					uni.showToast({
						title:isFormat,
						icon:"none",
						duration:1500
					})
					
				}
				
			},
			//输入格式检测
			formatisTrue(){
				// this.detailSort = this.detailSort.replace(/\s*/g,"")
				this.price = this.price.replace(/\s*/g,"")
				this.costPrice = this.costPrice.replace(/\s*/g,"")
				this.ensure = this.ensure.replace(/\s*/g,"")
				// if(this.detailSort==""||this.detailSort.length<2||this.detailSort.length>4)
				// {
				// 	return "分类的格式错误~"
				// }
				if(this.title.replace(/\s*/g,"")==""||this.title.length>30)
				{
					return "标题的格式错误~"
				}else if(this.price==""||this.price.length>5)
				{
					return "价格的格式错误~"
				}else if(this.textareaAValue.replace(/\s*/g,"")==""||this.textareaAValue.length>300)
				{
					return "描述的格式错误~"
					
				}
				return "true"
			},
			//初始化数据
			init(){
				this.index = 0
				this.indexThing = 0
				this.detailSort=""
				this.title=""
				this.price=""
				this.costPrice=""
				this.ensure=""
				this.shadow=false
				this.textareaResonValue=""
				this.subConcatList=[]
				this.tags=[]
				this.imgList=[]
				this.textareaAValue=""
			},
			tick() {
				let date = new Date();
				this.year = date.getFullYear();
				this.month = date.getMonth() + 1;
				this.date = date.getDate();
				this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				let currentTime =  this.year + "/" + this.month + "/" + this.date + "/ " + this.hour + ":" + this.minute + ":" + this.second;
				 return currentTime
			},
			SetShadow(e) {
				this.shadow = e.detail.value
			},
			
		}
		
	}
</script>

<style lang="scss" scoped>
	.issue{
		overflow: hidden;
		height: 100vh;
		width: 100vw;
		position: relative;
		.showCard{
			top:50%!important;
			width:85vw!important;
			height:70vh!important;
			z-index:99!important;
		}
		.btnBox{
			width: 100vw;
			position: fixed;
			bottom: 5vh;
			z-index: 999;
			height: 100rpx;
			display: flex;
			justify-content: center;
			.mid{
				width: 100rpx;
			}
		}
		.step{
			position: absolute;
			top: 50%;
			left: 50%;
			border-radius: 20rpx;
			box-shadow: 0px 0px 1px 0px #FB532C;
			transform: translate(-50%,-50%);
			width: 85vw;
			height: 70vh;
			display: flex;
			align-items: center;
			background-color: #EEEEEE;
			transition: .5s all;
			.step-container{
				width: 100%;
				
			}
			.bg-white{
				background-color: rgba(0,0,0,0);
			}
		}
		.step-1{
			z-index: 99;
			top: 50%;
			width: 85vw;
			height: 70vh;
		}
		.step-2{
			z-index: 88;
			top: 51.5%;
			width: 75vw;
			height: 70vh;
		}
		.step-3{
			z-index: 77;
			top: 53%;
			width: 65vw;
			height: 70vh;
		}
		.step-4{
			z-index: 66;
			top: 54.5%;
			width: 55vw;
			height: 70vh;
		}
		.step-5{
			z-index: 55;
			top: 56%;
			width: 45vw;
			height: 70vh;
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
	.cu-form-group{
		background-color: rgba(0,0,0,0);
	}
	.cu-form-group+.cu-form-group{
		border: none;
	}
</style>
