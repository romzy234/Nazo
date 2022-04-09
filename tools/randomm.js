/**Genrate rand password 4 digits
 * @returns {number}
 */
exports.rad = ()=>{
    var characters = '0123456789';
var result = ""
var chaactersLength = characters.length;

for ( var i = 0; i < 4 ; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * chaactersLength));
}
return result
}
