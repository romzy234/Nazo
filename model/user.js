const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    // username :{
    //     type:String,
    //     require:true
    // },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    code:{
        type:String,
        require:true
    },
    verified:{
        type:Boolean,
        require:true
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    name:{
        type:String,
    },
    profilePic:{
        type:String,
    },
    age:{
        type:Number,
    },
    amount:{
        type:Number,
    },
    saving:{
        type:Number,
    },
    income:{
        type:Number,
    },
    loan:{
        type:Number,
    },
    expenses:{
        type:Number,
    },
    gender:{
        type:String,
    },
    account_number:{
        type:String,
    },
    bank_name :{
        type:String,
    },
    notifications:{
        type:Array,
        require:true
    },
    investments:{
        type:Array
    },
    backing:{
        type:Array
    },
    // setting:{
    //     type:Object,
    //     require:true
    // },
    // superAdmin:{
    //     type:Boolean,
    //     require:true
    // },
    // status:{
    //     type:Boolean,
    //     default:true
    // }

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('users',UserSchema);