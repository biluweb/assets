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
                showmessage(c.info, 6, 'http://pay.gwifi.com.cn');
            }
        }
      }
}())
