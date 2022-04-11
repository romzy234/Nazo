const mongoose = require('mongoose');

var transactionSchema = mongoose.Schema({

    phone:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    bank:{
        type:String,
    },
    category:{
        type:String,
    },
    detail:{
        type:String,
    },
    account:{
        type:String,
    },
    type:{
        type:String,
        require:true
    },
    
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('transactions',transactionSchema);