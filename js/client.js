(function() {
	var d = document,
		w = window,
		p = parseInt,
		dd = d.documentElement,
		db = d.body,
		dc = d.compatMode == 'CSS1Compat',
		dx = dc ? dd : db,
		ar=new Array(),
		ec = encodeURIComponent;

	//api
	var ip='https://'+baseUrl,
		ws='wss://echo.websocket.org',
		pr1=':3100',
		pr2=':4100',
		uplod=ip+pr1+'/file/uploading',//上传文件
		down=ip+pr2;//下载文件 + 文件id
	
	w.CHAT = {
		msgObj: d.getElementById("message"),
		scrol:d.querySelector('.Bscwrap'),
		msgCont:d.querySelector('.Bcon ul'),
		topm:d.querySelector('.top'),
		ontm:d.querySelector('#onlinecount'),
		botm:d.querySelector('.botm'),
		oTemp:d.createDocumentFragment(),
		username: null,
		userid: null,
		socket: null,
		//让滚动条保持在最低部
		scrollToBottom: function(time, dir){
			setTimeout(function() {
				mscrool(dir ? dir : 'bottom');
			}, time ? time : 0);
			//console.log(mscrool);
		},
		autoHeight:function(){
			this.vih=dd.clientHeight;
			this.toph=CHAT.topm.clientHeight;
			this.onlih=CHAT.ontm.clientHeight;
			this.btmh=CHAT.botm.clientHeight;
			this.chath=this.vih-this.toph-this.btmh-this.onlih-20-60;
			CHAT.scrol.setAttribute('style','height:'+this.chath+'px');
		},
		chrome:function(){
			this.userAgent =navigator.userAgent;
			return true
			if(this.userAgent.indexOf("Chrome")>-1){
				return true;
			}else{
				alert('请使用谷歌浏览器!');
				return false;
			}
		},
		getime:function(){
			return Date.now();
		},
		fileUrl:function(){
			//		  var FileExt=file.replace(/.+\./,"");   //正则表达式获取后缀
			var file = $("#file").val(); //路径
		  	var strFileName=file.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");  //正则表达式获取文件名，不带后缀
			
			$('.filename').html(strFileName);
			console.log(file);
		},
		//退出，本例只是一个简单的刷新
		logout: function() {
			//			this.socket.disconnect();
			//			this.socket.emit('disconnect',{pp:989888})
			location.reload();
		},
		getUuid:function(){//生成uuid方法
		    var s = [];
		    var hexDigits = "0123456789abcdef";
		    for (var i = 0; i < 36; i++) {
		        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		    }
		    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
		    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
		    s[8] = s[13] = s[18] = s[23] = "-";
		
		    var uuid = s.join("");
		    return uuid;
		},
		//提交聊天消息内容
		submit: function() {
			var self = this;
			//开始时间
			var star=CHAT.getime();
			var content = d.getElementById("content").value;
			var fileObj = d.getElementById("file").files[0]; // js 获取文件对象
			var fileUrl=d.getElementById("file").value;
			
			//节流
			$('#chatbox').addClass('disabled');
			
			if(fileObj){
				$('.status').show();//状态
			}
			
			if(fileObj && content){
				fileSend();
				return false;
			}

			if(fileObj){
				fileSend();
				return false;
			}

			if(content) {
				var obj = {
					type: 'txt',
					userid: self.userid,
					username: self.username,
					content: {
						startime:star,
						txt: content
					}
				};
				self.socket.emit('message', obj);
				obj=null;content=null;fileObj=null;
				d.getElementById("content").value = '';
			}
			
			
			//文件 上传
			function fileup(cb){
				var dat=new FormData();
				dat.append('file',fileObj);
				
				$.ajax({
					type:"POST",
					url:uplod,
					data:dat,
					processData:false,	//必须
					contentType: false,   //必须
					dataType: "json",
					success:function(res){
						if(typeof cb =='function')cb(res);
					},
					error:function(err){
						alert('网络错误，请检查网络连接！');
						$('.status').hide();
						$('#chatbox').removeClass('disabled');
					}
				});
			}
			

			//文件 发送
			function fileSend() {
				var maxl=1024*1024*10;//最大缓存 字节  10Mb
				var fileByt=524288000;//500Mb 谷歌浏览器处理极限  超过直接奔溃
				
				//文件是否 大于500Mb
				if(fileObj.size>fileByt){
					//系统检测到 你的文件大于500Mb
					//调用文件服务
					//利用文件服务下载
					
					console.log(fileObj.size);
					fileup(function(res){
						sendDat(res.fileid);
					});
					return false;
				}
				
				CHAT.reader('Buffer', '', fileObj, function(e) {
					var bytst = e.target.result;
					var binary=[];
					
					//根据字节大小  是否分割文件
					if(bytst.byteLength>maxl){
						var ds=Math.ceil(bytst.byteLength/maxl); //向上取整 获取分割多少个文件
						for(var i=0;i<ds;i++){
							/*
							0-1024         1
							1024-2048      2 
							2048-3072      3
							end = 1024*i;
							star= 1024*(i+1);
							
							//最后分割的文件
							end=bytst.byteLength
							
							*/
							if(i!=(ds-1)){
								binary.push(bytst.slice(maxl*i,maxl*(i+1)));
							}else{
								binary.push(bytst.slice(maxl*i,bytst.byteLength));
							}
						}
						sendDat('',binary);
					}else{
						//字节大小未超上限  
						binary.push(bytst);
						sendDat('',binary);
					}
					bytst=null;
					binary=[];
					content=null;
					fileObj=null;
				});
				
				function sendDat(id,binary){
					var obj = {
						type:'filetxt',
						mime:fileObj.type,
						fname:fileObj.name,
						userid:self.userid,
						username:self.username,
						content:{
							startime:star,
							binary: binary,
							fileId:id,
							txt: content,
						}
					};
					self.socket.send(obj);
					obj=null;
					if(content){
						d.getElementById("content").value = '';
					}
					if(fileUrl){
						d.getElementById("file").value='';
						$('.filename').html('');
					}
				}
			}
			return false;
		},
		genUid: function() {
			return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
		},
		//更新系统消息，本例中在用户加入、退出的时候调用
		updateSysMsg: function(o, action) {
			//当前在线用户列表
			var onlineUsers = o.onlineUsers;
			//当前在线人数
			var onlineCount = o.onlineCount;
			//新加入用户的信息
			var user = o.user;

			//更新在线人数
			var userhtml = '';
			var separator = '';
			for(key in onlineUsers) {
				if(onlineUsers.hasOwnProperty(key)){
					userhtml += separator + onlineUsers[key];
					separator = '、';
				}
			}
			d.getElementById("onlinecount").innerHTML = '当前共有 ' + onlineCount + ' 人在线，在线列表：' + userhtml;

			//添加系统消息
			var html = '';
			html += '<div class="msg-system">';
			html += '用户' + user.username;
			html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
			html += '</div>';
			var dv = d.createElement('div');
			dv.className = 'system J-mjrlinkWrap J-cutMsg';
			dv.innerHTML = html;
			this.msgObj.querySelector('.Bcon ul').appendChild(dv);
			this.scrollToBottom();
		},
		//第一个界面用户提交用户名
		usernameSubmit: function(){
			var username = d.getElementById("username").value;
			if(username != "") {
				d.getElementById("username").value = '';
				d.getElementById("loginbox").style.display = 'none';
				d.getElementById("chatbox").style.display = 'block';
				this.init(username);
			}
			return false;
		},
		//文件流 下载
		downFile: function(blob, fileName) {
			if(window.navigator.msSaveOrOpenBlob) {
				navigator.msSaveBlob(blob, fileName);
			} else {
				var link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = fileName || '';
				link.click();
				window.URL.revokeObjectURL(link.href);
			}
		},
		downBtn:function(dex,name){// 下载文件按钮 
			var fcd='';
			for(var i in ar){
				if(ar[i].cd==dex){
					fcd=ar[i].rst;
				}
			};
			var blob = this.dataURLtoBlob(fcd);
			this.downFile(blob,name);
			blob=null;
		},
		//文件 操作
		reader: function(type, blob, fileObj, callback){
			var reader = new FileReader();
			switch(type) {
				case 'Buffer':
					reader.readAsArrayBuffer(fileObj);
					break;
				case 'URL':
					reader.readAsDataURL(blob);
					break;
				case 'Text':
					reader.readAsText(blob, 'utf-8');//fileObj || blob
					break;
			}
			reader.onload = function(e) {
				if(e.target.readyState == FileReader.DONE) {
					if(typeof callback == 'function') callback(e);
				}
			}
		},
		//dataURL 转blob 
		dataURLtoBlob: function(dataurl) {
			var arr = dataurl.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);
			while(n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new Blob([u8arr], {
				type: mime
			});
		},
		init: function(username){
			/*
			客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
			var self = this;
			this.userid = this.genUid();
			this.username = username;

			d.getElementById("showusername").innerHTML = this.username;
			
			w.addEventListener('resize',this.autoHeight,false);

			setTimeout(this.autoHeight,300);
			
			this.scrollToBottom();
			
			
			//连接websocket后端服务器
			this.socket = io.connect(ws, {
				//'path': '/chat-connector',
				'forceNew': true,
				'reconnection': true,
				'reconnectionDelay': 1000,
				'reconnectionDelayMax': 5000,
				'reconnectionAttempts': 5
			});
			

			//tell socket.io to never give up :)
			this.socket.on('error', function(exception){
				console.log("Error occ");
				console.log(exception);
				self.socket.connect();
			});

			//告诉服务器端有用户登录
			this.socket.emit('login', {
				userid: this.userid,
				username: this.username
			});

			//监听新用户登录
			this.socket.on('login', function(o) {
				CHAT.updateSysMsg(o, 'login');
			});

			//监听用户退出
			this.socket.on('logout', function(o){
				CHAT.updateSysMsg(o, 'logout');
			});

			//监听消息发送
			this.socket.on('message' , function(obj){
				var obj=obj;
				var isme = (obj.userid == CHAT.userid) ? true : false;
				var usernameDiv = '<div class=\'box\'><span class=\'username\'>用户' + obj.username + '</span></div>';
				var li = d.createElement('li');
				var contentDiv = '';

				//消息类型判断
				if(obj.type == 'filetxt'){
					//大文件 
					if(obj.content.fileId){
						contentDiv = '<div class=\'mescont\'><button onclick="javascript:window.open(\''+down+'/'+obj.content.fileId+'\');" >' + obj.fname + '文件</button><p>' + obj.content.txt + '</p></div>';
						domCreat();
						return false;
					}
					
					var blob = new Blob(obj.content.binary, {
						type: obj.mime
					}); //二进制 转为blob
					
					if(obj.mime == 'image/bmp' || obj.mime == 'image/gif' || obj.mime == 'image/jpeg' || obj.mime == 'image/png') {
						CHAT.reader('URL', blob, '', function(e) {
							var url = e.target.result;
							contentDiv = obj.content.txt ? '<div class=\'mescont\'><img src =\'' + url + '\'  data-bd-imgshare-binded=\'1\'  /><p>' + obj.content.txt + '</p></div>' : '<div class=\'mescont\'><img src =\'' + url + '\'  data-bd-imgshare-binded=\'1\'  /></div>';
							domCreat();
							url=null;
						});
					} else {
						//性能 瓶颈代码
						CHAT.reader('URL', blob, '', function(e) {
							//用 json 接收数据 dom保存指向  进行优化
							var dat=e.target.result;
							var snb=self.getUuid(); //用uuid 作为索引
							ar.push({cd:snb,rst:dat});
							contentDiv = '<div class=\'mescont\'><button onclick="CHAT.downBtn(\''+snb+'\',\'' + obj.fname + '\')" >' + obj.fname + '文件</button><p>' + obj.content.txt + '</p></div>';
							domCreat();
							dat=null;
						})
					}
					blob=null;
				}

				if(obj.type == 'txt') {
					contentDiv = '<div class=\'mescont\'>' + obj.content.txt + '</div>';
					domCreat();
					obj=null;
				}
				
				function domCreat(){
					if(isme){
						li.className='user';
						li.innerHTML=usernameDiv + contentDiv;
					} else {
						li.className='service';
						li.innerHTML=usernameDiv + contentDiv;
					}
					CHAT.oTemp.appendChild(li);
					
					//前端 性能瓶颈 当dom有大量数据时 进行dom操作  浏览器会奔溃
					CHAT.msgCont.appendChild(CHAT.oTemp);
					CHAT.scrollToBottom();
					
					//结束时间
					var end=CHAT.getime();
					var dua=end- obj.content.startime;
					$('.status').hide();
					$('#chatbox').removeClass('disabled');
					console.log('执行时间:'+dua+'ms');

				}	
				return false;
			});

			this.socket.on("reconnecting", function(delay, attempt){
				if(delay){
					//告诉服务器端有用户登录
					self.socket.emit('login', {
						userid: self.userid,
						username: self.username
					});
				}
			});
		}
	};
	//通过“回车”提交用户名
	d.getElementById("username").onkeydown = function(e) {
		e = e || event;
		if(e.keyCode === 13) {
			CHAT.usernameSubmit();
		}
	};
	//通过“回车”提交信息
	d.getElementById("content").onkeydown = function(e) {
		e = e || event;
		if(e.keyCode === 13) {
			CHAT.submit();
		}
	};
	//浏览器 限制
	$(function(){
		if(!CHAT.chrome()){
			$('body').addClass('fbrow');
		}
	})
})($);
