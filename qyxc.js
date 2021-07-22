$(function(){
  $('.s_footer p').eq(1).remove();
})

var aaa=setInterval(function(){
  if($('#sitetips,#fk_faiVisitStateAd').length){
      $('#sitetips,#fk_faiVisitStateAd').remove();
  }
},200);
