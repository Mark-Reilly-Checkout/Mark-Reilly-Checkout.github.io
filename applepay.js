var MECHAT_ID = "mark-reilly-checkout.github.io" ;
var BACKEND_URL_VALIDATE_SESSION = window.location.href + "validateSession";
var BACKEND_URL_PAY = window.location.href + "pay";

var appleButton = document. querySelector(".apple-pay-button");
// Check if Apple Pay is available
if (
window.ApplePaySession && ApplePaySession.canMakePaymentsWithActiveCard(MECHAT_ID)){
// show the Apple Pay button
appleButton.style.display = "block";
}

// Hanle the apple pay button click
appleButton.addEventListener("click", function() {
    var applePaySession = new ApplePaySession (6, {
    countryCode: "US", 
    currencyCode: "USD",
    supportedNetworks: ["visa", "masterCard", "amex", "discover"], 
    merchantCapabilities: ["supports3DS"],
    total: { label: "Amazing Shop", amount: "10.00" }
    });
    applePaySession.begin();
    // This is the first event that Apple triggers. Here you need to validate the
    // Apple Pay Session from your Back-End
    applePaySession.onvalidatemerchant = function(event) {
        var theValidationURL = event.validationURL;
        validateTheSession(theValidationURL, function(merchantSession){
            applePaySession.completeMerchantValidation(merchantSession);
        });
    };
    // This triggers after the user has confirmed the transaction with the Touch ID or Face
    // Thiis will contian the payment token
    applePaySession.onpaymentauthorized = function (event) {
        var applePaymentToken = event.payment.token;

        pay(applePaymentToken, function(outcome){
            if(outcome){
                applePaySession.completePayment(ApplePaySession.STATUS_SUCCESS);
            }
            else{
                applePaySession.completePayment(ApplePaySession.STATUS_FAILURE);
            }
        });
    } ;
});

var validateTheSession = function (theValidationURL, callback) {
// We send the validation URL to our backed
axios
.post (
    BACKEND_URL_VALIDATE_SESSION,
    {
        appleUrl: theValidationURL
    },
    {
       headers: {
        "Access-Control-Allow-Origin": "*"
        }
    }
)
.then (function (response ){
    callback (response.data );
    });
};

var pay = function(applePaymentToken, callback) {

};