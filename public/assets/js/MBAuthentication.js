$('#loginbtn').on('click', function(){
const Username = $('#Username').val();
const Password = $('#Password').val();
const user = {
    Username,
    Password,
}
console.log(user);
$.ajax("/token", {
    type: "POST",
    data: user, 
  }).then(
    function(res, err) {
      console.log(err);
      setCookie("Username", res.user.Username);
      setCookie("Password", res.user.Password);
      setCookie("Token", res.Token)
      console.log(document.cookie);
      console.log("Current cookies: " + 
        getCookie("Username") + "\n"+
        getCookie("Password") + "\n" +
        getCookie("Token")
      );
      $.ajax("/api/tokentest", {
        type: "GET",
        data: document.cookie,
      }).then(
        function(res, err){
          if (err) {console.log(err)};
        })
      
      });
})


let setCookie = function(cookieTitle, cookieData){
  document.cookie = cookieTitle + " = " + cookieData
}

let getCookie = function(cookieTitle) {
  var name = cookieTitle + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
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