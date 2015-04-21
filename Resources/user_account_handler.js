/**
 * @author Chang Zong
 */
exports.Properties = {
	button_signin : Ti.UI.createButton({
		width:60,
		height:40,
		top: 100,
		title:"Sign In"
	}),
	
	button_register : Ti.UI.createButton({
		width:100,
		height:40,
		top: 160,
		title:"Sign Up"
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
				var url_user_regi = "http://127.0.0.1/user_regi.php";
				var xhr_regi = Ti.Network.createHTTPClient({
					onload : function(e) { 
						Ti.API.info('sending user info to server...'); 
						if (this.responseText)
							alert(this.responseText);
						else alert("No response from server. Try again later.");
					},
					onerror : function(e) {
						alert('sending error');
					}
				});
				xhr_regi.open("POST", url_user_regi);
				var user_regi_info = {"username": textField_uname.value, 
									  "password": textField_psw.value, 
									  "email": textField_email.value};
				xhr_regi.send(user_regi_info);
			}
			
		});
		
		regi_win_sub.add(regi_confirm_button);
	}, 
	
	login_page_handler : function(){
		var login_btnBack = Ti.UI.createButton({
			width: 40,
			height: 20,
			top: 50,
			left: 10,
			title: 'Back'
		});
		var login_win_sub = Ti.UI.createWindow({
			backgroundColor: '#fff',
			title: 'User Login',
			navTintColor:'#fff',
			leftNavButton: login_btnBack,
			navBarHidden: false,
			modal: true
		});
		
		login_win_sub.add(login_btnBack);
		login_btnBack.addEventListener('click',function(e){
			//nav.closeWindow(win_sub, {animated:true});
			login_win_sub.close();
		});
		login_win_sub.open({animated: true});
		
		var textField_uname_login = Ti.UI.createTextField({
	  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  		color: '#787878',
	  		top: 150, left: 50,
	  		width: 250, height: 20,
	  		hintText: 'Type your username'
		});
	
		var textField_psw_login = Ti.UI.createTextField({
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  		color: '#787878',
	  		top: 200, left: 50,
	  		width: 250, height: 30,
	  		hintText: 'Type your password',
	  		passwordMask: true
		});
		
		var login_confirm_button = Ti.UI.createButton({
			width: 60,
			height: 20,
			top: 300,
			title: 'Log in'
		});
		
		login_win_sub.add(textField_uname_login);
		login_win_sub.add(textField_psw_login);
		
		login_confirm_button.addEventListener('click', function(){
			if (textField_uname_login.value.length==0 || textField_psw_login.value.length==0)
				alert("Please input your username or password!");
			else{
				Ti.API.info(textField_uname_login.value, textField_psw_login.value);
				var url_user_login = "http://127.0.0.1/user_login.php";
				var xhr_login = Ti.Network.createHTTPClient({
					onload : function(e) { 
						Ti.API.info('sending user info to server...'); 
						if (this.responseText)
							alert(this.responseText);
						else alert("No response from server. Try again later.");
					},
					onerror : function(e) {
						alert('sending error');
					}
				});
				xhr_login.open("POST", url_user_login);
				var user_login_info = {"username": textField_uname_login.value, 
									  "password": textField_psw_login.value};
				xhr_login.send(user_login_info);
			}
		});
		
		login_win_sub.add(login_confirm_button);
	}
};
