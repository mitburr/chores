
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
var numberofchores = 0;



// Click handler for the "add chore" button
$("#add-chore-button").on("click", function () {

    // Gets the text from the text box and then clears it
    let choreText = $("#add-chore").val().trim();
    $("#add-chore").val("");

    // Whether or not the text box is empty
    if (!choreText) {
        $("#error-div").show();
    }
    else {
        $("#error-div").hide();
        submitChore(choreText);

        // The below code shows what should be done with "adding a chore" and "getting a chore from
        // the DB into the chore-list" requests (from before we had the database)
        // $("#error-div").hide();
        // // This removes the placeholder text within the text box
        // $("#add-chore").attr("placeholder", "");
        // numberofchores++;

        // // Create a new p-tag and give it an id and a class
        // var chore = $("<p>");
        // chore.attr("id", numberofchores);
        // chore.attr("class", "text-green")

        // // Make the text in the <p> whatever the chore typed was
        // chore.text(choreText);

        // // Append the new <p> with the chore into the chore list
        // $("#chore-list").append(chore);

    }
});


// Below is what (hopefully) the get requests will need to be in order to save the chore and
// to display all of the chores that belong to a particular house (houseId)



// The value of dropdownId doesn't matter much, it's only used for targeting chores when we need to, like for deletion or completion
let dropdownId = 1;


// Maybe take in houseId as a parameter so we know which house to check?
function getNames() {
    // GET call to get all names
    $.get("/api/household")
        .then(function (result) {
            let people = result.persons;
            for (let i in people) {
                if (people[i].isParent === false) {
                    // this is a child
                    console.log(person[i].person_name);

                    // create new dropdown item with child's name
                    let newDropdownItemChild = `<a class="dropdown-item" href="#">` + person[i].person_name + `</a>`;

                    console.log(newDropdownItemChild);

                    // append dropdown to menu
                    $("#child-names").append(newDropdownItemChild);
                }
            }
        });
}

function getChores() {
    // GET call to get all chores
    $.get("/api/household")
        .then(function (result) {
            let chores = result.chore;
            for (let i in chores) {

                console.log(chores[i].chore_name);
                // create new dropdown item with chore's name
                let newDropdownItemChore = $(`<a class="dropdown-item" id=` + dropdownId + ` href="#">` + chores[i].chore_name + `</a>`);
                if (chores[i].chore_complete === 0) {
                    newDropdownItemChore.attr("class", "text-green");
                }
                // CODE HERE: create a new chore with chore_name of choreText in the DB

                // CODE HERE: get names of chores from the DB and put them in $("#chore-list")
                // create new <p> and add a class dynamically:
                // if the chore is `not completed && not assigned`, use class="text-green"
                // if the chore is assigned, use class="text-red"
                // if the chore completed, use class="text-line-through"


                console.log(newDropdownItemChore);

                // append dropdown to menu
                $("#chore-names").append(newDropdownItemChore);
            }
        })
}
// Display on startup (automatically runs)
getNames();
getChores();


function submitChore(chore) {
    $.post("/api/chore", chore, function () {
        getNames();
        getChores();
    });
}