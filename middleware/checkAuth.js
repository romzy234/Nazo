/**IS User An Login 
    @todo Fixed Additional Detail
*/
module.exports = (req,res,next)=>{
    if(req.isAuthenticated() && req.user){
        next()
    }else{
        res.redirect('/login');
    }

}