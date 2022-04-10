const user = require('../model/user')
const {rad} = require('../tools/randomm')
const {verifySms} = require('../sms/verify')
const _ = require('lodash');

/**Index page */
exports.index = (req,res)=>{
    res.render('index')
}

exports.getHome = (req,res)=>{
    res.render('home')
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
                    verifySms(result.phone,result.password)
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