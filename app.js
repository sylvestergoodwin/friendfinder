var express = require("express");
var bodyparser = require("body-parser");
var path = require("path");

var apiRoutes = require("./routing/apiRoutes");
var htmlRoutes = require("./routing/htmlRoutes");

var survey = [{
        question: "Your mind is always buzzing with unexplored ideas and plans.",
        answer: ["1 (Strongly Disagree)", "2 (Somewhat Disagree)", "3 (Neither Agree nor Disagree)", "4 (Somewhat Agree)", "5 (Strongly Agree)"]
    },
    {
        question: "Generally speaking, you rely more on your experience than your imagination.",
        answer: ["1 (Strongly Disagree)", "2 (Somewhat Disagree)", "3 (Neither Agree nor Disagree)", "4 (Somewhat Agree)", "5 (Strongly Agree)"]
    },
    {
        question: "You find it easy to stay relaxed and focused even when there is some pressure.",
        answer: ["1 (Strongly Disagree)", "2 (Somewhat Disagree)", "3 (Neither Agree nor Disagree)", "4 (Somewhat Agree)", "5 (Strongly Agree)"]
    },
    {
        question: "You rarely do something just out of sheer curiosity.",
        answer: ["1 (Strongly Disagree)", "2 (Somewhat Disagree)", "3 (Neither Agree nor Disagree)", "4 (Somewhat Agree)", "5 (Strongly Agree)"]
    },
    {
        question: "People can rarely upset you.",
        answer: ["1 (Strongly Disagree)", "2 (Somewhat Disagree)", "3 (Neither Agree nor Disagree)", "4 (Somewhat Agree)", "5 (Strongly Agree)"]
    },
    {
        question: "It is often difficult for you to relate to other people’s feelings.",
        answer: ["1 (Strongly Disagree)", "2 (Somewhat Disagree)", "3 (Neither Agree nor Disagree)", "4 (Somewhat Agree)", "5 (Strongly Agree)"]
    },
    {
        question: "In a discussion, truth should be more important than people’s sensitivities.",
        answer: ["1 (Strongly Disagree)", "2 (Somewhat Disagree)", "3 (Neither Agree nor Disagree)", "4 (Somewhat Agree)", "5 (Strongly Agree)"]
    },
    {
        question: "You rarely get carried away by fantasies and ideas.",
        answer: ["1 (Strongly Disagree)", "2 (Somewhat Disagree)", "3 (Neither Agree nor Disagree)", "4 (Somewhat Agree)", "5 (Strongly Agree)"]
    },
    {
        question: "You think that everyone’s views should be respected regardless of whether they are supported by facts or not.",
        answer: ["1 (Strongly Disagree)", "2 (Somewhat Disagree)", "3 (Neither Agree nor Disagree)", "4 (Somewhat Agree)", "5 (Strongly Agree)"]
    },
    {
        question: "You feel more energetic after spending time with a group of people.",
        answer: ["1 (Strongly Disagree)", "2 (Somewhat Disagree)", "3 (Neither Agree nor Disagree)", "4 (Somewhat Agree)", "5 (Strongly Agree)"]
    }
            ];

var surveyAnswers = [{
        name: "Harry Stone",
        photoLink: "link",
        survey: ["1", "2", "3", "2", "1", "2", "1", "2", "3", "2"]
    },
    {
        name: "Duncen McCloud",
        photolink: "likn2",
        survey: ["3", "2", "3", "2", "2", "4", "2", "1", "5", "1"]
    },
    {
        name: "Sam Malone",
        photolink: "link3",
        survey: ["4", "2", "1", "5", "3", "2", "2", "1", "2", "2"]
    }]



var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.text());
app.use(bodyparser.json({
    type: "application/vnd.api+json"
}));

app.use(express.static(path.join(__dirname, "public")));
app.set('port', process.env.PORT || 3000);

//--------------------------------------------------------------
app.get("/survey", function (req, res) {
    console.log("handle /survey");
    res.sendFile(path.join(__dirname, "./public/survey.html"));
});

app.get("/", function (req, res) {
    console.log("handle /");
    res.sendFile(path.join(__dirname, "./public/home.html"));
});
//--------------------------------------------------------------


//--------------------------------------------------------------

app.get("/api/friends", function (req, res) {
    console.log("handle /api/friends");
    res.json(surveyAnswers);
});

app.get("/api/survey", function (req, res) {
    console.log("handle /api/survey");
    res.json(survey);
});

app.post("/api/friends", function (req, res) {
    console.log("post /api/friends");
    var bestmatch = 0;
    var current = 0;
    var bestmatchscore = 0;


    console.log(req.body);
    // locate best match
    console.log("SSS" + surveyAnswers.length);
    console.log(surveyAnswers);
    for (var i = 0; i < surveyAnswers.length; i++) {
        current = 0;
        for (var j = 0; j < surveyAnswers[i].survey.length; j++) {
            current += Math.abs(surveyAnswers[i].survey[j] - req.body.survey[j]);
            console.log(surveyAnswers[i].name + ' ' + current);
        }
        if (i == 0) {
            console.log("first");
            bestmatch = i;
            bestmatchscore = current;
        } else {
            if (current < bestmatchscore) {
                bestmatch = i;
                bestmatchscore = current;
            }

        }

    }
    console.log("bestmatch" + bestmatch);
    res.json(surveyAnswers[bestmatch]);

    // add to the list
    surveyAnswers.push(req.body)

});

//--------------------------------------------------------------



module.exports = app;
