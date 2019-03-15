$("#create-account-button-parent").on("click", function (event) {
	event.preventDefault();

	let parentName = $("#parentNameInput").val().trim();
	console.log("Your name: ", parentName);

	let parentUsername = $("#parentUsername").val().trim();
	console.log("Your username: ", parentUsername);

	let parentPass = $("#parentPassword").val().trim();
	console.log("Your password: ", parentPass);

	let parentHouse = $("#parentHouseholdInput").val().trim();
	console.log("Your household name: ", parentHouse);
	// first we make an object with the above properties (and isParent=1)

	let newParent = {
		person_name: parentName,
		isParent: 1,
		userID: parentUsername,
		password: parentPass,
		houseId: parentHouse
	}


	if (parentName && parentUsername && parentPass && parentHouse) {
		$("#parent-registration-error-div").hide();

		console.log("TEST 0");
		$.post("/api/register", newParent)
			.then(function () {
				console.log("TEST 1");

			})



	}


	else {
		$("#parent-registration-error-div").show();
	}

})








$("#create-account-button-child").on("click", function (event) {
	event.preventDefault();
	let childName = $("#childNameInput").val().trim();
	console.log("Your name: ", childName);

	let childUsername = $("#childUserInput").val().trim();
	console.log("Your username: ", childUsername);

	let childPass = $("#childPassword").val().trim();
	console.log("Your password: ", childPass);

	let childHouse = $("#householdChildInput").val().trim();
	console.log("Your household name: ", childHouse);

	let newchild = {
		person_name: childName,
		ischild: 0,
		userID: childUsername,
		password: childPass,
		houseId: childHouse
	}


	console.log("TEST -1");
	if (childName && childUsername && childPass && childHouse) {
		$("#child-registration-error-div").hide();
		console.log("TEST 0");
		$.post("/api/register", newchild)
			.then(function () {
				console.log("TEST 1");

				$.post("/login", newchild)
					.then(function () {
						console.log("TEST 2");

						$.get("/childAcct")
							.then(function () {
								console.log("TEST 3");
							})
					})
			})
	}
	else {
		$("#child-registration-error-div").show();
	}



})