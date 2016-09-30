/*
 * Fake Email Generator - a Chrome Extension
 * author: M. Nicholson
 * 2016-09-30
 */

(function() {
	
	var services = ['Mailinator', 'GuerillaMail', '10MinuteMail'];
	var domains = ['mailinator.com','zepp.dk','wishan.net','wolfmission.com'];
	var fakeEmail = [];

	// Make random string (first part of email):
	function randomString(length) {
		var alphanum = 'abcdefghijklmnopqrstuvwxyz1234567890';
		var out = '';
		var i;
		for (i = 0; i < length; i++) {
			out += alphanum[Math.floor(Math.random() * (alphanum.length - 1))];
		}
	//	console.log(out);
		return out;		
	}
	
	// Select a domain at random:
	function randomDomain() {
		var d = domains[Math.floor(Math.random() * (domains.length - 1))];
	//	console.log(d);
		return d;
	}
	
	// Copy to clipboard:
	function copyEmailString() {
		var fakeStr = fakeEmail[0] + '@' + fakeEmail[1];
		document.execCommand('copy');	// copy WHAT?
		alert(fakeStr + ' copied to clipboard.');
	}
	
	// Create a fake email address:
	function makeEmail() {
		var email = [randomString(10), randomDomain()];
		console.log(email[0], '@', email[1]);
		return email;
	}

	// New email:
	function regenerate() {
		fakeEmail = makeEmail();	
		// Insert into popup form:
		document.getElementById("firstpart").value = fakeEmail[0];
		document.getElementById("domain").value = fakeEmail[1];
	}

	// Open new tab with service:
	function openMailbox() {
	//	window.open('https://www.mailinator.com/inbox2.jsp?public_to=' + fakeEmail[0]);
		chrome.tabs.create({url: 'https://www.mailinator.com/inbox2.jsp?public_to=' + fakeEmail[0]});
	}

	// Button listeners:
	document.getElementById("regenerate").addEventListener('click', regenerate);
														   
	document.getElementById("accept").addEventListener('click', function() {		
		var fakeEmailStr = fakeEmail[0] + '@' + fakeEmail[1];
		
		chrome.tabs.executeScript({
			code: 'insertIntoForm("'+fakeEmailStr+'")'
		});

		openMailbox();
	});
		
	// Begin:
	regenerate();
	
}());