<template>
	<view class="concatType">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">收款码</block>
		</cu-custom>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles text-green"></text>
				<text class="text-xl text-bold">联系方式</text>
			</view>
			<!-- <view class="addConcat" @tap="showModal" data-target="DialogModalAdd">
				<text class="cuIcon-add"></text>
			</view> -->
		</view>
		<view class="cu-form-group" v-for="(item,index) in totalType" :key="index">
			<view class="title">{{item.name}}</view>
			<input class="int" name="input" :value="item.number" disabled="true"></input>
			<button class='cu-btn bg-red shadow' :data-id="index" data-target="DialogModalAdd" :data-value="item.number" :data-class="item.name" @click="showModal">修改</button>
		</view>
		<view class="nomsg">
			<text v-if="totalType.length==0?true:false" class="text-grey text-sm" @tap="showModal" data-target="DialogModalAdd">请添加联系方式</text>
			<text v-if="totalType.length==0?false:true" class="text-grey text-sm">最多添加3个联系方式（{{totalType.length}}/3）</text>
		</view>

		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles text-green"></text>
				<text class="text-xl text-bold">收款二维码</text>
			</view>
			<view class="addCode" @tap="ChooseImage">
				<text class="cuIcon-picfill"></text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in totalCode" :key="index" @tap="ViewImage" :data-url="totalCode[index]">
					<image :src="totalCode[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-url="totalCode[index]" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<!-- <view class="solids" @tap="ChooseImage" v-if="totalCode.length<4">
					<text class='cuIcon-cameraadd'></text>
				</view> -->
			</view>
		</view>
		<view class="nomsg">
			<text v-if="totalCode.length==0?true:false" class="text-grey text-sm" @tap="ChooseImage">请添加收款码</text>
			<text v-if="totalCode.length==0?false:true" class="text-grey text-sm">最多添加2个收款码（{{totalCode.length}}/2）</text>
		</view>


		<!-- 添加联系方式对话框-Begin-->
		<view class="cu-modal" :class="modalNameADD=='DialogModalAdd'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">联系方式</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="padding: 50rpx 20rpx;background-color: #FFFFFF;">
					<view class="action" style="text-align: left;">
						<text class="cuIcon-title text-green"></text>
						<text class="text-lg">请先选择类型</text>
					</view>
					<view class="cu-form-group margin-top">
						<picker @change="PickerChange" :value="index" :range="picker">
							<view class="picker">
								{{index>-1?picker[index]:'联系方式类型'}}
							</view>
						</picker>
					</view>
					<view class="action" style="text-align: left;">
						<text class="cuIcon-title text-green"></text>
						<text class="text-lg">请输入</text>
					</view>
					<view class="cu-form-group">
						<view class="title">{{type}}</view>
						<input style="text-align: left;" placeholder="注意格式" name="input" v-model="value"></input>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">算了</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="enterModal">添加</view>
				</view>
			</view>
		</view>
		<!-- 添加联系方式对话框-End-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalNameADD: null,
				index: 0,
				value: "",
				type: "QQ",
				isEdit:false,
				itemType: {},
				totalType: [{
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
				totalCode: [],
				picker: ['QQ', 'Phone', 'WeChat'],
				id:""
			}
		},
		mounted() {
			uni.showLoading({
				title:" ",
			})
			this.selectCode()
			this.selectType()
			
		},
		methods: {
			//对话框弹出
			showModal(e) {
				this.type = e.currentTarget.dataset.class
				this.value = e.currentTarget.dataset.value
				this.index = e.currentTarget.dataset.id
				this.modalNameADD = e.currentTarget.dataset.target
			},
			//对话框隐藏
			hideModal(e) {
				this.modalNameADD = null
			},
			enterModal() {
				let that = this
				if (this.value != null && this.value != "" && this.value != " ") {
					if (this.totalType.length + 1 > 4) {
						uni.showToast({
							duration: 1000,
							title: "最多添加3个联系方式",
							icon: "none"
						})
					} else {
						for(let i=0;i<this.totalType.length;i++){
							if(this.totalType[i].name==this.type)
							{
								this.totalType[i].number = this.value
								uniCloud.callFunction({
									name:"addConcat",
									data:{
										phone:that.$store.state.user.user.phone,
										list:that.totalType
									}
								}).then((res)=>{
									uni.showToast({
										title:"修改成功~",
										icon:"none",
										duration:1500
									})
								}).catch((err) => {
									uni.showModal({
										content: `操作失败：${err.message}`,
										showCancel: false
									})
								})
								break
							}
						}
						this.value = ""
						this.modalNameADD = null
					}

				} else {
					uni.showToast({
						duration: 1500,
						title: "注意输入的格式",
						icon: "none"
					})
				}

			},
			//移除联系方式
			deleteConcat(e) {
				let _id = e.currentTarget.dataset.id
				let that = this
				that.totalType.splice(_id, 1)

			},
			PickerChange(e) {
				this.index = e.detail.value
				this.type = this.picker[this.index]
				this.value = this.totalType[this.index].number
			},
			ChooseImage() {
				let that = this
				if (this.totalCode.length > 3) {
					uni.showToast({
						title: "最多上传两张二维码",
						icon: "none",
						duration: 1500
					})
				} else {
					uni.chooseImage({
						count: 2, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success:async (res) => {
							console.log("选择：",res);
							if (this.totalCode.length != 0) {
								if (this.totalCode.length < 3 && this.totalCode.length + res.tempFilePaths.length < 3) {
									console.log(res.tempFilePaths)
									for(let i = 0;i<res.tempFilePaths.length;i++)
									{
										let filePath = res.tempFilePaths[i];
										//进行上传操作
										let uuid =that.$store.state.user.user.phone+Date.parse(new Date())+'code.jpg'
										const result = await uniCloud.uploadFile({
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
											that.addCode(res1.tempFilePaths)
										})
										
										// this.totalCode = this.totalCode.concat(res.tempFilePaths)
									}
									// that.addCode(res.tempFilePaths)
									
								} else {
									uni.showToast({
										title: "最多上传两张二维码",
										icon: "none",
										duration: 1500
									})
								}
							} else {
								if (res.tempFilePaths.length > 0) {
									let filePath = res.tempFilePaths[0];
									//进行上传操作
									let uuid =that.$store.state.user.user.phone+Date.parse(new Date())+'.jpg'
									const result = await uniCloud.uploadFile({
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
										that.addCode(res1.fileID)
									})
									
									// this.totalCode = res.tempFilePaths
								}
							}
						}
					})
				}

			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.totalCode,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				let urls = []
				let that = this
				urls.push(e.currentTarget.dataset.url)
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					cancelText: '点错了',
					confirmText: '是的',
					success: res => {
						if (res.confirm) {
							this.totalCode.splice(e.currentTarget.dataset.index, 1)
							uniCloud.callFunction({
								name:"deleteCode",
								data:{
									fileList:urls
								}
							}).then((res)=>{
								uniCloud.callFunction({
									name:"updateCode",
									data:{
										_id:that.id,
										codes:that.totalCode
									}
								}).then((res)=>{
									that.selectCode()
									uni.showToast({
										title:"已删除~",
										icon:"none"
									})
								}).catch((err)=>{
									console.log(err)
									uni.showToast({
										title:"操作失败2",
										icon:"none"
									})
								})
							}).catch((err)=>{
								uni.showToast({
									title:"操作失败1",
									icon:"none"
								})
							})
						}
					}
				})
			},
			// uuid() {
			// 	let s = [];
			// 	let hexDigits = Date.parse(new Date());
			// 	for (let i = 0; i < 36; i++) {
			// 		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			// 	}
			// 	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
			// 	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
			// 	s[8] = s[13] = s[18] = s[23] = "-";
			
			// 	let uuid = s.join("");
			// 	return uuid;
			// },
			addCode(imgs){
				let that=this
				let images = []
				images.push(imgs)
				that.selectCode()
				console.log("imgs:",imgs)
				images = images.concat(this.totalCode)
				console.log("id:",this.id)
				uni.showLoading({
					title:"上传中..."
				})
				if(this.id=="")
				{
					uniCloud.callFunction({
						name:"addCode",
						data:{
							phone:this.$store.state.user.user.phone,
							codes:images
						},
					}).then((res)=>{
						
						uni.hideLoading()
						uni.showToast({
							title:"上传成功~",
							icon:"none",
							duration:1500
						})
					}).catch((err) => {
						uni.showModal({
							content: `操作失败：${err.message}`,
							showCancel: false
						})
					})
				}else{
					console.log("this.totalCode:",images)
					uniCloud.callFunction({
						name:"updateCode",
						data:{
							_id:this.id,
							codes:images
						},
					}).then((res)=>{
						that.selectCode()
						uni.hideLoading()
						uni.showToast({
							title:"上传成功~",
							icon:"none",
							duration:1500
						})
					}).catch((err) => {
						uni.showModal({
							content: `操作失败：${err.message}`,
							showCancel: false
						})
					})
				}
				
			},
			selectCode(){
				let that = this
				uniCloud.callFunction({
					name:"selectCode",
					data:{
						phone:that.$store.state.user.user.phone
					}
				}).then((res)=>{
					console.log("二维码",res.result)
					if(res.result.data.length!=0)
					{
						that.id = res.result.data[0]._id
						that.totalCode = res.result.data[res.result.data.length-1].codes
					}
					else{
						that.totalCode = res.result.data
					}
					console.log("二维码s",that.totalCode)
				}).catch((err) => {
					
					uni.showModal({
						content: `操作失败：${err.message}`,
						showCancel: false
					})
				})
			},
			selectType(){
				let that = this
				uniCloud.callFunction({
					name:"selectConcat",
					data:{
						phone:that.$store.state.user.user.phone
					}
				}).then((res)=>{
					if(res.result.data.length!=0)
					{
						that.totalType = res.result.data[res.result.data.length-1].list
					}
					console.log("联系方式",res)
					uni.hideLoading()
					// that.totalType = res.result.data[res.result.data.length-1].list
				}).catch((err) => {
					uni.showModal({
						content: `操作失败：${err.message}`,
						showCancel: false
					})
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.cu-form-group picker .picker {
		text-align: left;
	}

	.cu-form-group {
		input {
			text-align: left;
			border-bottom: 0.5px solid #EEEEEE;
		}
	}

	.concatType {
		.nomsg {
			width: 100%;
			min-height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.cu-form-group {
			.int {
				border: none;
			}
		}

		.cu-bar {
			display: flex;
			justify-content: flex-start;
			padding-right: 25rpx;

			.addCode {
				margin-left: auto;
			}

			.addConcat {
				margin-left: auto;
			}
		}
	}
</style>
