---
title: 关于koishi机器人框架的一些笔记
tags:
  - 技术
  - bot
  - koishi
  - onebot
categories:
  - 笔记
abbrlink: b475
date: 2023-02-04 20:52:54
---
# 最近闲来无事，抽空搞了一下以前废弃的项目

主要内容是利用koishi框架搭建的一个bot

## koishi搭建项目模板

可以实现一些简单的功能~~主要使用的是其他大佬写的轮子~~

下面放一下官方文档

> https://koishi.chat/

下面就记录一下我安装的方式，我是通过创建模板安装的

+ 首先需要安装Node.js(最低 v14，推荐使用 LTS)环境

> https://nodejs.org/en/

![1](https://koishi.chat/manual/nodejs/home-light.webp)

+ 使用包管理器进行项目初始化

新建一个文件夹作为你koishi项目的repo

`
npm init koishi
`

根据提示完成全套初始化流程

然后输入**npm start**启动项目

这样你就成功拥有了一个自己的bot！

接下来可以安装一些官方市场的插件来丰富它的功能

**Onebot插件和go-cqhttp框架的使用**

> OneBot 是一个聊天机器人应用接口标准，目前可用于 QQ 聊天机器人的实现。你可以使用下列实现该协议的框架

[Mrs4s/go-cqhttp](https://github.com/Mrs4s/go-cqhttp)（推荐）
[yyuueexxiinngg/cqhttp-mirai](https://github.com/yyuueexxiinngg/cqhttp-mirai)
[richardchien/coolq-http-api](https://github.com/richardchien/coolq-http-api)（配合 [iTXTech/mirai-native](https://github.com/iTXTech/mirai-native) 使用）

这里我用的是go-cqhttp，本文后续部分仅介绍go-cqhttp的使用方法

### 选择onebot的通信方式、

根据官方文档，Onebot 协议规定了四种不同的通信方式：

+ 正向 HTTP：OneBot 作为 HTTP 服务端，提供 API 调用服务
+ 反向 HTTP：OneBot 作为 HTTP 客户端，向用户配置的 URL 推送事件，并处理用户返回的响应
+ 正向 WebSocket：OneBot 作为 WebSocket 服务端，接受用户连接，提供 API 调用和事件推送服务
+ 反向 WebSocket：OneBot 作为 WebSocket 客户端，主动连接用户配置的 URL，提供 API 调用和事件推送服务

同时官方文档推荐使用正向 WebSocket，这种通信方式操作简便，且拥有相对较高的性能。在本文的后续部分我们将介绍每一种通信方式的配置方法

首先从下载并解压最新版本的 [go-cqhttp](https://github.com/Mrs4s/go-cqhttp/releases)

解压完成后利用命令行cd进入go-cqhttp的目录
输入```./go-cqhttp```后按照提示选择通信方式

### go-cqhttp配置参考

主要配置官方文档都写着，这里就懒得写了

放一下文档链接 [点击这里](https://koishi.chat/plugins/adapter/onebot.html#go-cqhttp-%E9%85%8D%E7%BD%AE%E5%8F%82%E8%80%83)

### 启用插件

填写完go-cqhttp的配置文件后可以在koishi自动生成的控制台启用adapter-onebot和gocqgttp插件

gocqhttp插件主要作用是每次启用koishi时会创建一个gocqhttp的子进程，这样就不需要每次开机器人都手动运行一遍```./go-cqhttp```了

然后根据提示进行验证就可以让onebot接管你的qq了

