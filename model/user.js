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
    gender:{
        type:String,
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