const user = require('../model/user')
const transactions = require('../model/transaction')
const {rad} = require('../tools/randomm')
const {verifySms} = require('../sms/verify') 
const {forgotSms} = require('../sms/forgot')
const {WelcomeSms} = require('../sms/welcome')
const _ = require('lodash');
const { createAccount } = require('../flutterwave/createAccount')
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
const loan = require('../model/loan')


/**Index page */
exports.index = (req,res)=>{
    res.render('index')
}

exports.getHome = (req,res)=>{

    transactions.find({
        phone:req.user.phone
    }) 
    .limit(5)
    .sort({_id:-1})
    .then(
        results=>{
            console.log(results);
            loan.find({
                phone:req.user.phone
            }).then(
               loan  =>{
                res.render('home',{
                    user : req.user,
                    transaction:results,
                    loan:loan,
                    dayjs:dayjs
                })
               } 
            ).catch(
                err =>{
                    console.log(err);
                }
            )
        }
    )
    .catch(error=>{
        res.status(500);
    })
}

/**Get Signup
 */
exports.getSignUp = (req,res)=>{
    res.render('signup')
}

exports.getSettings = (req,res)=>{
    res.render('settings',{
        user: req.user
    })
}

exports.getBanking = (req,res)=>{
    res.render('banking',{
        user: req.user
    })
}


exports.getLoans = (req,res)=>{
   loan.find({
        phone:req.user.phone
    }) 
    .sort({_id:-1})
    .then(
        results=>{
            res.render('loans',{
                user : req.user,
                loan:results,
                dayjs:dayjs
            })
        }
    )
    .catch(error=>{
        res.status(500);
    })
}

exports.getLoan = (req,res)=>{
    res.render('loan',{
        user: req.user
    })
}




exports.postLoan = (req,res)=>{
console.log(req.body);
    var phone = req.user.phone
    var name = req.body.name
    var amount = req.body.amount*1
    var reason = req.body.reason


        const newLoan = new loan({
            phone: phone,
            name: name,
            amount:amount,
            reason:reason,
            approve:false
        });
        

            newLoan.save()
            .then((result) => {
                res.redirect(`/loans`)
            }).catch(error=>{
                res.status(500)
            })
}



/**Post Signup
 * @todo check if exist and send[] exist page
 * @todo if dont exist send sms and Create
 * @todo redirect to sms verification
 */
exports.postSignUp = (req,res)=>{
    data = '+234'+req.body.phone
    var password = rad()
    var code = rad()

    user.findOne({
        phone:  data
    }).then(result => {   
        if(!result){
        const newUser = new user({
            phone: data,
            password: password,
            code:code,
            verified:false
        });
        
            newUser.save()
            .then((result) => {
                res.redirect(`/verifyPhone/${data}/${code}`)
                //send sms
                verifySms(data,code)
            }).catch(error=>{
                res.status(500)
            });
        }else if(result.verified){
            res.redirect(`/login`)
        }else{
            res.redirect(`/verifyPhone/${data}/${result.code}`)

        }
    }).catch(error => {
        res.status(500);
    })

}


exports.getVerifyPhone = (req,res)=>{
    res.render('verifyphone',{
        phone: req.params.id,
        code: req.params.code
    })
}

exports.gettranfer = (req,res)=>{
    res.render('transfer',{
        user: req.user
    })
}

/**Post Sms Verification
 * @todo check if exist and send[] exist page
 * @todo redirect to sms verification
 */
exports.postVerifyPhone = (req,res)=>{
    const data = req.body
    user.findOne({
        phone:data.phone
    }).then(
        result=>{
            if(result){
                if(result.code == data.code){
                    res.redirect(`/home?password=${result.password}`)
                    WelcomeSms(result.phone,result.password)
                    verifyStatus(result._id)
                }else{
                res.send("invaild Verification Code try again ")
                }
            }else{
                res.send("invaild request number dont exist ")
                console.log("error");
            }
        }
    )
}
/**Login
 * @todo - 
 */
exports.getLogin = (req,res)=>{
    res.render('login')
}

/**Register
 * @todo - 
 */
 exports.getReg = (req,res)=>{
    res.render('register')
}

const verifyStatus = (id) =>{
    const obj = {
        verified:true
    }

    // console.log(obj.status);
    user.findById({
        _id: id
    }).then(userss => {
        userss = _.extend(userss, obj);
        userss.save()
    }).catch(error => {
        console.log(error);
    })
}


//USed to finish registration
exports.postDone = (req,res)=>{
    const d = req.body
    const obj = {
        firstName:d.firstName,
        lastName:d.lastName,
        age:d.age*1,
        gender:d.gender,
        profilePic:`https://avatars.dicebear.com/api/${d.gender}/:${d.firstName}.svg`,
        name: d.firstName +'-'+d.lastName,
        amount:0,
        saving:0,
        income:0,
        loan:0,
        expenses:0,
        investments:[],
        backing:[]
    }

    // console.log(obj.status);
    user.findById({
        _id: req.user._id
    }).then(userss => {
        userss = _.extend(userss, obj);
        userss.save(
            (data)=>{
                res.redirect("/login")
                createAccount("12345478901",data.phone,obj.firstName,obj.lastName,"Nazo "+obj.name)
            }
        )
    }).catch(error => {
        console.log(error);
    })
}


exports.postForgot = (req,res)=>{
    const data = req.body
    user.findOne({
        phone:"+234"+data.phone
    }).then(
        result=>{
            if(result){
                res.send('check sms for new password')
                forgotSms(result.phone,result.password)
            }else{
                res.send("invaild request number dont exist ")
                console.log("error");
            }
        }
    ).catch(error => {
        console.log(error);
    })
}

/**Get forget password
 */
 exports.getForgot = (req,res)=>{
    res.render('forget')
}

exports.getTransactions = (req,res)=>{
    transactions.find({
         phone:req.user.phone
     }) 
     .sort({_id:-1})
     .then(
         results=>{
             res.render('transactions',{
                 user : req.user,
                 transactions:results,
                 dayjs:dayjs
             })
         }
     )
     .catch(error=>{
         res.status(500);
     })
 }

 exports.getbacking = (req,res)=>{
    loan.find({
         phone:req.user.phone
     }) 
     .sort({_id:-1})
     .then(
         results=>{
             res.render('backing',{
                 user : req.user,
                 loan:results,
                 dayjs:dayjs
             })
         }
     )
     .catch(error=>{
         res.status(500);
     })
 }
 
