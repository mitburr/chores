
// Initially hide the following divs
$("#parent-div").hide();
$("#child-div").hide();
$("#chore-input-error-div").hide();
$("#child-select-error-div").hide();

// // Display on startup (automatically runs)
getNames();
getChores();
getChoresForChild();

//**********************HOME PAGE CLICK HANDLER TO REGISTER*********************************************** */

$("#registerbtn").on("click", function () {
    $.get("/register")
        .then(function (res) {
            window.location.href = "/register"
            console.log("500");
        });
})

// ******************** REGISTRATION ********************

// On registration; shows either the registration for a parent or a child
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


// ******************** CLICK HANDLER [#assign-chore-button] ********************

// Click handler for the "assign chore" button
$("#assign-chore-button").on("click", function (event) {
    let choreInfo = {
        chore_name: "",
        personId: ""
    }

    // Insert into a variable the chore that was typed
    let choreText = $("#assign-chore").val().trim();

    // Insert into a variable the id of the child that was selected in the dropdown
    let idOfChild = $("#select-child-for-assign").val();

    // Whether or not the text box is empty
    if (!choreText) {
        $("#chore-input-error-div").show();
    }
    else {
        $("#chore-input-error-div").hide();

    }

    // Whether or not the child dropdown has a valid child selected
    if (idOfChild === "default") {
        $("#child-select-error-div").show();
    }
    else {
        $("#child-select-error-div").hide();

    }

    // If both the text box is filled and a valid child was selected
    if (choreText && idOfChild != "default") {
        $("#chore-input-error-div").hide();
        $("#child-select-error-div").hide();
        choreInfo.chore_name = $("#assign-chore").val().trim();
        choreInfo.personId = idOfChild;

        console.log(choreInfo);
        // Post the chore to the DB and reload the page to see updated chore-list
        $.post("/api/chore", choreInfo)
            .then(function () {
                location.reload();
            })
    }

    $.get("/api/household/people")
        .then(function (people) {
            for (let i in people) {
                if (people[i].person_name === idOfChild) {
                    // CODE: this is where we assign the chore to the child

                    $("#assign-chore").val("");
                }
            }
        })
});

// ******************** CLICK HANDLER [#child-submit-cutton] ********************


$("#child-submit-button").on("click", function (event) {
    console.log("hello");
})

// ******************** CLICK HANDLER [#parent-reassign-button] ********************

$("#parent-reassign-button").on("click", function (){
    let choreToReassign = {
        chore_id: "",
        personId: ""
    }
    let chore = $(".chore-names").val();
    choreToReassign.chore_id = chore;

    let person = $("#select-child-for-reassign").val();
    choreToReassign.personId = person;


    $.ajax({
        method: "PUT",
        url: "/api/chore/reassign",
        data: choreToReassign
    })
    .then(function(){
        console.log("QAWEFSGRDHTJ");
    })


})



// ******************** FUNCTIONS ********************

// Get the names of the children in the household from the database,
    // then append them to the "Select child" <select> tags
function getNames() {
    console.log(document.cookie)
    // GET call to get all names
    $.get("/api/household/people")
        .then(function (people) {
            for (let i in people) {
                // Filters so we only get children
                if (people[i].isParent === false) {

                    // Create a new item with child's name (people[i] are the children)
                    let newChildItem = $("<option>" + people[i].person_name + "</option>");
                    newChildItem.attr("value", people[i].id);

                    // Append child to menu
                    $(".select-child").append(newChildItem);
                }
            }
        });
}


// Get the chores in the database that belong to the household
function getChores() {
    // GET call to get all chores
    $.get("/api/household")
        .then(function (chores) {
            for (let i in chores) {

                // Create new <option> with chore name
                let newChoreItemDropdown = $("<option>" + chores[i].chore_name + "</option>");
                newChoreItemDropdown.attr("value", chores[i].id);

                // Append chore to menu
                $(".chore-names").append(newChoreItemDropdown);

                // Adds the chores from the DB to the .`chore-list`
                if (chores[i].chore_complete === false) {
                    let newChoreItemList = $("<p>" + chores[i].chore_name + "</p>")
                    newChoreItemList.attr("class", "text-green");
                    $(".chore-list").append(newChoreItemList);
                }
            }
        })
}




// Get the chores in the database that belong to the household and a particular child
function getChoresForChild() {
    // GET call to get all chores
    $.get("/api/household/child")
        .then(function (chores) {
            for (let i in chores) {

                // Create new <option> with chore name
                let newChoreItemDropdown = $("<option>" + chores[i].chore_name + "</option>");
                newChoreItemDropdown.attr("value", chores[i].id);

                // Append chore to menu
                $(".chore-names").append(newChoreItemDropdown);

                // Adds the chores from the DB to the .`chore-list`
                if (chores[i].chore_complete === false) {
                    let newChoreItemList = $("<p>" + chores[i].chore_name + "</p>")
                    newChoreItemList.attr("class", "text-green");
                    $(".chore-list").append(newChoreItemList);
                }
            }
        })
}

