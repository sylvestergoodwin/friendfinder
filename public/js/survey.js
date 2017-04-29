function getSurveyData(){
    var surveyData = {name: "",
                     photoLink: "",
                     QA: [{question: "",
                          shortanswer: ""}]};
    
    
    
    
    return surveyData;
}



function loadSurveyQuestions() {
    var url = window.locaton.origin;
    var get = {
        url: url + "/api/survey",
        method: "GET"
    };


    $.ajax(get).done(function (data) {
        // get the survey questions <div id="survey-questions" class="">


        for (var i = 0; i < data.length; i++) {
            // update with data

            // make visible

            // create next surver question
        }
    });
}

function postSurveyAnswers() {
    var url = window.locaton.origin;
    var post = {
        url: url + "/api/survey",
        method: "POST"
    };
    
    var surveyData = getSurveyData();
    
    $.ajax(post, surveyData).done(function () {
            // give a success message
        })
        .fail(function (err) {
            // give an error message
        })
}

alert("PING");