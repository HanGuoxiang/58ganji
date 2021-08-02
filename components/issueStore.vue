<template>
	<!-- 发布界面弹窗-Begin -->
	<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @tap="hideModal" style="z-index: 9999999;">
		<view class="cu-dialog" @tap.stop="">
			<view class="cu-bar bg-white">
				<view class="action text-blue" @tap="hideModal">取消</view>
				<view class="action text-green" @tap="issue">上架</view>
			</view>

			<!-- 标签容器-begin -->
			<view class="tag-container">
				<view class="padding-xs" v-for="(item,index) in tagList" :key="index">
					<view class='cu-tag light bg-grey'>{{item.name}}
						<view class='cu-tag badge' :data-id="index" @click="deletTag">
							<text class="cuIcon-close"></text>
						</view>
					</view>
				</view>
			</view>
			<!-- 标签容器-end -->

			<!-- 动态输入框-Begin -->
			<view class="padding-sm">
				<view class="cu-form-group">
					<view class="title">标题</view>
					<input placeholder="输入标题" name="input" @input="onInputTitle"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">库存</view>
					<input placeholder="输入库存数(整数)" name="input" @input="onInputTotal"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">价格</view>
					<input placeholder="输入价格(整数)" name="input" @input="onInputPrice"></input>
				</view>
				<view class="cu-form-group area">
					<textarea maxlength="-1" @input="textareaAInput" placeholder="输入商品描述..." style="text-align: left;height: 50%;"></textarea>
				</view>

			</view>
			<!-- 动态输入框-end -->

			<!-- 图片容器-begin -->
			<view class="img-container" :style="[{opacity: opacity},{bottom:bottom}]">
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
			<!-- 图片容器-end -->

			<!-- 底部添加图片、标签-Begin -->
			<view class="cu-bar footer bg-white">
				<view class="action text-black">
					<view class="uploadImg" @tap="showUpdateImg"><text class="cuIcon-picfill text-xl text-grey"></text>
						<view class='cu-tag badge' :style="[{display:lengthIMG==0?'none':'block'}]">{{imgList.length}}</view>
						
					</view>
					<text class="text-xs" style="margin-left: 10rpx;" @tap="showUpdateImg">上传图片</text>
				</view>
				<view class="action text-green">
					<input maxlength="300" cursor-spacing="10" @focus="InputFocus" @blur="InputBlur" v-model="tagValue" placeholder="添加标签"></input>
					<button :style="[{opacity:showAdd_btn?'0':'1'}]" class="cu-btn bg-green sm shadow" @click="addTag"><text class="cuIcon-add"></text></button>
				</view>
			</view>
			<!-- 底部添加图片、标签-end -->
		</view>
	</view>
	<!-- 发布界面弹窗-End -->
</template>

<script>
	export default {
		props: {
			modalName: String,
		},
		data() {
			return {

				position: "定位中...",
				tagValue: "",
				imgList: [], //上传的图片
				tagList: [], //添加的标签的数组
				lengthIMG: 0,
				price:0,
				total:1,
				title:"",
				showAdd_btn: false,
				toggleDelay: false, //进入界面动画
				textareaAValue: "",
				opacity: 0,
				bottom: "80rpx",
			};
		},
		methods: {
			hideModal(e) {
				this.$emit("hideModal", null)
			},
			issue(){
				let store={}
				
				console.log(this.formatter(this.price))
				store.url=this.imgList
				store.total=this.total
				store.price=this.price
				store.title=this.title
				store.description=this.textareaAValue
				this.$emit("issue", store)
			},
			formatter(_keyword){
				if(_keyword == "0" || _keyword == "0." || _keyword == "0.0" || _keyword == "0.00"){
							_keyword = "0"; return true;
						}else{
							var index = _keyword.indexOf("0");
							var length = _keyword.length;
							if(index == 0 && length>1){/*0开头的数字串*/
								var reg = /^[0]{1}[.]{1}[0-9]{1,2}$/;
								if(!reg.test(_keyword)){
									return false;
								}else{
									return true;
								}
							}else{/*非0开头的数字*/
								var reg = /^[1-9]{1}[0-9]{0,10}[.]{0,1}[0-9]{0,2}$/;
								if(!reg.test(_keyword)){
									return false;
								}else{
									return true;
								}
							}			
							return false;
						}
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			onInputTitle(e){
				if(e.detail.cursor>10)
				{
					uni.showToast({
						title:"标题最多十个字~",
						icon:"none"
					})
				}else{
					this.title=e.detail.value
				}
			},
			onInputTotal(e){
				if(e.detail.cursor>5)
				{
					uni.showToast({
						title:"数量太多或格式错误~",
						icon:"none"
					})
				}else{
					this.total=e.detail.value
				}
			},
			onInputPrice(e){
				
				this.price = e.detail.value.replace(/\s*/g,"")
				
				// if(e.detail.cursor>6)
				// {
				// 	uni.showToast({
				// 		title:"金额太长或格式错误~",
				// 		icon:"none"
				// 	})
				// }else{
				// 	this.price=e.detail.value
				// }
			},
			//添加标签
			addTag() {
				let obj = {
					name: null
				}
				obj.name = this.tagValue
				if (this.tagValue != null && this.tagValue != '' && !this.showAdd_btn) {
					this.tagList.push(obj)
					if (this.tagList.length >= 5) {
						this.showAdd_btn = true
					}
				}
			},
			//删除标签
			deletTag(e) {
				let key = e.currentTarget.dataset.id
				this.tagList.splice(key, 1)
				if (this.tagList.length < 5) {
					this.showAdd_btn = false
				}
			},
			//显示上传图片的容器
			showUpdateImg() {
				if (this.opacity == 1) {
					this.opacity = 0
					this.bottom = "80rpx"
				} else {
					this.opacity = 1
					this.bottom = "100rpx"
				}

			},
			//选择照片
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'carema'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
						this.lengthIMG = this.imgList.length
					}
				});
			},
			//预览图片
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			//删除图片
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					cancelText: '点错了',
					confirmText: '是的',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							this.lengthIMG = this.imgList.length
						}
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.grid.grid-square>view.bg-img image {
		left: 0;
	}

	.grid.grid-square>view {
		margin-bottom: 0;
	}

.cu-form-group{
	position: relative;
	textarea{
		position: absolute;
		top: 0;
	}
}
	.cu-modal {
		z-index: 999999;

		.cu-dialog {
			height: calc(100vh - 220rpx);
			background-color: #FFFFFF;
			position: relative;

			.tag-container {
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;

				.padding-xs {
					.light {
						position: relative;
					}
				}
			}

			.img-container {
				position: absolute;
				// bottom: 80rpx;
				width: 100%;
				border-top: 1px #e6e6e6 solid;
				height: 200rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				z-index: 999999;
				padding: 10rpx 25rpx;
				transition: 800ms all;
			}

			.padding-sm {
				min-height: calc(100% - 270rpx);
				height: calc(100% - 270rpx);
				max-height: calc(100% - 270rpx);

				.cu-form-group {
					padding: 0;
				}

				.area {
					height: 100%;
				}
			}

			.cu-bar {
				max-height: 100rpx;
			}

			.footer {
				position: absolute;
				width: 100%;
				bottom: 0rpx;

				.text-black {
					width: 50%;
					display: flex;
					justify-content: flex-start;

					.uploadImg {
						position: relative;
					}

					.position {
						margin-left: auto;
						padding-right: 15rpx;
						max-width: 400rpx;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;

					}
				}

				.text-green {
					width: 50%;
					border-bottom: 0.5px solid #e6e6e6;
				}
			}
		}


		.bg-gradual-blue {
			background-image: -webkit-linear-gradient(45deg, #FDEB89, #F0F0F0);
			background-image: linear-gradient(45deg, #FDEB89, #F0F0F0);
			color: #ffffff;

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

		.index-content {
			margin-top: 220rpx;
			width: 100%;
			display: flex;
			flex-flow: column;
			align-items: center;

			.panel {
				width: 100%;
			}
		}

		.issue {
			position: fixed;
			width: 60px;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			right: 15px;
			bottom: 180upx;
			border-radius: 50%;

			.lg {
				font-size: 20px;
			}

			// box-shadow: 0 0 5px 5px ;
		}
	}
</style>
