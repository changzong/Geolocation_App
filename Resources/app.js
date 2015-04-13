// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var GlobelV = require('labels');
var SendMsg = require('send_msg');
var SubHandler = require('sub_handler');
var UserHandler = require('user_account_handler');
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

var win3 = Titanium.UI.createWindow({
	title: 'Login',
	backgroundColor: '#fff'
});
var tab3 = Titanium.UI.createTab({
	icon: 'images/KS_nav_views.png',
	title: 'Login',
	window: win3
});
win3.add(GlobelV.Labels.label3);
win3.add(UserHandler.Properties.button_signin);
win3.add(UserHandler.Properties.button_register);

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3); 

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
				var button_sub = Ti.UI.createButton({
					width: 300,
					height: 20,
					top: 100 + 30*i,
					title: JSON.stringify(ee.subject[i]).replace(/(^"+|"+$)/g, '')
				});
				win1.add(button_sub);
				
				button_sub.addEventListener('click', function(){
					SubHandler.SubHandler.sub_msg_handler(this.title, ee);
				});
			}
		});
		
	});
});


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
