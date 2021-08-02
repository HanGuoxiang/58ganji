<template>
	<view class="collection">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">收藏</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center" :style="{position:'fixed',top:custombar+'px'}" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in navList" :key="index" @tap="tabSelect" :data-id="index">
				{{item.name}}
			</view>
		</scroll-view>
		<view class="goods" :style="{marginLeft:'-'+TabCur*100+'vw'}">
			<view class="good">
				<Goods @clickHref="hrefstoreDetail"></Goods>
			</view>
			<view class="good">
				<taskItem @hrefTask="hrefTaskDetail" :taskList="taskList"></taskItem>
			</view>

		</view>
	</view>
</template>

<script>
	import Goods from "@/components/goods.vue"
	import taskItem from "@/components/taskItem.vue"
	export default{
		components:{
			Goods,
			taskItem
		},
		data(){
			return{
				TabCur: 0,
				scrollLeft: 0,
				custombar:this.CustomBar,
				navList:[
					{
						id:1,
						name:"闲置"
					},
					{
						id:2,
						name:"任务"
					}
				],
				taskList: [{
						id: 0,
						type: "任务",
						sort: "兼职",
						title: "找人做兼职",
						price: "50.00",
						time: "2020-9-12 15:16",
						auth: {
							code: "52154",
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg",
							name: "西瓜不甜",
							campus:"清华大学"
						},
						tag: ['轻松', '方便'],
						desc: "项目 Darling 编译成功，前端运行日志，请在小程序开发工具中查看"
					},
					{
						id: 1,
						type: "任务",
						sort: "代课",
						title: "今天下午代课",
						price: "115.00",
						time: "2020-9-13 12:30",
						auth: {
							code: "52154",
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg",
							name: "lenom",
							campus:"清华大学"
						},
						tag: ['高数', '楼401'],
						desc: "求导、微积分、定积分、高数期末测试，反导等"
					},
					{
						id: 2,
						type: "任务",
						sort: "代课",
						title: "填起拼车",
						price: "18.00",
						time: "2020-9-13 12:30",
						auth: {
							code: "52154",
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg",
							name: "lenom",
							campus:"清华大学"
							
						},
						tag: ['高数', '楼401'],
						desc: "求导"
					},
					{
						id: 2,
						type: "任务",
						sort: "代课",
						title: "填起拼车",
						price: "18.00",
						time: "2020-9-13 12:30",
						auth: {
							code: "52154",
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg",
							name: "lenom",
							campus:"清华大学"
							
						},
						tag: ['高数', '楼401'],
						desc: "求导"
					}]
			}
		},
		methods:{
			// uniCloud.callFunction({
			// 	name:"selectCollection",
			// 	data:{
			// 		phone:this.$store.state.user.user.phone
			// 	}
			// }).then((res)=>{
			// 	this.goodslist=res.result.data
			// 	this.isLoad=false
			// }).catch((err) => {
			// 	uni.showModal({
			// 		content: `操作失败：${err.message}`,
			// 		showCancel: false
			// 	})
			// })
			//tab栏切换事件
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			hrefTaskDetail(item) {
				uni.navigateTo({
					url: "taskDetail?item=" + encodeURIComponent(JSON.stringify(item))
				})
			},
			hrefstoreDetail(item){
				uni.navigateTo({
					url:"storeDetail?item=" + encodeURIComponent(JSON.stringify(item))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.collection{
		min-height: 100vh;
		background-color: #EEEEEE;
		overflow-x: hidden;
		.nav{
			z-index: 99;
		}
		.goods{
			display: flex;
			position: relative;
			margin-left: 0;
			transition: .5s all;
			margin-top: 90rpx;
			.good{
				flex: 1;
			}
		}
	}
</style>
