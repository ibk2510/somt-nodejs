const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({

    Product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'user',
        required : true
    },
    start : {
        type : Date,
        required : true
    },
    end : {
        type : Date,
        required : true
    }



},{
    timestamps : true
})

module.exports = mongoose.Model('Subscription' , SubscriptionSchema);