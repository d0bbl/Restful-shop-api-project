const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = express.Router();

// router.get( "/signin", (req, res) => {
//   let error = [];
// res.render("users/in");
// });

// router.get("/register", (req, res) => {
// let errors = [];
// res.render("users/register", {
// errors,
// email: req.body.email,
// password: req.body.password,
// password2: req.body.password2
// });
// });

router.post("/login", (req, res, next) => {

});

router.post("/signup", (req, res) => {
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
});

router.delete( "/:userId", (req, res) => {
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
});


module.exports = router;
