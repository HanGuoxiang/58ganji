<template>
	<view class="bg-gradual-blue">
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<cu-custom-foot bgColor="bg-topic-theme" :isBack="true">
				<block slot="backText">分类</block>
				<block slot="content">任务</block>
			</cu-custom-foot>
			<view class="nav-sort">
				<view class="cu-bar">
					<view class="action action1">
						<text class="cuIcon-titles text-green" style="margin-left: 0!important;"></text>
						<text class="text-black">兼职</text>
					</view>
				</view>
			</view>

			<view class="list-task">
				<taskItem @hrefTask="hrefTaskDetail" @hrefChat="hrefChatRoom" :taskList="taskList"></taskItem>
			</view>
			<view class="cu-load text-black" :class="isLoad?'loading':'over'"></view>

		</scroll-view>
		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<scroll-view scroll-y class="DrawerWindow" @tap="hideModal" :class="modalName=='viewModal'?'show':''">
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<view class="cu-item arrow" v-for="(item,index) in 20" :key="index">
					<view class="content">
						<text class="cuIcon-github text-grey"></text>
						<text class="text-grey">{{index +1}}</text>
					</view>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import taskItem from "@/components/taskItem.vue"
	export default {
		components: {
			taskItem
		},
		data() {
			return {
				modalName: null,
				sort: null,
				isLoad: true,
				sortName: "兼职",
				taskList: [],
				cardCur: 0,
				cuIconList: [{
					id: 0,
					url: "../../view/Shopping",
					cuIcon: 'clothesfill',
					color: 'red',
					badge: 120,
					name: '兼职'
				}, {
					id: 1,
					url: "../../view/goTask",
					cuIcon: 'rechargefill',
					color: 'orange',
					badge: 1,
					name: '跑腿'
				}, {
					id: 2,
					url: "../../view/shopCar",
					cuIcon: 'cartfill',
					color: 'yellow',
					badge: 22,
					name: '代出行'
				}, {
					id: 3,
					url: "../../view/concatType",
					cuIcon: 'card',
					color: 'olive',
					badge: 0,
					name: '拼车'
				}, {
					id: 4,
					url: "../../view/concatType",
					cuIcon: 'sponsorfill',
					color: 'brown',
					badge: 0,
					name: '结伴'
				}, {
					id: 5,
					url: "../../view/signIn",
					cuIcon: 'tagfill',
					color: 'blue',
					badge: 1,
					name: '游玩'
				}],
				page: 1,
				pageSize: 20
			};
		},
		mounted() {

			this.selectTasks()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			this.page=1
			this.pageSize=20
			uni.showLoading({
				title:"刷新中"
			})
			this.selectTasks()
		},
		methods: {
			//分页查询任务
			selectTasks() {
				uniCloud.callFunction({
					name: "selectTasks",
					data: {
						page: this.page,
						pageSize: this.pageSize
					}
				}).then((res) => {
					console.log("分页查询任务:", res)
					this.taskList = res.result.list.data
					uni.stopPullDownRefresh()
					uni.hideLoading()
					if (this.taskList.length < 20) {
						this.isLoad = false
					}
				}).catch((err) => {
					console.log("错误:", err)
					uni.showToast({
						title: "网络错误~",
						icon: "none",
						duration: 1500
					})
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			hrefTaskDetail(item) {
				uni.navigateTo({
					url: "/view/taskDetail?item=" + encodeURIComponent(JSON.stringify(item))
				})
			},
			hrefChatRoom(item) {
				uni.navigateTo({
					url: "../../view/chatRoom"
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-image: -webkit-linear-gradient(45deg, #F8D347, #F0F0F0);
		background-image: linear-gradient(45deg, #F8D347, #F0F0F0);
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.nav-sort {
		width: 100vw;
		// padding: 0 10rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.school {
			margin-left: auto;
		}
	}

	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #EEEEEE;
		transition: all 0.4s;

		.list-task {

			padding-bottom: 10rpx;
		}
	}

	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100upx 0;
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}

	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}

	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}

	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}

	.DrawerPage .nav {
		flex: 1;
	}

	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}

	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
</style>
