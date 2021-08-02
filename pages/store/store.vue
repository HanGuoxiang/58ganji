<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop">
				<block slot="backText"></block>
				<block slot="content"></block>
			</cu-custom>
		</view>
		<swiper id="swiper" class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in 4" :key="index">
				<image :src="'https://ossweb-img.qq.com/images/lol/web201310/skin/big3900'+index+ '.jpg'" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="owner">
			<view class="owner-title text-xl">{{title}}</view>
			<view class="owner-flowers">
				<text class="cuIcon-favorfill light-olive-1"></text>
				<text class="owner-number text-xs">5.0</text>
				<text class="task-number text-xs text-grey">99单</text>
			</view>
			<view class="owner-description"><text class="text-grey text-xs">{{textareaValue==""?"没有介绍哦~":textareaValue}}</text></view>
			<view class="cu-avatar radius owner-avatar padding-xl radius shadow-blur" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg);"></view>
			<button class="cu-btn round sm" @tap="showModalEdit" data-target="DialogModalEdit"><text class="text-xs">修改资料</text></button>
		</view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCurNav?'text-green cur':''" v-for="(item,index) in NavMenu" :key="index" @tap="tabSelectNav" :data-id="index">
				{{item.name}}<text class="text-xs" v-if="item.name=='评价'">5</text>
			</view>
		</scroll-view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 375upx)">
				<view class="cu-item" :class="index==tabCur?'text-topic cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect"
				 :data-id="index">
					{{item.name}}
				</view>
				<view class="cu-item text-topic" @tap="showModal" data-target="DrawerModalL">
					添加 <text class="cuIcon-roundadd text-topic" style="margin-left: 15rpx;"></text>
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx);z-index: 99;"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in list" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white radius-top">
						<view class="action">
							<text class="cuIcon-title text-topic"></text>{{item.name}}</view>
					</view>
					<view class="cu-list menu-avatar radius-bottom">
						<view class="cu-item" v-for="(value,key) in item.stores" :key="key">
							<view class="cu-avatar radius lg" :style="{'background-image':'url('+value.url+')'}"></view>
							<view class="content">
								<view class="text-black"><text class="text-cut text-sm">{{value.title}}</text></view>
								<view class="text-gray text-xs flex"> <text class="text-cut">{{value.description}}</text></view>
								<view class="text-grey text-xs">库存：{{value.total}}</view>
							</view>
							<view class="action">
								<view class="text-red text-price">{{value.price}}</view>
								<view class="addNumber">
									<button class="cu-btn cuIcon sm subTotal" :data-k="index==0?key:list[index-1].stores.length+key" @tap="subTotal"  :style="(buyTotal[index==0?key:list[index-1].stores.length+key].total)==0?'':'opacity:1;right:112rpx;transform: rotate(360deg);transition: 1s all;'">
										<text class="cuIcon-move"></text>
									</button>
									<view class="total text-black" :style="(buyTotal[index==0?key:list[index-1].stores.length+key].total)==0?'':'opacity:1;transition: 1.2s all;'">{{buyTotal[index==0?key:list[index-1].stores.length+key].total}}</view>
									
									<button class="cu-btn cuIcon sm bg-topic-theme addTotal" :data-k="index==0?key:list[index-1].stores.length+key" @tap="addTotal">
										<text class="cuIcon-add text-xl"></text>
									</button>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-item add-cu-item" :data-id="item.id" @tap="addStore" data-target="ChooseModal">
						<view class="addPanel">
							<text class="text-xs text-gray">添加新物品吧~</text>
							<view class="addImg">
								<image src="../../static/addstore.png"></image>
							</view>
						</view>
					</view>
				</view>
				
			</scroll-view>
			<view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''" style="z-index: 9999999;" @tap="hideModal">
				<view class="cu-dialog basis-lg" @tap.stop="" style="top: 375rpx;height: calc(100vh - 375rpx);z-index: 999;" >
					<view class="cu-list menu text-left center">
						<view class="cu-item position" v-for="(item,index) in list" :key="index" :style="{top:(item.order-1)*100+'rpx'}">
							<view class="order-view">
								<view class="order-up" :data-order="item.order" @tap="sortUp">
									<text class="cuIcon-fold"></text>
								</view>
								<view class="order-down" :data-order="item.order" @tap="sortDown">
									<text class="cuIcon-unfold"></text>
								</view>
							</view>
							<view class="content edit">
								<input placeholder="请输入新类别" name="input" :value="item.name" :data-id="item.id" @input="editName"></input>
								<text class="cuIcon-write"></text>
							</view>
						</view>
						<button class="cu-btn round bg-topic-theme" @tap="addTab">
							<text class="cuIcon-add text-xl">添加</text>
						</button>
					</view>
				</view>
			</view>
		</view>
		<issueStore @hideModal="hideModal" @issue="issue" :modalName="modalName"></issueStore>
		<bottomOperate @hrefBuy="hrefBuy" @showModalBottom="showModalBottom" :modalNameBottom="modalNameBottom" :buyTotal="buyTotal"></bottomOperate>
		<view class="cu-modal bottom-modal" :class="modalNameBottom=='bottomModal'?'show':''" @tap="hideModalBottom">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white">
					<view class="action text-green">确定</view>
					<view class="action text-blue" @tap="hideModalBottom">取消</view>
				</view>
				<view class="padding-xl">
					Modal 内容。
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModalEdit'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">编辑资料</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group">
						<view class="title">店铺名称：</view>
						<input placeholder="输入店铺名称" name="input" @input="titleValue" :value="title"></input>
						<text class='cuIcon-favorfill text-orange'></text>
					</view>
					<view class="cu-form-group">
						<view class="title">店铺描述：</view>
					</view>
					<textarea maxlength="25"  @input="textareaAInput" placeholder="请输入详细描述..." style="height: 10vh;text-align: left;"></textarea>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-olive margin-left" @tap="enterEdit">确定</button>
		
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import issueStore from '../../components/issueStore.vue';
	import bottomOperate from '../../components/bottomOperate.vue';
	export default {
		components:{
			issueStore,
			bottomOperate
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				modalName: null,
				modalNameBottom: null,
				clickOrder:-1,
				offsetTop:0,
				title:"奇妙商铺",
				textareaValue:"",
				uuidSort:-1,
				keys:0,
				buyTotal:[],
				NavMenu:[
					{
						name:"商品"
					},
					{
						name:"评价"
					}
				],
				list: [
					{
						id:0,
						name:'潮牌',
						order:1,
						stores:[
							{
								uuid:"c1es1d3",
								url:['https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'],
								tagList:['便宜','实惠'],
								title:'Champion',
								total:3,
								price:399,
								description:"潮牌冠军 便宜实惠！"
							},
							{
								uuid:"c1es1d4",
								url:['https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'],
								tagList:['便宜','实惠'],
								title:'Champion',
								total:3,
								price:399,
								description:"潮牌冠军 便宜实惠！"
							}
							
						]
					},
					{
						id:1,
						name:'空军鞋子',
						order:2,
						stores:[
							{
								uuid:"c1es1d2",
								url:['https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'],
								tagList:['便宜','实惠'],
								title:'Air 空军',
								total:3,
								price:2599,
								description:"耐克 便宜实惠！"
							},
							{
								uuid:"c1es1d1",
								url:['https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'],
								tagList:['便宜','实惠'],
								title:'Air 空军二',
								total:1,
								price:1599,
								description:"耐克 便宜实惠！"
							}
							
						]
					}
				],
				tabCur: 0,
				TabCurNav:0,
				mainCur: 0,
				scrollLeft:0,
				verticalNavTop: 0,
				load: true
			};
		},
		onLoad() {
			let that=this
			that.list.forEach(function(item,index){
				item.stores.forEach(function(v,k){
					that.buyTotal.push({
						uuid:v.uuid,
						store:v,
						total:0
					})
				})
				
			})
			console.log(this.buyTotal)
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			// let list = [{}];
			// for (let i = 0; i < 8; i++) {
			// 	list[i] = {};
			// 	list[i].name = String.fromCharCode(65 + i);
			// 	list[i].id = i;
			// }
			// this.list = list;
			// this.listCur = list[0];
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			enterEdit(){
				
			},
			tabSelectNav(e){
				this.TabCurNav = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			issue(store){
				uni.showLoading({
					title:"发布中",
					
				})
				for(let i=0,length=this.list.length;i<length;i++){
					if(this.uuidSort==this.list[i].id)
					{
						this.list[i].stores.push(store)
						break
					}
				}
				setTimeout(function(){
					uni.hideLoading()
					uni.showToast({
						title:"发布成功",
						duration:1500
					})
					this.modalName=null
				},1500)
				
			},
			//添加一个商品数量
			addTotal(e){
				let key = e.currentTarget.dataset.k;
				console.log(this.buyTotal[key].store.total)
				console.log(this.buyTotal[key].total)
				if(this.buyTotal[key].store.total>this.buyTotal[key].total)
				{
					this.buyTotal[key].total++
				}else{
					uni.showToast({
						title:"库存不够哦",
						icon:"none"
					})
				}
				
			},
			//移除一个商品数量
			subTotal(e){
				let key = e.currentTarget.dataset.k;
				if(this.buyTotal[key].total>0)
				{
					this.buyTotal[key].total--
				}else{
					uni.showToast({
						title:"已经没有了",
						icon:"none"
					})
				}
				
			},
			//修改左侧分类名字
			editName(e){
				let id = e.currentTarget.dataset.id;
				console.log(e.detail)
				if(e.detail.cursor<5)
				{
					for(let i = 0, len=this.list.length; i < len; i++) {
					   if(this.list[i].id===id){
						   this.list[i].name=e.detail.value
						   break
					   }
					}
				}else{
					uni.showToast({
						title:"不能超过5个字~",
						icon:'none'
					})
				}
				
			},
			addTab(){
				let order=this.list.length+1
				let id=order-1
				this.list.push({
					id:id,
					order:order,
					name:"",
					stores:[]
				})
				console.log(this.list)
			},
			//添加单个商品
			addStore(e){
				this.uuidSort= e.currentTarget.dataset.id;
				this.modalName = e.currentTarget.dataset.target;
				// let store={
				// 	url:['https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png'],
				// 	title:'fali',
				// 	total:1,
				// 	price:259,
				// 	description:"斐乐 便宜实惠！"
				// }
				// for(let i = 0, len=this.list.length; i < len; i++) {
				//    if(this.list[i].id===id){
				// 	   this.list[i].stores.push(store)
				// 	   break
				//    }
				// }
			},
			sortUp(e){
				let order = e.currentTarget.dataset.order
				let length=this.list.length
				console.log("order:",order)
				console.log("length:",length)
				console.log("list:",this.list)
				if(order>1)
				{
					for(let i=0;i<length;i++){
						if(order===this.list[i].order)
						{
							for(let j=0;j<length;j++){
								if((order-1)===this.list[j].order)
								{
									this.list[j].order++
									break
								}
								
							}
							this.list[i].order--
							break
						}
						
					}
				}else{
					uni.showToast({
						title:"已经是第一个了~",
						icon:"none"
					})
				}
			},
			sortDown(e){
				let order = e.currentTarget.dataset.order
				let length=this.list.length
				console.log("order:",order)
				console.log("length:",length)
				console.log("list:",this.list)
				if(order<length)
				{
					for(let i=0;i<length;i++){
						if(order===this.list[i].order)
						{
							for(let j=0;j<length;j++){
								if((order+1)===this.list[j].order)
								{
									this.list[j].order--
									break
								}
								
							}
							this.list[i].order=this.list[i].order+1
							break
						}
						
					}
				}else{
					uni.showToast({
						title:"已经是最后一个了~",
						icon:"none"
					})
				}
				
				
			},
			showModalEdit(e){
				this.modalName=e.currentTarget.dataset.target
			},
			showModalBottom(e){
				this.modalNameBottom=e;
			},
			hrefBuy(){
				uni.navigateTo({
					url:"../../view/buy"
				})
			},
			hideModalBottom(e){
				this.modalNameBottom=null;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			},
		
		},
	}
</script>

<style lang="scss" scoped>
	.addNumber{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-top: 30rpx!important;
		position: relative;
		width: 160rpx;
		.subTotal{
			position: absolute;
			right: 0;
			opacity: 1;
			z-index: 10;
			transform: rotate(0deg);
			
		}
		.addTotal{
			position: absolute;
			right: 0;
			z-index: 20;
		}
		.total{
			position: absolute;
			left: 50%;
			top: 50%;
			opacity: 0;
			transform: translate(-50%,-50%);
		}
		view{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 0!important;
		}
	}
	.cu-btn.sm {
		font-size: 30rpx;
	}
	.cu-dialog{
		background-color: #FFFFFF;
		.padding-xl{
			.cu-form-group .title {
				min-width: calc(4em + 15px);
			}
			.cu-form-group{
				background-color: rgba(0,0,0,0);
			}
			.cu-form-group+.cu-form-group{
				border: none;
			}
		}
	}
	.order-view{
		width: 50rpx;
		height: 80rpx;
		.order-up{
			width: 100%;
			height: 50%;
			border: none;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.order-down{
			width: 100%;
			height: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			border: none;
		}
	}
	.add-cu-item{
		background-color: #FFFFFF;
	}
	#swiper{
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: -1;
	}
	.owner{
		margin-top: 360upx;
		border-top-right-radius: 15upx;
		border-top-left-radius: 15upx;
		transition: 1s all;
		width: 100vw;
		position: relative;
		padding: 25upx;
		background-color: #FFFFFF;
		.owner-title{
			white-space: 2px;
			max-width: 60vw;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-top: 10upx;
		}
		.owner-flowers{
			max-width: 60vw;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-top: 10upx;
			.task-number{
				margin-left: 8upx;
			}
		}
		.owner-description{
			max-width: calc(100vw - 50upx);
			max-height: 250upx;
			margin-top: 10upx;
		}
		.owner-avatar{
			position: absolute;
			width: 120upx;
			height: 120upx;
			top: -30upx;
			right: 10vw;
		}
		button{
			position: absolute;
			right: 10vw;
			top: 125upx;
		}
	}
	.center{
		display: flex!important;
		flex-flow: column;
		position: relative;
		height: 100%;
		align-items: center;
		.position{
			position: absolute;
		}
		button{
			order: 50;
			bottom: 50rpx;
			position: absolute;
		}
	}
	.addPanel{
		width: 100%;
		padding:15rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		.addImg{
			width: 100rpx;
			height: 100rpx;
			border-radius: 10rpx;
			margin-left: auto;
			image{
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		}
	}
	.radius-top{
		border-top-left-radius: 8rpx;
		border-top-right-radius: 8rpx;
	}
	.radius-bottom{
		border-bottom-left-radius: 8rpx;
		border-bottom-right-radius: 8rpx;
	}
		
	.cu-list.menu-avatar>.cu-item{
		min-height: 150rpx;
		height: uset;
	}
	.cu-list.menu-avatar>.cu-item .action{
		width: 170rpx;
		padding-right: 10rpx;
		view{
			text-align: right;
		}
	}
	.cu-list.menu-avatar>.cu-item>.cu-avatar{
		left: 15rpx;
	}
	.cu-avatar.lg{
		width: 111rpx;
		height: 111rpx;
	}
	.cu-list.menu-avatar>.cu-item .content{
		left: 136rpx;
		line-height: 1.3em;
	}
	.edit{
		display: flex;
		padding-left: 10rpx;
	}
	.sub{
		width: 21px;
		height:21px;
		border-radius: 50%;
		border: 1rpx solid #666;
	}
	.add{
		width: 21px;
		height: 21px;
		border-radius: 50%;
		border: 1rpx solid #F8D347;
	}
	.total{
		min-width: 50rpx;
		max-width: 50rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.fixed {
		position: fixed;
		z-index: 99;
	}
	.VerticalNav{
		
		
	}
	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
		transition: 0.4s all;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
