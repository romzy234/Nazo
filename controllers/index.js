/**Index page */
exports.index = (req,res)=>{
    res.render('index')
}

exports.getHome = (req,res)=>{
    res.render('home')
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