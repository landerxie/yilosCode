title: github生成SSH_keys
date: 2015-06-04 15:24:55
tags: git

---

### 第一步：检查电脑里面是否存在SSH keys. 打开 Git Bash 输入：

``` bash
$ ls -al ~/.ssh
# Lists the files in your .ssh directory, if they exist
```
如果存在将看到如下文件：
- id_dsa.pub
- id_ecdsa.pub
- id_ed25519.pub
- id_rsa.pub


<br>
**********
### 第二步： 生成新的SSH key：

1. With Git Bash still open, copy and paste the text below. Make sure you substitute in your GitHub email address.
	``` bash
	$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
	# Creates a new ssh key, using the provided email as a label
	# Generating public/private rsa key pair.
	```

2. We strongly suggest keeping the default settings as they are, so when you're prompted to "Enter a file in which to save the key", just press <b>Enter</b> to continue.
	``` bash
	Enter file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
	```

3. You'll be asked to enter a passphrase(输入密码，无需和github账号相同).
	``` bash
	Enter passphrase (empty for no passphrase): [Type a passphrase]
	# Enter same passphrase again: [Type passphrase again]
	```

4. After you enter a passphrase, you'll be given the fingerprint, or id, of your SSH key. It will look something like this:
	``` bash
	Your identification has been saved in /Users/you/.ssh/id_rsa.
	# Your public key has been saved in /Users/you/.ssh/id_rsa.pub.
	# The key fingerprint is:
	# 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com	
	```

<br>
------------------------------

### 第三步： 添加你的key至ssh-agent：
To configure the [ssh-agent](https://en.wikipedia.org/wiki/Ssh-agent) program to use the SSH key you've generated:

If you have [GitHub for Windows](https://windows.github.com/) installed, you can use it to clone repositories and not deal with SSH keys. It also comes with the Git Bash tool, which is the preferred way of running __git__ commands on Windows.

1. Ensure ssh-agent is enabled:
	- <b>If you are using Git Bash</b>, turn on ssh-agent:
	``` bash
	# start the ssh-agent in the background
	$ ssh-agent -s
	# Agent pid 59566
	```
	ps:(windows)我当时直接运行没有成功，加了__eval__才行,[原因](http://stackoverflow.com/questions/17846529/could-not-open-a-connection-to-your-authentication-agent/4086756#4086756)
	``` bash
	eval `ssh-agent -s`
	```

2. 把你生成的SSH key 添加至 ssh-agent:	
	``` bash
	$ ssh-add ~/.ssh/id_rsa
	```



<br>
------------------------------

### 第四步： Add your SSH key to your account
To configure your GitHub account to use your SSH key:
Copy the SSH key to your clipboard. If your key is named `id_dsa.pub`, `id_ecdsa.pub` or `id_ed25519.pub`, then change the filename below from `id_rsa.pub` to the one that matches your key:	``` bash
	$ clip < ~/.ssh/id_rsa.pub
	# Copies the contents of the id_rsa.pub file to your clipboard
	```

在github账号设置里面找到add ssh key; title随意添写，key复制进去。

<br>
---------------------

### 第五步： Test the connection

To make sure everything is working, you'll now try to SSH into GitHub. When you do this, you will be asked to authenticate this action using your password, which is the SSH key passphrase you created earlier.

1. Open Git Bash and enter:
	``` bash
	$ ssh -T git@github.com
	# Attempts to ssh to GitHub
	```

2. You may see this warning:
	``` bash
	The authenticity of host 'github.com (207.97.227.239)' can't be established.
	# RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
	# Are you sure you want to continue connecting (yes/no)?
	```
	Verify the fingerprint in the message you see matches the following message, then type `yes`:
	``` bash
	Hi username! You've successfully authenticated, but GitHub does not provide shell access.
	```

3. If the username in the message is yours, you've successfully set up your SSH key!

If you receive a message about "access denied," [you can read these instructions for diagnosing the issue](https://help.github.com/articles/error-permission-denied-publickey/).

If you're switching from HTTPS to SSH, you'll now need to update your remote repository URLs. For more information, see [Changing a remote's URL](https://help.github.com/articles/changing-a-remote-s-url/).