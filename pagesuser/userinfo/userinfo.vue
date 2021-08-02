<template>
	<view>
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的</block>
		</cu-custom>
		<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
			<view class="cu-item arrow" @tap="ChooseImage">
				<view class="content">
					<text class="cuIcon-picfill text-grey"></text>
					<text class="text-black">头像</text>
				</view>
				<view class="user-data">
					<view class="cu-avatar round margin-left" :style="{backgroundImage:'url('+user.url+')'}"></view>
				</view>
			</view>
			<view class="cu-item arrow" data-target="DialogModalnickname">
				<view class="content">
					<text class="cuIcon-myfill text-grey"></text>
					<text class="text-black">昵称</text>
				</view>
				<view class="user-data">
					<input placeholder="请输入昵称" v-model:value='user["姓名"]' />
					<!-- <u-input placeholder=""></u-input> -->
					<!-- <text class="text-grey">{{user["姓名"]}}</text> -->
				</view>
			</view>
			<!-- <view class="cu-item arrow" @tap="addLabels">
				<view class="content">
					<text class="cuIcon-tagfill text-grey margin-right-xs"></text>
					<text class="text-black">标签</text>
				</view>
				<view class="action">
					<view class="cu-tag round bg-orange light">音乐</view>
					<view class="cu-tag round bg-olive light">电影</view>
					<view class="cu-tag round bg-blue light">旅行</view>
				</view>
			</view> -->
			<view class="cu-item arrow" @tap="editDescript">
				<view class="content">
					<text class="cuIcon-activityfill text-grey"></text>
					<text class="text-black">介绍</text>
			
				</view>
				<view class="user-data">
						<input placeholder="请输入介绍" v-model:value='user["企业介绍"]' />
					<!-- <text class="text-grey">user-data</text> -->
				</view>
			</view>
			<view class="cu-item arrow" @tap="noEdit">
				<view class="content">
					<text class="cuIcon-activityfill text-grey"></text>
					<text class="text-black">入驻日期</text>
				</view>
				<view class="user-data">
					<text class="text-grey">{{user["创建日期"]}}</text>
				</view>
			</view>
			<!-- <view class="cu-item arrow" @tap="noEdit">
				<view class="content">
					<text class="cuIcon-evaluate_fill text-grey"></text>
					<text class="text-black">学校</text>
				</view>
				<view class="user-data">
					<text class="text-grey">{{user.university}}</text>
				</view>
			</view> -->

		</view>
		<view class="btn-box flex align-center justify-center"><button class="cu-btn confirem-btn" @tap="editUserInfo">保存</button></view>
	<!-- 	<view class="btn-box flex align-center justify-center"><button class="cu-btn confirem-btn" @tap="exitClick">退出</button></view> -->
		<view class="btn-box flex align-center justify-center"><button class="cu-btn confirem-btn bg-red" @tap="exitClick">退出</button></view>
		<!-- 修改昵称对话框-Begin-->
		<view class="cu-modal" :class="modalName=='DialogModalnickname'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">新昵称</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="padding: 50rpx 20rpx;">
					<view class="cu-form-group">
						<input class="enterCode" name="input"  v-model="nickname"></input>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">算了吧</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="enterModal">想好了</view>
				</view>
			</view>
		</view>
		<!-- 修改昵称对话框-End-->
	</view>
</template>

<script>
	import c from '../../modules/common.js'
	import b from '../../modules/bll.js'
	
	import { mapMutations } from "vuex"
	export default {
		data() {
			return {
				// loginedUser:{},
				modalName: null,
				user:{},
				nickname: "",
				isUpdateImg:false,
				isNickname:false,
				imgList:['http://img2.imgtn.bdimg.com/it/u=1039075865,3371165857&fm=26&gp=0.jpg'],
			}
		},
		mounted() {
			// this.user = this.$store.state.user.user
			// this.nickname=this.$store.state.user.user.nickname
			// console.log(this.user)
			
		},
		onLoad() {
			// this.user=c.getUser(true);
			b.getUserInfo((data)=>{
				this.user=data;
			})
			console.log('onLoad===>'+JSON.stringify(this.user))
		},
		methods: {
			// ...mapMutations("user", ["setUser"]),
			//对话框弹出
			showModal(e) {
				console.log("====>"+JSON.stringify(e))
				this.modalName = e.currentTarget.dataset.target
				// if(this.modalName == 'DialogModalnickname')
				// {
				// 	this.nickname = this.name
				// }
			},
			exitClick(){
				c.saveUserLogin("");
				c.closePage();
			},
			//添加标签
			addLabels(){
				uni.navigateTo({
					url:"addLabels"
				})
			},
			//添加个人描述
			editDescript(){
				uni.navigateTo({
					url:"editDescript"
				})
			},
			//对话框隐藏
			hideModal(e) {
				this.modalName = null
			},
			enterModal() {
				this.modalName = null
				if(this.nickname!=''&&this.nickname!=" ")
				{
					console.log(this.nickname)
					this.user.nickname= this.nickname
					this.isNickname=true
				}
				
			},
			noEdit(){
				uni.showToast({
					title:"无法修改哦~",
					icon:"none"
				})
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						this.user.Photo = res.tempFilePaths[0]
						// this.isUpdateImg=true 
						
						
						c.loading();
						 
						 let filelist=[{"name":"userphoto","uri":res.tempFilePaths[0]}];
						 let paramDict={
							 "action":"userinfo_update",
							 "userencryptid":c.getUser().EncryptID
						 };
							b.uploadFilesWithParam(paramDict,filelist,(data)=>{
								 console.log('data'+data+JSON.stringify(data));
								 
								 if(data.Status==1)
								 {
									 let localloginedUser=c.getUser();
									 localloginedUser.Photo=data.Data;
									 // this.loginedUser.Photo=data.Data;
									 this.user.url=data.Data;
									 c.saveUserLogin(localloginedUser);
									c.show('更新头像成功')
									}
										c.hideLoading();
							});	
							
							
						// c.loading();
						 
						//  let filelist=[{"name":"userphoto","uri":res.tempFilePaths[0]}];
						// 	b.uploadFilesWithParam("action=userinfo_update&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&"
						// 	+"&userencryptid="+c.getUser().EncryptID,{},filelist,(data)=>{
						// 		 console.log('data'+data+JSON.stringify(data));
								 
						// 		 if(data.Status==1)
						// 		 {
						// 			 let loginedUser=c.getUser();
						// 			 loginedUser.Photo=data.Data;
						// 			 this.user.Photo=data.Data;
						// 			 c.saveUserLogin(loginedUser);
						// 		c.show('更新头像成功')
						// 			}
						// 				c.hideLoading();
						// 	});	
							
					}
				});
			},
			updateImage(){
			
				
			},
			editUserInfo(){
				c.loading();
				b.getHttpWithParam("action=userinfo_update&username="+this.user["姓名"]+'&intro='+this.user["企业介绍"],(data)=>{
					if(data.Status==1)
					{c.show('保存成功')}
					c.hideLoading();
				})
				// uni.showLoading({
				// 	title:"保存中..."
				// })
				// if(this.isUpdateImg)
				// {
				// 	this.updateImage()
				// }else if(!this.isUpdateImg&&this.isNickname)
				// {
				// 	this.updateDataSource()
				// }
				// else if(!this.isUpdateImg&&!this.isNickname)
				// {
				// 	uni.showToast({
				// 		title:"无任何修改~"
				// 	})
				// }
				
			},
			updateDataSource(){
				uniCloud.callFunction({
					name:"updateUser",
					data:{
						_id:this.user._id,
						nickname:this.user.nickname,
						avatar:this.user.avatar
					}
				}).then((res) => {
					this.$store.commit("user/setUser", this.user)
					uni.hideLoading()
					uni.showToast({
						title:"修改成功~"
					})
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `操作失败：${err.message}`,
						showCancel: false
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.padding-xl{
		background-color: #FFFFFF;
	}
	.enterCode{
		text-align: center;
		border-bottom: 1px solid #EEEEEE;
	}
	.btn-box {
		margin-top: 60rpx;

		.confirem-btn {
			width: 710rpx;
			height: 80rpx;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			border: 1rpx solid rgba(238, 238, 238, 1);
			border-radius: 40rpx;
			font-size: 30rpx;
			color: rgba(#fff, 0.9);
		}
	}

	.user-data {
		flex: 1;
		text-align: right;
	}
</style>
