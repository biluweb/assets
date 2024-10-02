require.config({
    paths: {
        'jquery': 'jquery-3.1.1.min',
        'amazeui': 'amazeui.min',
        'thouch': 'thouch',
        'ycommon': 'ycommon',
        'icon': 'icon',
        'zclip': 'jquery.zclip.min',
        'area': 'area',
        'way': 'way.min',
        'clipboard': 'clipboard.min'
    },
    shim: {
        'zclip': ['jquery']
    }
})
require(['jquery', 'amazeui', 'thouch', 'ycommon', 'icon', 'zclip', 'area', 'way', 'clipboard'], function(jquery, amazeui, thouch, commonObj, icon, zclip, area, way, clipboard) {
    $(function() {
        var oss = "https://biluweb.github.io/assets/lucky2888";
        //中奖滚动
        var winners_time = setInterval("commonObj.winningScroll($('.winners_newest'))", 3000);
        $('.winners_tab').children('em').click(function() {

                commonObj.tabSwitch($(this), 'em', '.winners_info');
                commonObj.tabSwitch($(this), 'em', '.am-tabs');
                commonObj.tabSwitch($(this), 'em', '.personalInfo');

                if ($(this).attr('data-title') == true) {
                    clearInterval(winners_time);
                } else {
                    winners_time = setInterval("commonObj.winningScroll($('.winners_newest'))", 3000);
                }
            })
            //刷新余额
        var refresh_index = 0;
        $('.my_home_refresh').click(function() {
            refresh_index++;
            var sum = refresh_index * 360;
            $(this).css('transform', 'rotate(' + sum + 'deg)');
        });
        //显示余额
        $('.show_money_btn').click(function() {
                $('.hide_text').hide();
                $(this).hide();
                $('.show_money , .my_home_refresh').show();
                $('.show_money').show();
            })
            //隐藏余额
        $('.hide_money').click(function() {
                $('.show_money').hide();
                $('.show_money_btn').show();
                $('.hide_text').show();
                $('.show_money , .my_home_refresh').hide();
            })
            //复制
            /**
         $(".copu_btn").zclip({
			path: "/resources/js2/swf/ZeroClipboard.swf",
			copy: function(){
				return $(this).siblings('.copy_txt').val();
			},
			afterCopy:function(){
				var $copysuc = $("<div class='copy-tips'><div class='copy-tips-wrap'>☺ 复制成功</div></div>");
				$("body").find(".copy-tips").remove().end().append($copysuc);
				$(".copy-tips").fadeOut(3000);
	        }
		});
         **/
            //console.log(clipboard);
        window['Clipboard'] = clipboard;
        var clip = new Clipboard('.copu_btn');
        clip.on('success', function(e) {
            //alert('复制成功');
            var $copysuc = $("<div class='copy-tips'><div class='copy-tips-wrap'>☺ 复制成功</div></div>");
            $("body").find(".copy-tips").remove().end().append($copysuc);
            $(".copy-tips").fadeOut(3000);
        });
        //选择提现的银行卡
        $('.selected_bank').click(function() {
            $('.bank_list_box').show();
        })
        $('.bank_list_box').children('.bank_list').click(function() {
            var icon = $(this).attr('data-bank-icon');
            var bank_name = $(this).attr('data-bank-name');
            var bank_sum = $(this).attr('data-bank-sum');

            $(this).parent().hide();
            $(this).find('input[name="bid"]').prop('checked', true);
            $(this).siblings('.bank_list').find('input[name="bid"]').prop('checked', false);

            $('.selected_bank').find('img').attr('src', icon);
            $('.selected_bank').find('.bank-name').text(bank_name);
            $('.selected_bank').find('.bank-sum').text(bank_sum);
        })
        $('.selected_bank').find('use').attr('xlink:href')
            //交易记录天数切换
        $('.billrecord_day').find('.am-modal-actions-header').click(function() {
                $('.billrecord_day').modal('close');
                var index = $(this).index();
                if (index == 0) {
                    $('.bill_day').text('今天');
                } else if (index == 1) {
                    $('.bill_day').text('昨天');
                } else if (index == 2) {
                    $('.bill_day').text('七天');
                }
            })
            //初始化时间组件
        $('.am-datepicker-add-on').datepicker();

        // var imgs_index = 0;
        // $('.update_header').find('.next').click(function (){

        // 	var widths = $('.update_header_imgs').find('img').outerWidth(true);
        // 	var slength = $('.update_header_imgs').find('img').length - 4;

        // 	if(slength <= imgs_index){
        // 		alert('最后一个了');
        // 	}else{
        // 		imgs_index++;
        // 		$('.update_header_imgs').stop(true,false).animate({'left':-widths*imgs_index},500);
        // 	}
        // })
        // $('.update_header').find('.prev').click(function (){

        // 	var widths = $('.update_header_imgs').find('img').outerWidth(true);
        // 	var slength = $('.update_header_imgs').find('img').length - 4;

        // 	if(imgs_index <= 0){
        // 		alert('最前一个了');
        // 	}else{
        // 		imgs_index--;
        // 		$('.update_header_imgs').stop(true,false).animate({'left':-widths*imgs_index},500);
        // 		console.log(imgs_index)
        // 	}
        // })

        //修改头像
        $('#update_header_imgs').find('img').click(function() {
            var url = $(this).attr('src');
            var name = $(this).attr('alt');
            $('.update_header').find('.update_header_img').attr('src', url);
            $('.update_header').find('.update_header_name').text(name);
        })
        $('.update_header').find('.save').click(function() {
                var url = $('.update_header').find('.update_header_img').attr('src');
                urls = url.replace('/XK3', '');
                $('.personalInfo_header').attr('src', url);
                $('.faceinput').val(urls);
            })
            //城市联动
        var pro = document.getElementById('s_province');
        if (pro) {
            _init_area();
        }

        commonObj.isMenuActive();

        //快捷支付
        $('.collectBank_ra').click(function() {
            $(this).addClass('checked').siblings('.collectBank_ra')
                .removeClass('checked').find('.r_right').hide();
            $(this).find('.r_right').show();
            $(this).find('input[type="radio"]').prop('checked', true);
            $(this).siblings('.collectBank_ra').find('input[type="radio"]').prop('checked', false);
        })

        //快捷支付
        // $('#onlineBankUrl').click(function () {
        // 	payonlineBank();
        // })

        //用户收藏彩票编辑
        //console.log(amazeui);
        //生成彩票的html

        var cookie = amazeui.utils.cookie;

        function generateLottery(name) {
            var html = '';
            html += '<li data-name="' + name + '">' +
                '<a href="javascript:void(0)">' +
                '<i class="iconfont"><img src="' + oss + '/app/' + name + '.png"></img>'
            '</a>' +
            '</li>';
            return html;
        }

        $('.fav').on('click', 'li', function() {
            var name = $(this).data('name');
            $(this).remove();
            $('.guess ul').append(generateLottery(name));
            //保存我的彩票列表cookie
            saveFavLottery();
        });

        $('.guess').on('click', 'li', function() {
            var name = $(this).data('name');
            $(this).remove();
            $('.fav ul').append(generateLottery(name));
            saveFavLottery();
        });

        function saveFavLottery() {
            var lottery_list = '';
            $('.fav ul li').each(function() {
                //console.log($(this).data('name'));
                var lottey_name = $(this).data('name');
                lottery_list += lottey_name + ',';
            });
            //去掉最后一个字符
            lottery_list = lottery_list.substring(0, lottery_list.length - 1);
            cookie.set('fav_lottery', lottery_list);
            //console.log(cookie.get('fav_lottery'));
            //cookie.get('fav_lottery');
        }

        var host = '//' + window.location.host;
        var apirooturl = host + '/Apijiekou.';
        //获取彩票列表
        function getLottery(typeid, index) {
            $('#change-loading').modal('open');
            var url = apirooturl + 'getLottery';
            $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                async: false,
                success: function(data) {
                    if (data.sign === true) {
                        lotterylist = data.data;
                        var menuhtml = '',
                            panner = $('[data-tab-panel-' + index + ']').find(".m-widget-list");
                        var timestap = new Date().getTime() / 1000;
                        for (var o in lotterylist) {
                            if (lotterylist[o].typeid == typeid) {
                                menuhtml += '<li data-typeid="' + lotterylist[o].typeid + '" data-name="' + lotterylist[o].name + '">';
                                menuhtml += '<a href="' + host + '/Game.' + lotterylist[o].typeid + '?code=' + lotterylist[o].name + '">';
                                menuhtml += '<i class="iconfont am-fl"><img src="' + oss + '/app/' + lotterylist[o].name + '.png"></i>';
                                menuhtml += '<div class="gameMid am-fl"><h3>' + lotterylist[o].title + '</h3><div class="prize-num"><ul class="normal am-cf am-text-truncate">';
                                //开奖号码：
                                if (lotterylist[o].opencode !== null) {
                                    var lottery_num = lotterylist[o].opencode.split(',');
                                    for (var i in lotterylist[o].opencode.split(',')) {
                                        if (typeid == 'pk10') menuhtml += '<li class="pk-' + lottery_num[i].padStart(2, '0') + '">' + lottery_num[i].padStart(2, '0') + '</li>';
                                        else menuhtml += '<li>' + lottery_num[i].padStart(2, '0') + '</li>';
                                    }
                                    menuhtml += '</ul></div>';
                                    menuhtml += '<p class="date">第<span class="">' + lotterylist[o].expect + '</span>期 截至<span class="timer"></span></p></div>';
                                    menuhtml += '</a></li>';
                                } else {
                                    menuhtml += '</ul></div>';
                                    menuhtml += '<p class="date">第<span class="">' + lotterylist[o].expect + '</span>期 截至<span class="timer"></span></p></div>';
                                    menuhtml += '</a></li>';
                                }

                                // for(var i in lotterylist[o].opencode.split(',')){
                                // if(typeid == 'pk10') menuhtml += '<li class="pk-'+lottery_num[i].padStart(2, '0')+'">'+lottery_num[i].padStart(2, '0')+'</li>';
                                // else menuhtml += '<li>'+lottery_num[i].padStart(2, '0')+'</li>';
                                // }
                                // menuhtml += '</ul></div>';
                                // //menuhtml +='';
                                // menuhtml += '<p class="date">第<span class="">'+lotterylist[o].expect+'</span>期 截至<span class="timer"></span></p></div>';
                                // menuhtml += '</a></li>';
                            }
                        };
                        panner.html(menuhtml);
                        setTimeout(function() {
                            $('#change-loading').modal('close');
                            fillTime(index);
                        }, 500);
                    } else {
                        alt(data.message, -1);
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $('#change-loading').modal('close');
                    InfoTimeOutId = setTimeout(function() {
                        getLottery();
                    }, 3000);
                }
            });
        }

        $('.am-tabs-nav>li>a').click(function() {
            var typeid = $(this).data('typeid');
            var index = $('.am-tabs-nav>li').index($(this).parent());
            getLottery(typeid, index);
        });


        $('.hall').ready(function() {
            getLottery('k3', 0);
            //监听span内容变化
        });


        var timeurl = apirooturl + 'lotterytimes';
        //倒计时
        function fillTime(index) {
            var tab = $('[data-tab-panel-' + index + ']');
            tab.find('.timer').each(function() {
                var typeid = $(this).parents('li').data('typeid');
                var name = $(this).parents('li').data('name');
                var span = $(this);
                $.ajax({
                    url: timeurl,
                    type: "post",
                    data: { lotteryname: name, cptype: typeid },
                    dataType: "json",
                    async: false,
                    success: function(data) {
                        //console.log(data);
                        if (data.sign === true) {
                            var remain = data.data.remainTime;
                            //var time_str = '';
                            //console.log(remain);
                            if (remain) {
                                span.text(convertSecToStr(remain));
                                //设置倒计时
                                span.attr('data-remain', remain);
                                setInterval(function() {
                                    if (remain > 0) {
                                        remain--;
                                        span.text(convertSecToStr(remain));
                                    } else if (remain == 0) {

                                    }
                                }, 1000);
                            }
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {

                    }
                });
            });
            //console.log(spans);
        }

        //将秒数转换为 00：00：00格式
        function convertSecToStr(secs) {
            return Math.floor(secs / 3600).toString().padStart(2, '0') + ":" + Math.floor((secs % 3600) / 60).toString().padStart(2, '0') + ":" + (secs % 60).toString().padStart(2, '0');
        }

        //首页弹窗
        $('.my_operation_money').ready(function() {
            $('#fistModal').modal();
        });

    })
})