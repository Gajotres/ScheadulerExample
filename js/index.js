$( document ).ready(function() {
	redrawToolbar();
});

var calculateAvalableToolbarSpace = function() {
    var screen_width = document.body.scrollWidth;
    var scheduler_width = $(".fc-toolbar").width();	
	return parseInt((screen_width - scheduler_width)/2, 10);
}

var redrawToolbar = function() {
    var available_space = calculateAvalableToolbarSpace();
    $(".fc-toolbar").css({'margin-left':'-' + available_space + 'px' ,'margin-right':'-' + available_space + 'px'});	
}