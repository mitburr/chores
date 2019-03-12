$('#loginbtn').on('click', function(){
const formData = $('.form-group').text;
$.ajax("/token/", {
    type: "POST",
    data: formData
  }).then(
    function() {
      console.log("response: " + res) ;
      // Reload the page to get the updated list
      location.reload();
    }
  );
})