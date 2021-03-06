var express = require('express');
var router = express.Router();
let request = require('request')
let axios = require('axios')
const crypto = require('crypto')
const randomInt = require('random-int')
const url = require('url');
/* GET home page. */
router.post('/', function(req, res, next) {
    let data = req.body
    let key = "J0rC5a"
    let salt = 'J5OrgpgB'
    let txnid = new Date() + randomInt(10000, 999999)
    let params = `${key}|${txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${salt}`
    data.hash = generateHash(params)
    data.key = key
    data.txnid = txnid
    data.surl = "https://powerful-sands-92812.herokuapp.com/payUBiz/success"
    data.furl = "https://powerful-sands-92812.herokuapp.com/payUBiz/failure"
    data.curl = "http://www.google.com"
    res.send(data)

});
function generateHash(params) {
    const hash512 = crypto.createHash('sha512')
    hash512.update(params)
    return  hash512.digest('hex')
}
function checkNull(param) {
    return param || ""
}
router.post('/success', function (req, res) {
    const body = req.body
    const status = body.status
    const firstname = body.firstname
    const amount = body.amount
    const txnid = body.txnid
    const hash = body.hash
    const key = body.key
    const productinfo = body.productinfo
    const email = body.email
    const udf1 = body.udf1
    const udf2 = body.udf2
    const udf3 = body.udf3
    const udf4 = body.udf4
    const udf5 = body.udf5
    const additionalCharges = body.additionalCharges
    const mode = body.mode
    const salt = 'J5OrgpgB'

    let params
    if (additionalCharges) {
        params = checkNull(additionalCharges) + '|' + checkNull(salt) + '|' + checkNull(status) + '||||||' + checkNull(udf5) +
            '|' + checkNull(udf4) + '|' + checkNull(udf3) + '|' + checkNull(udf2) + '|' + checkNull(udf1) + '|' +
            checkNull(email) + '|' + checkNull(firstname) + '|' + checkNull(productinfo) + '|' + checkNull(amount) +
            '|' + checkNull(txnid) + '|' + checkNull(key)
    } else {
        params = checkNull(salt) + '|' + checkNull(status) + '||||||' + checkNull(udf5) + '|' + checkNull(udf4) +
            '|' + checkNull(udf3) + '|' + checkNull(udf2) + '|' + checkNull(udf1) + '|' + checkNull(email) + '|' +
            checkNull(firstname) + '|' + checkNull(productinfo) + '|' + checkNull(amount) + '|' + checkNull(txnid) +
            '|' + checkNull(key)
    }
    let reverseHash =  generateHash(params)
    if (reverseHash === hash) {
        // save payment transactions in DB
        res.json(req.body)
      /*  res.render('status', {
            heading: 'Success',
            message: 'Successfully Done',
            class: 'fa fa-times-circle text-danger'
        })*/
    } else {
        res.json("error")
      /*  res.render('status', {
            heading: 'Error',
            message: 'Invalid Transaction. Please try again',
            class: 'fa fa-times-circle text-danger'
        })*/
        console.log('==================PayU PAYMENT=================')
        console.log('Invalid hash')
        console.log('===================ENDS HERE====================')
    }

})

router.post('/failure', function (req, res) {
    const body = req.body
    console.log('==========failure',body)
    const status = body.status
    const firstname = body.firstname
    const amount = body.amount
    const txnid = body.txnid
    const hash = body.hash
    const key = body.key
    const productinfo = body.productinfo
    const email = body.email
    const udf1 = body.udf1
    const udf2 = body.udf2
    const udf3 = body.udf3
    const udf4 = body.udf4
    const udf5 = body.udf5
    const additionalCharges = body.additionalCharges
    const salt = 'J5OrgpgB'
    let params
    if (additionalCharges) {
        params = checkNull(additionalCharges) + '|' + checkNull(salt) + '|' + checkNull(status) + '||||||' + checkNull(udf5) +
            '|' + checkNull(udf4) + '|' + checkNull(udf3) + '|' + checkNull(udf2) + '|' + checkNull(udf1) + '|' +
            checkNull(email) + '|' + checkNull(firstname) + '|' + checkNull(productinfo) + '|' + checkNull(amount) +
            '|' + checkNull(txnid) + '|' + checkNull(key)
    } else {
        params = checkNull(salt) + '|' + checkNull(status) + '||||||' + checkNull(udf5) + '|' + checkNull(udf4) +
            '|' + checkNull(udf3) + '|' + checkNull(udf2) + '|' + checkNull(udf1) + '|' + checkNull(email) + '|' +
            checkNull(firstname) + '|' + checkNull(productinfo) + '|' + checkNull(amount) + '|' + checkNull(txnid) +
            '|' + checkNull(key)
    }
    let reverseHash =  generateHash(params)
    if (reverseHash === hash) {
        res.json(req.body)
      /*  res.render('status', {
            heading: 'Error',
            message: 'Transaction Failed. Your payment status is ' + status,
            class: 'fa fa-times-circle text-danger'
        })*/

        console.log('============PayU PAYMENT FAILURE=============')
        console.log(body)
        console.log('===================ENDS HERE====================')
    } else {
        res.json("failure error")
      /*  res.render('status', {
            heading: 'Error',
            message: 'Invalid Transaction. Please try again',
            class: 'fa fa-times-circle text-danger'
        })*/
        console.log('==================PayU PAYMENT=================')
        console.log('Invalid hash')
        console.log('===================ENDS HERE====================')
    }
})

module.exports = router;