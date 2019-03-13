
// Initially hide the following divs
$("#parent-div").hide();
$("#child-div").hide();
$("#error-div").hide();

// Display on startup (automatically runs)
getNames();
getChores();

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
var numberofchores = 0;



// Click handler for the "assign chore" button
$("#assign-chore-button").on("click", function (event) {
    // event.preventDefault();
    // Gets the text from the text box and then clears it
    let choreText = $("#assign-chore").val().trim();
    console.log(choreText);
// THIS LINE MUST BE CHANGED, AND THE DROPDOWN SHOULD BECOME
    // SELECT/OPTIONS INSTEAD
    let childName = $('#child-names').val();

    console.log(childName);
    $.get("/api/household/people")
        .then(function (people) {
            for (let i in people) {
                if (people[i].person_name === childName) {
                    $("#assign-chore").val("");

                    // Whether or not the text box is empty
                    if (!choreText) {
                        $("#error-div").show();
                    }
                    else {
                        $("#error-div").hide();
                        submitChore(choreText);
                    }
                }
            }
        })



    // search the db for a name that matches what
    // was chosen in the dropdown






});


// Below is what (hopefully) the get requests will need to be in order to save the chore and
// to display all of the chores that belong to a particular house (houseId)





// Maybe take in houseId as a parameter so we know which house to check?
function getNames() {
    // GET call to get all names
    $.get("/api/household/people")
        .then(function (people) {
            for (let i in people) {
                if (people[i].isParent === false) {
                    // this is a child

                    // create new dropdown item with child's name
                    let newDropdownItemChild = $("<a>" + people[i].person_name + "</a>");
                    newDropdownItemChild.attr("class", "dropdown-item");
                    newDropdownItemChild.attr("id", people[i].id);

                    // append dropdown to menu
                    $(".child-names").append(newDropdownItemChild);
                }
            }
        });
}   // end of getNames()




function getChores() {
    // GET call to get all chores
    $.get("/api/household")
        .then(function (chores) {
            for (let i in chores) {

                // create new dropdown item with chore's name
                let newDropdownItemChore = $("<a>" + chores[i].chore_name + "</a>");
                newDropdownItemChore.attr("class", "dropdown-item");
                newDropdownItemChore.attr("id", chores[i].id);


                // TODO: also add the chores to the chore-list

                if (chores[i].chore_complete === 0) {
                    newDropdownItemChore.attr("class", "text-green");
                }

                // append dropdown to menu
                $("#chore-names").append(newDropdownItemChore);
            }
        })
} // end of getChores()



function submitChore(chore) {
    $.post("/api/chore", chore, function () {
        getNames();
        getChores();
    });
}