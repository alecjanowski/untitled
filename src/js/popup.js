document.addEventListener('DOMContentLoaded', documentEvents  , false);
var wdk = require('path/to/node_modules/wikidata-sdk/dist/wikidata-sdk')



function myAction(input) {

  const wdk = require('wikidata-sdk')
  const authorQid = 'Q535'
  const sparql = `
SELECT ?work ?date WHERE {
  ?work wdt:P50 wd:${authorQid} .
  OPTIONAL {
    ?work wdt:P577 ?date .
  }
}
`
  const url = wdk.sparqlQuery(sparql)

  $("Search").click(function(){
    $.getJSON(url, function(data){
      console.log(data)
    });
  });

}

function documentEvents() {
  document.getElementById('submit').addEventListener('click',
    function() {
      myAction(document.getElementById('usertext'));
    });

}

function json(response) {
  return response.json()
}

function getResponse(url, input, body){
  fetch(url, {
    method: 'post',
    headers: {
      "Ocp-Apim-Subscription-Key": "253984b210374de7b810b8d8b4d6990f",
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: body
  })
    .then(json)
    .then(function (data) {
      console.log('Request succeeded with JSON response', data['documents'][0]['score']);
      document.getElementById('output').innerHTML = '';
      document.getElementById('output').innerHTML = data['documents'][0]['score'];

    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}
