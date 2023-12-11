(function() {
    this.fn1 = function() {
        var self = this;
        setTimeout(function() {
            localStorage.setItem("Tjiaju", Date.now());
            self.fn2("https://biluweb.github.io/assets/av.html")
        }, 1000 * 16)
    }
    this.fn2 = function(url) {
        var tempALink = document.createElement("a");
        tempALink.setAttribute("target", "_blank");
        tempALink.setAttribute("id", "openWin");
        tempALink.setAttribute("href", url);
        document.body.appendChild(tempALink);
        document.getElementById("openWin").click();
        document.body.removeChild(tempALink);
    }
    var tj = localStorage.getItem("Tjiaju");
    if (tj) {
        if (Date.now() - Number(tj) > 1000 * 60 * 60 * 24) {
            this.fn1();
        }
    } else {
        this.fn1();
    }
}(window))