var express = require('express');
var router = express.Router();
let request = require('request')
const crypto = require('crypto')
const randomInt = require('random-int')
/* GET home page. */
router.post('/', function(req, res, next) {
    let data = req.body
    let key = "J0rC5a"
    let salt = 'J5OrgpgB'
    let txnid = new Date() + randomInt(10000, 999999)
    let params = `${key}|${txnid}|${parseFloat(data.amount)}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${salt}`
    const hash512 = crypto.createHash('sha512')
    hash512.update(params)
    let hashvalue =  hash512.digest('hex')
    data.hash = hashvalue
    data.txnid = txnid
    data.surl = "http://www.google.com"
    data.furl = "http://www.google.com"
    data.curl = "http://www.google.com"
    console.log(data)
    request('https://test.payu.in/_payment',data, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
  /*  request.post({
        headers: { 'content-type': 'multipart/form-data' },
        url: `https://test.payu.in/_payment`,
        formData: {
            postedinfo: data
        }
    }, (error, response, body) => {
    })*/
    res.render('payUSuccess', { title: 'Payment payU' });
});

module.exports = router;