(function(){
var pressButton = function(button, event, image){
	var charCode = button.toUpperCase().charCodeAt(0);
	console.log(charCode);
	var keyboardEvent = document.createEvent("KeyboardEvent");
	var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
	keyboardEvent[initMethod](event, true, true, window, false, false, false, false, charCode, 0);
	document.dispatchEvent(keyboardEvent);

	addNotification(image);
};

var addNotification = function(image){
	if(image != null){
		var thumb_up_div = document.createElement('div');
		thumb_up_div.id = 'thumb_up_div';  
		thumb_up_div.style.cssText = 'position:fixed;top:100px;left:30%;width:400px;height:400px;display:block; background: url("http://gr1zly.github.io/images/'+image+'.png") no-repeat;}';
		document.body.appendChild(thumb_up_div);
		setTimeout(function(){ document.body.removeChild(thumb_up_div); }, 1000);
	}
};

pressButton('d', 'keyup');
})();
