var MECHAT_ID = "mark-reilly-checkout.github.io" ;
var BACKEND_URL_VALIDATE_SESSION = window. location.href + "validateSession";
var BACKEND_URL_PAY = window. location.href + "pay";

var appleButton = document. querySelector(".apple-pay-button");
// Check if Apple Pay is available
if (
window.ApplePaySession && ApplePaySession. canMakePaymentsWithActiveCard(MECHAT_ID)){
// show the Apple Pay button
appleButton.style.display = "block";
}

// Hanle the apple pay button click
//appleButton.addEventListener("click", function{} {)};

var validateTheSession = function (theValidationURL, callback) {

};
var pay = function(applePaymentToken, callback) {

};