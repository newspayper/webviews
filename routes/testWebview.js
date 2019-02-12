const url = require('url');
const requestPromise = require('request-promise');

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Route testWebview', truc: '2è paramètre' });
});


// Affichage de boutons dans chatfuel
const createButtons = (displayUrl) => {
  return {
    "messages":[
      {      
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            image_aspect_ratio: 'square',
            elements: [{
              title: 'Welcome!',
              subtitle: 'Choose your preferences',
              buttons:[
                {
                  type: 'web_url',
                  url: displayUrl,
                  title: 'Webview (compact)',
                  messenger_extensions: true,
                  webview_height_ratio: 'compact' // Small view
                },
                {
                  type: 'web_url',
                  url: displayUrl,
                  title: 'Webview (tall)',
                  messenger_extensions: true,
                  webview_height_ratio: 'tall' // Medium view
                },
                {
                  type: 'web_url',
                  url: displayUrl,
                  title: 'Webview (full)',
                  messenger_extensions: true,
                  webview_height_ratio: 'full' // large view
                }
              ]
            }]
          }
        }
      }
  ]};
};

router.get('/show-buttons', (request, response) => {

  const {userId, blockName} = request.query;
  var displayUrl = `https://abolib.fr/testWebview/dynamic-webview?userId=${userId}&blockName=${blockName}`;

  

  var reponseJSON = createButtons(displayUrl);

  console.log("Réponse JSON :\n" + JSON.stringify(reponseJSON));
  response.json(reponseJSON); 
});

// Rendering et affichage de la webview
router.get('/dynamic-webview', (request, response) => {
  const {userId, blockName} = request.query;
  
  response.render('dynamic-webview', {pageTitle: 'This is my page', userId, blockName});
});


// Appelé par la webview lors du submit => utilisation du broadcast API de Chatfuel
router.post('/dynamic-webview', (request, response) => {

  console.log("POST dynamic-webview");

  const botId = process.env.CHATFUEL_BOT_ID;
  const chatfuelToken = process.env.CHATFUEL_TOKEN;

  // Get user id and block name from request.body
  const {userId, blockName} = request.body;
  
  const broadcastApiUrl = `https://api.chatfuel.com/bots/${botId}/users/${userId}/send`;
  
  console.log("broadcastApiUrl : " + broadcastApiUrl);

  const query = Object.assign({
      chatfuel_token: chatfuelToken,
      chatfuel_block_name: blockName
    },
    request.body
  );

  console.log(query);

  const chatfuelApiUrl = url.format({
    pathname: broadcastApiUrl,
    query
  });
  
  const options = {
    uri: chatfuelApiUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  console.log("chatfuelApiUrl : " + chatfuelApiUrl);

  requestPromise.post(options)
    .then(() => {
      response.json({});
    });
  
});



module.exports = router;