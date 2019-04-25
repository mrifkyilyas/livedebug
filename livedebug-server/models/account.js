const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  accountNumber: {
    type: String
  },
  balance: {
    type: Number,
    default: 500000,
    min: [ 200000, 'Minimal balance 200000']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

accountSchema.pre('save', function(next) {
  console.log(this, 'hook acoount')
  this.accountNumber = String(Math.random()).substring(2,12);
  next()

})

let Account = mongoose.model('Account', accountSchema);

module.exports = Account
