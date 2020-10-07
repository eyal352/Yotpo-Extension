function findAppkey(pattern){
  var n = pattern.exec($('script[src*=\'//staticw2.yotpo.com\']').attr('src'));
  var appkey;
  var bottomline;
  var id;
  var test;
  var findPlatform;
  
  if (n === null){
	  //console.log("no Appkey here");
	  appkey =  "no Appkey Here";
	  bottomline = "-----"
	  id = "-----"
	  //test = "NO DATA";
	 
  } else {
		  appkey = n[1];
		  if ($('.yotpo.bottomLine').length === 0) {
		  bottomline = 'NO STAR RATINGS HERE';
		  id = "-----"
		} else {
		  bottomline= 'Star Ratings Are Installed!';
		  id = $('.yotpo-main-widget').attr('data-product-id');
		}
  }

  platform = function(){
	let platformNames = ['shopify', 'bigcommerce', 'Magento', 'woocommerce'];
	let currentPlatform;

	platformNames.forEach(platform => {
		if($(`script[src*=\'${platform}\']`).length === 0){
			return
		} else {
			currentPlatform = platform
		}
	})
	return currentPlatform;
  }

  var snoo={appkey: appkey, bottomline: bottomline, id: id , test: test, platform: platform()};
  return snoo;
}


chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.init) {
        case "go":
		console.log("Find Appkey!");
            //var app_key = findAppkey(/staticw2.yotpo.com.(\w*)/);
			//console.log(app_key);
			var stuff = findAppkey(/staticw2.yotpo.com.(\w*)/);
			//data object sent to popup.js
			sendResponse({data: stuff});
        break;
    }
});
