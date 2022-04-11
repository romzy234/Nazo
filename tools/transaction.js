const transactions = require('../model/transaction')
const user = require('../model/user')


/**Credit Alert
 * @param {number} phone users phone number formart +2340912345678
 * @param {number} amount amount user want to transac with only signed
 * @param {string} bank bank user is transacting with
 * @param {string} category - forgot the reason -- Oh the reason
 * @param {string} detail - additional details 
 * @param {number} account - account number interacting with
 * @param {String} types - debt or credit
 */
exports.addCredit = (phone, amount, bank,category,detail,account)=>{
    const newTransaction = new transactions({
        phone: phone,
        amount: amount*1,
        type:'credit',
        account: account
    });
        newTransaction.save(()=>{
            user.updateOne({ phone:phone }, { $inc: { amount: amount } },()=>{
                var not = {
                    time:Date.now(),
                    message: `You Received ₦${amount}  from ${account} `,
                    title:'Payment Recevice'
                }
                user.updateOne({ phone:phone}, { $push: { notifications:not } })
            })
        })

}  


/**Debit Alert
 * @param {number} phone users phone number formart +2340912345678
 * @param {number} amount amount user want to transac with only signed
 * @param {string} bank bank user is transacting with
 * @param {string} category - forgot the reason -- Oh the reason
 * @param {string} detail - additional details 
 * @param {number} account - account number interacting with
 * @param {String} types - debt or credit
 */
 exports.addDebit = (phone, amount, bank,category,detail,account)=>{
    const newTransaction = new transactions({
        phone: phone,
        amount: amount*1,
        type:'debit',
        account: account,
        bank:bank,
        detail: detail,
        category : category,
    });
        newTransaction.save( ()=>{
            user.updateOne({ phone:phone }, { $inc: { amount: -amount } }, ()=>{

            var not = {
                time:Date.now(),
                message: `₦${amount} was Sent to ${account} Successful`,
                title:'Money Sent Successful'
            }
            user.updateOne({ phone:phone}, { $push: { notifications:not } })
            })
        })
}  