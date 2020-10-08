function fetch() {
	chrome.tabs.query({
		currentWindow: true,
		active: true
	}, function (tabs) {
		//update Google's rich snippet URL
		var a = "https://search.google.com/test/rich-results?url=" + tabs[0].url;
		window.open(a);
	});
}

function jsBinConnector() {
	let appkey = document.getElementById('appkey').innerHTML;
	let productID = document.getElementById('id').innerHTML;
	url = 'https://jsbin.com/?html,output';
	//window.open(url, "_blank");
	navigator.clipboard.writeText(`
	<script type="text/javascript">
		(function e(){var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src="//staticw2.yotpo.com/${appkey}/widget.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();
	</script>

	<div class="yotpo bottomLine"
		data-product-id="${productID}">
	</div>	
	<div class="yotpo yotpo-main-widget"
		data-product-id="${productID}">
	</div>
	`);
	setTimeout(() => {
		window.open(url, "_blank");
	}, 500);
	
}

window.addEventListener('DOMContentLoaded', function () {
	chrome.extension.sendMessage({
		init: "go"
	}, function (data) {
		//console.log(app_key);
		for (var widget in data) {
			document.getElementById(widget).innerHTML = data[widget];
		}

		document.getElementById("snippet").innerHTML = "<input type=\'button\' value=\'TEST RICH SNIPPETS\' id=\'fetch\'>";
		var b = document.getElementById('fetch');
		b.addEventListener("click", fetch, true);

		document.getElementById("jsbinButton").addEventListener("click", jsBinConnector)

	});
});