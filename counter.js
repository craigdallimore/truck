'use strict';
var n = 0;
setInterval(function() {
  if (n > 10) {
    process.exit(0);
  }
  console.log(++n);
}, 500);
