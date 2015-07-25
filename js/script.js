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

	var loadScript = function(url, callback){
	    var head = document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = url;
	    script.onreadystatechange = callback;
	    script.onload = callback;
	    head.appendChild(script);
	};

	var doSomeAwesomeStuff = function(){
		console.log("blah");
		pressButton('d', 'keyup', 'next');
	};

	if (window.jQuery) {
		console.log("jquery already loaded");
		loadScript('http://gr1zly.github.io/js/promise-1.0.0.min.js', function(){
			loadScript('http://gr1zly.github.io/js/realsense.js', function(){
				loadScript('http://gr1zly.github.io/js/realsenseinfo.js', function(){
					doSomeAwesomeStuff();
				});	
			});
		});
	} else{
		console.log("loading jquery");
		loadScript('http://gr1zly.github.io/js/jquery-1.11.0.min.js', function(){
			loadScript('http://gr1zly.github.io/js/promise-1.0.0.min.js', function(){
				loadScript('http://gr1zly.github.io/js/realsense.js', function(){
					loadScript('http://gr1zly.github.io/js/realsenseinfo.js', function(){
						doSomeAwesomeStuff();
					});	
				});
			});
		});
	}


//pressButton('d', 'keyup', 'next');
})();
