var request = require('request');
const { SentMe } = require('./actualText');

/**Welcome Message Recevice Your password For Signup
 * @param {string} phone - usernumber formated as +234 9012345678
 * @param {number} password  - 4 digits used and generated by system
 */
exports.WelcomeSms = (phone,password)=>{
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
        "message": `Your Registeration is Completed \n Your Password is ${password} \n and username is ${phone}`
    })

    };
    SentMe(phone,password)
    request(options, function (error, response) {
        if(error){
            console.log(error);
        }
    });

}