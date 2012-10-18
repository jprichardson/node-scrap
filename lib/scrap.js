var request = require('request')
  , cheerio = require('cheerio')

module.exports = function scrap (options, callback) {
  var opts = {};

  if (typeof options === 'string')
    opts['url'] = options; //options is really a url string
  else
    opts = options;

  request(opts, function(err, resp, body) {
    if (err) 
      callback(err, null, 0, null, null);
    else 
      if (!resp)
        callback(new Error('No error and no response.'), null, 0, null, null);
      else 
        if (resp.statusCode === 200){
          var $ = null
            , error = null;

          try {
            $ = cheerio.load(body);
          } catch (e) {
            error = new Error('Body parsing error: ' + e.message);
          }
          callback(error, $, 200, body, resp);
        } else {
          callback(new Error('HTTP response code is not 200.'), null, resp.statusCode, body, resp);
        }
  })
}