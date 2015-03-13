/**
 * @author Chang Zong
 */
exports.Functions = {
	send_msg_with_pos : function(pos, ee){
		var position_box = {};
		position_box['minLat'] = 37.0;
		position_box['maxLat'] = 38.0;
		position_box['minLong'] = -122.5;
		position_box['maxLong'] = -121.5;
		var feedback;
		if (parseFloat(pos.latitude) > parseFloat(position_box['minLat']) && parseFloat(pos.latitude) < parseFloat(position_box['maxLat']) && 
			parseFloat(pos.longitude) > parseFloat(position_box['minLong']) && parseFloat(pos.longitude) < parseFloat(position_box['maxLong'])){
			Ti.API.info("I'm here");
			var url = "http://edioi.com/justmsg/get.php";
			var json;
			var xhr = Ti.Network.createHTTPClient({
				onload: function(e) {
					Ti.API.debug(this.responseText);
					alert('success');
					json = JSON.parse(this.responseText);
					Ti.API.info(json.message);
            		ee(json);
				},
				onerror: function(e) {
					Ti.API.debug(e.error);
					alert('error');
				},
				timeout: 5000
			});
			xhr.open("GET", url);
			xhr.send();	
			
			var url1 = "http://edioi.com/justmsg/create.php";
			var xhr1 = Ti.Network.createHTTPClient({
				onload : function(e) { alert('sent message!'); },
				onsendstream : function(e) { 
					Ti.API.info(this.readyState);
					Ti.API.info(this.responseText);
				},
				onerror : function(e) {
					alert('sending error');
				}
			});
			
			xhr1.open("POST", url1);
			//xhr1.setRequestHeader("Content-Type", "application/json");
			xhr1.send({
				name: 'Lush', 
				message: 'Your are a bitch!'
			});
			//var xhr2 = Ti.Network.createHTTPClient();
			//xhr2.onload = function(e) {
				//json2 = JSON.parse(this.responseText);
				//Ti.API.info(json2.message);
			//};
			//xhr2.open("GET", url1);
			//xhr2.send();
		}
	}
};
