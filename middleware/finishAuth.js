/**this is to check if the user has finish all the registeration
    @todo Fixed Additional Detail
*/
module.exports = (req,res,next)=>{
    if(req.user.name && req.user.name !==""){
        next()
    }else{
        res.render('finishreg');
    }

}