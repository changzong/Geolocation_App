/**
 * @author Chang Zong
 */
exports.Functions = {
	send_msg_with_pos : function(pos, ee){
		var position_box = {};
		position_box['minLat'] = 37.5;
		position_box['maxLat'] = 38.0;
		position_box['minLong'] = -122.6;
		position_box['maxLong'] = -122.2;
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
		}
	}
};
