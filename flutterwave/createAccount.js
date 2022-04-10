const user = require('../model/user')
const {getAccount} = require('../sms/getAccount')
var request = require('request');

/**Creating a virtual account 
 * and store
 * @param {Number} bvn - its no supporting user password
 * @param {String} phone - user phone number
 * @param {String} firstName - user name
 * @param {String} lastName - user last
 * @param {String} narration - narration
 */
exports.createAccount=(bvn,phone,firstName,lastName,narration)=>{
    var options = {
    'method': 'POST',
    'url': 'https://fsi.ng/api/v1/flutterwave/v3/virtual-account-numbers',
    'headers': {
        'Content-Type': 'application/json',
        'sandbox-key': '4NutTmCmg6PqSbvqIvqDcBGXIA6ImPQs1648949642',
        'Authorization': 'dskjdks'
    },
    body: JSON.stringify({
        "email": "developers@flutterwavego.com",
        "is_permanent": true,
        "bvn": `${bvn}`,
        "tx_ref": "VA12",
        "phonenumber": phone,
        "firstname": firstName,
        "lastname": lastName,
        "narration": narration
    })
};

    request(options, function (error, response) {
    if (error) throw new Error(error);
    const data = response.body
    const obj = {
        account_number:data.account_number,
        bank_name :data.bank_name
    }

    // console.log(obj.status);
    user.findOne({
        phone: phone
    }).then(userss => {
        userss = _.extend(userss, obj);
        userss.save(
            ()=>{
                console.log("User Account is created");
                getAccount(phone,obj.account_number,obj.bank_name)

            }
        )
    }).catch(error => {
        console.log(error);
    })

    });

}