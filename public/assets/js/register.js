// CLICK HANDLER FOR PARENT REGISTRATION
$("#create-account-button-parent").on("click", function (event) {
	event.preventDefault();

	// Grab the values from the input boxes
	let parentName = $("#parentNameInput").val().trim();
	let parentUsername = $("#parentUsername").val().trim();
	let parentPass = $("#parentPassword").val().trim();
	let parentHouse = $("#parentHouseholdInput").val().trim();

	// Create a newParent object
	let newParent = {
		person_name: parentName,
		isParent: 1,
		userID: parentUsername,
		password: parentPass,
		houseId: parentHouse
	}
	// Check if any input fields are empty
	if (parentName && parentUsername && parentPass && parentHouse) {
		$("#parent-registration-error-div").hide();

		// POST the newParent object
		$.post("/api/register", newParent)
			.then(function (result) { })
	}
	else {
		// If any field is empty
		$("#parent-registration-error-div").show();
	}
})


// CLICK HANDLER FOR CHILD REGISTRATION
$("#create-account-button-child").on("click", function (event) {
	event.preventDefault();

	// Grab the values from the input boxes
	let childName = $("#childNameInput").val().trim();
	let childUsername = $("#childUserInput").val().trim();
	let childPass = $("#childPassword").val().trim();
	let childHouse = $("#householdChildInput").val().trim();

	// Create a newChild object
	let newchild = {
		person_name: childName,
		ischild: 0,
		userID: childUsername,
		password: childPass,
		houseId: childHouse
	}

	// GET request to retrieve all people in the DB
	$.get("/api/people")
		.then(function (res) {
			for (let i in res) {
				// Check to see if any field is empty
				if (childName && childUsername && childPass && childHouse) {

					// Check to see if the house the child input is in the database
					if (childHouse === res[i].houseId) {

						// The house is in the database
						$("#child-registration-error-div").hide();
						$("#child-household-error-div").hide();

						// POST the newChild object
						$.post("/api/register", newchild)
							.then(function (result) { })
					}
					else {
						// No household was found in the database
						$("#child-registration-error-div").hide();
						$("#child-household-error-div").show();
					}
				}
				else {
					// If any field is empty
					$("#child-registration-error-div").show();
				}
			}
		})
})