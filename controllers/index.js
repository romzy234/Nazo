const user = require('../model/user')
const transactions = require('../model/transaction')
const {rad} = require('../tools/randomm')
const {verifySms} = require('../sms/verify') 
const {forgotSms} = require('../sms/forgot')
const {WelcomeSms} = require('../sms/welcome')
const _ = require('lodash');

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
            res.render('home',{
                user : req.user,
                transaction:results
            })
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
                console.log(result);
                if(result.code == data.code){
                    res.locals.logUser = result
                    req.user = result
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
        savings:0,
        income:0,
        loan:0,
        expenses:0,
    }

    // console.log(obj.status);
    user.findById({
        _id: req.user._id
    }).then(userss => {
        userss = _.extend(userss, obj);
        userss.save(
            ()=>{
                res.redirect("/home")
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