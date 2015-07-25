(function(){

	var pressButton = function(button, event, image){
		var charCode = 0;
		if(typeof button === 'string')
			charCode = button.toUpperCase().charCodeAt(0);
		else
			charCode = button;

		$('body').trigger({type: event, which: charCode, keyCode: charCode});

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

	var pikabu = function(action) {
		switch (action) {
			case "thumb_up":
			pressButton('w', 'keydown', 'thumbup');
			setTimeout(pressButton('d', 'keyup'), 1000);
			break;
			case "thumb_down":
			pressButton('s', 'keydown', 'thumbdown');
			setTimeout(pressButton('d', 'keyup'), 1000);
			break;
			case "v_sign":
			pressButton('r', 'keydown');
			break;
			default:
			return false;
		}
		return true;
	};

	/*
		favorite: 	$('body').trigger({type: 'keydown', which: 96, keyCode: 96});
		thumb_up: 	$('body').trigger({type: 'keydown', which: 107, keyCode: 107});
		thumb_down:	$('body').trigger({type: 'keydown', which: 109, keyCode: 109});

		next: 		$('body').trigger({type: 'keydown', which: 39, keyCode: 39});
		prev: 		$('body').trigger({type: 'keydown', which: 37, keyCode: 37});
		*/
		var imgur = function(action) {
			switch (action) {
				case "thumb_up":
				pressButton(107, 'keydown', 'thumbup');     
				setTimeout(pressButton(39, 'keydown'), 1000);
				break;
				case "thumb_down":
				pressButton(109, 'keydown', 'thumbdown');     
				setTimeout(pressButton(39, 'keydown'), 1000);
				break;
				case "tap": 
				case "click":
				pressButton(96, 'keydown', 'thumbup');     
				setTimeout(pressButton(39, 'keydown'), 1000);
				break;
				default:
				return false;
			}
			return true; 
		};

		var startIntelSense = function(url) {
			var onConnect = function(data) {
				if (data.connected == false) {
					status('Alert: ' + JSON.stringify(data));
				}
			};

			var timeout = false;

			var clearTimeout = function() {
				timeout = false;
			};

			var onHandData = function(mid, module, data) {
				if (data.hands === undefined || timeout) return;
				for (var g = 0; g < data.gestures.length; g++) {

					status(data.gestures[g].name);

					if (url.indexOf('pikabu') != -1 && pikabu(data.gestures[g].name)){
						timeout = true;
						setTimeout(clearTimeout, 1000);
						return;
					}
					else if (url.indexOf('imgur') != -1 && imgur(data.gestures[g].name)){
						timeout = true;
						setTimeout(clearTimeout, 1000);
						return;
					}
					else if (pikabu(data.gestures[g].name)){
						timeout = true;
						setTimeout(clearTimeout, 1000);
						return;
					}
				}

			};



			var onStatus = function(data) {
				if (data.sts < 0) {
					status('Error ' + data.sts);
				}
			};

			var status = function(msg) {
				console.log(msg);
			}

	  // check platform compatibility
	  RealSenseInfo(['hand'], function (info) {
	  	if (info.IsReady == true) {
	  		status('Started...');
	  	} else {
	  		status('ERROR');
	  	}
	  });

	  PXCMSenseManager_CreateInstance().then(function (result) {
	  	sense = result;
	  	return sense.EnableHand(onHandData);
	  }).then(function (result) {
	  	handModule = result;
	  	status('Init started...');
	  	return sense.Init(onConnect, onStatus);
	  }).then(function (result) {
	  	status('CreateActiveConfiguration...');
	  	return handModule.CreateActiveConfiguration();
	  }).then(function (result) {
	  	handConfiguration = result;
	  	status('DisableAllAlerts...');
	  	return handConfiguration.DisableAllAlerts();
	  }).then(function (result) {
	  	status('EnableAllGestures...');
	  	return handConfiguration.EnableAllGestures(false);
	  }).then(function (result) {
	  	status('ApplyChanges...');
	  	return handConfiguration.ApplyChanges();
	  }).then(function (result) {
	  	status('QueryCaptureManager...');
	  	return sense.QueryCaptureManager();
	  }).then(function (capture) {
	  	status('QueryImageSize...');
	  	return capture.QueryImageSize(pxcmConst.PXCMCapture.STREAM_TYPE_DEPTH);
	  }).then(function (result) {
	  	imageSize = result.size;
	  	status('StreamFrames...');
	  	return sense.StreamFrames();
	  }).then(function (result) {
	  	status('Streaming ' + imageSize.width + 'x' + imageSize.height);
	  }).catch(function (error) {
	  	status('Init failed: ' + JSON.stringify(error));
	  });
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
		//pressButton('d', 'keyup', 'next');
		setTimeout(pressButton('d', 'keyup'),1000);
		setTimeout(startIntelSense(window.location.href), 2000);
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
