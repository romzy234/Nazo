var request = require('request');

/**Welcome Message Recevice Your password For Signup
 * @param {string} phone - usernumber formated as +234 9012345678
 * @param {number} password  - 4 digits used and generated by system
 */
exports.forgotSms = (phone,password)=>{
    var options = {
    'method': 'POST',
    'url': 'https://fsi.ng/api/v1/africastalking/version1/messaging',
    'headers': {
        'sandbox-key': '4NutTmCmg6PqSbvqIvqDcBGXIA6ImPQs1648949642',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "username": "sandbox",
        "to": phone,
        "message": `Account reset \n Your New Password is ${password} `
    })

    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });

}