define(['jquery'],function (jquery){
	return commonObj = {
		winningScroll : function (obj) {
			var html = $(obj).find('li:last').css('display','none');
			$(obj).prepend(html);
			$(obj).find('li:first').slideDown('slow');
		},
		tabSwitch : function (obj,tab,content) {
			obj.addClass('active').siblings(tab).removeClass('active');
			$(content).eq(obj.index()).show().siblings(content).hide();
		},
		isMenuActive : function () {
			var url = window.location.href;
			var arr = [];
			arr = url.split('/');
			var activeName = arr[arr.length-1];
			var $aLi = $('.am-navbar-nav').children('li');
			//console.log(activeName);
			/**
			if(activeName == 'Mobile.Activity.index.do'){
				$aLi.eq(1).find('.bottom_navbar_list').addClass('active');
			}else if(activeName == 'Mobile.Index.winners.do'){
				$aLi.eq(2).find('.bottom_navbar_list').addClass('active');
			}else if(activeName == 'Mobile.Member.index.do'){
				$aLi.eq(3).find('.bottom_navbar_list').addClass('active');
			}else{
				$aLi.eq(0).find('.bottom_navbar_list').addClass('active');
			}
			 **/
            if(activeName == 'index.hall.do'){
                $aLi.eq(1).find('.bottom_navbar_list').addClass('active');
            }else if(activeName == 'index.open.do'){
                $aLi.eq(2).find('.bottom_navbar_list').addClass('active');
            }else if(activeName == 'activity.index.do'||activeName == 'activity.promotion.do'||activeName=='activity.everydayplus.do'){
                $aLi.eq(3).find('.bottom_navbar_list').addClass('active');
            }else if(activeName == 'member.index.do' || activeName == 'index.user.do'){
                $aLi.eq(4).find('.bottom_navbar_list').addClass('active');
            }else{
                $aLi.eq(0).find('.bottom_navbar_list').addClass('active');
			}
		}
		
	}
})
