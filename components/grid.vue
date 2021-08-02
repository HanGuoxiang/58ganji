<template>
	<!-- 分类九宫格-begin -->
	<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
		<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2"  @tap="hrefSort(item)">
			<u-image :src="item.url"></u-image>
			<!-- <view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
				<view class="cu-tag badge" v-if="item.badge!=0">
					<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
				</view>
			</view> -->
			<text>{{item["分类名称"]}}</text>
		</view>
	</view>
	<!-- 分类九宫格-end -->
</template>

<script>
	export default{
		props: {
			gridCol: Number,
			cuIconList:Array
		},
		data(){
			return{
				gridBorder: false,
			}
		},
		methods:{
			hrefSort(item){
				this.$emit("hrefSort",item)
			}
		}
	}
</script>

<style>
	
</style>
