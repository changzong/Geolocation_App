/**
 * @author Chang Zong
 */
exports.Labels = {
	label1 : Titanium.UI.createLabel({
		color:'#999',
		text:'Your current location.',
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto'
	}),

	label2 : Titanium.UI.createLabel({
		color:'#999',
		text:'Send a message to your nearby.',
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto'
	}),

	// Need callback("cb") to receive asynchronous function return value.
	get_curr_pos : function(cb){
		if (Ti.Geolocation.locationServicesEnabled) {
    		Titanium.Geolocation.setPurpose = 'Get Current Location';
    		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    		//Titanium.Geolocation.distanceFilter = 0;
    		Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;;
    		Titanium.Geolocation.getCurrentPosition(function(e) {
 				if (e.error) {
            		cb('Error: ' + e.error );
        		} else {
        			//Titanium.API.info(e.coords);
            		cb(e.coords);
        		}
    		});
		} else {
    		alert('Please enable location services');
		}
	},
	
	testfunction : function(){
		return 1+1;
	}

};
