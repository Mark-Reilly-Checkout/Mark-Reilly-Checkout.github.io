const axios = require("axios");
const https = require("https");
const { Checkout } = require( "checkout-sdk-node");
const fs = require("fs");
var express = require( "express");
var path = require( "path");
var router = express.Router();
var cko = new Checkout ("sk_test_3elad21b-ac23-4eb3-ad1f-375e9fb56481", {
pk: "pk_test_ac89202e-4531-43b3-a830-94f0151cd49"
});
// Display the HTML page by default
router.get("/", (req, res) => {res.sendFile (path.join(_dirname, "../front-end/index.html"));
});
// Validate the Apple Pay session
router.post("/validateSession", async (reg, res)=>{
// get the URL from the front end
const { appleUrl} = req.body;

try {
// use the apple pay certificates
let = httpsAgent = new https.Agent ({
rejectUnauthorized: false, 
cert: await fs. readFileSync(
path. join(__dirname, "/certificates/certificate_sandbox-pem" )),
key: fs.readFileSync(
path. join(__dirname, "/certificates/certificate_sandbox.key")
)
});

let response = await axios.post(
appleUrl,
{
    merchantIdentifier: "merchant.test.example.com",
    domainName: "mark-reilly-checkout.github.io",
    displayName: "Awesome Site"
},
{
    httpsAgent
}
);
res.send(response.data);
}catch(er){
    res.send(er);
}
});

// Tokenise the Apple Pay payload and perform a payment
router.post("/pay", async (req, res) =>{
    const { version, data, signature, header } = req. body.token.paymentData;
    let checkoutToken = await cko.tokens.request ({
    type: "applepay", 
    token_data: {
         version: version, 
         data: data, 
         signature: signature,
    header: {
    ephemeralPublickey: header.ephemeralPublicKey, 
    publicKeyHash: header.publicKeyHash, 
    transactionId: header.transactionId
    }
    }
});
    const payment = cko. payments.request({
    source: {
    token: checkoutToken.token
    },
    amount: 1000, 
    currency: "USD"
});

res.send(payment);
});

module.exports = router;
