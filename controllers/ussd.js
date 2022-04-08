/**This Is The Controller For the ussd Code */

'use strict'

const { response } = require("express")

/**The Main Ussd Function 
 * 
 */
 exports.postCall= (req,res)=>{
    // 
    const d = req.body
    const phoneNumber = d.phoneNumber 
    const text = d.text
    const sessionId = d.sessionId
    console.log(req.body);
    let respones
    let arr = text.split('*')
    console.log(" Too B=view Arr " +arr);
    if(text == ''){
        respones = `CON Enter Your Prefer Language | Shigar da yaren da kuka fi so
            1. English
            2. Hausa
        `
    }
    if(text!== "" && arr.length == 1){
        console.log( " English Optin" +arr.length);
        respones = `CON Chose An Option
            1. Create account
            2. Check account Balance
            3. Get account number
            4. Send money
            5. Get loan
            6. Other`
    }
// This  is for hausa
    if(text!== "" && text == "2"){
        
        respones = `CON Chose An Option
            1. Create account
            2. Check account Balance
            3. Get account number
            4. Send money
            5. Get loan
            6. Other`
    }

    // this is for engling 
   

    //  1. create Account
    if(text !=="" && arr.length == 2 && parseInt(arr[1])== 1){
        console.log(2);
        console.log(parseInt(arr[1]));
        // TODO -- check if account exist 
        // TODO -- if no create a new Account
        // TODO -- Add PROMPT FOR BVN 
        respones = `END Your Account Has Been Created 
            Check SMS For More Detail`
    }

        // 2. Check Account Balanace 
if(text !=="" && arr.length == 2 && parseInt(arr[1])== 2){
        // TODO -- check if account exist 
        // TODO -- if no Account throw err
        //TODO -- if Account Show Bl
        respones = `END Your account balanace is NGN 3000.00`
    }

        // 3. GET ACCOUNT NUMBER
    if(text !=="" && arr.length == 2 && parseInt(arr[1])== 3){
        // TODO -- check if account exist 
        // TODO -- if no Account throw err
        //TODO -- if Account Show number 
        // text Detail
        respones = `END Your Account Number Is 6886556778
                Account Name Is GOOGLES             
        `
    }
        // 4. Send Money 
    if(text !=="" && arr.length == 2 && parseInt(arr[1])== 4){
        // TODO -- check if account exist 
        // TODO -- if no Account throw err
        //TODO -- if Account Show Bl
        respones = `CON Enter Amount`
    }

        // 5 . Get Loan 
    if(text !=="" && arr.length == 2 && parseInt(arr[1])== 5){
        // TODO -- Trigger a function to send sms 
        respones = `END Check your Email For More Detail`
    }
        // 6. Other 
    if(text !=="" && arr.length == 2 && parseInt(arr[1])== 6){
        respones = `CON Select One 
            1. Change Password
            2. Upgrade Account
            3. Update BVN     
        `
    }

    setTimeout(()=>{
        console.log(text)
        res.send(respones),
        res.end()
    },2000)
}

// exports.postCall=(req, res) => {
//     // Read the variables sent via POST from our API
//     const {
//         sessionId,
//         serviceCode,
//         phoneNumber,
//         text,
//     } = req.body;
//     console.log(req.body);

//     let response = '';

//     if (text == '') {
//         // This is the first request. Note how we start the response with CON
//         response = `CON What would you like to check
//         1. My account
//         2. My phone number`;
//     } else if ( text == '1') {
//         // Business logic for first level response
//         response = `CON Choose account information you want to view
//         1. Account number`;
//     } else if ( text == '2') {
//         // Business logic for first level response
//         // This is a terminal request. Note how we start the response with END
//         response = `END Your phone number is ${phoneNumber}`;
//     } else if ( text == '1*1') {
//         // This is a second level response where the user selected 1 in the first instance
//         const accountNumber = 'ACC100101';
//         // This is a terminal request. Note how we start the response with END
//         response = `END Your account number is ${accountNumber}`;
//     }

//     // Send the response back to the API
//     res.set('Content-Type: text/plain');
//     res.send(response);
// }


/**First Time
 * This Check if the number exist in the database to selet the perfer langauge
 * @param {String} phoneNumber - the phone number making the request
 * @returns {Boolean}  if Phone number exist in database 
 * @todo connect the database 
 * @todo set first time to false 
 */
const check = (phoneNumber)=>{
    if(phoneNumber == '09036071895'){
        return true
    }else{
        return false
    }
}








exports.postCreateAccount = ()=>{

}


exports.postCheckAccountBal = ()=>{

}

/**Get Accounts Or Recevice Money - 
 * This Fuction is used to Either send the account number, name and bank as an 
 * Sms or Something
 */
exports.postGetAccount = ()=>{

}


exports.postSendMoney = ()=>{

}


exports.postChangeLanguage = ()=>{

}


exports.postNewPin = ()=>{

}

