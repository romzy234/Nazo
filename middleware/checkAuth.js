/**IS User An Login 
    @todo Fixed Additional Detail
*/
module.exports = (req,res,next)=>{
    if(req.user && req.user.verified){
        next()
    }else if(!req.verified){
        res.redirect('/verifyPhone/' + req.user.phone +'/'+ req.user.code);
    }else{
        res.redirect('/login');
    }

}