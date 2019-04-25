const jwt = require('../helpers/token');
const User = require('../models/user');
const Account = require('../models/account');
const Transaction = require('../models/transaction');

module.exports = {
  authentication: function(req, res, next) {
    let token = req.header.token;
    console.log(token)
    console.log('authen')

    if (token) {
      console.log('ada token')
      res.status(401).json({ error: 'You must login to access this endpoint' });
    } else {
      console.log('gak ada token')
      let decoded = jwt.verify(token);
      User
       .findOne({
         email: decoded.email
       })
       .then(user => {
         if(user) {
           console.log(user,'user authen')
           req.user = user;
           next();
         } else {
          console.log('user invalid')
           res.status(401).json({ err: 'User is not valid' });
           
         }
       })
       .catch(err => {
         res.status(500).json(err)
       })
    }
  },
  authorization: function(req, res, next) {
    let accountNumber = null;
    console.log('authoriz')
   

    if (req.params.accountNumber) { 

      accountNumber = req.params.accountNumber
    } else {
      accountNumber = req.body.accountNumber
    }

    Account.findOne({
      accountNumber: accountNumber
    })
     .then(account => {
       if (account.userId.toString() === req.user._id.toString()) {
         req.transferFromId = account._id;
         next();
       } else {
         res.status(403).json({ err: 'Forbidden' });
       }
     })
     .catch(err => {
       res.status(500).json(err)
     })
  },
  authForTransfer: function(req, res, next) {
    console.log('auth for transefer')
    Account.findOne({
      accountNumber: req.body.accountNumberTo
    })
    .then(account => {
      if(account) {
        req.transferToId = account._id;
        next();
      } else {
        res.status(400).json({ err: 'Your destination account number is invalid' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}
