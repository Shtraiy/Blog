---
title: 安装N卡驱动
tags:
  - Linux
  - 系统
  - 折腾
categories:
  - 技术
abbrlink: 37c1
date: 2022-07-26 08:17:50
---
# 安装完Arch后我就一直在尝试装N卡驱动

但是虽然Wiki上的安装过程很简单，只有短短几条命令

但安装后我还是出现了很多问题

像是安装后不显示驱动也进不去桌面

亦或者驱动装上了但是进不去桌面

后面经过我的实践，我终于总结出了一点装N卡驱动的经验

下面是官方中文Wiki

> https://wiki.archlinux.org/title/NVIDIA_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)

### 安装

首先安装linux-lts内核

```
yay -S linux-lts
```

然后安装N卡驱动

```
sudo pacman -S nvidia-lts
```

需要注意的是，12代intelCPU可能会遇到系统无法正常启动的问题

这时候需要在引导加载程序中设置内核参数**ibt=off**

下面以我用grub引导为例子

```
sudo vim /etc/default/grub
```

找到LINUX_DEFAULT，并在后面添加ibt=off

保存退出后重新加载grub文件

```
sudo grub-mkconfig -o /etc/grub/grub.cfg
```

正常情况下N卡驱动在你pacman后已经安装完成了，这时我们reboot

输入```nvidia-msi```

会显示你显卡驱动的信息，如果没有也请自行上网搜索，实在不行就重装吧，我装N卡驱动少说重装了五遍，已经练出肌肉记忆了

### 安装后配置

##### DRM内核级显示模式设置

在引导程序中添加DRM内核参数

```
sudo vim /etc/default/grub
```

在LINUX_DEFAULT后面添加**nvidia-drm.modeset=1**

保存退出后更新引导文件

```
sudo grub-mkconfig -o /etc/grub/grub.cfg
```
