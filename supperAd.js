(function(){

    var d={
       dom:'<a href="https://biluweb.github.io/assets/mgdb.html"><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.soyoung.com%2Ftieba%2Fweb%2F20180207%2F4%2F20180207115139810_570.gif&refer=http%3A%2F%2Fimg2.soyoung.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613357507&t=3095ed64bca4d3452508214e79c05f42"/></a>'
    }

    var a={
        loadCss:function( url ){ 
          var link = document.createElement( "link" ); 
          link.type = "text/css"; 
          link.rel = "stylesheet"; 
          link.href = url; 
          document.getElementsByTagName( "head" )[0].appendChild( link ); 
        },
        loadScript:function (url,b) {
           var script = document.createElement("script");
           script.type = "text/javascript";
           script.src = url;
           document.body.appendChild(script);
           if(typeof b == 'function') b();
        }
    }
    
    var f={
        init:function(){
            var self=this;
            this.load()
            var waa=setInterval(function(){
              layer.closeAll()
              layer.open({
                type: 3
                ,content: self.dom
                ,anim: 'up'
                ,style: 'position:fixed; bottom:0; left:0; width: 100%; padding:10px 0; border:none;'
              });
            },1000*20);
        },
        load:function(){
            this.loadCss('https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/mobile/need/layer.min.css');
            this.loadScript('https://libs.baidu.com/jquery/1.9.1/jquery.min.js');
            this.loadScript('https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/mobile/layer.min.js');
        }
    }
    
    
    var c={};
    Object.assign(c,d,a,f);
    window.onload=function(){
        c.init();    
    }
}())
