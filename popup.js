function fetch() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
	  //update Google's rich snippet URL
    var a = "https://search.google.com/test/rich-results?url=" + tabs[0].url;
	window.open(a);
});
  }
  
window.addEventListener('DOMContentLoaded', function (){
	chrome.extension.sendMessage({init: "go"}, function(data){
		//console.log(app_key);
		for (var widget in data)
		{
			document.getElementById(widget).innerHTML = data[widget];
		}
		
		document.getElementById("snippet").innerHTML = "<input type=\'button\' value=\'TEST RICH SNIPPETS\' id=\'fetch\'>";
		var b = document.getElementById('fetch');
		b.addEventListener("click" , fetch , true);
	
	});
});

	




	




