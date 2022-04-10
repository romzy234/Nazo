const mongoose = require('mongoose');

var loanSchema = mongoose.Schema({
    // username :{
    //     type:String,
    //     require:true
    // },
    phone:{
        type:String,
        require:true
    },
    approve:{
        type:Boolean,
        require:true
    },
    name:{
        type:String,
    },
    reason:{
        type:String,
    },
    amount:{
        type:Number,
    },

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('loans',loanSchema);