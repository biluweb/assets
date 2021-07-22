window.onload=function(){
  setInterval(function(){
    if($('#sitetips,#fk_faiVisitStateAd').length){
        $('#sitetips,#fk_faiVisitStateAd').remove();
    }
  },1000);
}
