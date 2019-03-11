$("#parent-div").hide();
$("#child-div").hide();

$("input[type='radio']").change(function () {


    let parent = $("input[id='checkbox-parent']:checked").val();
    console.log(parent);

    if (parent) {
        $("#child-div").hide();
        $("#parent-div").show();
    }

    let child = $("input[id='checkbox-child']:checked").val();
    console.log(child);

    if (child) {
        $("#parent-div").hide();
        $("#child-div").show();
    }

})

var numberofchores=0;

$("#add-chore-button").on("click", function () {
   
    let choreText = $("#add-chore").val().trim();
    $("#add-chore").val("");




    if (!choreText){
        // error: input is empty
        // temp alert:
        
        alert("This field cannot be empty");
    }
    else{
        numberofchores++;

        var chore = $("<p>");
        chore.attr("id", numberofchores);
        chore.attr("class", "startgreen")

    

        chore.text(choreText);

        $("#chore-list").append(chore);
    }
// chores available will be the color green in the chore-list
// chores taken will be the color red in the chore-list
// chores done will be crossed out (like the cat example)


})