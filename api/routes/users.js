const express = require("express");
const checkAuth = require("../../helpers/auth");
const usersCntrls = require("../cntrls/usersCntrl");

const router = express.Router();

router.post("/login", usersCntrls.post_Login );

router.post("/signup", usersCntrls.post_signUp );

router.delete( "/:userId", checkAuth, usersCntrls.delete_userId );


module.exports = router;
