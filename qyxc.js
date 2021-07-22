$(function(){
  $('.s_footer p').eq(1).remove();
})
setInterval(function(){
  if($('#sitetips,#fk_faiVisitStateAd').length){
      $('#sitetips,#fk_faiVisitStateAd').remove();
  }
},500);
