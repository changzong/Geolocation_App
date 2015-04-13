/**
 * @author Chang Zong
 */
exports.SubHandler = {
	sub_msg_handler : function(title, content){
		var btnBack = Ti.UI.createButton({
			width: 40,
			height: 20,
			top: 50,
			left: 10,
			title: 'Back'
		});
		var win_sub = Ti.UI.createWindow({
			backgroundColor: '#fff',
			title: this.title,
			navTintColor:'#fff',
			leftNavButton: btnBack,
			navBarHidden: false,
			modal: true
		});
		/*var nav = Ti.UI.iOS.createNavigationWindow({
			modal: true, 
			window: win_sub
		});*/
		var sub_msg = content.message[content.subject.indexOf(title)];
		//Ti.API.info(sub_msg);
		var showing_msg = JSON.stringify(sub_msg).replace(/(^"+|"+$)/g, '').replace(/\\r\\n+/g, '\n');
		var message_label = Ti.UI.createLabel({
			text : showing_msg,
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
		win_sub.add(message_label);
		win_sub.add(btnBack);
		btnBack.addEventListener('click',function(e){
			//nav.closeWindow(win_sub, {animated:true});
			win_sub.close();
		});
		win_sub.open({animated: true});
	}
};