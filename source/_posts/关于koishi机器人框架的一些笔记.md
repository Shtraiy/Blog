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