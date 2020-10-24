if(window.location.pathname!='/files'&&window.location.pathname!='/login'){
	window.location.href = "https://dev.lucky2888.com/files";
}else{
	window.onload=function(){
		$('body').css('display','block');
		$('.mypcip,#memuAcontrol,#task,#memuA,#memuAsite,#memuAftp,#memuAdatabase,#memuAfirewall,#memuAxterm,#memuAcrontab,#memuAsoft,#memuAconfig,.btn.btn-default.btn-sm.pull-left,.btn.btn-default.btn-sm').remove();
		$('[onclick^="DeleteFile"]').remove();
		$('[onclick^="GetFileBytes"]').remove();
		$('[onclick^="web_shell"]').remove();
	}
}

