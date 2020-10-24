if(window.location.pathname!='/files'){
	window.location.href = "https://dev.lucky2888.com/files";
}else{
	$(function(){
		$('.mypcip,#memuAcontrol,#task,#memuA,#memuAsite,#memuAftp,#memuAdatabase,#memuAfirewall,#memuAxterm,#memuAcrontab,#memuAsoft,#memuAconfig,.btn.btn-default.btn-sm.pull-left,.btn.btn-default.btn-sm').remove();
		$('.table .btlink:eq(4),.table .btlink:eq(6),.table .btlink:eq(7)').remove();
	})
}

