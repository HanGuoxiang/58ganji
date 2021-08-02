<template>
	<!-- 打卡日历页面 -->
	<view class='all'>
		
		<view class="bar">
			<!-- 上一个月 -->
			<view class="previous" @click="handleCalendar(0)">
				<button class="barbtn" v-if="langType=='ch'">上一月</button>
				<button class="barbtn" v-else>Last</button>
			</view>
			<!-- 显示年月 -->
			<view class="date">{{cur_year || "--"}} 年 {{cur_month || "--"}} 月</view>
			<!-- 下一个月 -->
			<view class="next" @click="handleCalendar(1)">
				<button class="barbtn" v-if="langType=='ch'">下一月</button>
				<button class="barbtn" v-else>Next</button>
			</view>
		</view>
		<!-- 显示星期 -->
		<view class="week" v-if="langType=='ch'">
			<view v-for="(item,index) in weeks_ch" :key="index">{{item}}</view>
		</view>
		<view class="week" v-else>
			<view v-for="(item,index) in weeks_en" :key="index">{{item}}</view>
		</view>
		<view  class="myDateTable bg-gradual-Topic">
			<view v-for="(item,j) in days" :key="j" class='dateCell'>
				<view v-if="item.date==undefined||item.date == null" class='cell'>
					<text :decode="true">&nbsp;&nbsp;</text>
				</view>
				<view v-else>
					<!-- 已签到日期 -->
					<view v-if="item.isSign == true" class='cell greenColor bgWhite  '>
						<text>{{item.date}}</text>
					</view>
					<!-- 漏签 -->
					<view @click="clickSignUp(item.date,0)" class="cell redColor bgGray" 
					v-else-if="cur_year<toYear||(cur_year==toYear&&cur_month<toMonth)||(cur_year==toYear&&cur_month==toMonth&&item.date<today)">
						<!-- 小程序不兼容这个 v-else-if="(new Date(cur_year+'-'+cur_month+'-'+item.date))<(new Date())"> -->
						<text>{{item.date}}</text>
					</view>
					<!-- 今日未签到-->
					<view @click="clickSignUp(item.date,1)" class="cell whiteColor bgBlue" v-else-if="item.date==today&&cur_month==toMonth&&cur_year==toYear">
						<text class="text-sm">签到</text>
					</view>
					<!-- 当前日期之后 -->
					<view class="whiteColor cell" v-else>
						<text>{{item.date}}</text>
					</view>
				</view>

			</view>
		</view>
		<!-- <view class="TipArea ">
			Tip:
			<p>打卡成功后需要你<view class="impTip">同步数据给数据库，切换月或重新进入</view>
			页面再向数据库读取记录(不会的建议参考我的Demo,而不是单独下个组件过来瞎折腾)。本地打卡不做任何记录，<view class="impTip">仅仅模拟成功</view>
			</p>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				days: [],
				SignUp: [],
				list: [{
						id: 1,
						image_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599475741266&di=e36d6c01c93320e2ba1504d8357248f4&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg",
						title: "可爱的小猫咪呀",
						text: "小小的猫咪，甚是呆萌，呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌",
						price: "80.00",
						look: "1115",
						tag: ['动物', '可爱'],
						owner: {
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
							name: "王炜爱吃西瓜"
						}
					},
					{
						id: 2,
						image_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599475934834&di=7a37b8d628252c4aced6ed0decba9442&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F43%2F74%2F01300000164151121808741085971.jpg",
						title: "迪士尼动画迪士尼动画之迪士尼动画之迪士尼动画之",
						text: "迪士尼动画之……",
						price: "80.00",
						look: "1115",
						tag: ['动物', '可爱'],
						owner: {
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
							name: "王炜爱吃西瓜"
						}
					},
					{
						id: 3,
						image_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476083909&di=a5debff35edec5de105bc105d6fdbce3&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F77%2F77%2F01300000336597125202779973172.jpg",
						title: "火箭",
						text: "火箭升空瞬间，宏伟壮观啊",
						price: "80.00",
						look: "1115",
						tag: ['动物', '可爱'],
						owner: {
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
							name: "王炜爱吃西瓜"
						}
					},
					{
						id: 5,
						image_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476129760&di=7a3db0b14f6a74240bbfa7922ba22f45&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F82%2F55%2F01300000349330124003555691086.jpg",
						title: "华佗",
						text: "华佗人物画像 中国画 线条画 毛笔画 彩色画",
						price: "80.00",
						look: "1115",
						tag: ['动物', '可爱'],
						owner: {
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
							name: "王炜爱吃西瓜"
						}
					},
					{
						id: 6,
						image_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476215687&di=97c2bbf6f3a1a3e2a6a2dc77dfe4bea7&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F72%2F82%2F19300000009075130804824786610.jpg",
						title: "恐龙",
						text: "恐龙来啦",
						price: "80.00",
						look: "1115",
						tag: ['动物', '可爱'],
						owner: {
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
							name: "王炜爱吃西瓜"
						}
					},
					{
						id: 7,
						image_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476258176&di=29622b0f0cfd659aecebabaae352d02c&imgtype=0&src=http%3A%2F%2F1882.img.pp.sohu.com.cn%2Fimages%2Fblog%2F2011%2F3%2F25%2F13%2F13%2Fu48513077_12fa4ba953ag213.jpg",
						title: "手",
						text: "什么？",
						price: "80.00",
						look: "1115",
						tag: ['动物', '可爱'],
						owner: {
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
							name: "王炜爱吃西瓜"
						}
					},
					{
						id: 8,
						image_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476300222&di=49712f992d8f7bbb1a5851eced71cbe2&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F71%2F56%2F16300000988660128426569668958.jpg",
						title: "百年好合",
						text: "百年好合 结婚 庚帖 二次元",
						price: "80.00",
						look: "1115",
						tag: ['动物', '可爱'],
						owner: {
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
							name: "王炜爱吃西瓜"
						}
					},
					{
						id: 9,
						image_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476416001&di=ea1a1f8f9b1274d39c05af3e48041e6a&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F12420002963%2F641",
						title: "5G",
						text: "5G 来啦",
						price: "80.00",
						look: "1115",
						tag: ['动物', '可爱'],
						owner: {
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
							name: "王炜爱吃西瓜"
						}
					},
					{
						id: 10,
						image_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476497015&di=2dfa9a6ec465d7330bc0b4433d63cd9e&imgtype=0&src=http%3A%2F%2Fimgo.zjjjtg.com%2Fimg2020%2F9%2F4%2F10%2F2020090410315179234.jpg",
						title: "LEVEL 2",
						text: "LEVEL 2",
						price: "80.00",
						look: "1115",
						tag: ['动物', '可爱'],
						owner: {
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
							name: "王炜爱吃西瓜"
						}
					},
					{
						id: 12,
						image_url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599476567983&di=040976a1cd1a6e5510a237c57bdcff06&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F12421051168%2F641",
						title: "王者荣耀",
						text: "王者荣耀 龙 快来打龙 请求集合",
						price: "80.00",
						look: "1115",
						tag: ['动物', '可爱'],
						owner: {
							avatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
							name: "王炜爱吃西瓜"
						}
					},
				],
				cur_year: 0, //当前选的年
				cur_month: 0, //当前选的月
				today: parseInt(new Date().getDate()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				toYear: parseInt(new Date().getFullYear()), //本年
				weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
				weeks_en: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
			};
		},
		props: {
			sendYear: {
				type: Number,
				default: new Date().getFullYear()
			},
			sendMonth: {
				type: Number,
				default: new Date().getMonth() + 1
			},
			dataSource: { //已签到的数据源
				type: Array,
				default: () => {
					return []
				}
			},
			langType: { //只是示例一个翻译而已，要想所有都翻译自己可以再加加
				type: String,
				default: "ch"
			},
		},
		created() {
			this.cur_year = this.sendYear;
			this.cur_month = this.sendMonth;
			this.SignUp = this.dataSource;

			this.calculateEmptyGrids(this.cur_year, this.cur_month);
			this.calculateDays(this.cur_year, this.cur_month);
			this.onJudgeSign();
		},
		watch: {
			dataSource: 'onResChange',
		},
		methods: {
			// 获取当月共多少天
			getThisMonthDays(year, month) {
				return new Date(year, month, 0).getDate()
			},
			// 获取当月第一天星期几
			getFirstDayOfWeek(year, month) {
				return new Date(Date.UTC(year, month - 1, 1)).getDay();
			},
			// 计算当月1号前空了几个格子，把它填充在days数组的前面
			calculateEmptyGrids(year, month) {
				//计算每个月时要清零
				this.days = [];
				const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
				if (firstDayOfWeek > 0) {
					for (let i = 0; i < firstDayOfWeek; i++) {
						var obj = {
							date: null,
							isSign: false
						}
						this.days.push(obj);
					}
				}
			},

			// 绘制当月天数占的格子，并把它放到days数组中
			calculateDays(year, month) {

				const thisMonthDays = this.getThisMonthDays(year, month);
				// this.columnsLen=Math.ceil(thisMonthDays/7);
				// console.log(this.columnsLen);
				for (let i = 1; i <= thisMonthDays; i++) {
					var obj = {
						date: i,
						isSign: false
					}
					this.days.push(obj);
				}
				//console.log(this.days);

			},

			onResChange(newD, oldD) {
				this.SignUp = newD;
				this.onJudgeSign();
			},
			//匹配判断当月与当月哪些日子签到打卡
			onJudgeSign() {
				var signs = this.SignUp;
				var daysArr = this.days;
				for (var i = 0; i < signs.length; i++) {
					var current = new Date(signs[i].replace(/-/g, "/"));
					var year = current.getFullYear();
					var month = current.getMonth() + 1;
					var day = current.getDate();
					day = parseInt(day);
					for (var j = 0; j < daysArr.length; j++) {
						//年月日相同则打卡成功   						
						if (year == this.cur_year && month == this.cur_month && daysArr[j].date == day) { //&& signs[i].isSign == "今日已打卡"
							// console.log(daysArr[j].date, day);
							daysArr[j].isSign = true;
						}
					}
				}
				this.days = daysArr;
			},

			// 切换控制年月，上一个月，下一个月
			handleCalendar(type) {
				const cur_year = parseInt(this.cur_year);
				const cur_month = parseInt(this.cur_month);
				var newMonth;
				var newYear = cur_year;
				if (type === 0) { //上个月
					newMonth = cur_month - 1;
					if (newMonth < 1) {
						newYear = cur_year - 1;
						newMonth = 12;
					}
				} else {
					newMonth = cur_month + 1;
					if (newMonth > 12) {
						newYear = cur_year + 1;
						newMonth = 1;
					}
				}
				this.calculateEmptyGrids(newYear, newMonth);
				this.calculateDays(newYear, newMonth);

				this.cur_year = newYear;
				this.cur_month = newMonth;

				this.SignUp = []; //先清空
				this.$emit('dateChange', this.cur_year+"-"+this.cur_month); //传给调用模板页面去拿新数据				
			},

			clickSignUp(date, type) { //type=0补签，type=1当日签到		
			
				var str = "签到";
				if (type == 0) {//如果不需要补签功能直接在这阻止不执行后面的代码就行。
					str = "补签";
				}
				uni.showToast({
					title: str + "成功" + date + "号",
					icon: 'success',
					duration: 2000
				});
				// this.SignUp.push(this.cur_year + "-" + this.cur_month + "-" + date); //自动加假数据，写了接口就不用了
				
				// console.log(this.SignUp);
				// this.$forceUpdate();
				
				this.$emit('clickChange', this.cur_year + "-" + this.cur_month + "-" + date); //传给调用模板页面

				//refresh
				this.onJudgeSign();

			}
		}
	}
</script>

<style>
	

	.all {
		margin-top: 20rpx;
	}

	.all .bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 30rpx 20rpx;
		padding: 10rpx;
	}

	.bar .barbtn {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
	}

	.all .week {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		margin: 20rpx;
		border-radius: 10px;
		background-color: #fff;
	}
	.myDateTable {
		margin: 2.5vw;
		padding: 2vw;
		border-radius: 10px;
		/* background: linear-gradient(#74AADA, #94db98); */
	}
	.myDateTable .dateCell {
			/* width: 11vw; */
			padding: 1vw;
			display: inline-block;
			text-align: center;
			font-size: 16px;
		}

	.dateCell .cell {
			display: flex;
			border-radius: 50%;
			height: 10vw;
			width: 10vw;
			justify-content: center;
			align-items: center;
		}
	

	.whiteColor {
		color: #fff;
	}

	.greenColor {
		color: #01b90b;
		font-weight: bold;
	}

	.bgWhite {
		background-color: #fff;
	}

	.bgGray {
		background-color: rgba(255, 255, 255, 0.42);
	}

	.bgBlue {
		font-size: 14px;
		background-color: #4b95e6;
	}

	.redColor {
		color: #ff0000;
	}
	
	.TipArea{
		word-break:break-all;
		word-wrap:break-word;
		
		font-size: 14px;
		padding: 10px;
	}
	.impTip{
		display: inline-block;
		color: #ff0000;
	}
</style>
