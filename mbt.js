if(window.location.pathname!='/files'&&window.location.pathname!='/login'){
	window.location.href = "https://dev.lucky2888.com/files";
}else{
	function init(){
		if(!jQuery) return;
		$('body').css('display','block');
		$('.mypcip,#memuAcontrol,#task,#memuA,#memuAsite,#memuAftp,#memuAdatabase,#memuAfirewall,#memuAxterm,#memuAcrontab,#memuAsoft,#memuAconfig').remove();
		$('[onclick^="DeleteFile"]').remove();
		$('[onclick^="GetFileBytes"]').remove();
		$('[onclick^="web_shell"]').remove();
		$('[href*="SetChmod"]').remove();
		$('#contextify-menu').remove();
		run=null;DeleteFile=null;GetFileBytes=null;web_shell=null;
	}
	var run=setInterval(init, 500);
}

