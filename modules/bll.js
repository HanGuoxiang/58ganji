import c from 'modules/common.js'

export default{
	uploadFilesWithParam,
	getHttpWithLocation,
	getHttpWithParam,
	uploadFiles,
	getAppUsingCity,
	setAppUsingCity,
	checkCurCityOK,
	openBannerPage,
	openPublishPage,
	// openPublishPageErShou,
	payForOrder,
	payForOrderNoWallet,
	openChatPage,
	// openChatPageWithChatID,
	// openChatPageWithToUserEncryptID,
	webSocketSendMessagePrivate,
	webSocketSendMessageAll,
	getUserInfo,
	//订单
	confirmReceiveGood,
	loginWx,
	loginAuto,
	login,  
	getHost,
	getHostFile,
	share,
}

function payForOrder(orderid,callback)
{
	payForOrderWithTitle(["微信","余额"],orderid,callback);
}
function payForOrderNoWallet(orderid,callback)
{
	payForOrderWithTitle(["微信"],orderid,callback);
} 
//打开下单
//1-成功 0-失败
function payForOrderWithTitle(titlelist,orderid,callback)
{
	c.showActionSheet(titlelist,(clickIndex)=>{
									 if(clickIndex==1)//余额
									 {
										 //如果是余额，则进行余额支付
										 // let url=getHost()+"/A接口/DataHandler.ashx?action=order_walletpay&db=ShopSale3009&orderid="+orderid;
										 				
										 // getHttpWithLocation(url,(data)=>{
										getHttpWithParam("action=order_walletpay&db=ShopSale3009&orderid="+orderid,(data)=>{
										 	 // console.log('data'+data+JSON.stringify(data));
										 	 if(data.Status==1)
										 	 {
												if(callback)
												{
													callback(1);}
													c.show("支付成功");
												 }
												 else
												 {
													 if(callback)
													 {callback(0);}
												 }
												 });
									 }
									 else if(clickIndex==0)//微信支付
									 {
										 if(c.isPlatformWeiXin()||c.isPlatformH5())
										 {
											 // let url="action=wxpaymetaxiaochengxu&orderid="+orderid;
											  let url="action=wxpaymeta&orderid="+orderid;
											 				
											  getHttpWithParam(url,(data)=>{
											 	 // console.log('data'+data+JSON.stringify(data));
											 	 if(data.Status==1)
											 	 {
											 		 let payData=data.Data;
											 		 let orderInfo={
											 				"appid": payData.appid+"",  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
											 				"noncestr": payData.noncestr+"", // 随机字符串
											 				"package": payData.package+"",        // 固定值
											 				"partnerid": payData.partnerid+"",      // 微信支付商户号
											 				"prepayid": payData.prepayid+"", // 统一下单订单号 
											 				"timestamp": payData.timestamp+"",        // 时间戳（单位：秒）
											 				"sign": payData.sign+"" // 签名，这里用的 MD5 签名
											 			}; 
											 			console.log('orderInfo===<'+JSON.stringify(orderInfo));
														
														uni.requestPayment({
															provider: 'wxpay',
														    timeStamp: String(Date.now()),
														    nonceStr: 'A1B2C3D4E5',
														    package: 'prepay_id=wx20180101abcdefg',
														    signType: 'MD5',
														    paySign: '',
														   success(res) {
														   	c.show("支付成功");  
														   	if(callback)
														   	{callback(1);}
														   },
														   fail(e) {
														   	console.log("微信支付=========》"+JSON.stringify(e))
														   	c.show("支付失败"+JSON.stringify(e));
														   	if(callback)
														   	{callback(0);}
															}
														   });
															
											 		}	 
											 							
													});
											 			
											 }
											 else if(c.isPlatformApp())
											 {
											 let url="action=wxpaymeta&orderid="+orderid;
															
											 getHttpWithParam(url,(data)=>{
												 // console.log('data'+data+JSON.stringify(data));
												 if(data.Status==1)
												 {
													 /*
													 可用于测试打包，不要用于正式发布，其信息如下：
													 MD5: 06:83:8C:C8:40:09:3B:9D:46:89:FC:41:9B:A1:A3:F3
													  SHA1: 97:C8:41:01:B9:14:1C:13:0D:D7:5D:74:28:A2:92:25:18:C3:6D:CD
													  SHA256: B0:1D:06:18:0D:00:3E:79:C7:B9:08:89:93:B8:E5:AE:7A:19:B0:DA:11:61:AA:09:7C:7F:39:8A:6F:51:4F:A7
													 应用签名: 06838c40093b9d4689fc419ba1a3f3 
													 */
													 let payData=data.Data;
													 let orderInfo={
															"appid": payData.appid+"",  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
															"noncestr": payData.noncestr+"", // 随机字符串
															"package": payData.package+"",        // 固定值
															"partnerid": payData.partnerid+"",      // 微信支付商户号
															"prepayid": payData.prepayid+"", // 统一下单订单号 
															"timestamp": payData.timestamp+"",        // 时间戳（单位：秒）
															"sign": payData.sign+"" // 签名，这里用的 MD5 签名
														}; 
														console.log('orderInfo===<'+JSON.stringify(orderInfo));
														 
														
													uni.requestPayment({
														
														"provider": "wxpay", 
														"orderInfo":orderInfo,
														success(res) {
															c.show("支付成功");  
															if(callback)
															{callback(1);}
														},
														fail(e) {
															console.log("微信支付=========》"+JSON.stringify(e))
															c.show("支付失败"+JSON.stringify(e));
															if(callback)
															{callback(0);}
														}
													})
													}
										
											});
										}
									 }
									 else  if(clickIndex==1)
									 {}
	});
}

 import uniShare from 'uni_modules/uni-share/js_sdk/uni-share.js';
 function share(url,title,content,imageUrl)
 {
	 if(c.isPlatformH5())
	 {}
	 else if(c.isPlatformApp())
	 {
	            uniShare({
	                content: { //公共的分享参数配置  类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
	                    type: 0,
	                    href: url,
	                    "title": title,
	                    "summary": content,
	                    "imageUrl": imageUrl
	                },
	                menus: [{
	                        "img": "/static/app-plus/sharemenu/wechatfriend.png",
	                        "text": "微信好友",
	                        "share": { //当前项的分享参数配置。可覆盖公共的配置如下：分享到微信小程序，配置了type=5
	                            "provider": "weixin",
	                            "scene": "WXSceneSession"
	                        }
	                    },
	                    {
	                        "img": "/static/app-plus/sharemenu/wechatmoments.png",
	                        "text": "微信朋友圈",
	                        "share": {
	                            "provider": "weixin",
	                            "scene": "WXSenceTimeline"
	                        }
	                    },
	                    {
	                        "img": "/static/app-plus/sharemenu/mp_weixin.png",
	                        "text": "微信小程序",
	                        "share": {
	                            provider: "weixin",
	                            scene: "WXSceneSession",
	                            type: 5,
	                            miniProgram: {
	                                id: '123',
	                                path: '/pages/list/detail',
	                                webUrl: '/#/pages/list/detail',
	                                type: 0
	                            },
	                        }
	                    },
	                    // {
	                    //     "img": "/static/app-plus/sharemenu/weibo.png",
	                    //     "text": "微博",
	                    //     "share": {
	                    //         "provider": "sinaweibo"
	                    //     }
	                    // },
	                    // {
	                    //     "img": "/static/app-plus/sharemenu/qq.png",
	                    //     "text": "QQ",
	                    //     "share": {
	                    //         "provider": "qq"
	                    //     }
	                    // },
	                    {
	                        "img": "/static/app-plus/sharemenu/copyurl.png",
	                        "text": "复制",
	                        "share": "copyurl"
	                    },
	                    {
	                        "img": "/static/app-plus/sharemenu/more.png",
	                        "text": "更多",
	                        "share": "shareSystem"
	                    }
	                ],
	                cancelText: "取消分享",
	            }, e => { //callback
	                console.log(e);
	            })
	 		   }
 }
function getHost()
{
	//需要后端数据库部署或者二次开发，请咨询微信：18953671207
	return 'https://local.softmarket.cn/';
}

function getHostFile()
{
	return getHost()+"UploadFiles/";
}

function getUserInfo(callback)
{
	let loginedUser=c.getUser(true);
	if(!loginedUser)
	{
		return;
		}
	
	c.loading();
		getHttpWithParam("action=userinfo&queryuserencrptid="+loginedUser.EncryptID,(data)=>{
			 // console.log('data'+data+JSON.stringify(data));
			 
			 // this.swiperList=data.Data.TopBanner;
			  if(data.Status==1)
			  {
			  let tmpItem=data.Data;
			  tmpItem.url=getHostFile()+tmpItem.头像;
			  c.saveUserLogin(tmpItem);
			
					c.hideLoading();
					if(callback)
					{callback(tmpItem);}
						}
						else
						{
							c.logout();
						}
						// uni.stopPullDownRefresh()
		});
}


function loginAuto(callback)
{ 
let loginedUser=	c.getUser(true);
if(loginedUser)
{
	if(loginedUser.LoginType==1)//微信登录
	{
		loginWx(loginedUser.wxopenid);
	}
	else{
		login(loginedUser.手机号,loginedUser.登录密码,callback);
	}
}
}
//默认手机号密码登录 
function login(phone,pwd,callback)
{
	getHttpWithParam("action=login&phone="+phone+"&password="+pwd,
		(data,error)=>{ 
		// c.show(data.Status)
		if(callback)
		{callback(data);}
		if(data.Status==1)
		{
			c.saveUserLogin(data.Data);
			
			c.startWebSocketService();
			
			
		}
		});
}

function loginWx(pram,callback)
{
	getHttpWithParam("action=login&logintype=1&phone="+this.phoneData+"&password="+this.passData
	+"&wxopenid="+pram.openid+"&name="+pram.nickname+"&sex="+pram.sex+"&headimgurl="+pram.headimgurl+"&province"+pram.province+"&city="+pram.city,
		(data,error)=>{ 
		// c.show(data.Status)
		if(callback)
		{callback(data);}
		
		if(data.Status==1)
		{
			let serverUserItem=data.Data;
			serverUserItem.LoginType=1;//微信登录
			c.saveUserLogin(serverUserItem);
			
			c.startWebSocketService();
				
		}
		});
		
}
//订单详情页，其他页面的 付款、发货同一个按钮的操作
//userIdentity  0-买家  1-卖家
// function orderProcessClick(curItem,userIdentity)
// {
//  if(curItem.订单状态==10224)//待支付
// 				 {
// 					if(userIdentity==0)//买家
// 					{	 b.payForOrder(curItem.ID);}
// 					else
// 					{}
// 				 }
// 				else  if(curItem.订单状态==10225)//待发货
// 				{
// 					if(userIdentity==0)//买家,等待发货
// 					{}
// 					else//卖家发货
// 					{
// 						let item={};
// 						item.OrderID=curItem.ID;
// 						c.openPage("orderSendGood",item);
// 					}
					
// 				}
// 				else  if(curItem.订单状态==10226)//已发货
// 				{
// 					if(userIdentity==0)//买家  确认收货
// 					{
// 						b.confirmReceiveGood(curItem,()=>{
// 							this.reloadByID();
// 						});
// 					}
// 					else//卖家 等待收货
// 					{}
// 				}
// 				else  if(curItem.订单状态==10227)//已完成
// 				{
					
// 				}
// 				else  if(curItem.订单状态==10228)//售后中
// 				{
					
// 				}	
// }
//确认收货
function confirmReceiveGood(curItem,callback)
{
	c.confirm("确定收货？",(clickIndex)=>{
		if(clickIndex==1)//确定
		{
			c.loading();
			getHttpWithParam("action=order_confirmreceive&db=本地圈儿1004"
			+"&orderid="+curItem.ID,(data)=>{
				 // console.log('data'+data+JSON.stringify(data));
				 if(data.Status==1)
				 {
					 c.show('确认收货成功');
					
					if(callback)
					{callback();}
				 }
				 c.hideLoading();
				 });
		}
	});
}

function webSocketSendMessagePrivate(msg,touserid)
{
	let loginedUser=c.getUser();
	if(c.isNull(loginedUser))
	{
		console.log("webSocketSendMessagePrivate===>请先登录");
		return;}
	let item={};
	item.command="1";
	item.userid=loginedUser.ID;
	item.touserid=touserid;
	item.extra=msg;
	c.webSocketSendMessage(JSON.stringify(item));
}


function webSocketSendMessageAll(msg)
{
	let loginedUser=c.getUser();
	if(c.isNull(loginedUser))
	{
		console.log("webSocketSendMessagePrivate===>请先登录");
		return;}
	let item={};
	item.command="0";
	item.userid=loginedUser.ID;
	item.extra=msg;
	c.webSocketSendMessage(JSON.stringify(item));
}


// static var userPhotoUrlDict={};
function getUserPhotoUrlByUserEncryptID(userEncryptID,callback)
{
	let userPhotoUrl=$userPhotoUrlDict[userEncryptID];
	if(!c.isNull(userPhotoUrl))
	{return userEncryptID;}
	
	b.getHttpWithParam("action=messagelist&db=本地圈儿1004&ordertype=10000&pageindex=0&pagesize=50&"
	+"&queryuserencryptid="+userEncryptID,(data)=>{
		if(data.Status==1)
		{
			if(callback)
			{callback(data.Data);}
		}
		
		});
}


function chooseCity(callback)
{
	c.openPage('../../view/chooseCity');
	// uni.$once("chooseCityFinished",function(data){
		uni.$once("chooseCityFinished",(data)=>{
		// console.log('asdf'+data);
		// c.show('asds'+data);
		//根据汉字 城市名字 得到省份等详细信息
	getHttpWithParam("action=getlocationbycity&city="+data,(data)=>{
		
	});
		
	});
}
// //打开下单
// //1-成功 0-失败
// function payForOrder(orderid,callback)
// {
// 	c.showActionSheet(["微信","支付宝","余额"],(clickIndex)=>{
// 									 if(clickIndex==2)//余额
// 									 {
// 										 //如果是余额，则进行余额支付
// 										 let url="https://local.softmarket.cn/A接口/DataHandler.ashx?action=order_walletpay&db=本地圈儿1004&orderid="+orderid;
										 				
// 										 getHttpWithLocation(url,(data)=>{
// 										 	 // console.log('data'+data+JSON.stringify(data));
// 										 	 if(data.Status==1)
// 										 	 {
// 										 									 c.show("支付成功");
// 										 									 }
// 																			 });
// 									 }
// 									 else if(clickIndex==0)//微信支付
// 									 {
// 										 let url="https://local.softmarket.cn/A接口/DataHandler.ashx?action=wxpaymeta&db=本地圈儿1004&orderid="+orderid;
										 				
// 										 getHttpWithLocation(url,(data)=>{
// 										 	 // console.log('data'+data+JSON.stringify(data));
// 										 	 if(data.Status==1)
// 										 	 {
// 												 /*
// 												 可用于测试打包，不要用于正式发布，其信息如下：
// 												 MD5: 06:83:8C:C8:40:09:3B:9D:46:89:FC:41:9B:A1:A3:F3
// 												  SHA1: 97:C8:41:01:B9:14:1C:13:0D:D7:5D:74:28:A2:92:25:18:C3:6D:CD
// 												  SHA256: B0:1D:06:18:0D:00:3E:79:C7:B9:08:89:93:B8:E5:AE:7A:19:B0:DA:11:61:AA:09:7C:7F:39:8A:6F:51:4F:A7
// 												 应用签名: 06838c40093b9d4689fc419ba1a3f3 
// 												 */
// 												 let payData=data.Data;
// 												 let orderInfo={
// 														"appid": payData.appid+"",  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
// 														"noncestr": payData.noncestr+"", // 随机字符串
// 														"package": payData.package+"",        // 固定值
// 														"partnerid": payData.partnerid+"",      // 微信支付商户号
// 														"prepayid": payData.prepayid+"", // 统一下单订单号 
// 														"timestamp": payData.timestamp+"",        // 时间戳（单位：秒）
// 														"sign": payData.sign+"" // 签名，这里用的 MD5 签名
// 													}; 
// 													console.log('orderInfo===<'+JSON.stringify(orderInfo));
													 
// 													//  plus.payment.getChannels(function(channels){  
// 													//        let  channel=channels[0]; 
// 													// 	   // alert('asdf');
// 													// 		// plus.nativeUI.alert(JSON.stringify(channels[0])+"asd");
															
															
// 													// 		plus.payment.request(channel,JSON.stringify(orderInfo),function(result){
// 													// 		                   plus.nativeUI.alert("支付成功！",function(){  
// 													// 		                       back();  
// 													// 		                   });  
// 													// 		               },function(error){  
// 													// 		                   plus.nativeUI.alert("支付失败：" + error.code);  
// 													// 		               });  
																																
// 													//     },function(e){  
// 													//         plus.nativeUI.alert("获取支付通道失败："+e.message);  
// 													//     }); 
														
													  
// 												uni.requestPayment({
													
// 													"provider": "wxpay", 
// 													"orderInfo":orderInfo,
// 													success(res) {
// 														c.show("支付成功");  
// 														if(callback)
// 														{callback(1);}
// 													},
// 													fail(e) {
// 														console.log("微信支付=========》"+JSON.stringify(e))
// 														c.show("支付失败"+JSON.stringify(e));
// 														if(callback)
// 														{callback(0);}
// 													}
// 												})
// 										}
// 										});
// 									 }
// 									 else  if(clickIndex==1)
// 									 {}
// 	});
// }
// //打开信息模块
// function openPublishPage(item,type)
// {
// 	let textlist=['免费发布服务','发布悬赏'];
// 	openPublishPage(item,textlist,type);
// }

// //跳转二手模块
// function openPublishPageErShou(item,type)
// {
// 	let textlist=['免费发布二手信息','我要收购二手物品'];
// 	openPublishPage(item,textlist,type);
// }
 
 // function openChatPageWithChatID(chatID,chatType)
 // {
	 
	//  let item={};
	//  item.TargetID=chatID;
	//  item.ChatRoomType="1";//群聊
	//  	c.openPage('../chat/chatlist',item);
 // }
 // function openChatPageWithToUserID(userID,chatType)
 // {
 // 	let loginedUser=c.getUser(true);
 // 	if(!loginedUser)
 // 	{
 // 		return;}
 	
 // 	if(loginedUser.ID==userID)
 // 	{
 // 		 c.show('不能跟自己聊天');
 // 		 return;
 // 	}
	// let item={};
	// item.TargetID=userID;
	// item.ChatRoomType="0";//私聊
	// 	c.openPage('../chat/chatlist',item);
		
 	
 // }
 
 //创建聊天室，然后进去聊天界面
 //targetID chatid或者用户的encryptid
 //chatType  0默认私聊，  其他聊天室、群聊等
function openChatPage(targetID,chatType)
{
	let loginedUser=c.getUser(true);
	if(!loginedUser)
	{
		return;}
	
	//默认私聊
	if(c.isNull(chatType))
	{chatType="0"}
	
	if(chatType=="0")
	{
		if(loginedUser.ID==targetID)
		{
		 c.show('不能跟自己聊天');
		 return;
		 }
	}
	
	
	let item={};
	item.TargetID=targetID;
	item.ChatType=chatType;//私聊
		c.openPage('/pageschat/chatlist',item);
		
	
	
}
//打开发布页面，
//type==1不用选择发布类型，直接发布寻人帮忙任务
//其他type默认弹窗选择发布类型（发布服务 or 寻人帮忙）
function openPublishPage(item,type)
{
	let textlist=['发布服务','发布需求'];
	if(type=="1")//不用选择发布类型，直接发布寻人帮忙任务
	{
		item.InfoType="10232";//需求信息
		c.openPage('/pagespublish/publishfinished',item);
		// c.openPage('../order/order',item);
	}
	// else if(type=="2")//下订单给某个分类
	// {
	// 	c.openPage('../order/order',item);
	// }
	else  
	{
		c.showActionSheet(textlist,(clickIndex)=>{
			if(clickIndex==0)
			{
					item.InfoType="10231";//服务信息
				c.openPage('/pagespublish/publishfinished',item);
			}
			else{
					item.InfoType="10232";
				c.openPage('/pagespublish/publishfinished',item);
				// c.openPage('../order/order',item);
			}
		});
	}
}


//点击展示位，的逻辑
function openBannerPage(selItem)
{	
	console.log('selItem====>'+JSON.stringify(selItem));
	
		if(selItem.文章跳转类型==10000)//链接
		{
			selItem.type=3;
			selItem.url=selItem.文章跳转目标;
			c.openPage("/pagesarticle/articledetailurl",selItem);
		}
		else if(selItem.文章跳转类型==10001)//文章内容
		{
	
			selItem.type=0;
				// return;
			selItem.url=selItem.文章跳转目标;
			
			c.openPage("/pagesarticle/articledetail",selItem);
		}
		else if(selItem.文章跳转类型==10003)//版块一级分类,话题列表
		{
			var tmpItem=selItem;
			tmpItem.ID=selItem.文章跳转目标;
			c.openPage("pagestopic/topiclist",tmpItem);
			// c.openPage("../topic/topiclist",{Command:10000,selCatalog:tmpItem});
			return;
		}
		else if(selItem.文章跳转类型==10004)//帖子
		{c.openPage("/pagestopic/topicdetail",{ID:selItem.文章跳转目标});
		return;
		}
		else if(selItem.文章跳转类型==10005)//信息分类跳转
		{
			selItem.ID=selItem.文章跳转目标;
			
			 if(selItem.SubCatalogTotalLevelCount==0)//没有子分类，则直接进入列表
			{c.openPage('/pagesinfo/infolist',selItem);}
			else if(selItem.SubCatalogTotalLevelCount==1)//进去一个分类
			{c.openPage('/pagesinfo/infolist',selItem);}
			else if(selItem.SubCatalogTotalLevelCount>=2)//进去一个分类
			{ 
				console.log('+++++++++++++++')
				c.openPage('/pages/index/cataloglist',selItem);
			}
		
			
		return;
		}
		else if(selItem.文章跳转类型==10007)//发布信息跳转
		{
			selItem.ID=selItem.文章跳转目标;
			
			console.log('selItem===>'+JSON.stringify(selItem));
			
			if(selItem.SubCatalogTotalLevelCount==1)
			{
					c.openPage('/pagespublish/publishcatalogone',selItem);//1级分类选择
			}
			else if(selItem.SubCatalogTotalLevelCount>1)
			{
				console.log('==============')
					c.openPage('/pages/index/cataloglist',selItem);//2级分类选择
			}
			else
			{
				openPublishPage(selItem);
					// c.openPage('publishfinished',item);//1级分类选择
			}
		}
	
}

//get请求with定位信息
function getHttpWithParam(paramStr,callback)
{ 
	// console.log('getHttpWithLocation======>start');
	getCommonParamStr(function(data){

		let url=getHost()+"/A接口/DataHandler.ashx?"	+paramStr;		
		url+=data;
		c.get(url,callback);
	});
}
//get请求with定位信息
function getHttpWithLocation(paramStr,callback)
{ 
	// console.log('getHttpWithLocation======>start');
	getCommonParamWithLocationStr(function(data){
				let url=getHost()+"/A接口/DataHandler.ashx?"	+paramStr;		
			url+=data;
		c.get(url,callback);
	});
}
// 上传文件，文件对象{name:"",uri:""}
function uploadFiles(paramStr,files,callback)
{ 
	// console.log('uploadFiles======>start');
	getCommonParamStr(function(data){
			let url=getHost()+"/A接口/DataHandler.ashx?"	;
			url+=paramStr;
			url+=data;
			
		c.uploadFiles(url,files,callback);
	});
} 
function uploadFilesWithParam(postDict,files,callback)
{ 
	// console.log('uploadFiles======>start'); 
	getCommonParamStr(function(data){
		let url=getHost()+"/A接口/DataHandler.ashx?"	;
		url+=data;
		
		c.uploadFilesWithPostDict(url,postDict,files,callback);
	});
}

//得到网络请求的公共参数,不包含location
function getCommonParamStr(callback)
{
		console.log('getCommonParamStr========>start')
	// getAppUsingCity(false,function(addressdata){
			console.log('getCommonParamStr========>end')
		let url="";
			// console.log('getCommonParamStr====>');
		
		
		url+="&client=1&password="+c.getUser(false)["登录密码"]+"&db=本地圈儿1004";
		// console.log('getHttpWithLocation='+c.getUser(false).ID+c.getUser(false));
		url+="&platform=2";
		url+="&userencryptid="+c.getUser(false).EncryptID;
		url+="&userid="+c.getUser(false).ID;
	
		if(callback){callback(url);}
	// });
}

//得到网络请求的公共参数,包含location
function getCommonParamWithLocationStr(callback)
{
		console.log('getCommonParamWithLocationStr========>start')
	getAppUsingCity(false,function(addressdata){
			console.log('getCommonParamWithLocationStr========>end')
			getCommonParamStr((url)=>{
				url+="&city="+addressdata;
					if(callback){callback(url);}
			});
	
	});
}
//检测当前真实城市与使用城市是否一致
function checkCurCityOK(callback)
{
	
	//得到当前app使用的城市
	getAppUsingCity((usingCity)=>{
		//得到真实地址
		getLocationText(function(realCity){ 
			if(realCity!="全国")
			{
				//如果有地址，则检测当前地址是否一致
				if(usingCity!=realCity)
				{
					c.showModel("您当前所在城市是【"+realCity+"】,是否切换？",function(ret){
						if(ret) 
						{
							//如果切换，则录入所在城市
							setAppUsingCity(realCity);
							if(callback)
							{
								callback(realCity);
							}
						}
						else
						{
							if(callback)
							{
								callback(usingCity);
							}
						}
					});
					
				}
			}
		});
	});
}


//得到当前app使用的城市
//如果有使用的城市，则验证是否是与真实城市一致
//如果没有得到城市，则进行地址获取
//isAlertDifferentCity是否进行所在城市不一致提示切换
function getAppUsingCity(isAlertDifferentCity, callback)
{ 
	// console.log('getAppUsingCity====》start');
	 // c.getData('UsingCity',callback);
	c.getData('UsingCity',function(usingCity){
		console.log('getAppUsingCity====》result'+usingCity);
		//有选择过地址则返回
		if(!c.isNull(usingCity))
		{
			if(callback) 
			{
				callback(usingCity);
			}
			if(!isAlertDifferentCity)
			{return;}
			
			getLocationText(function(realCity){
				if(realCity!="全国")
				{
					//如果有地址，则检测当前地址是否一致
					if(usingCity!=realCity)
					{
						c.showModel("您当前所在城市是【"+realCity+"】,是否切换？",function(ret){
							if(ret)
							{
								//如果切换，则录入所在城市
								setAppUsingCity(realCity);
								if(callback)
								{
									callback(realCity);
								}
							}
							else
							{
								// if(callback)
								// {
								// 	callback(usingCity);
								// }
							}
						});
						
					}
				}
			});
			
		}
		else
		{
			//没有设置过地址，则直接请求真实地址
			getLocationText(function(data){
				if(callback)
				{
					callback(data);
				}
			});
		}
		// console.log('123123')
	});
}

//得到定位的文字
function getLocationText(callback)
{
	console.log('getLocationText====>start');
	//获取实际地址
	c.getLocation(function(locationData){
		console.log('getLocationText====>end');
		// console.log("getLocation=====>"+JSON.stringify(localStorage));
		//如果是app等得到了address，则不用进行服务器逆向地理位置
		if(!c.isNull(locationData.address))
		{
			if(callback)
			{
				callback(locationData.address.city);
			}
			return;
		}
		//36.70727&longitude=119.124241
		c.get("https://local.softmarket.cn/A接口/DataHandler.ashx?db=本地圈儿1004&action=regeo&latitude="+locationData.latitude+"&longitude="+locationData.longitude,function(data){
			// getHttpWithParam("action=regeo&latitude="+locationData.latitude+"&longitude="+locationData.longitude,function(data){
				
			if(callback)
			{
				callback(data.Data.City);
			}
			
			
		});
	
	});
}

//设置app使用的所在城市
function setAppUsingCity(city,callback)
{
	c.storeData('UsingCity',city,callback);
}