$('#loginbtn').on('click', function () {

	
	//get username and password from the relevant fields
	const Username = $('#username-input').val();
	const Password = $('#password-input').val();
	//put them in an object
	const user = {
		Username,
		Password,
	}
	//use a post request to send user data from the relevant fields
	$.ajax("/login", {
		type: "POST",
		data: user,
	}).then(
		function (res, err) {
			//error check
			console.log(err);
			// set the cookies for username, password, and token which are sent from the server
			setCookie("Username", res.user.Username);
			setCookie("Password", res.user.Password);
			setCookie("Token", res.Token)
			//test to see if the cookie is complete
			console.log("Current cookies: " +
				getCookie("Username") + "\n" +
				getCookie("Password") + "\n" +
				getCookie("Token")
			);
			//for testing purposes, another ajax call is added for login.
			//This could be changed to an html route and the data could be passed I believe 


			if (res.user.isParent) {
				window.location.href = "/parentAcct";
			}
			else {
				window.location.href = "/childAcct";
			}


		})




	let setCookie = function (cookieTitle, cookieData) {
		document.cookie = cookieTitle + " = " + cookieData
	}

	let getCookie = function (cookieTitle) {
		var name = cookieTitle + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}


});