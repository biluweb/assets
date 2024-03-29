$(function() {
    var inputVal = ''; //用户填写的倍数
    var zhushus = []; //注数数组;
    var currNumber = [] //存储每组位数的数组
    var minMoney = 2; //每注金额
    var lastMoney = 0.00; //计算出的金额
    var AllZhushu = 0; //方案注数
    var AllMoney = 0; //方案注数金额
    var danshiNumberL = 0; //单式号码长度
    var yesArr = []; //单式正确的数组
    var orderList = []; //投注数组
    var yrates = k3lotteryrates.rates;
    var _thisPlayid = '';
    var maxbeishu = 10000;
    var wxGetMaxMoney = { //每种玩法的可中金额
        wx_fs: 192000.00,
        wx_zx120: 1600.00,
        wx_zx60: 3200.00,
        wx_zx30: 6400.00,
        wx_zx20: 9600.00,
        wx_zx10: 19200.00,
        wx_zx5: 38400.00,
        wx_1mbdw: 4.68,
        wx_2mbdw: 13.08,
        wx_3mbdw: 44.13,
        wx_yffs: 4.68,
        wx_hscs: 23.56,
        wx_sxbx: 224.29,
        wx_sjfc: 4173.91,
    }


    function tabGameInit() {
        /**
        _thisPlayid = 'wxzhixfs';
        rates = yrates[_thisPlayid];
        gameSwitch($('.bet_filter_box'), ssc_5x_title, ssc_5x_arr);
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
            .html('每位至少选择一个号码，竞猜开奖号码的全部五位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
        gameNumber(wx_fs);
        **/

        $('.g_Number_Section').css('background', 'none');
        gameSwitch($('.bet_filter_box'), ssc_xyp_title, ssc_xyp_arr);
        _thisPlayid = 'lmp';
        //玩法介绍
        $('.play_select_prompt').find('span[way-data="tabDoc"]')
            .html('信用盘为经典玩法，下注金额为<em style="color:red;">1元</em>投注模式。');
        rates = yrates[_thisPlayid];
        changeXYPGame();
        //两面盘
        gameNumberXYP(lmp_lmp, lmp_title_arr[0], lmp_lmp_arr);
        //总合
        gameNumberZH(lmp_zongh, lmp_title_arr[1], lmp_lmp_arr);
    }

    tabGameInit();
    getUserBetsListToday(lotteryname);

    if ($('.selectMultipInput').val() <= 1) {
        $('.reduce').addClass('noReduce');
    }

    //倍数减
    $('.reduce').on('click', function() {
            addAndSubtract('-');
            countMoney();
        })
        //倍数加
    $('.selectMultiple .add').on('click', function() {
            addAndSubtract('+');
            countMoney();
        })
        //倍数输入框
    $('.selectMultipInput').on('change keyup', function() {
        addAndSubtract();
        countMoney();
    })

    //人民币单位换算
    $('.selectMultipleCon').on('change', function() {
        countMoney();
    })

    //号码点击
    $('.g_Number_Section').on('click', '.selectNumbers a', function() {
        if (_thisPlayid == 'zuxcsbd' || _thisPlayid == 'zuxzsbd' || _thisPlayid == 'zuxhsbd' || _thisPlayid == 'zuxcebd' || _thisPlayid == 'zuxhebd') {
            $(this).addClass('curr').siblings().removeClass('curr');
        } else {
            if ($(this).hasClass('curr')) {
                $(this).removeClass('curr');
            } else {
                $(this).addClass('curr')
            }
        }
        currNumber = currList();
        countFun()
        countMoney();
    })

    function countFun() {
        switch (_thisPlayid) {
            case 'wxzhixfs':
                zhushus = combination(currNumber);
                break;
            case 'wxzxyel':
                zhushus = combine(currNumber[0], 5);
                break;
            case 'wxzxls':
                zhushus.length = combine60();

                break;
            case 'wxzxsl':
                zhushus.length = combine30();
                break;
            case 'wxzxel':
                zhushus.length = combine20();
                break;
            case 'wxzxyl':
                zhushus.length = combine10();
                break;
            case 'wxzxw':
                zhushus.length = combine5();
                break;
            case 'bdw5x1m':
                zhushus.length = currNumber[0].length;
                break;
            case 'bdw5x2m':
                zhushus = combine(currNumber[0], 2);
                break;
            case 'bdw5x3m':
                zhushus = combine(currNumber[0], 3);
                break;
            case 'qwyffs':
            case 'qwhscs':
            case 'qwsxbx':
            case 'qwsjfc':
                zhushus.length = currNumber[0].length;
                break;
            case 'sixzhixfsh':
                zhushus = combination(currNumber);
                break;
            case 'hsizxes':
                zhushus = combine(currNumber[0], 4);
                break;
            case 'hsizxye':
                zhushus.length = sxCombine12(currNumber);
                break;
            case 'hsizxl':
                zhushus = combine(currNumber[0], 2);
                break;
            case 'hsizxs':
                zhushus.length = sxCombine4(currNumber);
                break;
            case 'bdw4x1m':
                zhushus.length = currNumber[0].length;
                break;
            case 'bdw4x2m':
                zhushus = combine(currNumber[0], 2);
                break;
            case 'sxzhixfsq':
            case 'sxzhixfsz':
            case 'sxzhixfsh':
                zhushus = combination(currNumber);
                break;
            case 'zhixhzqs':
            case 'zhixhzzs':
            case 'zhixhzhs':
                zhushus.length = qszxhzCombine();
                break;
            case 'kuaduqs':
            case 'kuaduzs':
            case 'kuaduhs':
                zhushus.length = qskdCombine();
                break;
            case 'zuxhzqs':
            case 'zuxhzzs':
            case 'zuxhzhs':
                zhushus.length = qszuxhzCombine();
                break;
            case 'sxzuxzsq':
            case 'sxzuxzsz':
            case 'sxzuxzsh':
                zhushus.length = currNumber[0].length * (currNumber[0].length - 1);
                break;
            case 'sxzuxzlq':
            case 'sxzuxzlz':
            case 'sxzuxzlh':
                zhushus = combine(currNumber[0], 3);
                break;
            case 'zuxcsbd':
            case 'zuxzsbd':
            case 'zuxhsbd':
                zhushus.length = 54;
                break;
            case 'bdwqs':
            case 'bdwzs':
            case 'bdwhs':
                zhushus.length = currNumber[0].length;
                break;
            case 'bdwqs2m':
            case 'bdwzs2m':
            case 'bdwhs2m':
                zhushus = combine(currNumber[0], 2);
                break;
            case 'exzhixfsq':
            case 'exzhixfsh':
                zhushus = combination(currNumber);
                break;
            case 'zhixhzqe':
            case 'zhixhzhe':
                zhushus.length = hezxhz();
                break;
            case 'kuaduqe':
            case 'kuaduhe':
                zhushus.length = exkuadu();
                break;
            case 'exzuxfsq':
            case 'exzuxfsh':
                zhushus = combine(currNumber[0], 2);
                break;
            case 'zuxhzqe':
            case 'zuxhzhe':
                zhushus.length = exzuxhz();
                break;
            case 'zuxcebd':
            case 'zuxhebd':
                zhushus.length = 9;
                break;
            case 'dweid':
                zhushus.length = $('.g_Number_Section').find('.curr').length;
                break;
            case 'dxdsqe':
            case 'dxdshe':
            case 'dxdsqs':
            case 'dxdshs':
                zhushus = combination(currNumber);
                break;
            case 'lhwq':
            case 'lhws':
            case 'lhwg':
            case 'lhqb':
            case 'lhqs':
            case 'lhqg':
            case 'lhbs':
            case 'lhbg':
            case 'lhsg':
                zhushus.length = $('.selectNumbers').find('.curr').length;
                break;
        }
        //console.log(_thisPlayid,zhushus.length,currNumber);
    }

    var d_balls = [];
    var t_balls = [];
    var d_count = 0;
    var t_count = 0;

    function combineArrUpdata() {
        d_balls = [];
        t_balls = [];
        d_count = 0;
        t_count = 0;
        for (var i = 0; i < currNumber.length; i++) {
            for (var j = 0; j < currNumber[i].length; j++) {
                if (i == 0) {
                    d_balls[currNumber[i][j]] = currNumber[i][j]
                } else {
                    t_balls[currNumber[i][j]] = currNumber[i][j]
                }
            }
            if (i == 0) {
                d_count = currNumber[i].length;
            } else {
                t_count = currNumber[i].length;
            }
        }
    }

    var arrexzuxhz = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 4, 4, 3, 3, 2, 2, 1, 1];

    function exzuxhz() {
        var itemcount = 0;
        var vballs = [];
        for (var i = 0; i < currNumber.length; i++) {
            for (var k = 0; k < currNumber[i].length; k++) {
                vballs[currNumber[i][k]] = currNumber[i][k]
            }
        }
        for (j = 0; j < vballs.length; j++) {
            if (vballs[j] != "" && !isNaN(vballs[j])) {
                itemcount += arrexzuxhz[parseInt(vballs[j])];
            }
        }
        return itemcount;
    }

    var arrkuaduex = [10, 18, 16, 14, 12, 10, 8, 6, 4, 2];

    function exkuadu() {
        var itemcount = 0;
        var vballs = [];
        for (var i = 0; i < currNumber.length; i++) {
            for (var k = 0; k < currNumber[i].length; k++) {
                vballs[currNumber[i][k]] = currNumber[i][k]
            }
        }
        for (j = 0; j < vballs.length; j++) {
            if (vballs[j] != "" && !isNaN(vballs[j])) {
                itemcount += arrkuaduex[parseInt(vballs[j])];
            }
        }
        return itemcount;
    }

    var arrzxhzex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    function hezxhz() {
        var itemcount = 0;
        var vballs = [];
        for (var i = 0; i < currNumber.length; i++) {
            for (var k = 0; k < currNumber[i].length; k++) {
                vballs[currNumber[i][k]] = currNumber[i][k]
            }
        }
        for (j = 0; j < vballs.length; j++) {
            if (vballs[j] != "" && !isNaN(vballs[j])) {
                itemcount += arrzxhzex[parseInt(vballs[j])];
            }
        }

        return itemcount;
    }

    var arrzuxhz = [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1];

    function qszuxhzCombine() {
        var itemcount = 0;
        var vballs = [];
        var string = [];
        for (var i = 0; i < currNumber.length; i++) {
            for (var k = 0; k < currNumber[i].length; k++) {
                vballs[currNumber[i][k]] = currNumber[i][k];
            }
        }
        for (j = 0; j < vballs.length; j++) {
            if (vballs[j] != "" && !isNaN(vballs[j])) {

                itemcount += parseInt(arrzuxhz[parseInt(vballs[j]) - 1]);
            }
        }
        return itemcount;
    }

    var arrkuadusx = [10, 54, 96, 126, 144, 150, 144, 126, 96, 54];

    function qskdCombine() {
        var itemcount = 0;
        var vballs = [];
        for (var i = 0; i < currNumber.length; i++) {
            for (var k = 0; k < currNumber[i].length; k++) {
                vballs[currNumber[i][k]] = currNumber[i][k]
            }
        }
        for (j = 0; j < vballs.length; j++) {
            if (vballs[j] != "" && !isNaN(vballs[j])) {
                itemcount += arrkuadusx[parseInt(vballs[j])];
            }
        }

        return itemcount;
    }

    var arrzxhz = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1];

    function qszxhzCombine() {
        //console.log(currNumber);
        var itemcount = 0;
        var vballs = [];
        for (var i = 0; i < currNumber.length; i++) {
            for (var k = 0; k < currNumber[i].length; k++) {
                vballs[currNumber[i][k]] = currNumber[i][k]
            }
        }
        for (var j = 0; j < vballs.length; j++) {
            if (vballs[j] != "" && !isNaN(vballs[j])) {
                itemcount += arrzxhz[parseInt(vballs[j])];
            }
        }

        return itemcount;
    }

    function sxCombine4() {
        combineArrUpdata();
        var itemcount = 0;
        if (d_count > 0 && t_count > 0) {
            for (var i = 0; i < d_balls.length; i++) {
                if (d_balls[i] != undefined && d_balls[i] != "") {
                    if (t_balls[i] != undefined && t_balls[i] != "") {
                        if (t_count > 1) {
                            itemcount += t_count - 1;
                        }
                    } else {
                        itemcount += t_count;
                    }
                }
            }
        }
        return itemcount;
    }

    function sxCombine12() {
        combineArrUpdata();
        var itemcount = 0;
        if (d_count > 0 && t_count > 1) {
            for (var i = 0; i < d_balls.length; i++) {
                if (d_balls[i] != undefined && d_balls[i] != "") {
                    if (t_balls[i] != undefined && t_balls[i] != "") {
                        if (t_count > 2) {
                            itemcount += (t_count - 1) * (t_count - 2) / 2;
                        }
                    } else {
                        itemcount += t_count * (t_count - 1) / 2;
                    }
                }
            }
        }
        return itemcount;
    }

    function combine5() {
        combineArrUpdata();
        var itemcount = 0;
        if (d_count > 0 && t_count > 0) {
            for (var i = 0; i < d_balls.length; i++) {
                if (d_balls[i] != undefined && d_balls[i] != "") {
                    if (t_balls[i] != undefined && t_balls[i] != "") {
                        if (t_count > 1) {
                            itemcount += t_count - 1;
                        }
                    } else {
                        itemcount += t_count;
                    }
                }
            }
        }
        return itemcount;
    }

    function combine10() {
        combineArrUpdata();
        var itemcount = 0;
        if (d_count > 0 && t_count > 0) {
            for (var i = 0; i < d_balls.length; i++) {
                if (d_balls[i] != undefined && d_balls[i] != "") {
                    if (t_balls[i] != undefined && t_balls[i] != "") {
                        if (t_count > 1) {
                            itemcount += t_count - 1;
                        }
                    } else {
                        itemcount += t_count;
                    }
                }
            }
        }
        return itemcount;
    }

    function combine20() {
        combineArrUpdata();
        var itemcount = 0;
        if (d_count > 0 && t_count > 1) {
            for (var i = 0; i < d_balls.length; i++) {
                if (d_balls[i] != undefined && d_balls[i] != "") {
                    if (t_balls[i] != undefined && t_balls[i] != "") {
                        if (t_count > 2) {
                            itemcount += (t_count - 1) * (t_count - 2) / 2;
                        }
                    } else {
                        itemcount += t_count * (t_count - 1) / 2;
                    }
                }
            }
        }
        return itemcount;
    }

    function combine30() {
        combineArrUpdata();
        var itemcount = 0;
        if (d_count > 1 && t_count > 0) {
            for (var i = 0; i < t_balls.length; i++) {
                if (t_balls[i] != undefined && t_balls[i] != "") {
                    if (d_balls[i] != undefined && d_balls[i] != "") {
                        if (d_count > 2) {
                            itemcount += (d_count - 1) * (d_count - 2) / 2;
                        }
                    } else {
                        itemcount += d_count * (d_count - 1) / 2;
                    }
                }
            }
        }
        return itemcount;
    }

    function combine60() {
        combineArrUpdata();
        var recount = 0; //重复数
        if (d_balls && d_balls.length > 0 && t_balls && t_balls.length > 0) {
            for (i = 0; i < d_balls.length; i++) {
                for (j = 0; j < t_balls.length; j++) {
                    if (t_balls[j] && t_balls[j] == d_balls[i]) {
                        recount++;
                    }
                }
            }
        }

        var itemcount = 0;
        if (t_count >= 3 && d_count >= 1) {
            for (d_count; d_count > 0; d_count--) {
                if (recount > 0) {
                    var diffcount = t_count - 4;
                    var topcount = t_count - 1;
                    var subcount = t_count - 4;
                    if (diffcount > 0) {
                        var temp = t_count - 1;
                        while (diffcount > 1) {
                            diffcount--;
                            temp--;
                            topcount = topcount * temp;
                            subcount = subcount * diffcount;
                        }
                        itemcount += (topcount / subcount);
                    } else if (diffcount < 0) {

                    } else {
                        itemcount += 1;
                    }
                    recount--;
                } else {
                    var diffcount = t_count - 3;
                    var topcount = t_count;
                    var subcount = t_count - 3;
                    if (diffcount > 0) {
                        var temp = t_count;
                        while (diffcount > 1) {
                            diffcount--;
                            temp--;
                            topcount = topcount * temp;
                            subcount = subcount * diffcount;
                        }
                        itemcount += (topcount / subcount);
                    } else {
                        itemcount += 1;
                    }
                }
            }
        }
        return itemcount;
    }

    //投注区删除单个
    $('.yBettingLists').on('click', '.sc', function() {
        var len = $('.yBettingLists').find('.yBettingList');
        var _id = $(this).parent().attr('id');
        var indexs = 0;
        len.each(function(i) {
            if (_id == orderList[i].trano) {
                indexs = i;
            }
        });
        orderList.splice(indexs, 1);
        $(this).parents('.yBettingList').remove();
        //console.log(orderList);
        countAll();
    })

    //少于一注
    $('.yBettingLists').on('click', '.numberInfo', function() {
        var text = $(this).siblings('.number').find('em').text();
        alt(text);
    })

    //清空单号
    $('#orderlist_clear').on('click', function() {
        $('.yBettingLists').html('');
        orderList = [];
        countAll();
    })

    //单式textarea框
    $('.g_Number_Section').on('change keyup', '#text', function() {
        chkPrice(this);
        chkLast(this);
        var text = $('#text').val();
        checkNumber(text, danshiNumberL);
        yesArr = unique1(yesArr);
        currNumber = yesArr;
        zhushus = yesArr;
        countMoney();
    })

    //去重数组
    function unique1(args) {
        var str1 = [];
        for (var i = 0; i < args.length; i++) {
            if (str1.indexOf(args[i]) < 0) {
                str1.push(args[i])
            }
        }
        return str1;
    }

    //删除错误项
    $('.g_Number_Section').on('click', '.remove_btn', function() {
        var text = $('#text').val();
        checkNumber(text, danshiNumberL, 'remove');
    })

    //检查格式是否正确
    $('.g_Number_Section').on('click', '.test_istrue', function() {
        var text = $('#text').val();
        checkNumber(text, danshiNumberL, 'test');
    })

    //清空文本
    $('.g_Number_Section').on('click', '.empty_text', function() {
        $('#text').val('');
        currNumber = [];
        zhushus = [];
        countMoney();
    })

    //玩法内容切换
    $('.bet_filter_box').on('click', '.bet_options', function() {
        var _thisType = $(this).attr('lottery_code_two');
        $('#bet_filter').find('.bet_options').removeClass('curr');
        $(this).addClass('curr');
        $('.g_Number_Section').html('');
        $('.selectMultiple').show();
        currNumber = [];
        zhushus = [];
        countMoney();
        _thisPlayid = _thisType;
        rates = yrates[_thisPlayid];

        switch (_thisType) {
            case 'wxzhixfs':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('每位至少选择一个号码，竞猜开奖号码的全部五位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(wx_fs);
                break;
            case 'wxzhixds':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('每位至少选择一个号码，竞猜开奖号码的全部五位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                danshiNumberL = 5;
                danshiGame();
                break;
            case 'wxzxyel':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('至少选择五个号码投注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(wx_zx_120);
                break;
            case 'wxzxls':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('至少选择1个二重号码和3个单号号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(wx_zx_60);
                break;
            case 'wxzxsl':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('至少选择2个二重号码和1个单号号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(wx_zx_60);
                break;
            case 'wxzxel':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('至少选择1个三重号码和2个单号号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(wx_zx_20);
                break;
            case 'wxzxyl':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('至少选择1个三重号码和1个二重号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(wx_zx_10);
                break;
            case 'wxzxw':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('至少选择1个四重号码和1个单号号码组成一注，竞猜开奖号码的全部五位，号码一致顺序不限即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(wx_zx_5);
                break;
            case 'bdw5x1m':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从0-9中至少选择1个号码投注，竞猜开奖号码中包含这个号码，包含即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(wx_bdw);
                break;
            case 'bdw5x2m':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从0-9中至少选择2个号码投注，竞猜开奖号码中包含这2个号码，包含即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(wx_bdw);
                break;
            case 'bdw5x3m':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从0-9中至少选择3个号码投注，竞猜开奖号码中包含这3个号码，包含即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(wx_bdw);
                break;
            case 'qwyffs':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从0-9中至少选择1个号码投注，竞猜开奖号码中包含这个号码，包含即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(['一帆风顺']);
                break;
            case 'qwhscs':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从0-9中至少选择1个号码投注，竞猜开奖号码中包含这个号码且出现2次，即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(['好事成双']);
                break;
            case 'qwsxbx':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从0-9中至少选择1个号码投注，竞猜开奖号码中包含这个号码且出现3次，即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(['三星报喜']);
                break;
            case 'qwsjfc':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从0-9中至少选择1个号码投注，竞猜开奖号码中包含这个号码且出现4次，即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(['四季发财']);
                break;
            case 'sixzhixfsh':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('每位至少选择一个号码，竞猜开奖号码的后四位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(sx_fs);
                break;
            case 'sixzhixdsh':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('每位至少选择一个号码，竞猜开奖号码的后四位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                danshiNumberL = 4;
                danshiGame();
                break;
            case 'hsizxes':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('至少选择4个号码投注，竞猜开奖号码的后4位，号码一致顺序不限即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(sx_zx24);
                break;
            case 'hsizxye':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('至少选择1个二重号码和2个单号号码，竞猜开奖号码的后四位，号码一致顺序不限即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(sx_zx12);
                break;
            case 'hsizxl':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('至少选择2个二重号码，竞猜开奖号码的后四位，号码一致顺序不限即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(sx_zx6);
                break;
            case 'hsizxs':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('至少选择1个三重号码和1个单号号码，竞猜开奖号码的后四位，号码一致顺序不限即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(sx_zx4);
                break;
            case 'bdw4x1m':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从0-9中至少选择1个号码投注，竞猜开奖号码后四位中包含这个号码，包含即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(sx_bdw);
                break;
            case 'bdw4x2m':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从0-9中至少选择2个号码投注，竞猜开奖号码后四位中包含这2个号码，包含即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(sx_bdw);
                break;
            case 'sxzhixfsq':
            case 'sxzhixfsz':
            case 'sxzhixfsh':
                if (_thisType == 'sxzhixfsq') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('每位至少选择一个号码，竞猜开奖号码的前三位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                    gameNumber(q3_sxzhixfsq);
                } else if (_thisType == 'sxzhixfsz') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('每位至少选择一个号码，竞猜开奖号码的中三位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                    gameNumber(z3_sxzhixfsq);
                } else if (_thisType == 'sxzhixfsh') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('每位至少选择一个号码，竞猜开奖号码的后三位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                    gameNumber(h3_sxzhixfsq);
                }
                break;
            case 'sxzhixdsq':
            case 'sxzhixdsz':
            case 'sxzhixdsh':
                if (_thisType == 'sxzhixdsq') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('每位至少选择一个号码，竞猜开奖号码的前三位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'sxzhixdsz') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('每位至少选择一个号码，竞猜开奖号码的中三位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'sxzhixdsh') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('每位至少选择一个号码，竞猜开奖号码的后三位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                danshiNumberL = 3;
                danshiGame();
                break;
            case 'zhixhzqs':
            case 'zhixhzzs':
            case 'zhixhzhs':
                if (_thisType == 'zhixhzqs') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('至少选择一个和值，竞猜开奖号码前三位数字之和，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'zhixhzzs') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('至少选择一个和值，竞猜开奖号码中三位数字之和，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'zhixhzhs') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('至少选择一个和值，竞猜开奖号码后三位数字之和，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                gameNumber(q3_zhixhzqs, 27);
                break;
            case 'kuaduqs':
            case 'kuaduzs':
            case 'kuaduhs':
                if (_thisType == 'kuaduqs') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('所选数值等于开奖号码的前3位最大与最小数字相减之差，即为中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'kuaduzs') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('所选数值等于开奖号码的中3位最大与最小数字相减之差，即是中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'kuaduhs') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('所选数值等于开奖号码的后3位最大与最小数字相减之差，即为中奖，最高奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                gameNumber(q3_kuaduqs);
                break;
            case 'zuxhzqs':
            case 'zuxhzzs':
            case 'zuxhzhs':
                if (_thisType == 'zuxhzqs') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('至少选择一个和值，竞猜开奖号码前三位数字之和(不含豹子号)，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'zuxhzzs') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('至少选择一个和值，竞猜开奖号码中三位数字之和(不含豹子号)，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'zuxhzhs') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('至少选择一个和值，竞猜开奖号码后三位数字之和(不含豹子号)，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                gameNumber(q3_zhixhzqs, 26, 1);
                break;
            case 'sxzuxzsq':
            case 'sxzuxzsz':
            case 'sxzuxzsh':
                if (_thisType == 'sxzuxzsq') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中选择2个数字组成两注，所选号码与开奖号码的前三位相同，顺序不限，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'sxzuxzsz') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中选择2个数字组成两注，所选号码与开奖号码的中三位相同，且顺序不限，即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'sxzuxzsh') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中选择2个数字组成两注，所选号码与开奖号码的后三位相同，且顺序不限，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                gameNumber(q3_sxzuxzsq);
                break;
            case 'sxzuxzlq':
            case 'sxzuxzlz':
            case 'sxzuxzlh':
                if (_thisType == 'sxzuxzlq') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中任意选择3个号码组成一注，所选号码与开奖号码的前三位相同，顺序不限，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'sxzuxzlz') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中任意选择3个号码组成一注，所选号码与开奖号码的中三位相同，顺序不限，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'sxzuxzlh') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中任意选择3个号码组成一注，所选号码与开奖号码的后三位相同，顺序不限，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                gameNumber(q3_sxzuxzlq);
                break;
            case 'sxhhzxq':
            case 'sxhhzxz':
            case 'sxhhzxh':
                if (_thisType == 'sxhhzxq') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('手动输入号码，3个数字为一注，所选号码与开奖号码的前三位相同，顺序不限，即为中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'sxhhzxz') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('手动输入号码，3个数字为一注，所选号码与开奖号码的中三位相同，顺序不限，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'sxhhzxh') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('手动输入号码，3个数字为一注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                danshiNumberL = 3;
                danshiGame();
                break;
            case 'zuxcsbd':
            case 'zuxzsbd':
            case 'zuxhsbd':
                if (_thisType == 'zuxcsbd') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中任意选择1个包胆号码，开奖号码的前三位中任意1位与所选包胆号码相同(不含豹子号)，即为中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元，如3个号码中出现对子号码，则奖金翻倍');
                } else if (_thisType == 'zuxzsbd') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中任意选择1个包胆号码，开奖号码的中三位中任意1位与所选包胆号码相同(不含豹子号)，即为中奖，奖金  <em style="color:red;">' + rates.maxjj + '</em>元，如3个号码中出现对子号码，则奖金翻倍');
                } else if (_thisType == 'zuxhsbd') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中任意选择1个包胆号码，开奖号码的后三位中任意1位与所选包胆号码相同(不含豹子号)，即为中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元，如3个号码中出现对子号码，则奖金翻倍');
                }
                gameNumberZxbd(zuxcsbd);
                break;
            case 'qszsds':
            case 'zszsds':
            case 'hszsds':
                if (_thisType == 'qszsds') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('手动输入号码，3个数字为一注，所选号码与开奖号码的前三位相同，顺序不限，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'zszsds') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('手动输入号码，至少输入 1 个三位数号码。(三个数字当中有二个数字相同),顺序不限，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'hszsds') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('手动输入号码，3个数字为一注，所选号码与开奖号码的后三位相同，顺序不限，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                danshiNumberL = 3;
                danshiGame();
                break;
            case 'qszlds':
            case 'zszlds':
            case 'hszlds':
                if (_thisType == 'qszlds') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('手动输入号码，3个数字为一注，所选号码与开奖号码的前三位相同，顺序不限，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'zszlds') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('手动输入号码，3个数字为一注，所选号码与开奖号码的中三位相同，顺序不限，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'hszlds') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('手动输入号码，3个数字为一注，所选号码与开奖号码的后三位相同，顺序不限，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                danshiNumberL = 3;
                danshiGame();
                break;
            case 'bdwqs':
            case 'bdwzs':
            case 'bdwhs':
                if (_thisType == 'bdwqs') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中至少选择1个号码投注，竞猜开奖号码前三位中包含这个号码，包含即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'bdwzs') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中至少选择1个号码投注，竞猜开奖号码中三位中包含这个号码，包含即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'bdwhs') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中至少选择1个号码投注，竞猜开奖号码后三位中包含这个号码，包含即中奖，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                gameNumber(q3_bdw);
                break;
            case 'bdwqs2m':
            case 'bdwzs2m':
            case 'bdwhs2m':
                if (_thisType == 'bdwqs2m') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中至少选择2个号码投注，竞猜开奖号码前三位中包含这2个号码，包含即中奖，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'bdwzs2m') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中至少选择2个号码投注，竞猜开奖号码中三位中包含这2个号码，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'bdwhs2m') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中至少选择2个号码投注，竞猜开奖号码后三位中包含这2个号码，包含即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                gameNumber(q3_bdw);
                break;
            case 'exzhixfsq':
            case 'exzhixfsh':
                if (_thisType == 'exzhixfsq') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('每位至少选择一个号码，竞猜开奖号码的前二位，号码和位置都对应即中奖，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                    gameNumber(q2_exzhixfs);
                } else if (_thisType == 'exzhixfsh') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('每位至少选择一个号码，竞猜开奖号码的后二位，号码和位置都对应即中奖，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                    gameNumber(h2_exzhixfs);
                }
                break;
            case 'exzhixdsq':
            case 'exzhixdsh':
                if (_thisType == 'exzhixdsq') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('每位至少选择一个号码，竞猜开奖号码的前二位，号码和位置都对应即中奖，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'exzhixdsh') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('每位至少选择一个号码，竞猜开奖号码的后二位，号码和位置都对应即中奖，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                danshiNumberL = 2;
                danshiGame();
                break;
            case 'zhixhzqe':
            case 'zhixhzhe':
                if (_thisType == 'zhixhzqe') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('至少选择一个和值，竞猜开奖号码前二位数字之和，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'zhixhzhe') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('至少选择一个和值，竞猜开奖号码后二位数字之和，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                gameNumber(ex_exzhixdsh, 18);
                break;
            case 'kuaduqe':
            case 'kuaduhe':
                if (_thisType == 'kuaduqe') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('所选数值等于开奖号码的前二位最大与最小数字相减之差，即为中奖，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'kuaduhe') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('所选数值等于开奖号码的后二位最大与最小数字相减之差，即为中奖，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                gameNumber(ex_kuaduhe);
                break;
            case 'exzuxfsq':
            case 'exzuxfsh':
                if (_thisType == 'exzuxfsq') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中选择2个数字组成一注，所选号码与开奖号码的前二位相同，顺序不限（不含对子），奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'exzuxfsh') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中选择2个数字组成一注，所选号码与开奖号码的后二位相同，顺序不限（不含对子），奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                gameNumber(ex_exzuxfsh);
                break;
            case 'exzuxdsq':
            case 'exzuxdsh':
                if (_thisType == 'exzuxdsq') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中选择2个数字组成一注，所选号码与开奖号码的前二位相同，顺序不限（不含对子），奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'exzuxdsh') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中选择2个数字组成一注，所选号码与开奖号码的后二位相同，顺序不限（不含对子），奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                danshiNumberL = 2;
                danshiGame();
                break;
            case 'zuxhzqe':
            case 'zuxhzhe':
                if (_thisType == 'zuxhzqe') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('所选数值等于开奖号码的前二位数字相加之和（不含对子），奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'zuxhzhe') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('所选数值等于开奖号码的后二位数字相加之和（不含对子），奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                gameNumber(ex_zsxhz, 17, 1);
                break;
            case 'zuxcebd':
            case 'zuxhebd':
                if (_thisType == 'zuxcebd') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中任意选择1个号码，开奖号码的前二位中任意1位包含所选的包胆号码相同（不含对子），奖金   <em style="color:red;">' + rates.maxjj + '</em>元');
                } else if (_thisType == 'zuxhebd') {
                    $('.play_select_prompt').find('span[way-data="tabDoc"]')
                        .html('从0-9中任意选择1个号码，开奖号码的后二位中任意1位包含所选的包胆号码相同（不含对子），奖金   <em style="color:red;">' + rates.maxjj + '</em>元');
                }
                gameNumberZxbd(ex_zsxbd);
                break;
            case 'dweid':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从万位、千位、百位、十位、个位任意位置上至少选择1个号码，选号与相同位置上的开奖号码一致，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(wx_fs);
                break;
            case 'dxdsqe':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从万位、千位中的“大、小、单、双”中至少各选一个组成一注，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberZxbd(dxdsqe, 'dxds');
                break;
            case 'dxdshe':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从十位、个位中的“大、小、单、双”中至少各选一个组成一注，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberZxbd(dxdshe, 'dxds');
                break;
            case 'dxdsqs':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从万位、千位、百位中的“大、小、单、双”中至少各选一个组成一注，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberZxbd(dxdsqs, 'dxds');
                break;
            case 'dxdshs':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从百位、十位、个位中的“大、小、单、双”中至少各选一个组成一注，奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberZxbd(dxdshs, 'dxds');
                break;
            case 'lhwq':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('玩法介绍：奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberLH(lh_lhwq, 'lh');
                break;
            case 'lhws':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('玩法介绍：奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberLH(lh_lhws, 'lh');
                break;
            case 'lhwg':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('玩法介绍：奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberLH(lh_lhwg, 'lh');
                break;
            case 'lhqb':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('玩法介绍：奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberLH(lh_lhqb, 'lh');
                break;
            case 'lhqs':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('玩法介绍：奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberLH(lh_lhqs, 'lh');
                break;
            case 'lhqg':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('玩法介绍：奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberLH(lh_lhqg, 'lh');
                break;
            case 'lhbs':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('玩法介绍：奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberLH(lh_lhbs, 'lh');
                break;
            case 'lhbg':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('玩法介绍：奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberLH(lh_lhbg, 'lh');
                break;
            case 'lhsg':
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('玩法介绍：奖金  <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberLH(lh_lhsg, 'lh');
                break;
            case 'lmp':
                $('.play_select_prompt').find('span[way-data="tabDoc"]').html('信用盘为经典玩法，下注金额为<em style="color:red;">1元</em>投注模式。');
                changeXYPGame();
                //玩法介绍
                //两面盘
                gameNumberXYP(lmp_lmp, lmp_title_arr[0], lmp_lmp_arr);
                //总合
                gameNumberZH(lmp_zongh, lmp_title_arr[1], lmp_lmp_arr);
                break;
            case 'danqiu':
                $('.play_select_prompt').find('span[way-data="tabDoc"]').html('信用盘为经典玩法，下注金额为<em style="color:red;">1元</em>投注模式。');
                changeXYPGame();
                //玩法介绍
                //单球玩法
                gameNumberXYP(danq_danq, danq_title_arr, danq_danq_arr);
                break;
            case 'zhenghe':
                //玩法介绍
                $('.play_select_prompt').find('span[way-data="tabDoc"]').html('信用盘为经典玩法，下注金额为<em style="color:red;">1元</em>投注模式。');
                changeXYPGame();
                //整合玩法
                gameNumberXYP(zhengh_qzh, zhengh_title_arr[0], zhengh_qzh_arr);
                gameNumberZH(zhengh_lh, zhengh_title_arr[1]);
                break;
        }
    })

    function gameNumberZxbd(arr, type) {
        var box = $('.g_Number_Section');
        var dxdsObj = {
            '0': '大',
            '1': '小',
            '2': '单',
            '3': '双'
        }
        for (var i = 0; i < arr.length; i++) {
            var boxList = $('<div class="selectNmuverBox"></div>');
            if (type == 'dxds') {
                var boxNumber = $('<div class="selectNumbers" style="padding: 0 148px;"></div>');
            } else {
                var boxNumber = $('<div class="selectNumbers"></div>');
            }

            boxList.append('<span class="numberTitle">' + arr[i] + '</span>');
            boxList.append(boxNumber);
            if (type == 'dxds') {
                for (var j in dxdsObj) {
                    boxNumber.append('<a href="javascript:void(0);" class="selectNumber" data-number="' + j + '">' + dxdsObj[j] + '</a>');
                }
            } else {
                for (var j = 0; j <= 9; j++) {
                    boxNumber.append('<a href="javascript:void(0);" class="selectNumber" data-number="' + j + '">' + j + '</a>');
                }
            }

            box.append(boxList);
        }
    }

    //添加龙虎game号码区
    function gameNumberLH(arr, type) {
        var box = $('.g_Number_Section');
        var lhObj = {
            '0': '龙',
            '1': '虎',
            '2': '和'
        };
        /**
        var lhObj = {
            '龙':'龙',
            '虎':'虎',
            '和':'和'
        };
         **/
        for (var i = 0; i < arr.length; i++) {
            var boxList = $('<div class="selectNmuverBox"></div>');
            if (type == 'lh')
                var boxNumber = $('<div class="selectNumbers" style="padding: 0 148px;"></div>');
            else
                var boxNumber = $('<div class="selectNumbers"></div>');

            boxList.append('<span class="numberTitle">' + arr[i] + '</span>');
            boxList.append(boxNumber);
            if (type == 'lh') {
                for (var j in lhObj) {
                    boxNumber.append('<a href="javascript:void(0);" class="selectNumber" data-number="' + j + '">' + lhObj[j] + '</a>');
                }
            } else {
                for (var j = 0; j <= 9; j++) {
                    boxNumber.append('<a href="javascript:void(0);" class="selectNumber" data-number="' + j + '">' + j + '</a>');
                }
            }

            box.append(boxList);
        }
    }

    //确认选号，添加到投注区
    $('.addtobetbtn').on('click', function() {
        var yBetting = $('.yBettingList');
        var menu0 = $('.play_select_tit').find('.curr').text();
        var menu1 = $('#bet_filter').find('.curr').parent().siblings('.title').text();
        var menu2 = $('#bet_filter').find('.curr').text();
        var times = $('.selectMultipInput').val();
        var selectRmb = $('.selectMultipleCon').val();
        var selectRmbStr = $('.selectMultipleCon').find('option:selected').text();
        var Numbers = '';
        var winningMoney = $('.play_select_prompt').find('span[way-data="tabDoc"] em').text();
        var winningMoneys = times * winningMoney * selectRmb;
        var bool = true;
        var trano = generateMixed(20);
        var rate = yrates[_thisPlayid];

        if (zhushus.length >= 1) {
            for (var i = 0; i < currNumber.length; i++) {
                for (var j = 0; j < currNumber[i].length; j++) {
                    // if(currNumber[i][j].length > 0){
                    if ((currNumber[i].length - 1) != j) {
                        Numbers += currNumber[i][j] + ' ';
                    } else {
                        Numbers += currNumber[i][j]
                    }
                    // }

                }
                // if(currNumber[i].length > 0){
                if ((currNumber.length - 1) != i) {
                    Numbers = Numbers + ',';
                }
                // }

            }

            yBetting.each(function(i) {
                var gameNumber = $(this).find('.number em').text();
                if (_thisPlayid == 'dxdsqe' || _thisPlayid == 'dxdshe' || _thisPlayid == 'dxdsqs' || _thisPlayid == 'dxdshs') {
                    gameNumber = gameNumber.replace(/大/g, '0');
                    gameNumber = gameNumber.replace(/小/g, '1');
                    gameNumber = gameNumber.replace(/单/g, '2');
                    gameNumber = gameNumber.replace(/双/g, '3');
                } else if (_thisPlayid == 'lhwq' || _thisPlayid == 'lhws' || _thisPlayid == 'lhwg' || _thisPlayid == 'lhqb' || _thisPlayid == 'lhqs' || _thisPlayid == 'lhqg' || _thisPlayid == 'lhbs' || _thisPlayid == 'lhbg' || _thisPlayid == 'lhsg') {
                    gameNumber = gameNumber.replace(/龙/g, '0');
                    gameNumber = gameNumber.replace(/虎/g, '1');
                    gameNumber = gameNumber.replace(/和/g, '2');
                }

                var gameNumberType = $(this).find('.number .yBettingType').text();
                var _thisType = '[' + menu0 + ',' + menu1 + ',' + menu2 + ']';
                var _thisRmb = $(this).find('.rmb').text();
                //console.log(gameNumberType == _thisType,gameNumberType, _thisType)
                if (gameNumber == Numbers && _thisRmb == selectRmbStr && gameNumberType == _thisType) {
                    bool = false;
                    var _thisTimes = parseInt($(this).find('.yBettingTimess').text()) + parseInt(times);
                    winningMoneys = _thisTimes * winningMoney * selectRmb;
                    winningMoneys = winningMoneys.toFixed(2);
                    $(this).find('.yBettingTimess').text(_thisTimes);
                    $(this).find('.maxMoneyNumber').text(winningMoneys + '元');
                    $(this).find('#betting_money').text(zhushus.length * minMoney * _thisTimes * selectRmb);
                    orderList[i].beishu = _thisTimes;
                    orderList[i].price = zhushus.length * minMoney * _thisTimes * selectRmb;
                }
            })

            if (bool) {
                var Numbersh = Numbers.replace(/,/g, '|');
                Numbersh = Numbersh.replace(/\s/g, ',');

                // var ymaxjj = (rate.maxjj * selectRmb) + '';
                //     if(ymaxjj.indexOf('.') == '-1'){
                //       ymaxjj = ymaxjj + '.00';
                //     }else{
                //       ymaxjj = ymaxjj.substring(0,ymaxjj.indexOf('.') + 3);
                //     }

                // var yminjj = (rate.minjj * selectRmb) + '';
                //     if(yminjj.indexOf('.') == '-1'){
                //       yminjj = yminjj + '.00';
                //     }else{
                //       yminjj = yminjj.substring(0,yminjj.indexOf('.') + 3);
                //     }


                var arr = {
                    'trano': trano,
                    'playtitle': rate.title,
                    'playid': rate.playid,
                    'number': Numbersh,
                    'zhushu': zhushus.length,
                    'price': lastMoney,
                    'minxf': rate.minxf,
                    'totalzs': rate.totalzs,
                    'maxjj': rate.maxjj,
                    'minjj': rate.minjj,
                    'maxzs': rate.maxzs,
                    'rate': rate.maxjj,
                    'beishu': parseInt(times),
                    'yjf': selectRmb
                }
                orderList.push(arr);
                if (_thisPlayid == 'dxdsqe' || _thisPlayid == 'dxdshe' || _thisPlayid == 'dxdsqs' || _thisPlayid == 'dxdshs') {
                    Numbers = Numbers.replace(/0/g, '大');
                    Numbers = Numbers.replace(/1/g, '小');
                    Numbers = Numbers.replace(/2/g, '单');
                    Numbers = Numbers.replace(/3/g, '双');
                } else if (_thisPlayid == 'lhwq' || _thisPlayid == 'lhws' || _thisPlayid == 'lhwg' || _thisPlayid == 'lhqb' || _thisPlayid == 'lhqs' || _thisPlayid == 'lhqg' || _thisPlayid == 'lhbs' || _thisPlayid == 'lhbg' || _thisPlayid == 'lhsg') {
                    Numbers = Numbers.replace(/0/g, '龙');
                    Numbers = Numbers.replace(/1/g, '虎');
                    Numbers = Numbers.replace(/2/g, '和');
                }

                var html = '<dd class="yBettingList" id="' + trano + '">' +
                    '<div class="numberBox yBettingDiv">' +
                    '<span class="number"><div class="yBettingType">[' + menu0 + ',' + menu1 + ',' + menu2 + ']</div> <em>' + Numbers + '</em></span>' +
                    '<a href="javascript:void(0);" class="numberInfo">详细</a> ' +
                    '</div>' +
                    '&nbsp;<div class="yBettingZhushu yBettingDiv">' +
                    '<em>' + zhushus.length + '</em>注' +
                    '</div>' +
                    '&nbsp;<div class="yBettingTimes yBettingDiv">' +
                    '<em class="yBettingTimess">' + times + '</em>倍' +
                    '</div>' +
                    '&nbsp;<div class="rmb yBettingDiv">' +
                    '' + selectRmbStr + '' +
                    '</div>' +
                    '&nbsp;<div class="maxMoney yBettingDiv">' +
                    '可中金额' +
                    '<em class="maxMoneyNumber">' + winningMoneys.toFixed(2) + '元</em>' +
                    '</div>' +
                    '<div class="sc" style="float: right;padding-right: 5px;">' +
                    '<a href="javascript:void(0);">' +
                    '<i class="fa fa-times" style="color: red;"></i>' +
                    '</a>' +
                    '</div>' +
                    '<div id="betting_money" style="display: none;">' + lastMoney + '</div>' +
                    '</dd>';
                $('.yBettingLists').append(html);
            }
            //console.log(orderList);
            $('.g_Number_Section').find('a').removeClass('curr');
            $('#text').val('');
            currNumber = [];
            zhushus = [];
            countMoney();
            countAll();
        } else {
            alt('最少选择一注')
        }

    })


    //确认投注
    $(document).on("click", "#f_submit_order", function() {
        if (orderList.length < 1) {
            alt('请选择投注号码', -1);
            return false;
        }
        var Orderdetaillist = '';
        var Orderdetailtotalprice = 0;
        for (var i = 0; i < orderList.length; i++) {
            var cur_order = orderList[i];
            var rate = yrates[cur_order.playid];
            var oprice = Number(cur_order.price);
            var cur_number = cur_order.number;
            Orderdetailtotalprice += oprice;
            if (_thisPlayid == 'dxdsqe' || _thisPlayid == 'dxdshe' || _thisPlayid == 'dxdsqs' || _thisPlayid == 'dxdshs') {
                cur_number = cur_number.replace(/0/g, '大');
                cur_number = cur_number.replace(/1/g, '小');
                cur_number = cur_number.replace(/2/g, '单');
                cur_number = cur_number.replace(/3/g, '双');
            } else if (_thisPlayid == 'lhwq' || _thisPlayid == 'lhws' || _thisPlayid == 'lhwg' || _thisPlayid == 'lhqb' || _thisPlayid == 'lhqs' || _thisPlayid == 'lhqg' || _thisPlayid == 'lhbs' || _thisPlayid == 'lhbg' || _thisPlayid == 'lhsg') {
                cur_number = cur_number.replace(/0/g, '龙');
                cur_number = cur_number.replace(/1/g, '虎');
                cur_number = cur_number.replace(/2/g, '和');
            } else {
                cur_number = cur_order.number;
            }
            Orderdetaillist += "<p>" + rate.title + ':<span class="mark">' + cur_number + '</span>&nbsp;&nbsp;注数:<span class="mark">' + cur_order.zhushu + '</span>&nbsp;&nbsp;金额:<span class="mark">' + oprice.toFixed(2) + "</span></p>";
        }
        $("#Orderdetaillist").html(Orderdetaillist);
        $("#Orderdetailtotalprice").text(Orderdetailtotalprice.toFixed(2));
        //console.log(orderList);
        artDialog({
            title: "投注详情<span style='margin-left:15px;'><img src='" + WebConfigs["ROOT"] + "/resources/images/icon/icon_09.png'>截至时间:<strong class='sty-h gametimes' style='font-weight:normal'>00:00:00</strong></span>",
            content: $("#submitComfirebox").html(),
            cancel: function() {},
            ok: function() {
                if (!user) {
                    alt('请先登陆', -1);
                }
                $.ajax({
                    type: "POST",
                    url: apirooturl + 'cpbuy',
                    data: {
                        "orderList": orderList,
                        'expect': lottery.currFullExpect,
                        'lotteryname': lotteryname
                    },
                    beforeSend: function() {
                        $('.looding').show();
                    },
                    success: function(json) {
                        if (json.sign) {
                            $("#orderlist_clear").click();
                            getUserBetsListToday(lotteryname);
                            alt('投注成功', 1);
                        } else {
                            alt(json.message, -1);
                        }
                        $('.looding').hide();
                    }
                })
            },
            lock: true
        });
    });

    //玩法切换
    $(document).on('click', '#j_play_select li', function() {
        var this_attr = $(this).attr('lottery_code');
        $(this).addClass('curr').siblings('li').removeClass('curr');
        $('.g_Number_Section').html('');
        $('#detail_order').hide();
        $('.selectMultiple').show();
        $('.addtobet').show();
        $('.g_Number_Section').css('background', 'url(' + window.location.origin + '/resources/images/betBg.png) repeat');

        switch (this_attr) {
            case '5x':
                $('#bet_filter').remove();
                gameSwitch($('.bet_filter_box'), ssc_5x_title, ssc_5x_arr);
                _thisPlayid = 'wxzhixfs';
                rates = yrates[_thisPlayid];
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('每位至少选择一个号码，竞猜开奖号码的全部五位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(wx_fs);
                break;
            case '4x':
                $('#bet_filter').remove();
                gameSwitch($('.bet_filter_box'), ssc_4x_title, ssc_4x_arr);
                _thisPlayid = 'sixzhixfsh';
                rates = yrates[_thisPlayid];
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('每位至少选择一个号码，竞猜开奖号码的后四位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(sx_fs);
                break;
            case 'q3':
                $('#bet_filter').remove();
                gameSwitch($('.bet_filter_box'), ssc_q3_title, ssc_q3_arr);
                _thisPlayid = 'sxzhixfsq';
                rates = yrates[_thisPlayid];
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('每位至少选择一个号码，竞猜开奖号码的前三位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(q3_sxzhixfsq);
                break;
            case 'z3':
                $('#bet_filter').remove();
                gameSwitch($('.bet_filter_box'), ssc_q3_title, ssc_z3_arr);
                _thisPlayid = 'sxzhixfsz';
                rates = yrates[_thisPlayid];
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('每位至少选择一个号码，竞猜开奖号码的中三位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(z3_sxzhixfsq);
                break;
            case 'h3':
                $('#bet_filter').remove();
                gameSwitch($('.bet_filter_box'), ssc_q3_title, ssc_h3_arr);
                _thisPlayid = 'sxzhixfsh';
                rates = yrates[_thisPlayid];
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('每位至少选择一个号码，竞猜开奖号码的后三位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(h3_sxzhixfsq);
                break;
            case 'q2':
                $('#bet_filter').remove();
                gameSwitch($('.bet_filter_box'), ssc_q2_title, ssc_q2_arr);
                _thisPlayid = 'exzhixfsq';
                rates = yrates[_thisPlayid];
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('每位至少选择一个号码，竞猜开奖号码的前二位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(q2_exzhixfs);
                break;
            case 'h2':
                $('#bet_filter').remove();
                gameSwitch($('.bet_filter_box'), ssc_q2_title, ssc_h2_arr);
                _thisPlayid = 'exzhixfsh';
                rates = yrates[_thisPlayid];
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('每位至少选择一个号码，竞猜开奖号码的后二位，号码和位置都对应即中奖，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(h2_exzhixfs);
                break;
            case '1x':
                $('#bet_filter').remove();
                gameSwitch($('.bet_filter_box'), ssc_1x_title, ssc_1x_arr);
                _thisPlayid = 'dweid';
                rates = yrates[_thisPlayid];
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从万位、千位、百位、十位、个位任意位置上至少选择1个号码，选号与相同位置上的开奖号码一致，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumber(wx_fs);
                break;
            case 'dsds':
                $('#bet_filter').remove();
                gameSwitch($('.bet_filter_box'), ssc_dsds_title, ssc_dsds_arr);
                _thisPlayid = 'dxdsqe';
                rates = yrates[_thisPlayid];
                $('.play_select_prompt').find('span[way-data="tabDoc"]')
                    .html('从万位、千位中的“大、小、单、双”中至少各选一个组成一注，奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                gameNumberZxbd(dxdsqe, 'dxds');
                break;
            case 'lh':
                $('#bet_filter').remove();
                gameSwitch($('.bet_filter_box'), ssc_lh_title, ssc_lh_arr);
                _thisPlayid = 'lhwq';
                rates = yrates[_thisPlayid];
                //$('.play_select_prompt').find('span[way-data="tabDoc"]').html('玩法介绍:奖金 <em style="color:red;">' + rates.maxjj + '</em>元');
                $('.play_select_prompt').find('span[way-data="tabDoc"]').html('');
                gameNumberLH(lh_lhwq, 'lh');
                break;
            case 'xyp':
                $('#bet_filter').remove();
                $('.g_Number_Section').css('background', 'none');
                gameSwitch($('.bet_filter_box'), ssc_xyp_title, ssc_xyp_arr);
                _thisPlayid = 'lmp';
                //玩法介绍
                $('.play_select_prompt').find('span[way-data="tabDoc"]').html('信用盘为经典玩法，下注金额为<em style="color:red;">1元</em>投注模式。');
                rates = yrates[_thisPlayid];
                changeXYPGame();
                //两面盘
                gameNumberXYP(lmp_lmp, lmp_title_arr[0], lmp_lmp_arr);
                //总合
                gameNumberZH(lmp_zongh, lmp_title_arr[1], lmp_lmp_arr);
                break;
        }
        addAndSubtract();
    })

    //全，大，小，奇，偶，清
    $('.g_Number_Section').on('click', '.selectNumberFilters a', function() {
        var _thisAttr = $(this).attr('data-param');
        switch (_thisAttr) {
            case 'js-btn-all':
                $(this).parent().siblings('.selectNumbers').find('a').addClass('curr');
                break;
            case 'js-btn-big':
                $(this).parent().siblings('.selectNumbers').find('a').each(function(i) {
                    if (i < 5) {
                        $(this).removeClass('curr');
                    } else {
                        $(this).addClass('curr');
                    }
                })
                break;
            case 'js-btn-small':
                $(this).parent().siblings('.selectNumbers').find('a').each(function(i) {
                    if (i >= 5) {
                        $(this).removeClass('curr');
                    } else {
                        $(this).addClass('curr');
                    }
                })
                break;
            case 'js-btn-odd':
                $(this).parent().siblings('.selectNumbers').find('a').each(function(i) {
                    if (i % 2 == 0) {
                        $(this).removeClass('curr');
                    } else {
                        $(this).addClass('curr');
                    }
                });
                break;
            case 'js-btn-even':
                $(this).parent().siblings('.selectNumbers').find('a').each(function(i) {
                    if (i % 2 != 0) {
                        $(this).removeClass('curr');
                    } else {
                        $(this).addClass('curr');
                    }
                });
                break;
            case 'js-btn-clean':
                $(this).parent().siblings('.selectNumbers').find('a').removeClass('curr');
                break;
        }
        currNumber = currList();
        countFun();
        countMoney();
    });

    function util_unique(v, reg, digit, itemsort, baohao) {
        if (digit == undefined || digit == null) {
            digit = 1;
        }
        //v = v.replace(/ /g, ',');
        var sszz = new Array();
        var titems = {};
        var titem;
        while ((titem = reg.exec(v)) != null) {
            var key = titem[0];
            if (itemsort) {
                if (digit == 1) {
                    key = key.match(/./g).sort().join('');
                } else if (digit == 2) {
                    key = key.match(/.{2}/g).sort().join(' ');
                } else {
                    key = key.match(/./g).sort().join('');
                }
            } else {
                if (digit == 2) {
                    key = key.match(/.{2}/g).join(' ');
                }
            }
            if (!titems[key]) {
                if (baohao) {
                    // 去除豹子号如222，用户前三 中三 后三 任选三混合组选
                    if (!(key.charAt(0) == key.charAt(1) && key.charAt(0) == key.charAt(2) && key.charAt(1) == key.charAt(2))) {
                        titems[key] = 1;
                        sszz.push(key);
                    }
                } else {
                    titems[key] = 1;
                    sszz.push(key);
                }
            }
        }
        return sszz;
    };

    function sortNumber(a, b) {
        return a - b
    }

    //检测相同的数字
    function checkRepeat(str) {
        var arr = str.split("");
        for (var i = 0, length = arr.length; i < length - 1; i++) {
            if (arr.slice(i + 1).indexOf(arr[i]) >= 0) {
                return true;
            }
        }
        return false;
    }

    function checkNumber(string, len, clickObj) {
        var NumberArr = string.split(' ');
        var errArr = [];
        yesArr = [];
        var errString = '';
        var yesString = '';
        var itemcount = 0;
        for (var i = 0; i < NumberArr.length; i++) {
            if (NumberArr[i].length > len || NumberArr[i].length < len) {
                errArr.push(NumberArr[i]);
            } else {
                yesArr.push(NumberArr[i]);
            }
        }
        for (var j = 0; j < errArr.length; j++) {
            errString += errArr[j] + ' ';
        }
        for (var k = 0; k < yesArr.length; k++) {
            yesString += yesArr[k] + ' ';
        }

        if (_thisPlayid == 'sxhhzxq' || _thisPlayid == 'sxhhzxz' || _thisPlayid == 'sxhhzxh') {
            var v = string;
            var reg = /\b[0-9]{3}\b/g;
            // 去重复
            var sszz = util_unique(v, reg, 1, true, true);
            sszz = sszz.sort();
            if (sszz) {
                itemcount = sszz.length;
                yesArr = sszz;
            }
        }

        if (_thisPlayid == 'qszsds' || _thisPlayid == 'zszsds' || _thisPlayid == 'hszsds') {

            var stringArr = [];
            var lens = yesArr.length;
            //console.log(yesArr)
            for (var x = 0; x < lens; x++) {
                var yesArrbox = [];
                stringArr = yesArr[x].split('');
                stringArr.sort(sortNumber);
                yesArr[x] = stringArr.join('');
            }

            for (var xx = 0; xx < lens; xx++) {
                if (yesArr[xx]) {
                    if (!checkRepeat(yesArr[xx]) || /^(\d)\1+$/.test(yesArr[xx])) {
                        yesArr.splice(xx--, 1);
                    }
                }
            }

        }

        if (_thisPlayid == 'qszlds' || _thisPlayid == 'zszlds' || _thisPlayid == 'hszlds') {

            var stringArr = [];
            var lens = yesArr.length;
            for (var x = 0; x < lens; x++) {
                var yesArrbox = [];
                stringArr = yesArr[x].split('');
                stringArr.sort(sortNumber);
                yesArr[x] = stringArr.join('');
            }

            for (var xx = 0; xx < lens; xx++) {
                if (yesArr[xx]) {
                    if (checkRepeat(yesArr[xx]) || /^(\d)\1+$/.test(yesArr[xx])) {
                        yesArr.splice(xx--, 1);
                    }
                }
            }

        }

        if (_thisPlayid == 'exzuxdsq' || _thisPlayid == 'exzuxdsh') {
            var v = string;
            var reg = /\b([0-9])(?!\1)([0-9])\b/g;
            // 去重复
            var sszz = util_unique(v, reg, 1, true);
            sszz = sszz.sort();
            if (sszz) {
                itemcount = sszz.length;
                yesArr = sszz;
            }
        }

        if (clickObj == 'remove') {
            if (string == '') {
                alt('请投注');
                return;
            }
            if (errArr.length < 1) {
                alt('全部投注格式正确');
            } else {
                $('#text').val(yesString);
                alt('以下投注格式不正确： <br /> ' + errString + '');
            }
        }

        if (clickObj == 'test') {
            if (string == '') {
                alt('请投注');
                return;
            }
            if (errArr.length < 1) {
                alt('全部投注格式正确');
            } else {
                alt('以下投注格式不正确： <br /> ' + errString + '');
            }
        }

    }

    function danshiGame() {
        var html = '<div class="g_text">' +
            '<textarea name="" value="123456" id="text" cols="30" rows="10" placeholder="每注号码以空格进行分割"></textarea>' +
            '<button type="button" class="remove_btn">删除错误项</button>' +
            '<button type="button" class="test_istrue">检查格式是否正确	</button>' +
            '<button type="button" class="empty_text">清空文本框</button>' +
            '</div>';
        $('.g_Number_Section').append(html);
    }

    //添加game号码区
    function gameNumber(arr, number, start) {
        var box = $('.g_Number_Section');
        for (var i = 0; i < arr.length; i++) {
            var filterHtml = '<div class="selectNumberFilters">' +
                '<a href="javascript:void(0);" class="selectNumberFilter" data-param="js-btn-all">全</a>' +
                '<a href="javascript:void(0);" class="selectNumberFilter" data-param="js-btn-big">大</a>' +
                '<a href="javascript:void(0);" class="selectNumberFilter" data-param="js-btn-small">小</a>' +
                '<a href="javascript:void(0);" class="selectNumberFilter" data-param="js-btn-odd">奇</a>' +
                '<a href="javascript:void(0);" class="selectNumberFilter" data-param="js-btn-even">偶</a>' +
                '<a href="javascript:void(0);" class="selectNumberFilter" data-param="js-btn-clean">清</a>' +
                '</div>';
            var boxList = $('<div class="selectNmuverBox"></div>');
            var boxNumber = $('<div class="selectNumbers"></div>');
            boxList.append('<span class="numberTitle">' + arr[i] + '</span>');
            boxList.append(boxNumber);
            boxList.append(filterHtml);
            if (number && start) {
                for (var j = start; j <= number; j++) {
                    boxNumber.append('<a href="javascript:void(0);" class="selectNumber" data-number="' + j + '">' + j + '</a>');
                }
            } else if (number) {
                for (var j = 0; j <= number; j++) {
                    boxNumber.append('<a href="javascript:void(0);" class="selectNumber" data-number="' + j + '">' + j + '</a>');
                }
            } else {
                for (var j = 0; j <= 9; j++) {
                    boxNumber.append('<a href="javascript:void(0);" class="selectNumber" data-number="' + j + '">' + j + '</a>');
                }
            }

            box.append(boxList);
        }
    }

    //添加二级玩法切换
    function gameSwitch(obj, title_arr, option_arrs) {
        var ul = $('<ul></ul>');
        var span = '';
        var bool = true;
        ul.attr('id', 'bet_filter');

        for (var i = 0; i < title_arr.length; i++) {
            var li = $('<li></li>');
            var betOptionDiv = $('<div class="bet_option"></div>');
            li.attr('class', 'bet_filter_item');
            li.append('<strong class="title">' + title_arr[i] + '</strong>');
            for (j in option_arrs[i]) {
                if (bool) {
                    span = '<span class="bet_options curr" lottery_code_two="' + j + '">' + option_arrs[i][j] + '</span>';
                    bool = false;
                } else {
                    span = '<span class="bet_options" lottery_code_two="' + j + '">' + option_arrs[i][j] + '</span>';
                }
                betOptionDiv.append(span);
            }
            li.append(betOptionDiv);
            ul.append(li);
        }
        $('.bet_filter_item').eq(0).find('.bet_options').eq(0).addClass('curr');
        obj.append(ul);
    }


    //倍数加减fn
    function addAndSubtract(string) {
        inputVal = isNaN(parseInt($('.selectMultipInput').val())) ? 1 : parseInt($('.selectMultipInput').val());
        if (_thisPlayid == 'dxdsqe' || _thisPlayid == 'dxdshe' || _thisPlayid == 'dxdsqs' || _thisPlayid == 'dxdshs') {
            maxbeishu = 100000;
        } else {
            maxbeishu = 10000;
        }
        if (inputVal <= 1) {
            $('.selectMultipInput').val(1);
            $('.reduce').addClass('noReduce');
        }
        if (inputVal > maxbeishu) {
            $('.selectMultipInput').val(maxbeishu);
            $('.reduce').removeClass('noReduce');
            $('.selectMultiple .add').addClass('noReduce');
            return;
        }
        if ('+' == string) {
            inputVal++;
            if (inputVal >= maxbeishu) {
                $('.selectMultipInput').val(maxbeishu);
                $('.selectMultiple .add').addClass('noReduce');
                return;
            }
            $('.selectMultiple .add').removeClass('noReduce');
            $('.selectMultipInput').val(inputVal);
        } else if ('-' == string) {
            inputVal--;
            if (inputVal <= 1) {
                $('.selectMultipInput').val(1);
                $('.reduce').addClass('noReduce');
                return;
            }
            $('.reduce').removeClass('noReduce');
            $('.selectMultipInput').val(inputVal);
        }
        if (inputVal > 1 && inputVal < maxbeishu) {
            $('.reduce').removeClass('noReduce');
        }
        if (inputVal < maxbeishu) {
            $('.selectMultiple .add').removeClass('noReduce');
        }
    }

    //生成随机订单号
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    function generateMixed(n) {
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    }

    //计算方案注数
    function countAll() {
        var eachZhushus = 0;
        var eachMoneys = 0;

        $('.yBettingList').each(function(i) {
            var eachZhushu = parseInt($(this).find('.yBettingZhushu em').text());
            var eachMoney = parseFloat($(this).find('#betting_money').text());
            eachZhushus += eachZhushu;
            eachMoneys += eachMoney;
        })

        AllZhushu = eachZhushus;
        AllMoney = eachMoneys;
        $('#f_gameOrder_lotterys_num').text(AllZhushu);
        $('#f_gameOrder_amount').text(AllMoney.toFixed(2));
    }

    //计算选号金额
    function countMoney() {
        var currZhushu = parseInt(zhushus.length);
        var currTimes = parseInt($('.selectMultipInput').val());
        var currSlect = parseFloat($('.selectMultipleCon').val());
        var toTal = currZhushu * minMoney * currTimes * currSlect;
        lastMoney = toTal.toFixed(2);
        $('.zhushu').text(currZhushu);
        $('.selectMultipleOldMoney').text(lastMoney);
    }

    //组合排列
    function combination(arr) {
        var sarr = [
            []
        ];

        for (var i = 0; i < arr.length; i++) {
            var sta = [];
            for (var j = 0; j < sarr.length; j++) {
                for (var k = 0; k < arr[i].length; k++) {
                    sta.push(sarr[j].concat(arr[i][k]));
                }
            }
            sarr = sta;
        }
        return sarr;
    }

    //组合算法
    function combine(arr, num) {
        var r = [];
        (function f(t, a, n) {
            if (n == 0) return r.push(t);
            for (var i = 0, l = a.length; i <= l - n; i++) {
                f(t.concat(a[i]), a.slice(i + 1), n - 1);
            }
        })([], arr, num);
        return r;
    }

    //获取每个位数选中的数
    function currList() {
        var currArr = [];
        $('.selectNumbers').each(function(i) {
            var acArr = [];
            $(this).find('.curr').each(function(i) {
                acArr.push($(this).attr('data-number'));
            })
            currArr.push(acArr);
        })
        return currArr;
    }

    //验证数字空格
    function chkPrice(obj) {
        obj.value = obj.value.replace(/[^\d.\s*]/g, "");
        //必须保证第一位为数字而不是.
        obj.value = obj.value.replace(/^\./g, "");
        //保证只有出现一个.而没有多个.
        obj.value = obj.value.replace(/\.{2,}/g, ".");
        //保证.只出现一次，而不能出现两次以上
        obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    }

    //非法字符截取
    function chkLast(obj) {
        if (obj.value.substr((obj.value.length - 1), 1) == '.')
            obj.value = obj.value.substr(0, (obj.value.length - 1));
    }

    /**
     * 当天投注记录
     * @param shortName
     */
    function getUserBetsListToday(_lotteryname) {
        if (!user || user.islogin != 1) {
            return false;
        }
        lotteryname = _lotteryname ? _lotteryname : lotteryname;
        var tabs = $("#userBetsListToday");
        tabs.empty();
        var url = apirooturl + 'betslisttoday';
        var pagination = $.pagination({
            render: '.paging',
            pageSize: jqueryGridRows,
            pageLength: 7,
            ajaxType: 'post',
            //hideInfos: false,
            hideGo: true,
            ajaxUrl: url,
            ajaxData: {
                "lotteryname": lotteryname,
                'jqueryGridPage': jqueryGridPage,
                'jqueryGridRows': jqueryGridRows
            },
            complete: function() {},
            success: function(data) {
                tabs.empty();
                $.each(data, function(index, val) {
                    var html = '<tr id="' + val.trano + '">';
                    html += '<td> <a href="javascript:getBillInfo(\'' + val.trano + '\')">' + val.trano + '</a></td>';
                    html += '<td>' + val.expect + '</td>';
                    html += '<td>' + val.opencode + '</td>';
                    html += '<td>' + val.playtitle + '</td>';
                    html += '<td>' + val.mode + '</td>';
                    html += '<td>' + val.amount + '</td>';
                    html += '<td>' + (val.okamount ? val.okamount : 0) + '</td>';
                    html += '<td>' + val.oddtime + '</td>';
                    html += '<td>';
                    //'<td>' + val.betsTimes + '</td>' +
                    if (val.isdraw == -1) { // 未中奖绿色
                        html += '<span style="color:green">未中奖</span>';
                    } else if (val.isdraw == 1) { // 已中奖红色
                        html += '<span style="color:red">已中奖</span>';
                    } else if (val.isdraw == -2) {
                        html += '<del>已撤单</del>';
                    } else if (val.isdraw == 0) {
                        html += '<span>未开奖</span>';
                    } else {
                        html += '<span>未知状态</span>';
                    }
                    html += '</td>';
                    html += '</tr>';
                    tabs.append(html);
                });
            },
            pageError: function(response) {},
            emptyData: function() {}
        });
        pagination.init();
    }

    /**
     * 随机投注
     */
    function randomTouzhu() {
        var ceshi = $('.g_Number_Section').find('.selectNmuverBox');
        var randomsumber = 0;
        ceshi.find('.selectNumber').removeClass('curr');
        $('#text').val('');

        if (_thisPlayid == 'wxzhixds') {
            var str = '';
            for (var a = 0; a < 5; a++) {
                randomsumber = Math.round(Math.random() * (9 - 1) + 1);
                str = randomsumber + str;
            }
            $('#text').val(str);
        } else if (_thisPlayid == 'sixzhixdsh') {
            var str = '';
            for (var a = 0; a < 4; a++) {
                randomsumber = Math.round(Math.random() * (9 - 1) + 1);
                str = randomsumber + str;
            }
            $('#text').val(str);
        } else if (_thisPlayid == 'sxzhixdsq' || _thisPlayid == 'sxzhixdsz' || _thisPlayid == 'sxzhixdsh') {
            var str = '';
            for (var a = 0; a < 3; a++) {
                randomsumber = Math.round(Math.random() * (9 - 1) + 1);
                str = randomsumber + str;
            }

            $('#text').val(str);
        } else if (_thisPlayid == 'exzhixdsq' || _thisPlayid == 'exzhixdsh') {
            var str = '';
            for (var a = 0; a < 2; a++) {
                randomsumber = Math.round(Math.random() * (9 - 1) + 1);
                str = randomsumber + str;
            }

            $('#text').val(str);
        } else if (_thisPlayid == 'wxzhixfs' || _thisPlayid == 'bdw5x1m' || _thisPlayid == 'qwyffs' ||
            _thisPlayid == 'qwhscs' || _thisPlayid == 'qwsxbx' || _thisPlayid == 'qwsjfc' ||
            _thisPlayid == 'sixzhixfsh' || _thisPlayid == 'bdw4x1m' || _thisPlayid == 'sxzhixfsq' ||
            _thisPlayid == 'sxzhixfsz' || _thisPlayid == 'sxzhixfsh' ||
            _thisPlayid == 'exzhixfsq' || _thisPlayid == 'exzhixfsh' ||
            _thisPlayid == 'zhixhzqe' || _thisPlayid == 'zhixhzhe' ||
            _thisPlayid == 'kuaduqe' || _thisPlayid == 'kuaduhe'
        ) {
            for (var a = 0; a < ceshi.length; a++) {
                randomsumber = Math.round(Math.random() * (9 - 1) + 1);
                ceshi.eq(a).find('.selectNumbers a').eq(randomsumber).addClass('curr');
            }
        } else if (_thisPlayid == 'dxdsqe' || _thisPlayid == 'dxdshe' || _thisPlayid == 'dxdsqs' || _thisPlayid == 'dxdshs') {
            for (var a = 0; a < ceshi.length; a++) {
                randomsumber = Math.round(Math.random() * (3 - 1) + 1);
                ceshi.eq(a).find('.selectNumbers a').eq(randomsumber).addClass('curr');
            }
        } else if (_thisPlayid == 'lhwq' || _thisPlayid == 'lhws' || _thisPlayid == 'lhwg' || _thisPlayid == 'lhqb' || _thisPlayid == 'lhqs' || _thisPlayid == 'lhqg' || _thisPlayid == 'lhbs' || _thisPlayid == 'lhbg' || _thisPlayid == 'lhsg') {
            for (var a = 0; a < ceshi.length; a++) {
                randomsumber = Math.round(Math.random() * 10) % 3;
                ceshi.eq(a).find('.selectNumbers a').eq(randomsumber).addClass('curr');
            }
        } else if (_thisPlayid == 'wxzxyel') {
            var arr = [];
            for (var a = 0; a < ceshi.length; a++) {
                for (var aa = 0; aa < 5; aa++) {

                    randomsumber = Math.round(Math.random() * (9 - 1) + 1);
                    ceshi.eq(a).find('.selectNumbers .curr').each(function() {
                        arr.push($(this).text());
                    })

                    randomsumber = getRandom(arr);
                    ceshi.eq(a).find('.selectNumbers a').eq(randomsumber).addClass('curr');

                }
            }
        } else if (_thisPlayid == 'wxzxls') {
            var arr = [];
            randomsumber = Math.round(Math.random() * (9 - 1) + 1);
            ceshi.eq(0).find('.selectNumbers a').eq(randomsumber).addClass('curr');
            arr.push(randomsumber);
            for (var a = 0; a < 3; a++) {

                ceshi.eq(1).find('.selectNumbers .curr').each(function() {
                    arr.push($(this).text());
                })

                randomsumber = getRandom(arr);
                ceshi.eq(1).find('.selectNumbers a').eq(randomsumber).addClass('curr');
            }
        } else if (_thisPlayid == 'wxzxsl') {
            var arr = [];
            randomsumber = Math.round(Math.random() * (9 - 1) + 1);
            ceshi.eq(1).find('.selectNumbers a').eq(randomsumber).addClass('curr');
            arr.push(randomsumber);
            for (var a = 0; a < 2; a++) {

                ceshi.eq(0).find('.selectNumbers .curr').each(function() {
                    arr.push($(this).text());
                })

                randomsumber = getRandom(arr);
                ceshi.eq(0).find('.selectNumbers a').eq(randomsumber).addClass('curr');
            }
        } else if (_thisPlayid == 'wxzxel') {
            var arr = [];
            randomsumber = Math.round(Math.random() * (9 - 1) + 1);
            ceshi.eq(0).find('.selectNumbers a').eq(randomsumber).addClass('curr');
            arr.push(randomsumber);
            for (var a = 0; a < 2; a++) {

                ceshi.eq(1).find('.selectNumbers .curr').each(function() {
                    arr.push($(this).text());
                })

                randomsumber = getRandom(arr);
                ceshi.eq(1).find('.selectNumbers a').eq(randomsumber).addClass('curr');
            }
        } else if (_thisPlayid == 'wxzxyl' || _thisPlayid == 'wxzxw') {
            var arr = [];
            randomsumber = Math.round(Math.random() * (9 - 1) + 1);
            ceshi.eq(0).find('.selectNumbers a').eq(randomsumber).addClass('curr');
            arr.push(randomsumber);
            for (var a = 0; a < 1; a++) {

                ceshi.eq(1).find('.selectNumbers .curr').each(function() {
                    arr.push($(this).text());
                })

                randomsumber = getRandom(arr);
                ceshi.eq(1).find('.selectNumbers a').eq(randomsumber).addClass('curr');
            }
        } else if (_thisPlayid == 'bdw5x2m') {
            var arr = [];
            for (var a = 0; a < ceshi.length; a++) {
                for (var aa = 0; aa < 2; aa++) {

                    randomsumber = Math.round(Math.random() * (9 - 1) + 1);
                    ceshi.eq(a).find('.selectNumbers .curr').each(function() {
                        arr.push($(this).text());
                    })

                    randomsumber = getRandom(arr);
                    ceshi.eq(a).find('.selectNumbers a').eq(randomsumber).addClass('curr');

                }
            }
        } else if (_thisPlayid == 'bdw5x3m') {
            var arr = [];
            for (var a = 0; a < ceshi.length; a++) {
                for (var aa = 0; aa < 3; aa++) {

                    randomsumber = Math.round(Math.random() * (9 - 1) + 1);
                    ceshi.eq(a).find('.selectNumbers .curr').each(function() {
                        arr.push($(this).text());
                    })

                    randomsumber = getRandom(arr);
                    ceshi.eq(a).find('.selectNumbers a').eq(randomsumber).addClass('curr');

                }
            }
        } else if (_thisPlayid == 'hsizxes') {
            zuxuan120(4);
        } else if (_thisPlayid == 'hsizxye') {
            zuxuanDS(2);
        } else if (_thisPlayid == 'hsizxl') {
            zuxuan120(2);
        } else if (_thisPlayid == 'hsizxs') {
            zuxuanDS(1);
        } else if (_thisPlayid == 'bdw4x2m' ||
            _thisPlayid == 'sxzuxzsq' || _thisPlayid == 'sxzuxzsz' || _thisPlayid == 'sxzuxzsh' ||
            _thisPlayid == 'bdwqs2m' || _thisPlayid == 'bdwzs2m' || _thisPlayid == 'bdwhs2m' ||
            _thisPlayid == 'exzuxfsq' || _thisPlayid == 'exzuxfsh') {
            zuxuan120(2);
        } else if (_thisPlayid == 'sxzuxzlq' || _thisPlayid == 'sxzuxzlz' || _thisPlayid == 'sxzuxzlh') {
            zuxuan120(3);
        } else if (_thisPlayid == 'zhixhzqs' || _thisPlayid == 'zhixhzzs' ||
            _thisPlayid == 'zhixhzhs' || _thisPlayid == 'kuaduqs' ||
            _thisPlayid == 'kuaduzs' || _thisPlayid == 'kuaduhs' ||
            _thisPlayid == 'zuxhzqs' || _thisPlayid == 'zuxhzzs' || _thisPlayid == 'zuxhzhs' ||
            _thisPlayid == 'zuxcsbd' || _thisPlayid == 'zuxzsbd' || _thisPlayid == 'zuxhsbd' ||
            _thisPlayid == 'bdwqs' || _thisPlayid == 'bdwzs' || _thisPlayid == 'bdwhs' ||
            _thisPlayid == 'zuxhzqe' || _thisPlayid == 'zuxhzhe' ||
            _thisPlayid == 'zuxcebd' || _thisPlayid == 'zuxhebd') {
            zuxuan120(1);
        } else if (_thisPlayid == 'qszsds' || _thisPlayid == 'zszsds' || _thisPlayid == 'hszsds') {
            var str = '';
            for (var a = 0; a < 2; a++) {
                randomsumber = Math.round(Math.random() * (9 - 1) + 1);
                if (randomsumber == parseInt(str)) {
                    var randomstr = getRandom(randomsumber);
                    str = randomstr + str;
                } else {
                    str = randomsumber + str;
                }

            }
            str = randomsumber + str;

            $('#text').val(str);
        } else if (_thisPlayid == 'qszlds' || _thisPlayid == 'zszlds' || _thisPlayid == 'hszlds' ||
            _thisPlayid == 'sxhhzxq' || _thisPlayid == 'sxhhzxz' || _thisPlayid == 'sxhhzxh') {
            var str = '';
            var arr = [];
            for (var a = 0; a < 3; a++) {
                randomsumber = Math.round(Math.random() * (9 - 1) + 1);
                str = randomsumber + str;
            }
            arr = str.split('');
            arr = unique1(arr);

            if (arr.length == 2) {
                randomsumber = getRandom(arr);
                arr.push(randomsumber);
                str = arr.join('');
            } else if (arr.length == 1) {
                randomsumber = getRandom(arr);
                arr.push(randomsumber);
                randomsumber = getRandom(arr);
                arr.push(randomsumber);
                str = arr.join('');
            }

            $('#text').val(str);
        } else if (_thisPlayid == 'exzuxdsq' || _thisPlayid == 'exzuxdsh') {
            var str = '';
            for (var a = 0; a < 2; a++) {
                randomsumber = Math.round(Math.random() * (9 - 1) + 1);
                if (randomsumber == parseInt(str)) {
                    var randomstr = getRandom(randomsumber);
                    str = randomstr + str;
                } else {
                    str = randomsumber + str;
                }
            }

            $('#text').val(str);
        } else if (_thisPlayid == 'dweid') {

            randomsumber = Math.round(Math.random() * (9 - 1) + 1);
            var randomsumber2 = Math.round(Math.random() * (4 - 1) + 1);
            ceshi.eq(randomsumber2).find('.selectNumbers a').eq(randomsumber).addClass('curr');

        }

        $('#orderlist_clear').show();
        if ($('#text').length > 0) {
            var textobj = document.getElementById('text');
            chkPrice(textobj);
            chkLast(textobj);
            var text = $('#text').val();
            checkNumber(text, danshiNumberL);
            yesArr = unique1(yesArr);
            currNumber = yesArr;
            zhushus = yesArr;
            countMoney();
            if (zhushus.length > 0) {
                $('#selectMultipleTId').show();
                $('#addIconId').show();
                $('#selectMultipleB_nId').show();
                $('.addtobetbtn').css('background', '#dc3b40');
                $('#selectMultipleLz_show').addClass('selectMultipleLzAdd');
                var Numbers = '';
                for (var i = 0; i < currNumber.length; i++) {
                    for (var j = 0; j < currNumber[i].length; j++) {
                        if ((currNumber[i].length - 1) != j) {
                            Numbers += currNumber[i][j] + ' ';
                        } else {
                            Numbers += currNumber[i][j]
                        }
                    }
                    if ((currNumber.length - 1) != i) {
                        Numbers = Numbers + ',';
                    }
                }
                $('#selectMultipleB_nId').text(Numbers);
            } else {
                $('.zhushu').text(0);
                $('.selectMultipleOldMoney').text(0.00);
                $('#selectMultipleTId').hide();
                $('#addIconId').hide();
                $('#selectMultipleB_nId').hide();
                $('.addtobetbtn').css('background', '#252625');
                $('#selectMultipleLz_show').removeClass('selectMultipleLzAdd');
            }
        } else {

            currNumber = currList();
            countFun()
            countMoney();
            if (zhushus.length > 0) {
                $('#selectMultipleTId').show();
                $('#addIconId').show();
                $('#selectMultipleB_nId').show();
                $('.addtobetbtn').css('background', '#dc3b40');
                $('#selectMultipleLz_show').addClass('selectMultipleLzAdd');
                var Numbers = '';
                for (var i = 0; i < currNumber.length; i++) {
                    for (var j = 0; j < currNumber[i].length; j++) {
                        if ((currNumber[i].length - 1) != j) {
                            Numbers += currNumber[i][j] + ' ';
                        } else {
                            Numbers += currNumber[i][j]
                        }
                    }
                    if ((currNumber.length - 1) != i) {
                        Numbers = Numbers + ',';
                    }
                }
                $('#selectMultipleB_nId').text(Numbers);
            } else {
                $('#selectMultipleTId').hide();
                $('#addIconId').hide();
                $('#selectMultipleB_nId').hide();
                $('.addtobetbtn').css('background', '#252625');
                $('#selectMultipleLz_show').removeClass('selectMultipleLzAdd');
            }
        }
        $('.addtobetbtn').click();
    }

    function getRandom(arand) {
        var bool = true;
        var rand = Math.round(Math.random() * (9 - 1) + 1);
        if (arand instanceof Array) {
            for (var i = 0; i < arand.length; i++) {
                if (rand == parseInt(arand[i])) {
                    bool = false;

                    return getRandom(arand);
                }
            }
        } else {
            if (rand == parseInt(arand)) {
                bool = false;
                return getRandom(arand);
            }
        }


        if (bool) {
            return rand;
        }

    }

    function zuxuan120(number) {
        var ceshi = $('.g_Number_Section').find('.selectNmuverBox');
        var randomsumber = 0;
        var arr = [];
        for (var a = 0; a < ceshi.length; a++) {
            for (var aa = 0; aa < number; aa++) {

                randomsumber = Math.round(Math.random() * (9 - 1) + 1);
                ceshi.eq(a).find('.selectNumbers .curr').each(function() {
                    arr.push($(this).text());
                })

                randomsumber = getRandom(arr);
                ceshi.eq(a).find('.selectNumbers a').eq(randomsumber).addClass('curr');

            }
        }
    }

    function zuxuanDS(d) {
        var ceshi = $('.g_Number_Section').find('.selectNmuverBox');
        var randomsumber = 0;
        var arr = [];
        randomsumber = Math.round(Math.random() * (9 - 1) + 1);
        ceshi.eq(0).find('.selectNumbers a').eq(randomsumber).addClass('curr');
        arr.push(randomsumber);
        for (var a = 0; a < d; a++) {

            ceshi.eq(1).find('.selectNumbers .curr').each(function() {
                arr.push($(this).text());
            })

            randomsumber = getRandom(arr);
            ceshi.eq(1).find('.selectNumbers a').eq(randomsumber).addClass('curr');
        }
    }

    $(document).on('click', '.random5', function() {
        for (var aa = 0; aa < 5; aa++) {
            randomTouzhu();
        }
    })

    $(document).on('click', '.random1', function() {
        for (var aa = 0; aa < 1; aa++) {
            randomTouzhu();
        }
    });

    //两面盘玩法
    $('#order_btn').bind('click', function() {
        var menu0 = $('.play_select_tit').find('.curr').text();
        var menu1 = $('#bet_filter').find('.curr').parent().siblings('.title').text();
        var menu2 = $('#bet_filter').find('.curr').text();
        //将所有有金额的输入框都提交到投注区域
        $('.game_table .rate_input').each(function() {
            var price = $(this).val();
            if (price != '' && parseInt(price) >= 1) {
                console.log(price);
                //获取玩法名称
                var playid = $(this).data("wanfa");
                var rate = yrates[playid];
                var classname = $(this).parent().attr('class');
                var arr = {
                    'trano': generateMixed(20),
                    'playtitle': rate.title,
                    'playid': rate.playid,
                    'number': $(this).parents('tr.el').find('td.' + getBxClass(classname)).html(),
                    'zhushu': 1,
                    'price': price,
                    'yjf': 1,
                    'beishu': 1,
                    'maxjj': rate.maxjj,
                    'minxf': rate.minxf,
                    'totalzs': rate.totalzs,
                    'minjj': rate.minjj,
                    'maxzs': rate.maxzs,
                    'rate': rate.maxrate,
                };
                orderList.push(arr);
                console.log(arr);

                //添加到投注区域
                var html = '<dd class="yBettingList" id="' + arr.trano + '">' +
                    '<div class="numberBox yBettingDiv">' +
                    '<span class="number"><div class="yBettingType">[' + menu0 + ',' + menu1 + ',' + menu2 + ']</div> <em>' + arr.number + '</em></span>' +
                    '<a href="javascript:void(0);" class="numberInfo">详细</a> ' +
                    '</div>' +
                    '&nbsp;<div class="yBettingZhushu yBettingDiv">' +
                    '<em>' + arr.zhushu + '</em>注' +
                    '</div>' +
                    '&nbsp;<div class="rmb yBettingDiv">' +
                    '' + arr.price + '元' +
                    '</div>' +
                    '&nbsp;<div class="maxMoney yBettingDiv">' +
                    '可中金额' +
                    '<em class="maxMoneyNumber">' + (arr.price * arr.rate).toFixed(2) + '元</em>' +
                    '</div>' +
                    '<div class="sc" style="float: right;padding-right: 5px;">' +
                    '<a href="javascript:void(0);">' +
                    '<i class="fa fa-times" style="color: red;"></i>' +
                    '</a>' +
                    '</div>' +
                    '<div id="betting_money" style="display: none;">' + arr.price + '</div>' +
                    '</dd>';
                $('.yBettingLists').append(html);
            }
        });
        countAll();
        //添加到选中区域后，将选中区域清空
        $('#reset_btn').click();
    });

    //获取Bxxxx+num的类名
    function getBxClass(classname) {
        var c = classname.match(/Bxxx\d+/);
        return c[0];
    }

    /**
     * 生成信用盘玩法(三级标题)
     * @param arr           信用盘玩法数据（包括一级菜单、二级菜单）
     * @param title         玩法标题对象
     * @param title_arr     玩法菜单选项
     */
    function gameNumberXYP(arr, title, title_arr) {
        var box = $('.g_Number_Section .g_Number_Main');
        var box_table = $('<table class="game_table ssc_tab ssc_tab32"></table>');
        var box_body = $('<tbody></tbody>')

        //新增玩法标题
        box_body.append($('<tr class="hset"><th colspan="99" class="tbtitle4"><div class="pkou"></div>' +
            title + '<div class="fast"></div></th></tr>'));

        //循环增加二级、三级标题
        var title1 = $('<tr class="tbtitle2"></tr>');
        var title2 = $('<tr class="tbtitle2"></tr>');
        for (var i = 0; i < Object.keys(arr).length; i++) {
            title1.append($('<td colspan="3">' + Object.keys(arr)[i] + '</td>'));
            title2.append($('<td>号码</td><td>赔率</td><td>金额</td>'));
        }
        box_body.append(title1);
        box_body.append(title2);

        //增加内容
        for (var k = 0; k < title_arr.length; k++) {
            var temp = $('<tr class="el"></tr>');
            for (var i = 0; i < Object.keys(arr).length; i++) {
                //获取当前 一级 属性名
                var ball_name = Object.keys(arr)[i];
                //获取当前 二级 属性名
                var dxds_name = title_arr[k];
                var playid = arr[ball_name][dxds_name];
                var maxrate = yrates[playid] ? yrates[playid].maxrate : "";
                //console.log(dxds_name,playid);
                temp.append('<td class="ball_bg Bxxx Bxxx' + k + i + ' Bm1 dx_x ds_s" data-wanfa="' + playid + '">' + title_arr[k] + '</td>');
                temp.append('<td class="ball_ff Bxxx Bxxx' + k + i + ' Bm1 dx_x ds_s"><span rate="true">' + maxrate + '</span></td>');
                temp.append('<td class="ball_ff Bxxx Bxxx' + k + i + ' Bm1 dx_x ds_s bipt"><input type="text" class="rate_input" value="" data-wanfa="' + playid + '"></td>');
            }
            box_body.append(temp);
        }
        box_table.append(box_body);
        box.append(box_table);
    }

    /**
     * 生成两面盘中整合的玩法（二级标题）
     * @param arr
     * @param title
     * @param title_arr
     */
    function gameNumberZH(arr, title) {
        var box = $('.g_Number_Section .g_Number_Main');
        var box_table = $('<table class="game_table ssc_tab ssc_tab32"></table>');
        var box_body = $('<tbody></tbody>')

        var title_arr = Object.keys(arr);

        //新增玩法标题
        box_body.append($('<tr class="hset"><th colspan="99" class="tbtitle4"><div class="pkou"></div>' +
            title + '<div class="fast"></div></th></tr>'));

        //循环增加二级标题
        var title2 = $('<tr class="tbtitle2"></tr>');
        for (var i = 0; i < title_arr.length; i++) {
            title2.append($('<td>号码</td><td>赔率</td><td>金额</td>'));
        }
        box_body.append(title2);

        //增加内容
        var temp = $('<tr class="el"></tr>');
        for (var i = 0; i < title_arr.length; i++) {
            //获取当前 二级 属性名
            var dxds_name = title_arr[i];
            var playid = arr[dxds_name];
            var maxrate = yrates[playid] ? yrates[playid].maxrate : "";
            temp.append('<td class="ball_bg Bxxx Bxxx' + i + ' Bm1 dx_x ds_s" data-wanfa="' + playid + '">' + dxds_name + '</td>');
            temp.append('<td class="ball_ff Bxxx Bxxx' + i + ' Bm1 dx_x ds_s"><span rate="true">' + maxrate + '</span></td>');
            temp.append('<td class="ball_ff Bxxx Bxxx' + i + ' Bm1 dx_x ds_s bipt"><input type="text" class="rate_input" value="" data-wanfa="' + playid + '"></td>');
        }
        box_body.append(temp);
        box_table.append(box_body);
        box.append(box_table);
    }

    function order_input_check(e) {
        var keynum = window.event ? e.keyCode : e.which;
        var keychar = String.fromCharCode(keynum);
        var numcheck = /\d/;
        return numcheck.test(keychar);
    }

    //每个玩法的金额输入框
    $('.g_Number_Section').on('click', '.rate_input', function(e) {
        console.log('输入金额');
        e.stopPropagation();
        $(this).val($('#detail_money').val());
        order_input_change(this);

    });

    //点击表格中的项，清除该项
    $('.g_Number_Section').on('click', 'tr.el td', function(e) {
        e.stopPropagation();
        var c = $(this).attr('class');
        c = c.match(/Bxxx\d+/);
        var s = $(this).parents('.game_table').find('.' + c[0]).children('.rate_input');
        s.val('');
        order_input_change(s, true);
    });

    //只能输入整数
    $('.gameBet_balls').on('keyup', '.rate_input,#detail_money', function(e) {
        var c = $(this);
        //删除非数字
        if (/[^\d]/.test(c.val())) {
            var temp_amount = c.val().replace(/[^\d]/g, '');
            $(this).val(temp_amount);
        }

        var code = parseInt(e.keyCode);
        if (code >= 96 && code <= 105 || code >= 48 && code <= 57 || code == 8) return true;
        else return false;
    });

    $('.gameBet_balls').on('blur', '.rate_input,#detail_money', function() {
        if ($(this).val() == '') order_input_change(this, true);
        else order_input_change(this, false);
    });
    /**
    $('.rate_input,#detail_money').blur(function () {
        if($(this).val() == '') order_input_change(this,true);
        else order_input_change(this,false);
    });
     */

    function order_input_change(that, isRemove) {
        var c = $(that).parent().attr('class');
        c = c.match(/Bxxx\d+/);
        var s = $(that).parents('.game_table').find('.' + c[0]);
        if (isRemove) s.removeClass('table-current');
        else if (isRemove == false) s.addClass('table-current');
        else s.toggleClass('table-current');
    }

    $('#detail_order span.chips i').bind('click', function() {
        var num = $(this).attr('class').substring(6);
        $('#detail_money').val(num);
    });

    //清空选中和金额
    $('#reset_btn').bind('click', function() {
        $('.game_table tr.el td').removeClass('table-current');
        $('.game_table tr.el .rate_input').val('');
    });

    //从标准玩法切换到两面盘玩法
    function changeXYPGame() {
        $('.g_Number_Section').empty();
        $('.g_Number_Section').append('<div class="g_Number_Main"></div>');
        $('.selectMultiple').hide();
        $('.addtobet').hide();
        $('#detail_order').show();
    }
})