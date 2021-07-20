const { text } = require("body-parser");

var url = "http://localhost:8081/test";
text_test ="<h2>" + "Hello, this is me testing" + "</h2>"




function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
};

async function main() {
  // var tweet_result = await httpGet(url);

  // $('#tweet_result').append(tweet_result);
  $('#tweet_result').html(text_test);
};

main();