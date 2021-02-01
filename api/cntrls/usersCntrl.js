const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const post_Login = async (req, res, next) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if (user.length < 1) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) {
        return
        res.status(401).json({
        message: "Auth failed"
      });
    }
      if (isMatch) {
        const token = jwt.sign({
          email: user.email,
          userId: user._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        }
      );
      return res.status(200).json({
        message: "Auth successful",
        token
      });
    } else {
      return res.status(401).json({message: "Auth failed"});
    }
  });
})
  .catch( err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

const post_signUp = async (req, res) => {
  User.findOne({email: req.body.email})
  .then(user => {
    if (user) {
      return res.status(409).json({message:"Mail exists"});
    } else {
      const user = new User({
        email: req.body.email,
        password: req.body.password
      });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if(err) {
                return res.status(500).json({
                  error:err});
              }
              user.password = hash;
              user.save()
                .then(user => {
                  console.log(user);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({error: err});
                  });
            });
        });
      }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
                return;
              });
}

const delete_userId = async (req, res) => {
  User.findByIdAndDelete(req.params.userId)
  .then(user => {
    res.status(200).json({
      message: "User deleted",
      request: {
        type: "POST",
        url: "http://localhost:3000/api/products",
        body: { userId: "ID" }
      }
    });
  })
  .catch(err => {
    res.status(500).json({error: err});
});
}

module.exports = {
  post_Login,
  post_signUp,
  delete_userId
}
