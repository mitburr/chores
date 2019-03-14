$('#loginbtn').on('click', function () {
  //get username and password from the relevant fields
  const Username = $('#Username').val();
  const Password = $('#Password').val();
  //put them in an object
  const user = {
    Username,
    Password,
  }
  //use a post request to send user data from the relevant fields
  $.ajax("/token", {
    type: "POST",
    data: user,
  }).then(
    function (res, err) {
      //error check
      console.log(err);
      // set the cookies for username, password, and token which are sent from the server
      setCookie("Username", res.user.Username);
      setCookie("Password", res.user.Password);
      setCookie("houseId", res.user.houseId);
      setCookie("personId", res.user.personId);
      setCookie("Token", res.Token)
      //test to see if the cookie is complete
      console.log("Current cookies: " +
        getCookie("Username") + "\n" +
        getCookie("Password") + "\n" +
        getCookie("houseId") + "\n" +
        getCookie("personId") + "\n" +
        getCookie("Token")
      );
      //for testing purposes, another ajax call is added for login.
      //This could be changed to an html route and the data could be passed I believe 
      $.ajax("/api/tokentest", {
        type: "GET",
        data: document.cookie,
      }).then(
        function (res, err) {
          if (err) { console.log(err) };
        })

    })
});