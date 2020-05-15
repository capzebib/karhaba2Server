const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
 
const creditCardSchema= new Schema({    
    NameOnTheCard: String,
    Cardtype:{
        type: String,
        enum:["CB", "VISA", "AMERICAN EXPRESS","DISCOVER", "DINERS", "MASTERCARD"],    
    },
    Securitycode:Number,
    ExpirationDate: {
        type: Date, 
        default: Date.now,
    },
})

const CreditCard = mongoose.model("CreditCard", creditCardSchema);
module.exports = CreditCard;