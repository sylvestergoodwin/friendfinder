var app = require("./app");

app.listen(app.get('port'), function () {
    console.log('Express Started on ' +
        app.get('port') +
        ' press ctrl-C to terminate.');
});
