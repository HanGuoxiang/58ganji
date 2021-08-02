# 58ganji
### 类似 58 赶集分类信息平台+兴趣圈子论坛+信息发布置顶佣金+社区论坛房产招聘二手多商户入驻商城

类似 58 同城赶集网的平台，通过信息发布、置顶、刷新+广告等收费商业模式进行变现，

其中类目可以自定义，每个类目下信息的属性也可以自定义，可以涵盖大部分行业，包括不限于招聘、房产租房买房、拼车、生活服务等

也可以应用其它多种平台场景，多商户商城平台，供应需求物料信息对接平台等。

### 演示

小程序演示

![](https://local.softmarket.cn/images/preview/previewwx.jpg)

h5演示

![](https://local.softmarket.cn/h5/images/qrpreview.png)

App演示

![](https://local.softmarket.cn/adownload/appdownloadqr.png)

### 部署指南

一、部署小程序 app 前端

1.替换源码里 host 域名，换成自己服务器的 ip 或者域名地址，
修改路径 modules/bll.js/
function getHost()
{
return 'https://local.softmarket.cn/';
} 2.替换 manifest.json 里的各种权限 appid 和 appkey
微信小程序 appid、高德定位 appkey、Oauth 登录微信 appid、微信支付 appid、微信分享 share 的 appid 等

二、部署管理后台

**服务器端需要购买后协助部署，**

支持多种系统Linux、macOS、Windows等



三、后续支持维护升级

此项目会长期进行维护，包括升级、优化、扩展新功能，大可放心使用。



如有问题请加我微信V咨询： 18953671207
