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
    let txnid = new Date() + randomInt(10000, 999999)
    let params = `${key}|${txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${salt}`
    const hash512 = crypto.createHash('sha512')
    hash512.update(params)
    let hashvalue =  hash512.digest('hex')
    data.key = key
    data.hash = hashvalue
    data.txnid = txnid
    data.surl = "https://powerful-sands-92812.herokuapp.com/payUBiz/success"
    data.furl = "https://powerful-sands-92812.herokuapp.com/payUBiz/failure"
    data.curl = "http://www.google.com"
    res.send(data)

});
router.post('/success', function (req, res) {
    const body = req.body
    console.log('======================success',body)
    res.render('status', {
        heading: 'Success',
        message: 'Successfully Done'
    })
})

router.post('/failure', function (req, res) {
    const body = req.body
    console.log('==========failure',body)
    res.render('status', {
        heading: 'Success',
        message: 'Successfully Done'
    })
})

module.exports = router;