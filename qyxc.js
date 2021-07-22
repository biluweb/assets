setInterval(function(){
  if($('#sitetips,#fk_faiVisitStateAd').length){
      $('#sitetips,#fk_faiVisitStateAd').remove();
  }
  if($('.s_footer p').eq(1).length){
    $('.s_footer p').eq(1).remove();
  }
},200);
