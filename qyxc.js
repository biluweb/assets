window.onload=function(){
  setInterval(function(){
    if($('#sitetips,#fk_faiVisitStateAd').length){
        $('#sitetips,#fk_faiVisitStateAd').remove();
    }
  },500);
  $('.s_footer p').eq(1).remove();
}
