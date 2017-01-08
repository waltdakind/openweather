
//==========================================================================
// express routing stuff 
//==========================================================================
const http = require('http');
const https = require('https');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const geolocator = require('geolocator');

// Define the port to run on
// =============================================================================
const PORT = process.env.PORT || 8080;
app.set('PORT', PORT);

//serve public folder
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

// =============================================================================
// Listen for requests
// =============================================================================
const server = app.listen(app.get('PORT'), () => {
  console.log('So, I guess you wanted to run your app on port ' + PORT);
});