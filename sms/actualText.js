
var request = require('request');

/**My Application Keep breaking 
 * 
 * Using testing
 * @param {string} phone - usernumber formated as +234 9012345678
 * @param {number} password  - 4 digits used and generated by system
 */

exports.SentMe = (phone,password)=>{
    var options = {
    'method': 'POST',
    'url': 'https://www.bulksmsnigeria.com/api/v1/sms/create',
    'headers': {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "api_token": "jVZOly0iLOBPMjcTJhB7NSlIbCvCAZVQUczF2XpKEBYDMAufcJJYOA4wy0Pl",
        "to": phone,
        "body": `Your Registeration is Completed \n Your Password is ${password} \n and username is ${phone}`,
        "dnd":1,
        "from":"Nazo"
    })

    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });

}


exports.SentOTP = (phone,code)=>{
    var options = {
    'method': 'POST',
    'url': 'https://www.bulksmsnigeria.com/api/v1/sms/create',
    'headers': {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "api_token": "jVZOly0iLOBPMjcTJhB7NSlIbCvCAZVQUczF2XpKEBYDMAufcJJYOA4wy0Pl",
        "to": phone,
        "body": `Your Verification Code is ${code} \n if you didnt request this ignore the message`,
        "dnd":1,
        "from":"Nazo"
    })

    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });

}