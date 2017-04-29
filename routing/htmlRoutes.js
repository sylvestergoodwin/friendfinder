var rootRouter = require("express").Router();
var path = require("path");



rootRouter.get("/survey", function(req,res){
    console.log("handle /survey");
    res.sendFile(path.join(__dirname, "./public/survey.html"));
});
rootRouter.get("/results", function(req, res, next) {
    console.log("handle /results");
    res.sendFile(path.join(__dirname,"../public/results.html"));
});

rootRouter.get("/about", function(req, res, next) {
    console.log("handle /about");
    res.sendFile(path.join(__dirname,"../public/about.html"));
});

rootRouter.get("/", function(req, res, next) {
    console.log("handle / [home]");
    res.sendFile(path.join(__dirname,"../public/home.html"));
});
module.exports = rootRouter;