var testutil = require('testutil')
  , scrap = require('../lib/scrap')
  , P = require('autoresolve')
  , buffet = require('buffet')
  , http = require('http')

var PORT = 31456

describe('scrap', function () {
  var server = null
    , url = 'http://localhost:' + PORT;

  before(function(done) {
    server = http.createServer();
    var buf = buffet({root: P('test/resources'), watch: false});
    server.on('request', buf);
    server.on('request', buf.notFound);
    server.listen(PORT, function(){setTimeout(done, 5)}); //the setTimeout is to make sure buffet is ready with cached files
  })

  after(function(done) {
    server.close(done);
  })

  describe('> when it contains the html modifier pre parse function', function() {
    it('should apply it before loading it into cheerio', function(done) {
      scrap({
        url: url + '/google_com.html', 
        preParse: function(body, done) {
          var newHtml = '<html><body>Hi</body></html>'
          done(newHtml)
        }
      }, function(err, $, code, html, resp) {
        F (err)
        T ($('body').text() === 'Hi')
        T (resp.statusCode === 200)
        T (code === 200)
        T (html.length > 0)
        done()
      })
    })
  })

  describe('> when it can reach the site', function () {
    it('should retrieve the content', function (done) {
      scrap(url + '/google_com.html', function(err, $, code, html, resp){
        F (err)
        T ($('title').text() === 'Google')
        T (resp.statusCode === 200)
        T (code === 200)
        T (html.length > 0)
        done()
      });
    })
  })

  describe('> when it cant find the page', function () {
    it('should return an error', function (done) {
      scrap(url + '/asdfasdfasdfasdfasfdsfsda', function(err, $, code, html, resp){
        T (err)
        T (code === 404)
        T (resp.statusCode === 404)
        T (html.length > 0)
        T ($) //still set body for cheerio to access
        done()
      });
    })
  })
})