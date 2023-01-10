---
title: yay助手
tags:
  - Linux
  - 系统
  - 折腾
categories:
  - 技术
abbrlink: b0bb
date: 2022-07-25 19:29:02
---
# yay是ArchLinux下的AUR(Arch用户软件仓库)助手，能让我们更方便的下载和安装AUR上的软件包

---

### 首先是安装前配置

编辑ArchLinuxcn源

```
sudo vim /etc/pacman.conf
```

将其中[multilib]和其下面一行的注释#删掉

```
[multilib]
Include = /etc/pacman.d/mirrorlist
```

然后添加

```
[archlinuxcn]
```

在其下面添加cn源

这里以清华源为例

```
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

添加完后记得同步数据库

```
sudo pacman -Syyus
```

然后为cn源下载密钥

```
sudo pacman -S archlinuxcn-keyring
```

如果报错尝试以下指令

```
sudo pacman-key --init
sudo pacman-key --populate archlinux
sudo pacman-key --populate archlinuxcn
```

配置结束即可进行下一步

---

### 安装yay助手

输入

```
sudo pacman -S yay
```

静待安装

---

### 接下来测试yay助手，利用yay助手从AUR下载软件包

##### 安装网易云音乐

```
yay -S netease-cloud-music
```

需要注意的是尽量避免在root下运行yay

##### 安装chrome

```
yay -S google-chrome
```

剩下的可以自己摸索，本篇旨在配置yay软件助手