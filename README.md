Node.js - scrap
================

A simple screen scraper module that uses jQuery style semantics.


Why?
----

In every screen scraper program that I wrote, I had to include [request][request] and [cheerio][cheerio]. I would then have to check the response error object and the response code. It became a bit annoying. Hence this package.



Installation
------------

    npm install scrap



Quick and Dirty
---------------


```javascript
var scrap = require('scrap');

scrap('http://google.com', function(err, $) {
  console.log($('title').text().trim()); //Google
});
```


API
-----------

### scrap(options, callback)

**options**: Can either be a string url or an object containing options as key,value pair. 

Options include:
- `url`: The url to parse.
- `timeout`: The number of milliseconds to wait before aborting the request.
- `proxy`: The proxy string e.g. _245.12.19.145:8080_.

**callback**: The callback function for a response. The function can include the following parameters:
- `err`: The error object if it exists. If the response code is not `200` this will be set. This may be a poor design choice, time will tell.
- `$`: jQuery object to use on the page.
- `code`: HTTP response status code.
- `html`: HTML or response body text.
- `resp`: The actual response object.



Credits
-------

This would not be possible without the great Node.js modules:

* [Request][request]
* [Cheerio][cheerio]



Author
------

This module was written by [JP Richardson][aboutjp]. You should follow him on Twitter [@jprichardson][twitter]. Also read his coding blog [Procbits][procbits]. If you write software with others, you should checkout [Gitpilot][gitpilot] to make collaboration with Git simple.



License
-------

(MIT License)

Copyright 2012, JP Richardson  <jprichardson@gmail.com>


[request]: https://github.com/mikeal/request
[cheerio]: https://github.com/MatthewMueller/cheerio

[aboutjp]: http://about.me/jprichardson
[twitter]: http://twitter.com/jprichardson
[procbits]: http://procbits.com
[gitpilot]: http://gitpilot.com

