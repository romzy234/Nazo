const mongoose = require('mongoose');

var investSchema = mongoose.Schema({
    // username :{
    //     type:String,
    //     require:true
    // },
    phone:{
        type:String,
        require:true
    },
    detail:{
        type:Boolean,
        require:true
    },
    name:{
        type:String,
    },
    unitPerCost:{
        type:Number,
    },
    amount:{
        type:Number,
    },

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('invests',investSchema);