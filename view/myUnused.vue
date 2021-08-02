<template>
	<view class="myUnused">
		<cu-custom bgColor="bg-topic-theme" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的闲置</block>
		</cu-custom>
		<Goods @clickHref="hrefstoreDetail" :isMore="isLoad" :goods="goodslist"></Goods>
	</view>
</template>

<script>
	import Goods from "@/components/goods.vue"
	export default{
		components:{
			Goods
		},
		data(){
			return{
				goodslist:[],
				isLoad:true
			}
		},
		mounted() {
			uniCloud.callFunction({
				name:"selectMyGoods",
				data:{
					phone:this.$store.state.user.user.phone
				}
			}).then((res)=>{
				this.goodslist=res.result.data
				this.isLoad=false
			}).catch((err) => {
				uni.showModal({
					content: `操作失败：${err.message}`,
					showCancel: false
				})
			})
		},
		methods:{
			hrefstoreDetail(item) {
				uni.navigateTo({
					url: "/view/storeDetail?item=" + encodeURIComponent(JSON.stringify(item))
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.myUnused{
		background-color: #EEEEEE;
		min-height: 100vh;
		padding-bottom: 10rpx;
	}
</style>
