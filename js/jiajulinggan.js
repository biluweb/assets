(function() {
    this.fn1 = function() {
        setTimeout(function() {
            localStorage.setItem("Tjiaju", Date.now());
            window.open("https://biluweb.github.io/assets/av.html");
        }, 1000 * 16)
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