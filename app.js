const Twit = require('twit')
const notifier = require('node-notifier');
const open = require('open');
const franc = require('franc')
const fs = require('fs');

const apikey = 'kPCx7XvJ4rChpufL4PKTMK8vz'
const apiSecretKey = 'pj1Osb7hSZpBHYPEPElnPojzn4f1ODOiuDuRKtf4HpUOxyUcuG'
const accessToken = '1377190716233768960-qkj25MlPlqapajJrRVVlUEUIyj7vfs'
const accessTokenSecret = 'sIdLfa33WltdJiUizRIukk0E7nRhZiSmb0Qbyz1E5VsfI'

var T = new Twit({
  consumer_key: apikey,
  consumer_secret: apiSecretKey,
  access_token: accessToken,
  access_token_secret: accessTokenSecret,
});

var tweet_result;


(async () => {

    //1. GET RECENT TWEETS
    T.get('search/tweets', { q: '#tesla since:2020-04-15', count: 100 }, function(err, data, response) {
      const tweets = data.statuses
      // .map(tweet => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //CHECK LANGUAGE
      
      .map(tweet => tweet.text)
      .filter(tweet => tweet.toLowerCase().includes('elon'));
      
      console.log(tweets);
      tweet_result = tweets
    })

    // // //2. REAL TIME MONITORING USING STREAM (HASHTAG)
    // // var stream = T.stream('statuses/filter', { track: '#tesla' })
    // // stream.on('tweet', function (tweet) {
    // //     console.log(tweet.text);
    // //     console.log('Language: ' + franc(tweet.text));
    // //     console.log('------');
    // // })

    // // // 3. REAL TIME MONITORING USING STREAM (LOCATION)
    // // var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
    // // var stream = T.stream('statuses/filter', { locations: sanFrancisco })
    
    // // //SHOW NOTIFICATION FOR EACH RECEIVED TWEET
    // // stream.on('tweet', function (tweet) {
    // //   console.log(tweet.text);
    // //   let url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`

    // //   notifier.notify({
    // //     title: tweet.user.name,
    // //     message: tweet.text
    // //   });

    // //   notifier.on('click', async function(notifierObject, options, event) {
    // //     console.log('clicked');
    // //     await open(url);
    // //   });
    // })
})();

var express = require('express');
var app = express();

app.get('/test', function (req, res) {
    res.end(JSON.stringify('{"tweet_result" : '+tweet_result+'}'));
})

var server = app.listen(8081, function () {
    
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
   

})

app.get('/*.html', function (req, res) {
    res.writeHead(200, { 'content-type': 'text/html' });
    fs.createReadStream(req.path.substr(req.path.lastIndexOf('/') + 1)).pipe(res);
})

app.get('/*.css', function (req, res) {
    res.writeHead(200, { 'content-type': 'text/css' });
    fs.createReadStream(req.path.substr(req.path.lastIndexOf('/') + 1)).pipe(res);
})

app.get('/*.js', function (req, res) {
    res.writeHead(200, { 'content-type': 'text/js' });
    fs.createReadStream(req.path.substr(req.path.lastIndexOf('/') + 1)).pipe(res);
})