const user = require('../model/user')
const {rad} = require('../tools/randomm')

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
    data = req.body.phone

    //check,send sms then 
    

    user.findById({
        phone:  data
    }).then(user => {   
        if(!user){
        const newUser = new User({
            phone: req.body.phone,
            password: rad(),
        });
        
            newUser.save()
            .then((user) => {
                res.redirect(`/verifyPhone/${data}`)
            }).catch(error=>{
                res.status(500)
            });
        }else if(user.verified){
            res.redirect(`/login`)
        }else{
            res.redirect(`/verifyPhone/${data}`)

        }
    }).catch(error => {
        res.status(500);
    })

}


exports.getVerifyPhone = (req,res)=>{
    res.render('verifyphone',{
        phone: req.params.id
    })
}

/**Post Sms Verification
 * @todo check if exist and send[] exist page
 * @todo redirect to sms verification
 */
exports.postVerifyPhone = (req,res)=>{
    console.log(req.body);
    res.redirect(`/home`)
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