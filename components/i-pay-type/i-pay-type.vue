<template>
	<view class="i-pay-type">
		<radio-group @change="change">
			<label @click="itemClick(index)"
			 :style="{'borderColor': borderColor}" 
			class="i-pay-item" v-for="(item,index) in datas" :key="index">
				<view class="i-pay-item-left">
					<image :src="item.img" mode="aspectFill"></image>
					<text :style="{'font-size':fontSize+'rpx'}">{{item.name}}</text>
				</view>
				<view class="i-pay-item-right">
					<radio color='#232323' @checked :value="index.toString()" />
				</view>
			</label>
		</radio-group>
	</view>
</template>

<script>
	export default {
		props: {
			fontSize:{
				type :Number,
				default:34
			},
			borderColor:{
				type:String,
				default:'#999999'
			},
			datas: {
				type: Array,
				default: () => [{
					name: '微信',
					id: 'wxpay',
					loading: false,
					img: '../../static/weixin.png',
					
				},{
					name: '支付宝',
					id: 'alipay',
					loading: false,
					img: '../../static/alipay.png',
				},{
					name: '余额',
					id: 'blance',
					loading: false,
					img: '../../static/blance.png'
				} ]
			},
		},
		data() {
			return {}
		},
		methods: {
			change(e) {
					let index= parseInt(e.detail.value)
				this.$emit("change",index, this.datas[index]);
			},
			itemClick(e) {
				this.$emit("itemClick", e, this.datas[e]);
			}

		}
	}
</script>

<style lang="scss">
	.i-pay-type {

		.i-pay-item,
		.i-pay-item .i-pay-item-right,
		.i-pay-item .i-pay-item-left {
			display: flex;
			align-items: center;
		}

		.i-pay-item {
			box-sizing: border-box;
			justify-content: space-between;
			width: 100%;
			height: 80rpx;
			border: #999999 0.5px solid;
			border-radius: 50rpx;
			margin-bottom: 20rpx;

			.i-pay-item-right {}

			.i-pay-item-left {
				padding-left: 5rpx;

				image {
					width: 70rpx;
					height: 70rpx;
				}

				text {
					padding-left: 20rpx;
					font-size: 34rpx;
				}
			}

		}
	}
</style>
