title: 微信分享之后点击不能生成签名（invalid signature）
date: 2015-11-06 16:39:58
tags: 微信
---

最近在做微信分享的功能，微信官方现在要求，如果要调用微信分享的接口，需要通过`appid, appsecret` 生成一个`signature签名`,我这里获取签名的方法是在前端页面里面异步传递当前`url`给`java`来获取：
![获取签名代码](http://7xjl5i.com1.z0.glb.clouddn.com/wxYY图片20151106164818.png?imageView2/2/w/600)

<!-- more -->

后来发现直接点Url进入是可以调用分享接口正常分享的，可以从分享之后的页面点进去却不能分享，错误显示：
![签名错误提示](http://7xjl5i.com1.z0.glb.clouddn.com/wx855310967496113415.png?imageView2/2/w/300)


开始我们以为是签名错误，结果用[签名校验工具](http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign)校验，发现生成的签名并没有问题。而后，我们把分享之后的`url` alert出来，发现微信自己在`url`后面加了一些参数（from=singlemessage&isappinstalled=0）：
![分享之后url](http://7xjl5i.com1.z0.glb.clouddn.com/wx10309671615601412.png?imageView2/2/w/300)

里面有个`&`符号，我这边用的是`get`方法，服务端接收到的`url`会丢失掉`&`后面的字符, 所以导致`url` 不正确，以至于不能生成正确的签名。
知道问题了就简单了，只需要在传递参数之前把这个字符转成编码，像这样：
```
var targetUrl = location.href.split('#')[0];
    targetUrl = targetUrl.replace('&', '%26');
```
就可以了。