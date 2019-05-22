const Homepage = require("../models/homepage");

exports.gethomestate = (req, res, next) => {
  Homepage.find({ user: "MBS" }, function(err, homepage) {
  
    res.send(homepage)
  });
};
