

// Initially hide the following divs
$("#parent-div").hide();
$("#child-div").hide();
$("#error-div").hide();

// Activates whenever a radio button is clicked
$("input[type='radio']").change(function () {

    let parent = $("input[id='checkbox-parent']:checked").val();
    let child = $("input[id='checkbox-child']:checked").val();
    
    // Shows either the parent's or child's registration page, based on radio button clicked
    if (parent) {
        $("#child-div").hide();
        $("#parent-div").show();
    }
    if (child) {
        $("#parent-div").hide();
        $("#child-div").show();
    }
})

// Initialize the number of chores to 0
var numberofchores=0;

// Click handler for the "add chore" button
$("#add-chore-button").on("click", function () {
   
    // Gets the text from the text box and then clears it
    let choreText = $("#add-chore").val().trim();
    $("#add-chore").val("");

    // Whether or not the text box is empty
    if (!choreText){
        $("#error-div").show();
    }
    else{
        $("#error-div").hide();
        // This removes the placeholder text within the text box
        $("#add-chore").attr("placeholder", "");
        numberofchores++;

        // Create a new p-tag and give it an id and a class
        var chore = $("<p>");
        chore.attr("id", numberofchores);
        chore.attr("class", "text-green")

        // Make the text in the <p> whatever the chore typed was
        chore.text(choreText);

        // Append the new <p> with the chore into the chore list
        $("#chore-list").append(chore);
    }

    
// chores available will be the color green in the chore-list
// chores taken will be the color red in the chore-list
// chores done will be crossed out (like the cat example)


})



function getChildName(id){
    $.get("/api/household").then(function(result){
        console.log(result.persons);
    })
}

getChildName();