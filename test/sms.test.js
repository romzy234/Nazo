const {verifySms} = require('../sms/verify')
const {forgotSms} = require('../sms/forgot')
const {WelcomeSms} = require('../sms/welcome')

console.log(verifySms('+2349036071895',3334))
console.log(forgotSms('+2349036071895',3334))
console.log(WelcomeSms('+2349036071895',3334))