---
title: ArchLinux安装指南
tags:
  - Linux
  - 系统
  - 瞎折腾
categories:
  - 技术
abbrlink: ae4f
date: 2021-01-26 12:23:19
---
# 先前有尝试过用VMware装Archlinux

##### 因为整个系统都是在Cli下一步步引导安装

打算针对只会Windows的完全没接触过GNU/Linux的新手写一个零基础安装教学

内容可能有一些错误，如有发现请即刻私信我

我也是第一次装，如果遇到什么问题可以找我讨论讨论![](/css/1.jpg)

另外，尽管这类教程Google上一搜一大片

但我还是决定把自己装过一次后的经验写下来

方便以后重装的时候复现

##### 所以这个教学不只是针对你们，也是为了我以后能够顺利重装

##### 最后说明，本次教学演示将使用VMware进行，和实机操作可能有出入，大家仅供参考

##### 废话说完了，开始操作

### 安装前准备

#### 首先把官方文档的链接放在下面，有能力的先对照着看

>https://wiki.archlinux.org/index.php/Installation_guide

然后因为我是用VMware安装，所以不需要考虑备份的问题

如果你是实体机安装，请先自行**备份**

备份结束后就可以下载ISO了

>https://www.archlinux.org/download/

进入以后可以选择下载磁力链或种子
![](/css/2.png)

当然我是选择的磁力链，迅雷下载也是比较快的

下载结束后也最好检验一下哈希值，这里就不详细说明怎么检验了

~~因为我也不会~~

准备工作结束后，就可以开始安装了

---

### 安装

##### 关于VMware的创建虚拟机过程就不一一阐述了，接下来只有关于创建完成后的引导操作

另外如果出现这样的界面已经成功了

![另外如果出现这样的界面已经成功了](/css/1.png)

##### 这里选择第一个选项或是等待过后自动进入安装页面

![1](/css/3.png)

### 首先确定自己的引导方式

执行以下命令

```
ls /sys/firmware/efi/efivars
```

执行命令后，如果提示

```
ls: cannot access '/sys/firmware/efi/efivars': No such file or directory
```
说明你是以BIOS方式引导，反之为以EFI方式引导

两种不同的类型安装方式也会略有不同

---

### 下一步是联网

**arch**不能离线安装，需要通过联网来下载相关的包和组件，首先我们需要联网

+ ##### 如果你是有线网，输入以下命令获取IP地址

```
dhcpcd
```
然后再通过ping来判断是否联网，例如：

```
ping www.baidu.com
```

ping通了就说明连上网了

+ ##### 如果你是无线网，就执行以下命令：

```
iwctl
```
![1](/css/4.png)

会进入这个以**iwd**开头的Cli环境中，然后执行

你们都注意到了，我没有无线网卡，因为我是有线网络，因此我决定做一回理论带师

执行

```
station name scan # 使用称为name的网卡进行无线网络扫描
station name get-networks # 使用称为name的网卡列出扫描到的网络
station name connect Name # 使用称为name的网卡连接到Name网络
```

之后按要求输入密码，就能成功连上网了，执行下面命令以退出iwd

```
quit
```
由于我没进行过实际操作，如果有什么疑义可以去下面的文档查找相关解决方法

>https://wiki.archlinux.org/index.php/Wireless_network_configuration

##### 成功连上网后，先更新系统时间

```
timedatectl set-ntp true
```
正常情况下是没什么输出的..如果出现了什么新的情况，我也没什么办法，因为我是正常的

实在不放心的就输入

```
timedatectl status
```

##### 这下应该没问题了，然后进行下一步

---

### 分区

##### 操作前一定要特别注意，一定不要操作失误，一定要清楚自己所做的每一步带来的影响，不然你数据没了，不过我是虚拟机，可以随便试

+ ##### 首先查看目前的分区情况

```
fdisk -l
```

![1](/css/5.png)

可以直观看到我的磁盘`/dev/sda`下是没有分区的

##### 接下来我们创建一个引导分区

执行命令：

```
fdisk /dev/sda # 将sda换成你要进行分区的磁盘
```

接下来就进入了**fdisk**的操作环境，可以输入**m**来查看各命令作用

1. 首先我是一块全新的磁盘：输入**g**创建一个全新的gpt分区表

2. 输入n创建一个新的分区，一直回车默认即可，也可以自行分配

3. 然后输入p来查看新创建的分区

4. 输入w使所有的操作写入磁盘生效

5. 输入以下命令格式化刚刚创建的引导分区

```
mkfs.fat -F32 /dev/sda1 # sda1替换成你创建的分区名字
```
##### 执行完上面操作后引导分区就创建好了

##### 创建一个根分区

1. 首先我是一块全新的磁盘：输入**o**创建一个全新的MBR分区表

2. 输入n创建一个新的分区，一直回车默认即可，也可以自行分配

3. 然后输入p来查看新创建的分区

4. 输入w使所有的操作写入磁盘生效

5. 输入以下命令格式化刚刚创建的根分区

```
mkfs.ext4 /dev/sda1 # sda1替换成你创建的分区名字
```

![1](/css/6.png)

如你所见，现在多出了一块分区/dev/sda1

---

### 挂载

+ ##### 执行以下命令将分区挂载到`/mnt`

输入命令：

```
mount /dev/sda1 /mnt # 将sda1替换成之前创建的根分区
```

+ ##### 如果是EFI/GPT引导方式，执行下列命令挂载到/mnt/boot

```
mkdir /mnt/boot
mount /dev/sda1 /mnt/boot # 将sda1替换成引导分区
```
##### 挂载结束就可以选择镜像了

---

### 选择镜像

根据不同地区选择不同的镜像来加快下载速度

~~硬下也没关系，只不过可能要下到猴年马月~~

执行以下命令来编辑源文件

```
vim /etc/pacman.d/mirrorlist
```

找到标有China的镜像源，剪切到最前面的位置

找不到就直接复制

```
Server = http://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
Server = http://mirrors.zju.edu.cn/archlinux/$repo/os/$arch
```

之后用`:wq`保存并退出即可![1](/css/2.jpg)

---

### 安装基本包

折腾了一堆东西，总算可以开始安装基本包了，本过程需要全程联网~~废话~~

执行以下命令：

```
pacstrap /mnt base base-devel linux linux-firmware dhcpcd
```

##### 重新出现命令提示符说明下载结束了，可以进行下一步操作

---

### 配置Fstab

生成一个Fstab文件通过UUID或者标签进行定义

执行以下命令：

```
genfstab -U /mnt >> /mnt/etc/fstab
```

检查输出的文件`/mnt/etc/fstab`是否正确

```
cat /mnt/etc/fstab
```

没什么好讲的

### Chroot

把Root权限给到新的系统

执行以下命令：

```
arch-chroot /mnt
```

![1](/css/7.png)

##### 像上面这样

---

### 设置时区

输入以下指令：

```
ln -sf /usr/share/zoneinfo/Region/City /etc/localtime # /Region/City改为自己城市和地区，例如/Asia/Shanghai
hwclock --systohc
```

---

### 安装必须软件包

可以通过Archlinux的包管理器**pacman**下载，大部分情况只需要一行命令就帮你搞定依赖和安装的问题

输入以下指令：

```
pacman -S vim dialog wpa_supplicant ntfs-3g networkmanager netctl
```

---

### 设置locale

执行以下命令已编辑/etc/locale.gen文件

```
vim /etc/locale.gen
```

在文件中找到zh_CN.UTF-8 UTF-8和en_US.UTF-8 UTF-8

去掉开头的#号，并:**wq**保存退出

再执行

```
locale-gen
```

打开~~创建~~`/etc/locale.conf`文件

```
vim /etc/locale.conf
```

在文件第一行加入**LANG=en_US.UTF-8**

:**wq**并退出

---

### 设置Root密码

没什么好说的

输入以下命令：

```
passwd
```

按提示确认即可

---

### 安装Intel-ucode(非Intel的CPU的就跳过)

**pacman**安装

```
pacman -S intel-ucode
```

---

### 如果存在其他系统，安装os-prober

执行以下命令：

```
pacman -S os-prober
```

---

### 安装grub进行引导

+ ##### 安装grub：

```
pacman -S grub
```

+ ##### 部署grub：

```
grub-install --target=i386-pc /dev/sda # 将sda换成你的硬盘
```

+ ##### 生成配置文件：

```
grub-mkconfig -o /boot/grub/grub.cfg
```

##### 如果是EFI/GPT引导方式

+ ##### 安装grub和efibootmgr：

```
pacman -S grub efibootmgr
```

+ ##### 部署grub：

```
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=grub
```

+ ##### 生成配置文件：

```
grub-mkconfig -o /boot/grub/grub.cfg
```

如果引导或挂载没什么问题这里应该是正常的~~应该~~

---

### 安装后检查

输入以下指令检查是否成功生成各系统入口：

```
vim /boot/grub/grub.cfg
```

如果没生成其他系统入口，请自行查阅
>https://wiki.archlinux.org/index.php/GRUB/Tips_and_tricks#Combining_the_use_of_UUIDs_and_basic_scripting

vans后就进行下一步

---

### Reboot

##### 一定要先确保所有步骤无误，否则重启后一切努力就会全部木大！

确保无误后先输入`exit`

然后取消挂载

```
umount /mnt
reboot
```

![1](/css/8.png)

如果你成功进入到这里了，恭喜你，你已经完成安装了

---

## 安装后配置

+ ##### 安装gnome图形界面

输入以下指令：

```
pacman -S gnome gnome-extra
```

如果下载失败了，很大程度上是因为你没联网![1](/css/32.png)

+ ##### 安装Xorg

开源图形服务，没有它就不支持桌面环境

执行：

```
sudo pacman -S xorg
```

+ ##### 网络配置

禁用netctl启用NetworkManager~~言简意赅~~

输入：

```
sudo systemctl disable netctl
sudo systemctl enable NetworkManager
```

你也可以安装桌面工具栏来配置网络

```
sudo pacman -S network-manager-applet
```

+ ##### 安装并启用gdm

执行：

```
pacman -S gdm
systemctl enable gdm
systemctl start gdm
```

最后

![1](/css/9.png)

---

## 安装结束

如果在安装过程中你们遇到什么问题可以和我讲，我大家一起探讨

整篇文章有很多写错的地方还请指出斧正

谢谢！
![1](/css/33.png)