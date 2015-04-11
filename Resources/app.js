// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var GlobelV = require('labels');
var SendMsg = require('send_msg');
//
// create base UI tab and root window
//
// createWindow, createTab and createLabel have single JSON formatted parameter.
var win1 = Titanium.UI.createWindow({  
    title:'GeoInfo',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'images/KS_nav_views.png',
    title:'GeoInfo',
    window:win1
});

win1.add(GlobelV.Labels.label1);
//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'YourMsg',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'images/KS_nav_ui.png',
    title:'YourMsg',
    window:win2
});

win2.add(GlobelV.Labels.label2);
//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

// open tab group
tabGroup.open();

//button
button = Ti.UI.createButton({
	width:150,
	height:40,
	top: 50,
	title:"My Location!"
});

win1.add(button);

button.addEventListener('click', function(){
	//Ti.API.info("Your current location is: ");
	win1.remove(GlobelV.Labels.label1);
	//Below is how you get return value from asynchronous function (like Titanium.Geolocation.getCurrentPosition)
	//Ti.Geolocation.addEventListener('location', function(cb) { //You can disable this listener if you don't need it.
		GlobelV.Labels.get_curr_pos(function(cb){
			Titanium.API.info(cb);
			var pos_printer = Titanium.UI.createLabel({
				color:'#999',
				text:'Your current location is: '+ cb.latitude + cb.longitude,
				font:{fontSize:20,fontFamily:'Helvetica Neue'},
				textAlign:'center',
				width:'auto',
				top: '5dp'
			});
			win1.add(pos_printer);
			SendMsg.Functions.get_msg_with_pos(cb, function(ee){
				//Ti.API.info(ee);
				var list_block = '';
				for (var i=0; i<ee.message.length; i++)
				{
					list_block = list_block + JSON.stringify(ee.subject[i]).replace(/(^"+|"+$)/g, '') + '\n\n';
				}
				Ti.API.info(list_block);
				message_label = Ti.UI.createLabel({
                	text : list_block,
                	font : {
                    	fontSize : '2dp',
                    	fontWeight : 'bold'
                	},
                	height : 'auto',
                	left : '10dp',
                	top : '100dp',
                	color : '#000',
                	touchEnabled : false
            	});
            	win1.add(message_label);
			});
			
		});
	//});
});

/*button2 = Ti.UI.createButton({
	width:150,
	height:40,
	top: 50,
	title:"Send Message!"
});

win2.add(button2);

button2.addEventListener('click', function(){
	GlobelV.Labels.get_curr_pos(function(cb){
		SendMsg.Functions.send_msg_with_pos(cb, function(ee){
			Ti.API.info(ee);
		});
	});
});*/

var textField_id = SendMsg.Functions.input_text_adder()[0];
var textField_msg = SendMsg.Functions.input_text_adder()[1];

win2.add(textField_id);
win2.add(textField_msg);

button3 = Ti.UI.createButton({
	width:150,
	height:40,
	top: 380,
	title:"Go"
});

win2.add(button3);

button3.addEventListener('click', function (e){
    Ti.API.info(textField_id.value);
    Ti.API.info(textField_msg.value);
    var msg_list = [textField_id.value, textField_msg.value];
    GlobelV.Labels.get_curr_pos(function(cb){
    	SendMsg.Functions.send_msg_with_pos(msg_list, cb, function(ee){
    		Ti.API.info(ee);
    	});
    });
});
