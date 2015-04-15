/**
 * @author Chang Zong
 */
exports.Properties = {
	button_signin : Ti.UI.createButton({
		width:60,
		height:40,
		top: 100,
		title:"Sign-in"
	}),
	
	button_register : Ti.UI.createButton({
		width:100,
		height:40,
		top: 160,
		title:"Registeration"
	}),
	
	register_page_handler : function(){
		var regi_btnBack = Ti.UI.createButton({
			width: 40,
			height: 20,
			top: 50,
			left: 10,
			title: 'Back'
		});
		var regi_win_sub = Ti.UI.createWindow({
			backgroundColor: '#fff',
			title: 'User Registration',
			navTintColor:'#fff',
			leftNavButton: regi_btnBack,
			navBarHidden: false,
			modal: true
		});
		
		regi_win_sub.add(regi_btnBack);
		regi_btnBack.addEventListener('click',function(e){
			//nav.closeWindow(win_sub, {animated:true});
			regi_win_sub.close();
		});
		regi_win_sub.open({animated: true});
		
		var textField_uname = Ti.UI.createTextField({
	  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  		color: '#787878',
	  		top: 150, left: 50,
	  		width: 250, height: 20,
	  		hintText: 'Pick a username'
		});
	
		var textField_psw = Ti.UI.createTextField({
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  		color: '#787878',
	  		top: 200, left: 50,
	  		width: 250, height: 30,
	  		hintText: 'Pick a password',
	  		passwordMask: true
		});
		
		var textField_email = Ti.UI.createTextField({
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  		color: '#787878',
	  		top: 250, left: 50,
	  		width: 250, height: 30,
	  		hintText: 'Type in your email address'
		});
		
		var regi_confirm_button = Ti.UI.createButton({
			width: 60,
			height: 20,
			top: 300,
			title: 'Sign Up'
		});
		
		regi_win_sub.add(textField_uname);
		regi_win_sub.add(textField_psw);
		regi_win_sub.add(textField_email);
		
		regi_confirm_button.addEventListener('click', function(){
			var email_filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			var psw_filter = /^(?=(.*\d){2})(?=.*[a-zA-Z])(?=.*[!@#$%])[0-9a-zA-Z!@#$%]{8,}/;
			if (!psw_filter.test(textField_psw.value)){
				alert("Invalid password! At least one letter, two digits and one special character. No less than 8 characters.");
			}
			else if (!email_filter.test(textField_email.value)){
				alert("Invalid email address!");
			}
			else{
				Ti.API.info(textField_uname.value, textField_psw.value, textField_email.value);
			}
			
		});
		
		regi_win_sub.add(regi_confirm_button);
	}
};
