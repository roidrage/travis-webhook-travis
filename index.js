var express = require('express');
var bodyParser = require('body-parser');
var rqst = require('request');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(request, response) {
  response.send("Hello World")
});

app.post("/webhook", function(httpRequest, httpResponse) {
  rqst.post({
    url: 'https://api.travis-ci.org/repo/' + encodeURIComponent(repoName) + '/requests',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Travis-API-Version': '3',
      'Authorization': 'token ' + process.env.TRAVIS_API_TOKEN
    },
    json: true,
    body: {
      message: 'Slack-triggered build by ' + httpRequest.body.user_name,
      branch: branch,
      config: {
        language: 'node_js',
        node_js: '6.0',
        script: 'echo Hello World'
      }
    }
  }, function(error, res, body) {
  });
});
