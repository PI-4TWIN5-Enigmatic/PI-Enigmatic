const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema1 = new Schema({
    email:{ type: String, required: false },
    code:{type:Number, required:false},
    expiration:{type:Date,required:false} ,
}, { timestamps: true })

module.exports = mongoose.model('OtpData', schema1);