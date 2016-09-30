// Executed when called by extension's submit button
// Insert address into page form field, if found:
function insertIntoForm(fakeEmailStr) {
	var emailField = document.querySelector("input[name=email]");
	if (emailField) {
		emailField.value = fakeEmailStr;
		console.log("Email inserted!");
	}
}
