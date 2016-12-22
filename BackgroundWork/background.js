
var availableNetworkCheck = ["flipkart","amazon"];


console.log("SelectedURL",window.location.host);
var metaInfo = $("meta[name='Description']").attr("content");
var metaInfo1 = $("meta[name='description']").attr("content");

console.log("%cBlue! %cGreen", "color: blue; font-size:15px;", "color: green; font-size:12px;");

if(typeof metaInfo !== "undefined") {
	console.log("%cMETA:: "+metaInfo,"color: blue; font-size:20px;");
} else {
	console.log("%cMETA:: "+metaInfo1,"color: blue; font-size:20px;");
}


var indexValue;
$.each(availableNetworkCheck,function(i,val){
    if(window.location.host.indexOf(val) > -1) {
		indexValue = val;	 	
		$.get(chrome.extension.getURL('/resourcesTmp/OfferInfo.html'), function(data) {
			$($.parseHTML(data)).appendTo('body');
			/* $("#iframeInfo").attr("src",window.location.origin);	 */
		});
				
		var bodyContent = "";
		
		chrome.storage.sync.get("boaUserInfo", function (obj) {
			console.log(obj);
			if(obj.boaUserInfo !== undefined) {
				bodyContent = "Hey Rajkumar, Exclusive 15% offer for your purchase in Flipkart through your Credit Card. Click the notification for more Info."
			} else {
				bodyContent = "Exclusive 5% offer for your purchase in Flipkart."
			}
			var notificationInfo = {};
			notificationInfo.title = "Offer";
			notificationInfo.option = {
				icon: 'https://lh6.ggpht.com/x8OtRvnO93xdOxzbOHZ5DSSTuk92OgI0koX3nFzl5eAx1onCjZooiCUDvVRfXUeDUQ=w300',
				body: bodyContent
			};
			
			notificationInfo.redirectURL = "https://www.google.com/" 
			notifyMe(notificationInfo);
		})
    }
});

console.log("Value::::",indexValue);

function notifyMe(notificationInfo) {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification(notificationInfo.title, notificationInfo.option);

    notification.onclick = function () {
      window.open(notificationInfo.redirectURL);      
    };

  }

}

function getSavedValue() {
	
	
}

