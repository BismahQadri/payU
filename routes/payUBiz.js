var express = require('express');
var router = express.Router();
let request = require('request')
let axios = require('axios')
const crypto = require('crypto')
const randomInt = require('random-int')
const url = require('url');
/* GET home page. */
router.post('/', function(req, res, next) {
    //console.log(req)
    let data = req.body
    let key = "J0rC5a"
    let salt = 'J5OrgpgB'
    let txnid = '454131146234'
    let params = `${key}|${txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${salt}`
    const hash512 = crypto.createHash('sha512')
    hash512.update(params)
    let hashvalue =  hash512.digest('hex')
    data.key = key
    data.hash = hashvalue
    data.txnid = txnid
    data.surl = "http://www.google.com"
    data.furl = "http://www.google.com"
    data.curl = "http://www.google.com"
   // console.log(data)
   /* return res.redirect(url.format({
        pathname:"https://test.payu.in/_payment",
        query:data
    }));*/
   // res.send(data)

});

module.exports = router;